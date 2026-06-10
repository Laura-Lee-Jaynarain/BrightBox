using backend_NET.Models;

namespace backend_NET.ApiModels
{
    public class GetMeterInfoDTO
    {
        public int Target { get; set; } = 7;
        public int Progress { get; set; }
        public IEnumerable<ReturnMeterReadingDTO>? RecentSubmissions { get; set; }
    }
}
