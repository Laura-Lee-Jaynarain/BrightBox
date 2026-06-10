using Microsoft.AspNetCore.Mvc;
namespace backend_NET.ApiModels
{
    public class EnergyTrendResponseDto
    {
        public List<DailyUsageDto> UserUsage { get; set; } = new();
        public List<DailyUsageDto> CommunityUsage { get; set; } = new();
    }
}
