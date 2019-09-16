using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DatingWebApplication.API.Helpers;
using DatingWebApplication.API.Models;
using Microsoft.EntityFrameworkCore;

namespace DatingWebApplication.API.Data
{
    public class DatingRepository : IDatingRepository
    {
        private readonly DataContext _context;
        public DatingRepository(DataContext context)
        {
            _context = context;
        }

        public void Add<T>(T entity) where T : class
        {
            _context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            _context.Remove(entity);
        }

        public async Task<Like> GetLike(int userId, int reiepientId)
        {
            return await _context.Likes.FirstOrDefaultAsync(u => u.LikerId == userId && u.LikeeId == reiepientId);
        }

        public async Task<Message> GetMessage(int id)
        {
            return await _context.Messages.FirstOrDefaultAsync(u => u.Id == id);
        }

        public async Task<PagedList<Message>> GetMessageForUser(MessageParam messageParam)
        {
            var messages = _context.Messages.AsQueryable();

            switch (messageParam.MessageContainer)
            {
                case "Inbox":
                    messages = messages.Where(u => u.RecipientId == messageParam.UserId  && u.RecipientDeleted==false);
                    break;
                case "Outbox":
                    messages = messages.Where(u => u.SenderId == messageParam.UserId && u.SenderDeleted==false);
                    break;
                default:
                    messages = messages.Where(u => u.RecipientId == messageParam.UserId 
                    && u.IsRead == false && u.RecipientDeleted==false);
                    break;
            }

            messages = messages.OrderByDescending(d => d.MessageSent);
            return await PagedList<Message>.CreateAsync(messages, messageParam.PageNumber, messageParam.PageSize);
        }

        public async Task<IEnumerable<Message>> GetMessageThread(int userId, int recipientId)
        {
            var messages = await _context.Messages          
                .Where(m => m.RecipientId == userId && m.RecipientDeleted == false && m.SenderId == recipientId ||
                 m.RecipientId == recipientId && m.SenderId == userId && m.SenderDeleted==false)
                 .OrderByDescending(m => m.MessageSent).ToListAsync();

            return messages;
        }

        public async Task<Photo> GetPhoto(int id)
        {
            var photo = await _context.Photos.FirstOrDefaultAsync(p => p.Id == id);
            return photo;
        }

        public async Task<User> GetUser(int id)
        {
            var user = await _context.Users.FirstOrDefaultAsync(e => e.Id == id);
            return user;
        }

        public async Task<Photo> GetUserMainPhoto(int id)
        {
            return await _context.Photos.Where(u => u.UserId == id).FirstOrDefaultAsync(p => p.IsMain);
        }

        public async Task<PagedList<User>> GetUsers(UserParams userParams)
        {
            var users = _context.Users.OrderByDescending(u => u.LastActive).AsQueryable();
            users = users.Where(u => u.Id != userParams.UserId);
            users = users.Where(u => u.Gender == userParams.Gender);

            if (userParams.Likers)
            {
                var usersLikers = await GetUserLikes(userParams.UserId, userParams.Likers);
                users = users.Where(u => usersLikers.Contains(u.Id));
            }

            if (userParams.Likees)
            {
                var usersLikees = await GetUserLikes(userParams.UserId, userParams.Likers);
                users = users.Where(u => usersLikees.Contains(u.Id));
            }

            if (userParams.MinAge != 18 || userParams.MaxAge != 99)
            {
                var minDob = DateTime.Today.AddYears(-userParams.MaxAge - 1);
                var maxDob = DateTime.Today.AddYears(-userParams.MinAge);
                users = users.Where(u => u.DateOfBirth >= minDob && u.DateOfBirth <= maxDob);
            }

            if (!string.IsNullOrEmpty(userParams.OrderBy))
            {
                switch (userParams.OrderBy)
                {
                    case "created":
                        users = users.OrderByDescending(u => u.Created);
                        break;
                    default:
                        users = users.OrderByDescending(u => u.LastActive);
                        break;
                }
            }

            return await PagedList<User>.CreateAsync(users, userParams.PageNumber, userParams.PageSize);
        }

        public async Task<bool> SaveAll()
        {
            return await _context.SaveChangesAsync() > 0 ? true : false;
        }

        private async Task<IEnumerable<int>> GetUserLikes(int id, bool likers)
        {
            var user = await _context.Users.FirstOrDefaultAsync(u => u.Id == id);

            if (likers)
            {
                return user.Likers.Where(i => i.LikeeId == id).Select(i => i.LikerId);
            }
            else
            {
                return user.Likees.Where(i => i.LikerId == id).Select(i => i.LikeeId);
            }

        }
    }
}
