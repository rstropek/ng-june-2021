using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace UserManagement.WebApi.Services
{
    public record User(Guid ID, string Name, bool IsAdmin, string Phone);
    public record NewUser(string Name, bool IsAdmin, string Phone);
    public record PatchUser(string? Name = null, bool? IsAdmin = null, string? Phone = null);

    public interface IUserManagementService
    {
        Task<User> Add(NewUser u);
        Task Delete(Guid userId);
        Task<IEnumerable<User>> GetAll();
        Task<IEnumerable<User>> GetFiltered(string nameFilter);
        Task<User?> Patch(Guid userId, PatchUser patch);
    }

    public class UserManagementService : IUserManagementService
    {
        private readonly ConcurrentDictionary<Guid, User> Users = new();

        public UserManagementService()
        {
            var userId = Guid.NewGuid();
            Users[userId] = new(userId, "Batman", true, "+1 999 12345");

            userId = Guid.NewGuid();
            Users[userId] = new(userId, "James T. Kirk", true, "+42 660 12345");

            userId = Guid.NewGuid();
            Users[userId] = new(userId, "Starlight", true, "+49 999 245994");
        }

        public Task<User> Add(NewUser u)
        {
            var userId = Guid.NewGuid();
            var newUser = new User(userId, u.Name, u.IsAdmin, u.Phone);
            return Task.FromResult(Users[userId] = newUser);
        }

        public Task Delete(Guid userId)
        {
            Users.Remove(userId, out var _);
            return Task.CompletedTask;
        }

        public Task<User?> Patch(Guid userId, PatchUser patch)
        {
            if (!Users.ContainsKey(userId)) return Task.FromResult((User?)null);

            var user = Users[userId];

            if (patch.Name != null) user = user with { Name = patch.Name };
            if (patch.IsAdmin.HasValue) user = user with { IsAdmin = patch.IsAdmin.Value };
            if (patch.Phone != null) user = user with { Phone = patch.Phone };

            Users[userId] = user;

            return Task.FromResult((User?)user);
        }

        public Task<IEnumerable<User>> GetAll()
            => Task.FromResult(Users.Values.ToArray().AsEnumerable());

        public Task<IEnumerable<User>> GetFiltered(string nameFilter)
            => Task.FromResult(Users.Values
                .Where(u => u.Name.Contains(nameFilter))
                .ToArray()
                .AsEnumerable());
    }
}
