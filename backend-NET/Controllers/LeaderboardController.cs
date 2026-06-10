
using backend_NET.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace backend_NET.Controllers
{
    [ApiController]
    [Route("api/leaderboard")]
    public class LeaderboardController : ControllerBase
    {
        private readonly AppDbContext _db;

        public LeaderboardController(AppDbContext db)
        {
            _db = db;
        }
        private async Task<List<HouseholdEntry>> BuildRankedList(int? postalCode = null)
        {
            var readings = await _db.MeterReadings.Where(m => m.Status == Status.VERIFIED)
                .Select(m => new
                {
                    UserId = m.User.Id,
                    m.User.FullName,
                    PostalCode = m.User.PostalCode ?? 0,
                    UserHouseholdSize = m.User.HouseHoldSize,
                    m.Time,
                    m.Value,
                    m.HouseholdSize,
                }).ToListAsync();

            var filtered = postalCode.HasValue
                ? readings.Where(m => m.PostalCode == postalCode.Value).ToList()
                : readings;

            var ranked = filtered.GroupBy(m => m.UserId)
                .Select(g =>
                {
                    var latest = g.OrderByDescending(m => m.Time).First();
                    var size = latest.HouseholdSize > 0 ? latest.HouseholdSize : (latest.UserHouseholdSize.HasValue && latest.UserHouseholdSize.Value > 0) ? latest.UserHouseholdSize.Value : 1;
                    return new HouseholdEntry
                    {
                        HouseholdId = latest.UserId,
                        UserName = latest.FullName,
                        PostalCode = latest.PostalCode,
                        Value = latest.Value,
                        HouseholdSize = size,
                        EnergyPerPerson = Math.Round(latest.Value / size, 2)
                    };
                }).OrderBy(h => h.EnergyPerPerson).ToList();

            for (int i = 0; i < ranked.Count; i++)
                ranked[i].Rank = i + 1;

            return ranked;
        }


        // GET /api/leaderboard?postalCode
        [HttpGet]
        public async Task<IActionResult> GetLeaderboard([FromQuery] int? postalCode = null)
        {
            var ranked = await BuildRankedList(postalCode);

            double communityAverage = ranked.Any() ? Math.Round(ranked.Average(h => h.EnergyPerPerson), 2) : 0;

            return Ok(new LeaderboardResponse
            {
                TopHouseholds = ranked.Take(50).ToList(),
                CommunityAverage = communityAverage
            });
        }

        // GET /api/leaderboard/streak/{userId}
        [HttpGet("streak/{userId}")]
        public async Task<IActionResult> GetUserStreak(Guid userId)
        {
            var allVerified = await _db.MeterReadings.Where(m => m.Status == Status.VERIFIED)
            .Select(m => new
            {
                UserId = m.User.Id,
                UserHouseholdSize = m.User.HouseHoldSize,
                m.Time,
                m.Value,
                m.HouseholdSize,
            }).ToListAsync();

            var userReadings = allVerified.Where(m => m.UserId == userId).ToList();

            if (!userReadings.Any())
                return Ok(new Dictionary<string, bool>());

            var allByMonth = allVerified
                .GroupBy(m => new { m.Time.Year, m.Time.Month })
                .ToDictionary(g => g.Key, g => g.ToList());

            var history = new Dictionary<string, bool>();

            foreach (var userMonth in userReadings.GroupBy(m => new { m.Time.Year, m.Time.Month }))
            {
                var key = $"{userMonth.Key.Year}-{userMonth.Key.Month:D2}";

                double communityMonthAvg = 0;
                if (allByMonth.TryGetValue(userMonth.Key, out var monthReadings))
                {
                    communityMonthAvg = monthReadings.GroupBy(m => m.UserId)
                        .Select(g => g.Average(m =>
                        {
                            var s = m.HouseholdSize > 0 ? m.HouseholdSize : (m.UserHouseholdSize.HasValue && m.UserHouseholdSize.Value > 0) ? m.UserHouseholdSize.Value : 1;
                            return m.Value / s;
                        })).DefaultIfEmpty(0).Average();
                }

                var userMonthAvg = userMonth.Average(m =>
                {
                    var s = m.HouseholdSize > 0 ? m.HouseholdSize : (m.UserHouseholdSize.HasValue && m.UserHouseholdSize.Value > 0) ? m.UserHouseholdSize.Value : 1;
                    return m.Value / s;
                });

                history[key] = userMonthAvg <= communityMonthAvg;
            }

            return Ok(history);
        }

        // GET /api/leaderboard/user/userId
        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserRank(Guid userId)
        {
            var ranked = await BuildRankedList();

            var user = ranked.FirstOrDefault(h => h.HouseholdId == userId);
            if (user == null)
                return NotFound(new { message = "User not found or has no approved readings." });

            double communityAverage = ranked.Any() ? Math.Round(ranked.Average(h => h.EnergyPerPerson), 2) : 0;

            return Ok(new UserRankResponse
            {
                Rank = user.Rank,
                IsInTopFifty = user.Rank <= 50,
                IsBelowCommunityAverage = user.EnergyPerPerson <= communityAverage,
                EnergyPerPerson = user.EnergyPerPerson,
                CommunityAverage = communityAverage,
                HouseholdData = user
            });
        }
    }
}