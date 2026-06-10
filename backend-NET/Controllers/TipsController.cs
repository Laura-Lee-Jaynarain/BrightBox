using Microsoft.AspNetCore.Mvc;
using backend_NET.Models;

namespace backend_NET.Controllers
{
    [ApiController]
    [Route("api/tips")]
    public class TipsController : ControllerBase
    {
        [HttpPost("schedule")]
        public IActionResult GetScheduledTips([FromBody] ScheduleTips schedule)
        {
            int fromHour = ParseHour(schedule.TimeFrom);
            int toHour = ParseHour(schedule.TimeTo);

            var tips = new List<PersonalisedTip>();

            // Morning tips (5–10)
            if (fromHour < 10)
            {
                tips.Add(new PersonalisedTip
                {
                    Title = "Pre-Cool Before Peak Hours",
                    Description = "Lower your thermostat by 2°C early in the morning before peak tariff hours kick in. Your home stays cool without the extra cost.",
                    Category = "Cooling",
                    Impact = "high",
                    Icon = "ac_unit",
                    TimeLabel = "6 AM – 10 AM",
                    Saving = "Save R12/day"
                });

                tips.Add(new PersonalisedTip
                {
                    Title = "Run Laundry Off-Peak",
                    Description = "Schedule your washing machine to run before 8 AM to take advantage of off-peak electricity tariffs and avoid grid congestion.",
                    Category = "Laundry",
                    Impact = "medium",
                    Icon = "local_laundry_service",
                    TimeLabel = "Before 8 AM",
                    Saving = "Save R6/wash"
                });

                tips.Add(new PersonalisedTip
                {
                    Title = "Smart Geyser Scheduling",
                    Description = "Heat your geyser early morning before rates rise. Set a timer between 5–7 AM to pre-heat water at the lowest tariff window.",
                    Category = "Water",
                    Impact = "high",
                    Icon = "water_heater",
                    TimeLabel = "5 AM – 7 AM",
                    Saving = "Save R18/day"
                });

                tips.Add(new PersonalisedTip
                {
                    Title = "Morning Solar Boost",
                    Description = "Run high-energy tasks like ironing or vacuuming in the morning to use free solar energy and reduce grid reliance.",
                    Category = "Solar",
                    Impact = "medium",
                    Icon = "wb_sunny",
                    TimeLabel = "During your active hours",
                    Saving = "Save R10/day"
                });

                tips.Add(new PersonalisedTip
                {
                    Title = "Use Natural Light",
                    Description = "Open curtains and blinds to brighten your home with natural light. This reduces the need for artificial lighting during your morning routine.",
                    Category = "Electricity",
                    Impact = "low",
                    Icon = "light_mode",
                    TimeLabel = "During your active hours",
                    Saving = "Save R4/day"
                });

                tips.Add(new PersonalisedTip
                {
                    Title = "Energy-Efficient Breakfast Prep",
                    Description = "Use a microwave or toaster instead of the oven for breakfast. Cover pots while boiling and match pot size to burner to cut kitchen energy use by 20%.",
                    Category = "Kitchen",
                    Impact = "low",
                    Icon = "microwave",
                    TimeLabel = "During your active hours",
                    Saving = "Save R4/day"
                });
            }

            // Solar peak tips (10–14)
            bool coversSolarPeak = (fromHour < 14 && toHour > 10);
            if (coversSolarPeak)
            {
                tips.Add(new PersonalisedTip
                {
                    Title = "Maximise Solar Self-Consumption",
                    Description = "Run your dishwasher, washing machine, and pool pump between 10 AM and 2 PM to use free solar energy instead of drawing from the grid.",
                    Category = "Solar",
                    Impact = "high",
                    Icon = "solar_power",
                    TimeLabel = "10 AM – 2 PM",
                    Saving = "Save R25/day"
                });

                tips.Add(new PersonalisedTip
                {
                    Title = "Charge Devices During Solar Hours",
                    Description = "Charge laptops, phones, and EVs during peak solar production (10 AM–2 PM) to fully eliminate grid reliance for personal devices.",
                    Category = "Electricity",
                    Impact = "medium",
                    Icon = "ev_station",
                    TimeLabel = "10 AM – 2 PM",
                    Saving = "Save R10/day"
                });

                tips.Add(new PersonalisedTip
                {
                    Title = "Solar-Powered Cooking",
                    Description = "Use a solar oven or slow cooker during midday hours to harness free solar energy for meal prep and reduce kitchen electricity use.",
                    Category = "Kitchen",
                    Impact = "low",
                    Icon = "restaurant",
                    TimeLabel = "10 AM – 2 PM",
                    Saving = "Save R5/day"
                });

                tips.Add(new PersonalisedTip
                {
                    Title = "Optimize Solar Panel Output",
                    Description = "Keep panels clean and free from shade during peak hours. Even a small amount of dirt or shadow can reduce efficiency by up to 25%.",
                    Category = "Solar",
                    Impact = "medium",
                    Icon = "cleaning_services",
                    TimeLabel = "10 AM – 2 PM",
                    Saving = "Save R15/day"
                });

                tips.Add(new PersonalisedTip
                {
                    Title = "Use Solar-Powered Outdoor Lighting",
                    Description = "Install solar garden lights to brighten your outdoor spaces without increasing your electricity bill during daylight hours.",
                    Category = "Electricity",
                    Impact = "low",
                    Icon = "park",
                    TimeLabel = "During your active hours",
                    Saving = "Save R3/day"
                });

                tips.Add(new PersonalisedTip
                {
                    Title = "Pre-Cool Your Home with Solar Energy",
                    Description = "Lower your thermostat by 2°C during peak solar hours to pre-cool your home using free solar energy, reducing the need for grid power later.",
                    Category = "Cooling",
                    Impact = "high",
                    Icon = "ac_unit",
                    TimeLabel = "10 AM – 2 PM",
                    Saving = "Save R12/day"
                });
            }

            // Afternoon tips (14–18)
            bool coversAfternoon = (fromHour < 18 && toHour > 14);
            if (coversAfternoon)
            {
                tips.Add(new PersonalisedTip
                {
                    Title = "Raise Thermostat During Afternoon Peak",
                    Description = "Increase your thermostat setting by 1–2°C between 2 PM and 6 PM to cut cooling costs during high-demand hours without sacrificing comfort.",
                    Category = "Cooling",
                    Impact = "high",
                    Icon = "thermostat",
                    TimeLabel = "2 PM – 6 PM",
                    Saving = "Save R15/day"
                });

                tips.Add(new PersonalisedTip
                {
                    Title = "Close Blinds & Curtains",
                    Description = "Blocking afternoon sun reduces indoor temperature by up to 5°C, cutting air-conditioning demand by 20% during the most expensive tariff window.",
                    Category = "Heating",
                    Impact = "medium",
                    Icon = "blinds",
                    TimeLabel = "2 PM – 6 PM",
                    Saving = "Save R8/day"
                });

                tips.Add(new PersonalisedTip
                {
                    Title = "Smart Kitchen Habits",
                    Description = "Use a microwave instead of an oven for small meals. Cover pots while boiling and match pot size to burner to cut kitchen energy use by 20%.",
                    Category = "Kitchen",
                    Impact = "low",
                    Icon = "microwave",
                    TimeLabel = "During your active hours",
                    Saving = "Save R4/day"
                });

                tips.Add(new PersonalisedTip
                {
                    Title = "Use Fans Instead of AC",
                    Description = "Ceiling fans can be more energy-efficient than air conditioning. Use them to circulate air and create a wind-chill effect.",
                    Category = "Cooling",
                    Impact = "medium",
                    Icon = "fan",
                    TimeLabel = "During your active hours",
                    Saving = "Save R10/day"
                });
                tips.Add(new PersonalisedTip
                {
                    Title = "Delay Non-Essential Tasks",
                    Description = "Postpone tasks like ironing, vacuuming, or pool maintenance to after 6 PM when grid demand and rates drop.",
                    Category = "Electricity",
                    Impact = "medium",
                    Icon = "schedule",
                    TimeLabel = "After 6 PM",
                    Saving = "Save R8/day"
                });

                tips.Add(new PersonalisedTip
                {
                    Title = "Use Energy-Efficient Cooking Methods",
                    Description = "Opt for slow cookers, pressure cookers, or microwaves instead of the oven during peak hours to reduce energy consumption.",
                    Category = "Kitchen",
                    Impact = "medium",
                    Icon = "restaurant",
                    TimeLabel = "During your active hours",
                    Saving = "Save R6/day"
                });
            }

            // Evening tips (18–22)
            bool coversEvening = (fromHour < 22 && toHour > 18);
            if (coversEvening)
            {
                tips.Add(new PersonalisedTip
                {
                    Title = "Delay High-Power Appliances",
                    Description = "Avoid running washing machines, dishwashers, or ovens between 6 PM and 8 PM — this is the peak grid window. Shift usage to before 5 PM or after 9 PM.",
                    Category = "Electricity",
                    Impact = "high",
                    Icon = "schedule",
                    TimeLabel = "Avoid 6 PM – 8 PM",
                    Saving = "Save R20/day"
                });

                tips.Add(new PersonalisedTip
                {
                    Title = "Schedule EV Charging Overnight",
                    Description = "Delay EV charging to after 10 PM when grid rates drop significantly. Most EVs can be fully charged by morning at a fraction of the peak-hour cost.",
                    Category = "Electricity",
                    Impact = "high",
                    Icon = "charging_station",
                    TimeLabel = "After 10 PM",
                    Saving = "Save R25/charge"
                });

                tips.Add(new PersonalisedTip
                {
                    Title = "The 5-Minute Shower Challenge",
                    Description = "Reducing shower time to 5 minutes saves up to 15 gallons of hot water per person. Set a timer during your evening routine to cut water heating costs.",
                    Category = "Water",
                    Impact = "medium",
                    Icon = "shower",
                    TimeLabel = "Evening routine",
                    Saving = "Save R6/day"
                });

                    tips.Add(new PersonalisedTip
                    {
                        Title = "Use LED Lighting in the Evening",
                        Description = "Switch to LED bulbs for your evening lighting. They use up to 80% less energy than incandescent bulbs and last 25 times longer.",
                        Category = "Electricity",
                        Impact = "low",
                        Icon = "lightbulb",
                        TimeLabel = "During your active hours",
                        Saving = "Save R4/day"
                    });

                tips.Add(new PersonalisedTip
                {
                    Title = "Unplug Evening Entertainment Devices",
                    Description = "TVs, gaming consoles, and set-top boxes can draw power even when off. Unplug them or use smart power strips to cut phantom energy use during your evening relaxation time.",
                    Category = "Electricity",
                    Impact = "low",
                    Icon = "tv",
                    TimeLabel = "During your active hours",
                    Saving = "Save R5/day"
                });

                tips.Add(new PersonalisedTip
                {
                    Title = "Water Your Garden Wisely",
                    Description = "Water your garden early in the morning or late in the evening to minimize evaporation and reduce water usage.",
                    Category = "Water",
                    Impact = "medium",
                    Icon = "shower",
                    TimeLabel = "During your active hours",
                    Saving = "Save R6/day"
                });
            }

            // Night / late tips (22+)
            if (toHour >= 22)
            {
                tips.Add(new PersonalisedTip
                {
                    Title = "Overnight Appliance Scheduling",
                    Description = "Use 'Delay Start' on your dishwasher and washing machine to run between 11 PM and 5 AM during off-peak tariff windows for maximum savings.",
                    Category = "Laundry",
                    Impact = "medium",
                    Icon = "timer",
                    TimeLabel = "11 PM – 5 AM",
                    Saving = "Save R10/day"
                });

                tips.Add(new PersonalisedTip
                {
                    Title = "Unplug Standby Appliances",
                    Description = "TVs, chargers, and set-top boxes on standby consume up to 10% of your electricity bill. Unplug them or use smart power strips during your active hours.",
                    Category = "Electricity",
                    Impact = "low",
                    Icon = "power_off",
                    TimeLabel = "During your active hours",
                    Saving = "Save R5/day"
                });

                tips.Add(new PersonalisedTip
                {
                    Title = "Use a Smart Thermostat's 'Sleep Mode'",
                    Description = "Set your thermostat to 'Sleep Mode' during the night to raise the temperature by 1–2°C. This can reduce cooling costs by up to 10% without sacrificing comfort while you sleep.",
                    Category = "Cooling",
                    Impact = "medium",
                    Icon = "thermostat",
                    TimeLabel = "During your active hours",
                    Saving = "Save R8/day"
                });

                tips.Add(new PersonalisedTip
                {
                    Title = "Charge Devices Overnight",
                    Description = "Charge your phones, laptops, and other devices overnight to take advantage of lower electricity rates and reduce grid demand during the day.",
                    Category = "Electricity",
                    Impact = "medium",
                    Icon = "ev_station",
                    TimeLabel = "During your active hours",
                    Saving = "Save R5/day"
                });

                tips.Add(new PersonalisedTip
                {
                    Title = "Run Your Dishwasher",
                    Description = "Run your dishwasher during off-peak hours (11 PM–5 AM) to take advantage of lower rates and reduce your electricity bill.",
                    Category = "Laundry",
                    Impact = "medium",
                    Icon = "dishwasher",
                    TimeLabel = "During your active hours",
                    Saving = "Save R3/day"
                });
                
                tips.Add(new PersonalisedTip
                {
                    Title = "Optimize Geyser Settings Overnight",
                    Description = "Set your geyser to heat water during off-peak hours (11 PM–5 AM) to take advantage of lower rates and reduce your electricity bill.",
                    Category = "Water",
                    Impact = "medium",
                    Icon = "water_heater",
                    TimeLabel = "During your active hours",
                    Saving = "Save R10/day"
                });
            }

            int monthlySaving = 14 + (tips.Count * 8);

            return Ok(new ScheduleResponse
            {
                ScheduleSummary = $"{FormatTime(fromHour)} – {FormatTime(toHour)}",
                PotentialSaving = $"R{monthlySaving}/mo",
                TipCount = tips.Count,
                Tips = tips
            });
        }

        private static int ParseHour(string time)
        {
            if (string.IsNullOrWhiteSpace(time)) return 0;
            var parts = time.Split(':');
            return parts.Length > 0 && int.TryParse(parts[0], out int hour) ? hour : 0;
        }

        private static string FormatTime(int hour)
        {
            if (hour == 0) return "12:00 AM";
            if (hour < 12) return $"{hour}:00 AM";
            if (hour == 12) return "12:00 PM";
            return $"{hour - 12}:00 PM";
        }
    }

}


