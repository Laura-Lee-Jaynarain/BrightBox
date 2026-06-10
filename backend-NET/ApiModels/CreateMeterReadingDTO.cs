using backend_NET.Models;

namespace backend_NET.ApiModels
{
    public class CreateMeterReadingDTO
    {
        public Guid UserId { get; set; }
        public double Value { get; set; }
      
        public required IFormFile File { get; set; } 
    }
}
