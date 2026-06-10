using MetadataExtractor;
using MetadataExtractor.Formats.Exif;

namespace backend_NET.Models
{
    public class MeterReading
    {
        public Guid MeterReadingID { get; set; }
        public User User { get; set; } = default!;
        public DateTime Time { get; set; }
        public double Value { get; set; }

        public int HouseholdSize { get; set; }

        public byte[]? MeterImage { get; set; }

        public Status Status { get; set; }

        public static DateTime ExtractTimestamp(byte[] image)
        {
            using var ms = new MemoryStream(image);
            var directories = ImageMetadataReader.ReadMetadata(ms);

            var subIfd = directories.OfType<ExifSubIfdDirectory>().FirstOrDefault();

            if (subIfd == null) { return DateTime.UtcNow; }

            if (subIfd.TryGetDateTime(ExifDirectoryBase.TagDateTimeOriginal, out var date))
                return date;
            return DateTime.UtcNow;
        }

        public static MeterReading CreateMeterReading(User user, DateTime time, double value, Status status, int householdsize)
        {
            MeterReading newReading = new MeterReading();
            newReading.User = user;
            newReading.Time = time;
            newReading.Value = value;
            newReading.Status = status;
            newReading.HouseholdSize = householdsize;
            return newReading;
        }
    }
}
