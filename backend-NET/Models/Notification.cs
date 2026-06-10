namespace backend_NET.Models
{
    public class Notification
    {
        public Guid Id { get; set; }
        public User User { get; set; }
        public DateTime Date { get; set; }
        public string Title { get; set; } = "";
        public string Body { get; set; } = "";
        public bool Read { get; set; } = false;
        public NotificationType Type { get; set; }

        public static Notification CreateNewNotification(User user, string Title, string Message, NotificationType Type)
        {
            Notification newNotif = new Notification();
            newNotif.Id = Guid.NewGuid();
            newNotif.User = user;
            newNotif.Title = Title;
            newNotif.Body = Message;
            newNotif.Type = Type;
            newNotif.Date = DateTime.Now;
            return newNotif;
        }
    }
}
