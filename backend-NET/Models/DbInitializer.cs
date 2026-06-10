using System.Text;

namespace backend_NET.Models
{
    public class DbInitializer
    {
        public static void Seed(IApplicationBuilder applicationBuilder)
        {
            AppDbContext context = applicationBuilder
                .ApplicationServices
                .CreateScope()
                .ServiceProvider
                .GetRequiredService<AppDbContext>();

            if (!context.Users.Any() && !context.MeterReadings.Any())
            {
                Console.WriteLine("Seeding database...");
                Console.WriteLine("Seeding users...");

                var userParser = new Microsoft.VisualBasic.FileIO.TextFieldParser("userdata.csv");
                userParser.TextFieldType = Microsoft.VisualBasic.FileIO.FieldType.Delimited;
                userParser.SetDelimiters(",");

                Dictionary<int, int> userCounter = new Dictionary<int, int>();
                Dictionary<int, List<User>> userDict = new Dictionary<int, List<User>>();
                Dictionary<User, double> valueDict = new Dictionary<User, double>();
                Dictionary<User, int> dateCounter = new Dictionary<User, int>();

                for (int i = 1; i <= 6; i++)
                {
                    userCounter[i] = 0;
                    userDict[i] = new List<User>();
                }

                while (!userParser.EndOfData)
                {
                    string[] row = userParser.ReadFields();

                    if (row != null)
                    {
                        if (row[0].Equals("full_name"))
                        {
                            continue;
                        }

                        string fullName = row[0];
                        string email = row[1].Trim().ToLower();
                        string passwordHash = BCrypt.Net.BCrypt.HashPassword(row[2]);

                        int postalCode = Convert.ToInt16(row[3]);
                        int householdSize = Convert.ToInt16(row[4]);
                        if (!context.Users.Any(u => u.Email == email))
                        {
                            User newUser = User.CreateNewUser(fullName, email, passwordHash, postalCode, householdSize);
                            userDict[householdSize].Add(newUser);
                            valueDict[newUser] = 0;
                            dateCounter[newUser] = 0;
                            context.Add(newUser);
                        }
                    }
                }

                Console.WriteLine("Finished seeding users");
                context.SaveChanges();

                Console.WriteLine("Seeding readings...");

                var meterReadingParser = new Microsoft.VisualBasic.FileIO.TextFieldParser("household_energy_consumption.csv");
                meterReadingParser.TextFieldType = Microsoft.VisualBasic.FileIO.FieldType.Delimited;
                meterReadingParser.SetDelimiters(",");
                 string houseId = "";

                while (!meterReadingParser.EndOfData)
                {
                    string[] row = meterReadingParser.ReadFields();
                   

                    if (row != null)
                    {
                        if (row[2].Equals("Energy_Consumption_kWh"))
                        {
                            continue;
                        }

                        double value = Convert.ToDouble(
    row[2]
        .Replace("'", "")
        .Trim(),
    System.Globalization.CultureInfo.InvariantCulture
);
                        int householdSize = Convert.ToInt16(row[3]);

                        if (!houseId.Equals(row[0]))
                        {
                            houseId = row[0];

                            userCounter[householdSize] += 1;

                            if (userCounter[householdSize] >= userDict[householdSize].Count)
                            {
                                userCounter[householdSize] = 0;
                            }
                        }

                        int index = userCounter[householdSize];
                        User user = userDict[householdSize][index];

                        if (valueDict[user] == 0)
                        {
                            valueDict[user] = 12345 * value;
                        }

                        valueDict[user] -= value;
                        dateCounter[user] -= 1;

                        Status status = dateCounter[user] > -6
                            ? Status.PENDING
                            : Status.VERIFIED;

                        MeterReading newMeterReading = MeterReading.CreateMeterReading(
                            user,
                            DateTime.Today.AddDays(dateCounter[user]),
                            valueDict[user],
                            status,
                            user.HouseHoldSize ?? 1
                        );

                        context.MeterReadings.Add(newMeterReading);
                    }
                }

                Console.WriteLine("Finished seeding readings");
                context.SaveChanges();

                Console.WriteLine("Finished seeding data");
            }
        }
    }
}