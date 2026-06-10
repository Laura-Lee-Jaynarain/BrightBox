namespace backend_NET.Models
{
    public class GreenEnergyStats
    {
        public CommunityStats Community { get; set; }
        public UserStats User { get; set; }
    }

    public class CommunityStats
    {
        public double Percentage { get; set; }      // 68.5 = 68.5%
        public double Solar { get; set; }           // 45.2%
        public double Wind { get; set; }            // 15.3%
        public double Hydro { get; set; }           // 8.0%
        public double TotalGreen { get; set; }      // 34250 kWh
        public double Total { get; set; }           // 50000 kWh
    }

    public class UserStats
    {
        public double Percentage { get; set; }      // 72.3%
        public double GreenKWh { get; set; }        // 425.5 kWh
        public double TotalKWh { get; set; }        // 612.8 kWh
        public int Rank { get; set; }               // 42
        public int TotalUsers { get; set; }         // 247
        public string Badge { get; set; }           // "Green Leader"
        public string BadgeIcon { get; set; }       // "⭐"
    }
}
