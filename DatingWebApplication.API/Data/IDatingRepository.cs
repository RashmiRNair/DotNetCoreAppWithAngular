using DatingWebApplication.API.Helpers;
using DatingWebApplication.API.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace DatingWebApplication.API.Data
{
  public  interface IDatingRepository
    {
        void Add<T>(T entity) where T : class;

        void Delete<T>(T entity) where T : class;

        Task<bool> SaveAll();

        Task<PagedList<User>> GetUsers(UserParams userParams);

        Task<User> GetUser(int id);

        Task<Photo> GetPhoto(int id);

        Task<Photo> GetUserMainPhoto(int id);

        Task<Like> GetLike(int userId, int recipientId);

        Task<Message> GetMessage(int id);

        Task<PagedList<Message>> GetMessageForUser(MessageParam messageParam);

        Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId);
    }
}
