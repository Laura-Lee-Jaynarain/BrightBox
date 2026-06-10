from fastapi import Depends, FastAPI, HTTPException, status, Query
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import os
import numpy as np
import pandas as pd
import joblib
import openmeteo_requests
from datetime import datetime, timedelta
import requests_cache
from retry_requests import retry
import pvlib

pkl_file = "model.pkl"
normalization_file = "normalization_keys.csv"
postal_code_file = "opendb-2026-05-13.csv"

if os.path.exists(pkl_file):
    model = joblib.load(pkl_file)
else:
    print("Modelfile not found!")

if os.path.exists(normalization_file):
    nkeys = pd.read_csv(normalization_file)
    ykey = nkeys["generated_power_kw"]
    nkeys = nkeys.drop("generated_power_kw", axis = 1)
else:
    print("Normalization file not found!")

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
    expose_headers=["*"])

def normalize(df, nkeys):
    df_new = df.copy()
    for key in df_new.keys():
        x = df[key]
        a = nkeys[key][0]
        b = nkeys[key][1]
        df_new[key] = (x-a)/(b-a)
    return df_new

def denormalize_array(arr, normalization_key):
    a = normalization_key[0]
    b = normalization_key[1]
    return (b-a)*arr+a

def denormalize(df, normalization_keys, column = None):
    df_new = df.copy()
    if column:
        df_new = denormalize_array(df_new, normalization_keys[column])
    else:
        for key in df_new.keys():
            df_new[key] = denormalize_array(df[key], normalization_keys[key])
    return df_new

