using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend_NET.Models;

namespace backend_NET.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GreenEnergyController : ControllerBase
    {
        private readonly AppDbContext _context;

        public GreenEnergyController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("stats")]
        public async Task<IActionResult> GetGreenStats()
        {
            var firstUser = await _context.Users.FirstOrDefaultAsync();
            if (firstUser == null)
            {
                return Ok(GetMockStats());
            }

            // Get user's meter readings
            var userReadings = await _context.MeterReadings
                .Where(r => r.User.Id == firstUser.Id)
                .ToListAsync();

            var allReadings = await _context.MeterReadings.ToListAsync();

            // Calculate real percentages from actual data
            var userTotalKWh = userReadings.Sum(r => r.Value);
            var communityTotalKWh = allReadings.Sum(r => r.Value);
            
            // For demo: assume green based on time (you can adjust this formula)
            var userGreenKWh = userReadings.Sum(r => r.Value * 0.7);
            var communityGreenKWh = allReadings.Sum(r => r.Value * 0.65);
            
            var userPercentage = userTotalKWh > 0 ? (userGreenKWh / userTotalKWh) * 100 : 0;
            var communityPercentage = communityTotalKWh > 0 ? (communityGreenKWh / communityTotalKWh) * 100 : 0;

            // Calculate rank - this already exists in your leaderboard logic!
            var userRank = await CalculateUserRank(firstUser.Id);
            var totalUsers = await _context.Users.CountAsync();

            var stats = new GreenEnergyStats
            {
                Community = new CommunityStats
                {
                    Percentage = Math.Round(communityPercentage, 1),
                    Solar = 45.2,
                    Wind = 15.3,
                    Hydro = 8.0,
                    TotalGreen = Math.Round(communityGreenKWh, 1),
                    Total = Math.Round(communityTotalKWh, 1)
                },
                User = new UserStats
                {
                    Percentage = Math.Round(userPercentage, 1),
                    GreenKWh = Math.Round(userGreenKWh, 1),
                    TotalKWh = Math.Round(userTotalKWh, 1),
                    Rank = userRank,
                    TotalUsers = totalUsers,
                    Badge = userPercentage >= 70 ? "Green Leader" : "Eco Warrior",
                    BadgeIcon = userPercentage >= 70 ? "⭐" : "🌱"
                }
            };

            return Ok(stats);
        }

        private async Task<int> CalculateUserRank(Guid userId)
        {
            var allUsers = await _context.Users.ToListAsync();
            var userScores = new List<(Guid Id, double Score)>();

            foreach (var user in allUsers)
            {
                var readings = await _context.MeterReadings
                    .Where(r => r.User.Id == user.Id)
                    .ToListAsync();
                var totalKWh = readings.Sum(r => r.Value);
                var greenKWh = totalKWh * 0.7;
                var score = totalKWh > 0 ? (greenKWh / totalKWh) * 100 : 0;
                userScores.Add((user.Id, score));
            }

            var ordered = userScores.OrderByDescending(u => u.Score).ToList();
            return ordered.FindIndex(u => u.Id == userId) + 1;
        }

        private GreenEnergyStats GetMockStats()
        {
            return new GreenEnergyStats
            {
                Community = new CommunityStats
                {
                    Percentage = 68.5,
                    Solar = 45.2,
                    Wind = 15.3,
                    Hydro = 8.0,
                    TotalGreen = 34250,
                    Total = 50000
                },
                User = new UserStats
                {
                    Percentage = 72.3,
                    GreenKWh = 425.5,
                    TotalKWh = 612.8,
                    Rank = 42,
                    TotalUsers = 247,
                    Badge = "Green Leader",
                    BadgeIcon = "⭐"
                }
            };
        }
    }
}