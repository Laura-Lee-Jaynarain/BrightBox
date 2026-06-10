using System.Text;
using System.Text.Json.Serialization;
using backend_NET.Models;
using backend_NET.Models.MapperProfiles;
using backend_NET.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

var builder = WebApplication.CreateBuilder(args);

// JWT Configuration
var jwtSettings = new JwtSettings();
builder.Configuration.Bind("JwtSettings", jwtSettings);

// Fallback in case binding fails
if (string.IsNullOrWhiteSpace(jwtSettings.SecretKey))
{
    jwtSettings.SecretKey = "SuperSecretKeyForDevelopmentAtLeast32CharactersLong123!";
    jwtSettings.Issuer = "https://localhost:7126";
    jwtSettings.Audience = "http://localhost:5173";
}

builder.Services.AddSingleton(jwtSettings);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
    options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
})
.AddJwtBearer(options =>
{
    options.TokenValidationParameters = new TokenValidationParameters
    {
        ValidateIssuer = true,
        ValidateAudience = true,
        ValidateLifetime = true,
        ValidateIssuerSigningKey = true,
        ValidIssuer = jwtSettings.Issuer,
        ValidAudience = jwtSettings.Audience,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings.SecretKey)),
        ClockSkew = TimeSpan.Zero
    };
});

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend", policy =>
    {
        policy.WithOrigins("http://localhost:5173", "http://localhost:5174", "http://localhost:5175", "http://localhost:5176")
              .AllowAnyHeader()
              .AllowAnyMethod()
              .AllowCredentials();
    });
});


builder.Services.AddAutoMapper(cfg =>
{
    cfg.AddProfile<MeterReadingProfile>();
    cfg.AddProfile<NotificationProfile>();
});

// Database
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Repositories
builder.Services.AddScoped<IMeterReadingRepository, MeterReadingDbRepository>(); //
builder.Services.AddScoped<IUserRepository, UserDbRepository>();
builder.Services.AddScoped<INotificationRepository, NotificationDbRepository>();

// Email Service
builder.Services.AddScoped<IEmailService, EmailService>();

// Controllers
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.ReferenceHandler = ReferenceHandler.IgnoreCycles;
    });

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.Use(async (context, next) =>
{
    context.Response.Headers["Cross-Origin-Opener-Policy"] = "same-origin-allow-popups";
    await next();
});
app.UseCors("AllowFrontend");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

DbInitializer.Seed(app);

app.Run();