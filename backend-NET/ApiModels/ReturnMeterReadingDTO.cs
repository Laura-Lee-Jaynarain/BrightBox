using backend_NET.Models;

namespace backend_NET.ApiModels
{
    public class ReturnMeterReadingDTO
    {
        public double Value { get; set; }
        public DateTime Time {  get; set; }
        public Status status { get; set; }
    }
}
