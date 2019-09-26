using DatingWebApplication.API.Data;
using DatingWebApplication.API.DTO;
using DatingWebApplication.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace DatingWebApplication.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AdminController : ControllerBase
    {
        private readonly DataContext _context;
        private readonly UserManager<User> _userManager;

        public AdminController(DataContext context, UserManager<User> userManager)
        {
            _context = context;
            _userManager = userManager;
        }

        [HttpGet("usersWithRoles")]
        [Authorize(Policy = "AdminRole")]
        public async Task<IActionResult> GetUserWithRoles()
        {
            var users = await _context.Users
                .OrderBy(x => x.UserName)
                .Select(user => new
                {
                    Id = user.Id,
                    UserName = user.UserName,
                    Roles = (from userRole in user.UserRoles join role in _context.Roles on userRole.RoleId equals role.Id select role.Name).ToList()
                }).ToListAsync();
            return Ok(users);
        }

        [HttpGet("photosForModeration")]
        [Authorize(Policy = "PhotoModeratorRole")]
        public IActionResult GetPhotosForModeration() {
            return Ok("Only admins and moderators can access this");
        }

        [HttpPost("editroles/{userName}")]
        public async Task<IActionResult> EditRoles(string userName, RoleEditDTO roleEditDTO)
        {
            var user = await _userManager.FindByNameAsync(userName);
            var userRoles = await _userManager.GetRolesAsync(user);
            var selectedRoles = roleEditDTO.RoleNames;

            selectedRoles = selectedRoles ?? new string[] { };

            var result = await _userManager.AddToRolesAsync(user, selectedRoles.Except(userRoles));
            if(!result.Succeeded)
            {
                return BadRequest("Failed to add roles");
            }

            result = await _userManager.RemoveFromRolesAsync(user, userRoles.Except(selectedRoles));
            if(!result.Succeeded)
            {
                return BadRequest("Failed to remove roles");
            }

            return Ok(await _userManager.GetRolesAsync(user));

        }

    }
}