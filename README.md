# BrightBlock

A web application that helps households track electricity usage and compare their energy efficiency with the community average.

## Features
- User login and registration
- Global/district leaderboard
- Energy Insights
- Scheduled energy tips
- Ai chatbot
- Weather forecast
- Notifications

## Technologies Used
- ASP.NET Core
- Vue.js 3
- SQL Server
- Entity Framework
- Python
- Bcrypt.Net
- JWT
- Sendgrid API
- Google Identity Services

## Installation
1. Clone the repository
2. in the frontend folder:
   - `npm install`
   - `npm install primevue @primevue/themes`
   - `npm install @emailjs/browser`
3. if you don't have docker: in the backend-python folder, run: `pip install --no-cache-dir -r requirements.txt`

### Environment Setup - Authentication
#### Backend — `appsettings.json`

Create or update `backend-NET/appsettings.json` with the following (never commit real keys):

```json
{
  "ConnectionStrings": {
    "DefaultConnection": "Server=localhost\\SQLEXPRESS;Database=BrightBlockDb;Trusted_Connection=True;TrustServerCertificate=True;"
  },
  "JwtSettings": {
    "SecretKey": "YOUR_SECRET_KEY_MIN_32_CHARACTERS",
    "Issuer": "https://localhost:7126",
    "Audience": "http://localhost:5173",
    "ExpirationMinutes": 60
  },
  "EmailSettings": {
    "SendGridApiKey": "YOUR_SENDGRID_API_KEY",
    "FromEmail": "your-verified-sender@gmail.com",
    "FromName": "BrightBlock"
  }
}
```

## Start-up
1. Backend (main application): 
   - open `backend-NET.sln` in Visual Studio
   - in the package management console, run `update-database`
   - run the application
2. Backend (solar forecast):
   - if using docker: run `docker compose up -d` in the main directory
   - if not using docker: run `uvicorn main:app --reload --port 9876` in the backend-python directory
4. Frontend: run `npm run dev` in the frontend directory
5. Surf to [http://localhost:5713/](http://localhost:5173/)

## Authors
- Donya Pretorius
- Arnout Coenegrachts
- Laura-Lee Jaynarain
- Elcke Van Der Berg
- Oreatlile Seletisha
