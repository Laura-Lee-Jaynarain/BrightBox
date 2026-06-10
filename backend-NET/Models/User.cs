namespace backend_NET.Models
{
    public class User
    {
        public Guid Id { get; set; }
        public string FullName { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string PasswordHash { get; set; } = string.Empty;
        public string? ResetToken { get; set; }
        public DateTime? ResetTokenExpiry { get; set; }
        
        public int? PostalCode { get; set; }
        public int? HouseHoldSize { get; set; } = 1;

        public static User CreateNewUser(string FullName, string Email, string Passwordhash, int PostalCode, int HouseHoldSize)
        {
            User newUser = new User();
            newUser.Id = Guid.NewGuid();
            newUser.FullName = FullName;
            newUser.Email = Email;
            newUser.PasswordHash = Passwordhash;
            newUser.PostalCode = PostalCode;
            newUser.HouseHoldSize = HouseHoldSize;
            return newUser;
        }
    }
}