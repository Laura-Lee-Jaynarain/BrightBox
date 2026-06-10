namespace backend_NET.Models
{
    public interface INotificationRepository
    {
        IEnumerable<Notification> GetNotificationsOf(User user);
        void AddNotification(Notification notification);
        bool RemoveNotification(Guid id);

        bool MarkNotificationAsRead(Guid id);
    }
}
