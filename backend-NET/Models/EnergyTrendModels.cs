using System;
using System.Collections.Generic;

namespace backend_NET.Models
{
    public class EnergyTrendData
    {
        // Initialize lists to avoid null reference warnings
        public List<DailyUsage> UserUsage { get; set; } = new List<DailyUsage>();

        public List<DailyUsage> CommunityUsage { get; set; } = new List<DailyUsage>();
    }

    public class DailyUsage
    {
        public string Day { get; set; } = string.Empty;

        public double KWh { get; set; }

        public DateTime Date { get; set; }
    }
}