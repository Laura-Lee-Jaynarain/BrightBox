
using System.Globalization;
using System.Text;
using Microsoft.EntityFrameworkCore;

namespace backend_NET.Models
{
    public class MeterReadingDbRepository : IMeterReadingRepository
    {
        private readonly AppDbContext _context;
        private static readonly Calendar Calendar = CultureInfo.InvariantCulture.Calendar;

        public MeterReadingDbRepository(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<MeterReading> AllReadings
        {
            get
            {
                return _context.MeterReadings.Include(c => c.User);
            }
        }

        public void AddReading(MeterReading reading)
        {
            _context.MeterReadings.Add(reading);
            _context.SaveChanges();
        }

        public MeterReading? GetReadingById(Guid readingId)
        {
            return _context.MeterReadings.FirstOrDefault(r => r.MeterReadingID == readingId);
        }

        public IEnumerable<MeterReading> GetReadingsOf(User user)
        {
            return _context.MeterReadings.Include(r => r.User).Where(r =>  r.User == user).OrderByDescending(r => r.Time);
        }

        public IEnumerable<MeterReading> GetRecentReadingsOf(User user)
        {
            IEnumerable<MeterReading> allReadings = GetReadingsOf(user);
            return allReadings.OrderByDescending(r => r.Time).Take(3);
        }

        public int GetWeekProgress(User user)
        {
            int currentyear = DateTime.Now.Year;
            int currentWeek = Calendar.GetWeekOfYear(DateTime.Now, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);
            IEnumerable<MeterReading> list = _context.MeterReadings
                .Where(r => r.User.Id == user.Id)
                .Where(r => r.Time.Year == currentyear)
                .Where(r => r.Status != Status.REJECTED);
            return list.Where(r => Calendar.GetWeekOfYear(r.Time, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday) == currentWeek).Count();
        }
    }
}