def getData(latitude: float, longitude: float):
    #call API
    cache_session = requests_cache.CachedSession('.cache', expire_after = 3600)
    retry_session = retry(cache_session, retries = 5, backoff_factor = 0.2)
    openmeteo = openmeteo_requests.Client(session = retry_session)

    url = "https://api.open-meteo.com/v1/forecast"
    params = {
    	"latitude": latitude,
    	"longitude": longitude,
    	"hourly": ["temperature_2m", "relative_humidity_2m", "precipitation", "snowfall", "cloud_cover", "cloud_cover_low", "cloud_cover_mid", "cloud_cover_high", "wind_speed_10m", "wind_speed_80m", "wind_direction_10m", "wind_direction_80m", "shortwave_radiation_instant", "wind_gusts_10m"],
    	"current": ["precipitation", "snowfall", "cloud_cover", "wind_speed_10m", "wind_direction_10m", "temperature_2m", "relative_humidity_2m"],
    	"timezone": "auto",
        "forecast_days": 8,
    }

    responses = openmeteo.weather_api(url, params = params)

    # put response in dataframe
    response = responses[0]
    current = response.Current()
    hourly = response.Hourly()

    hourly_temperature_2m = hourly.Variables(0).ValuesAsNumpy()
    hourly_relative_humidity_2m = hourly.Variables(1).ValuesAsNumpy()
    hourly_precipitation = hourly.Variables(2).ValuesAsNumpy()
    hourly_snowfall = hourly.Variables(3).ValuesAsNumpy()
    hourly_cloud_cover = hourly.Variables(4).ValuesAsNumpy()
    hourly_cloud_cover_low = hourly.Variables(5).ValuesAsNumpy()
    hourly_cloud_cover_mid = hourly.Variables(6).ValuesAsNumpy()
    hourly_cloud_cover_high = hourly.Variables(7).ValuesAsNumpy()
    hourly_wind_speed_10m = hourly.Variables(8).ValuesAsNumpy()
    hourly_wind_speed_80m = hourly.Variables(9).ValuesAsNumpy()
    hourly_wind_direction_10m = hourly.Variables(10).ValuesAsNumpy()
    hourly_wind_direction_80m = hourly.Variables(11).ValuesAsNumpy()
    hourly_shortwave_radiation_instant = hourly.Variables(12).ValuesAsNumpy()
    hourly_wind_gusts_10m = hourly.Variables(13).ValuesAsNumpy()
    
    hourly_data = {
        "date": pd.date_range(
            start = pd.to_datetime(hourly.Time() + response.UtcOffsetSeconds(), unit = "s", utc = True),
            end =  pd.to_datetime(hourly.TimeEnd() + response.UtcOffsetSeconds(), unit = "s", utc = True),
            freq = pd.Timedelta(seconds = hourly.Interval()),
            inclusive = "left"
        ).tz_convert(response.Timezone().decode('ascii'))
    }
    
    hourly_data["temperature_2m"] = hourly_temperature_2m
    hourly_data["relative_humidity_2m"] = hourly_relative_humidity_2m
    hourly_data["precipitation"] = hourly_precipitation
    hourly_data["snowfall"] = hourly_snowfall
    hourly_data["cloud_cover"] = hourly_cloud_cover
    hourly_data["cloud_cover_high"] = hourly_cloud_cover_high
    hourly_data["cloud_cover_mid"] = hourly_cloud_cover_mid
    hourly_data["cloud_cover_low"] = hourly_cloud_cover_low
    hourly_data["shortwave_radiation_instant"] = hourly_shortwave_radiation_instant
    hourly_data["wind_speed_10m"] = hourly_wind_speed_10m
    hourly_data["wind_direction_10m"] = hourly_wind_direction_10m
    hourly_data["wind_speed_80m"] = hourly_wind_speed_80m
    hourly_data["wind_direction_80m"] = hourly_wind_direction_80m
    hourly_data["wind_gusts_10m"] = hourly_wind_gusts_10m
    
    hourly_dataframe = pd.DataFrame(data = hourly_data)

    #boundaries
    now = datetime.now().replace(microsecond=0, second=0, minute=0)
    end_1 = pd.Timestamp(now + timedelta(days=1), tz='UTC')
    end_7 = pd.Timestamp(now + timedelta(days=7), tz='UTC')
    now = pd.Timestamp(now, tz='UTC')

    data = hourly_dataframe[hourly_dataframe["date"] >= now]
    data = data[data["date"] <= end_7]
    data["24h"] = False
    data.loc[data["date"] <= end_1,"24h"] = True

    # get angles
    az = pvlib.solarposition.get_solarposition(time=data["date"], latitude=params["latitude"], longitude=params["longitude"]).drop(["apparent_zenith", "apparent_elevation", "equation_of_time", "elevation"], axis = 1)

    data["angle_of_incidence"] = 0
    data["zenith"] = np.array(az['zenith'])
    data["azimuth"] = np.array(az["azimuth"])
    data["angle_of_incidence"] = pvlib.irradiance.aoi(abs(params["latitude"]), 0, data["zenith"],  data["azimuth"])
    

    if params["latitude"] < 0:
        data["azimuth"] = (np.array(az["azimuth"]) + 180) % 360  

    x = np.array(data["date"])
    time = []
    date = []
    for dt in x:
        time.append(dt.strftime("%H:%M"))
        if ( int(dt.strftime("%H")) == 14 ):
            date.append(dt.strftime("%d/%m"))
        else:
            date.append('')
    day = np.array(data["24h"])
    

    data = data.drop(["date", "24h"], axis=1)

    return x, data, np.array(time), np.array(date), day

def makePrediction(latitude: float, longitude:float):
    x, y, time, date, day = getData(latitude, longitude)
    
    normalized_data = normalize(y, nkeys)

    prediction = model.predict(normalized_data)

    result = denormalize_array(prediction, ykey)
    return Output(x=x, y=result, time=time, date=date, day=day)


class Output(BaseModel):
    x: list[datetime] = None
    y: list[float] = None
    time: list[str] = None
    date: list[str] = None
    day: list[bool] = None
    

@app.get("/predict", response_model=Output)
async def getPrediction(latitude: float = Query(...), longitude:float = Query(...)):
    output = makePrediction(latitude, longitude)
    return output

@app.get("/predict/postal", response_model=Output)
async def getPredictionIn(postalcode: int = Query(...)):
    df = pd.read_csv(postal_code_file)
    df = df[df["street_code"] == postalcode].reset_index()
    if df.shape[0] == 0:
        latitude=-26.2041
        longitude=28.0473
    else:
        latitude = df["latitude"][0]#.astype(float)
        longitude = df["longitude"][0]#.astype(float)
    output = makePrediction(latitude, longitude)
    return output

    
    