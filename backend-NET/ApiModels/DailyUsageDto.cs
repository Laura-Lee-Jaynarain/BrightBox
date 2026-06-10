namespace backend_NET.ApiModels
{
    public class DailyUsageDto
    {
        public string Day { get; set; } = "";
        public double KWh { get; set; }
        public DateTime Date { get; set; }
    }
}
