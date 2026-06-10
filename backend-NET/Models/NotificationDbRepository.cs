
using Microsoft.EntityFrameworkCore;

namespace backend_NET.Models
{
    public class NotificationDbRepository : INotificationRepository
    {
        private readonly AppDbContext _context;
        
        public NotificationDbRepository(AppDbContext context)
        {
            _context = context;
        }


        public void AddNotification(Notification notification)
        {
            _context.Notifications.Add(notification);
            _context.SaveChanges();
        }

        public IEnumerable<Notification> GetNotificationsOf(User user)
        {
            return _context.Notifications.Include(n => n.User).Where(n => n.User == user).OrderByDescending(n => n.Date);
        }

        public bool MarkNotificationAsRead(Guid id)
        {
            Notification? notif = _context.Notifications.Where(n => n.Id == id).FirstOrDefault();
            if (notif != null)
            {
                notif.Read = true;
                _context.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
            
        }

        public bool RemoveNotification(Guid id)
        {
            Notification? notif = _context.Notifications.Where(n => n.Id == id).FirstOrDefault();
            if (notif != null)
            {
                _context.Notifications.Remove(notif);
                _context.SaveChanges();
                return true;
            }
            else
            {
                return false;
            }
        }
    }
}
