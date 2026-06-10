namespace backend_NET.Models
{
    public interface IUserRepository
    {
        // Existing method
        User? GetUser(Guid userId);

        // New methods for Auth
        Task<User?> GetByEmailAsync(string email);
        Task<bool> EmailExistsAsync(string email);
        Task AddAsync(User user);
        Task SaveChangesAsync();
        Task<User?> GetByResetTokenAsync(string token);
    }
}