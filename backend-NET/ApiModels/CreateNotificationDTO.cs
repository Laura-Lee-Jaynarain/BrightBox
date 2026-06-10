using backend_NET.Models;

namespace backend_NET.ApiModels
{
    public class CreateNotificationDTO
    {
        public Guid UserId { get; set; }
        public DateTime Date { get; set; }
        public string Title { get; set; } = "";
        public string Body { get; set; } = "";
        public bool Read { get; set; } = false;
        public NotificationType Type { get; set; }
    }
}
