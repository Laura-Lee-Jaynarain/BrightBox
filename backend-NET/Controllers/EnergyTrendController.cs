using Microsoft.AspNetCore.Mvc;
using backend_NET.Models;
using backend_NET.ApiModels;

namespace backend_NET.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class EnergyTrendController : ControllerBase
    {
        private readonly AppDbContext _context;

        public EnergyTrendController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("trends")]
        public ActionResult<EnergyTrendResponseDto> GetEnergyTrends()
        {
            var random = new Random();
            var firstUser = _context.Users.FirstOrDefault();

            if (firstUser == null)
            {
                return NotFound();
            }

            var userUsage = _context.MeterReadings
                .Where(m => m.User.Id == firstUser.Id)
                .OrderBy(m => m.Time)
                .Take(7)
                .ToList()
                .Select(m => new DailyUsageDto
                {
                    Day = m.Time.ToString("ddd"),
                    KWh = m.Value + (random.NextDouble() * 20 - 10),
                    Date = m.Time
                })
                .ToList();

            var communityUsage = _context.MeterReadings
                .GroupBy(m => m.Time.Date)
                .Select(g => new
                {
                    Date = g.Key,
                    Total = g.Sum(x => x.Value)
                })
                .OrderBy(x => x.Date)
                .Take(7)
                .ToList()
                .Select(g => new DailyUsageDto
                {
                    Day = g.Date.ToString("ddd"),
                    KWh = g.Total + (random.NextDouble() * 200 - 100),
                    Date = g.Date
                })
                .ToList();

            return Ok(new EnergyTrendResponseDto
            {
                UserUsage = userUsage,
                CommunityUsage = communityUsage
            });
        }
    }
}