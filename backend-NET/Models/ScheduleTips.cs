namespace backend_NET.Models
{

    public class ScheduleTips
    {
        public string TimeFrom { get; set; } = "08:00";
        public string TimeTo { get; set; } = "22:00";
    }

    public class PersonalisedTip
    {
        public string Title { get; set; } = "";
        public string Description { get; set; } = "";
        public string Category { get; set; } = "";
        public string Impact { get; set; } = "";
        public string Icon { get; set; } = "";
        public string TimeLabel { get; set; } = "";
        public string Saving { get; set; } = "";
    }

    public class ScheduleResponse
    {
        public string ScheduleSummary { get; set; } = "";
        public string PotentialSaving { get; set; } = "";
        public int TipCount { get; set; }
        public List<PersonalisedTip> Tips { get; set; } = new();
    }

    
}
