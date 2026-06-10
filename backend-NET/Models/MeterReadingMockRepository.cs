
using System.Globalization;
using Microsoft.EntityFrameworkCore;

namespace backend_NET.Models
{
    public class MeterReadingMockRepository : IMeterReadingRepository
    {
        private static readonly Calendar Calendar = CultureInfo.InvariantCulture.Calendar;
        private List<MeterReading> _readings = new List<MeterReading>();

        public MeterReadingMockRepository(IUserRepository userRepository) {
            User user = userRepository.GetUser(new Guid());

            int endValue = 123456;
            byte[] meterImage = new byte[1];
            DateTime endDate = DateTime.Now.AddDays(-1);
            int n = 30;
            List<int> invalid = new List<int> { 3, 7, 11, 14, 17, 23 };
            Status status;
            int value;
            for (int i = 0; i < n; i++)
            {
                if (invalid.Contains(i)) {
                    status = Status.REJECTED;
                    value = i;
                }
                else
                {
                    value = endValue - 1;
                    if (i < 5)
                    {
                        status = Status.PENDING;
                    }
                    else
                    {
                        status = Status.VERIFIED;
                    }
                }

                _readings.Add(new MeterReading()
                {
                    MeterReadingID = new Guid(),
                    User = user,
                    Time = endDate.AddDays(-i),
                    Value = value,
                    MeterImage = meterImage,
                    Status = status
                });
            }
        }
        public IEnumerable<MeterReading> AllReadings
        {
            get
            {
                return _readings;
            }
        }

        public void AddReading(MeterReading reading)
        {
            _readings.Add(reading);
        }

        public MeterReading? GetReadingById(Guid readingId)
        {
            return _readings.Where(r => r.MeterReadingID.Equals(readingId)).FirstOrDefault();
        }

        public IEnumerable<MeterReading> GetReadingsOf(User user)
        {
            return _readings.OrderByDescending(r => r.Time);
        }

        public IEnumerable<MeterReading> GetRecentReadingsOf(User user)
        {
            return _readings.OrderByDescending(r => r.Time).Take(3);
        }

        public int GetWeekProgress(User user)
        {
            int currentyear = DateTime.Now.Year;
            int currentWeek = Calendar.GetWeekOfYear(DateTime.Now, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday);
            return _readings
                .Where(r => r.Time.Year == currentyear)
                .Where(r => Calendar.GetWeekOfYear(r.Time, CalendarWeekRule.FirstFourDayWeek, DayOfWeek.Monday) == currentWeek)
                .Where(r => r.Status != Status.REJECTED)
                .Count();
        }
    }
}
