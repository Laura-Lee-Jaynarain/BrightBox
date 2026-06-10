
namespace backend_NET.Models
{
    public class UserMockRepository : IUserRepository
    {
        private List<User> _users;
        public UserMockRepository() { 
            _users = new List<User>();
            User user = new User();
            user.Id = new Guid();
            _users.Add(user);
        }

        public Task AddAsync(User user)
        {
            throw new NotImplementedException();
        }

        public Task<bool> EmailExistsAsync(string email)
        {
            throw new NotImplementedException();
        }

        public Task<User?> GetByEmailAsync(string email)
        {
            throw new NotImplementedException();
        }

        public Task<User?> GetByResetTokenAsync(string token)
        {
            throw new NotImplementedException();
        }

        public User GetUser(Guid userId)
        {
            return _users[0];
        }

        public Task SaveChangesAsync()
        {
            throw new NotImplementedException();
        }
    }
}
