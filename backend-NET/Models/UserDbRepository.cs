using Microsoft.EntityFrameworkCore;

namespace backend_NET.Models
{
    public class UserDbRepository : IUserRepository
    {
        private readonly AppDbContext _context;

        public UserDbRepository(AppDbContext context)
        {
            _context = context;
        }

        public User? GetUser(Guid userId)
        {
            return _context.Users.Find(userId);
        }

        public async Task<User?> GetByEmailAsync(string email)
        {
            return await _context.Users
                .Where(u => u.Email == email)
                .OrderBy(u => u.Id)
                .FirstOrDefaultAsync();
        }

        public async Task<bool> EmailExistsAsync(string email)
        {
            return await _context.Users.AnyAsync(u => u.Email == email);
        }

        public async Task AddAsync(User user)
        {
            await _context.Users.AddAsync(user);
        }

        public async Task SaveChangesAsync()
        {
            await _context.SaveChangesAsync();
        }

        public async Task<User?> GetByResetTokenAsync(string token)
        {
            return await _context.Users
                .FirstOrDefaultAsync(u => u.ResetToken == token);
        }
    }
}