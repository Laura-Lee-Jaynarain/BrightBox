using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend_NET.Models;

namespace backend_NET.Models
{
    
    public class HouseholdEntry
    {
        public Guid HouseholdId { get; set; }
        public string UserName { get; set; } = string.Empty;
        public int PostalCode { get; set; }
        public double Value { get; set; }
        public int HouseholdSize { get; set; }
        public double EnergyPerPerson { get; set; }
        public int Rank { get; set; }
        public string? ProfileImageUrl { get; set; }
    }

    public class LeaderboardResponse
    {
        public List<HouseholdEntry> TopHouseholds { get; set; } = new();
        public double CommunityAverage { get; set; }
    }

    public class UserRankResponse
    {
        public int Rank { get; set; }
        public bool IsInTopFifty { get; set; }
        public bool IsBelowCommunityAverage { get; set; }
        public double EnergyPerPerson { get; set; }
        public double CommunityAverage { get; set; }
        public HouseholdEntry? HouseholdData { get; set; }
    }
}

