namespace backend_NET.Models
{
    public interface IMeterReadingRepository
    {
        IEnumerable<MeterReading> AllReadings { get; }
        MeterReading? GetReadingById(Guid readingId);
        IEnumerable<MeterReading> GetReadingsOf(User user);
        IEnumerable<MeterReading> GetRecentReadingsOf(User user);
        void AddReading(MeterReading reading);
        int GetWeekProgress(User user);
    }
}
