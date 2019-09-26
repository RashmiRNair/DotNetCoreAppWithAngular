using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using DatingWebApplication.API.Data;
using DatingWebApplication.API.DTO;
using DatingWebApplication.API.Helpers;
using DatingWebApplication.API.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace DatingWebApplication.API.Controllers
{   
    [Route("api/[controller]")]
    [ApiController]
    [ServiceFilter(typeof(LogUserActivity))]
    public class UsersController : ControllerBase
    {
        private readonly IDatingRepository _repository;
        private readonly IMapper _mapper;

        public UsersController(IDatingRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> GetUsers([FromQuery]UserParams userParams )
        {
            var currentUserId = int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value);
            var userFromRepo = await _repository.GetUser(currentUserId);

            userParams.UserId = currentUserId;
            if (string.IsNullOrEmpty(userParams.Gender))
            {
                userParams.Gender = userFromRepo.Gender == "male" ? "female" : "male";
            }

            var users = await _repository.GetUsers(userParams);
            var usersToReturn = _mapper.Map<IEnumerable<UserForListDTO>>(users);

            Response.AddPaginationHeaders(users.CurrentPage, users.PageSize, users.TotalCount, users.TotalPages);
            return Ok(usersToReturn);
        }

        [HttpGet("{id}", Name = "GetUser")]
        public async Task<IActionResult> GetUser(int id)
        {
            var user = await _repository.GetUser(id);
            var userToReturn = _mapper.Map<UserForDetailDTO>(user);
            return Ok(userToReturn);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, UserForEditDTO userToEdit)
        {
            if(id!=int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var userfromRepo = await _repository.GetUser(id);
            _mapper.Map(userToEdit, userfromRepo);

            if (await _repository.SaveAll())
                return NoContent();

            throw new Exception($"Updating user with {id} failed on save");

        }


        [HttpPost("{id}/like/{recipientId}")]
        public async Task<IActionResult> LikeUser(int id, int recipientId)
        {
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value))
                return Unauthorized();

            var like = await _repository.GetLike(id, recipientId);

            if (like != null)
            {
                return BadRequest("You already like this person");
            }

            var recipientUser=  await _repository.GetUser(recipientId);
            if (recipientUser == null)
            {
                return NotFound();
            }

            like = new Like
            {
                LikerId = id,
                LikeeId = recipientId
            };

            _repository.Add<Like>(like);
            if (await _repository.SaveAll())
                return Ok();

            return BadRequest("Failed to like user");

        }


    }


}