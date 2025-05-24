using Microsoft.AspNetCore.Mvc;
using System.Security.Cryptography;
using System.Text;
using UserManage_Amdt_ilham_Api.DomainEntity;
using UserManage_Amdt_ilham_Api.DTOs;
using UserManage_Amdt_ilham_Api.Interfaces;
using UserManage_Amdt_ilham_Api.Services;

namespace UserManage_Amdt_ilham_Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserManageController : Controller
    {
        private readonly IUserMangeRepository _userMangeRepository;
        private ITokenService _tokenService;

        public UserManageController(IUserMangeRepository userMangeRepository, ITokenService tokenService)
        {
            _userMangeRepository = userMangeRepository;
            _tokenService = tokenService;
        }

        private async Task<bool> UserExists(string username)
        {
            return await _userMangeRepository.CheckUserEmailExist(username);
        }

        //Register
        [HttpPost("register")]
        public async Task<ActionResult<AppUserDTO>> Register(RegisterDTO registerDto)
        {

            if (await UserExists(registerDto.Username)) return BadRequest("Username is taken");

            using var sha256 = SHA256.Create();
            var hashedPassword = Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password)));

            var user = new UserDTO
            {
                Email = registerDto.Username.ToLower(),
                Password = hashedPassword,  // Store hashed password
                FirstName = registerDto.FirstName,
                LastName = registerDto.LastName,
                DateOfBirth = registerDto.DateOfBirth
            };


            string firstName = await _userMangeRepository.AddUserDetailsAsync(user);


            return new AppUserDTO
            {
                Username = user.Email,
                Token = _tokenService.CreateToken(user)
            };
        }

        //Login
        [HttpPost("login")]
        public async Task<ActionResult<AppUserDTO>> Login(LoginDTO loginDto)
        {
            var user = await _userMangeRepository.GetUserByEmailAsync(loginDto.Username);

            if (user == null) return Unauthorized("Invalid username");

            using var sha256 = SHA256.Create();
            var computedHash = Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password)));

            if (user.Password != computedHash)
                return Unauthorized("Invalid password");


            return new AppUserDTO
            {
                Username = user.Email,
                Token = _tokenService.CreateToken(user)
            };
        }




        //User CRUD
        [HttpPost("adduser")]
        public async Task<IActionResult> AddUser([FromBody] UserDTO userDTO)
        {
            try
            {
                // Check if email already exist
                bool isExist = await _userMangeRepository.CheckUserEmailExist(userDTO.Email);
                if (isExist)
                {
                    return BadRequest("Email already exist");
                }

                using var sha256 = SHA256.Create();
                var hashedPassword = Convert.ToBase64String(sha256.ComputeHash(Encoding.UTF8.GetBytes(userDTO.Password)));
                userDTO.Password = hashedPassword;

                // Add user details
                string firstName = await _userMangeRepository.AddUserDetailsAsync(userDTO);
                return Ok(new { firstName = firstName });
            }
            catch (Exception ex)
            {

                throw; 
            }
        }

        [HttpGet("getalluser")]
        public async Task<IActionResult> GetAllUsers()
        {
            // Get all users
            var users = await _userMangeRepository.GetAllUsersAsync();
            return Ok(users);
        }

        //Role CRUD
        [HttpPost("addrole")]
        public async Task<IActionResult> AddRole([FromBody] RoleDTO roleDTO)
        {
            bool isExist = await _userMangeRepository.CheckRoleNameExist(roleDTO.RoleName);
            if (isExist)
            {
                return BadRequest("Role already exist");
            }
            string roleName = await _userMangeRepository.AddRoleAsync(roleDTO);
            return Ok(new { roleName = roleName });
        }

        [HttpGet("getallrole")]
        public async Task<IActionResult> GetAllRole()
        {
            var roles = await _userMangeRepository.GetAllRoleAsync();
            return Ok(roles);
        }

        //Status CRUD
        [HttpPost("addstatus")]
        public async Task<IActionResult> AddStatus([FromBody] StatusDTO statusDTO)
        {
            bool isExist = await _userMangeRepository.CheckStatusNameExist(statusDTO.StatusName);
            if (isExist)
            {
                return BadRequest("Status already exist");
            }
            string statusName = await _userMangeRepository.AddStatusAsync(statusDTO);
            return Ok(new { statusName = statusName });
        }

        [HttpGet("getallstatus")]
        public async Task<IActionResult> GetAllStatus()
        {
            var statuses = await _userMangeRepository.GetAllStatusAsync();
            return Ok(statuses);
        }

        //update
        [HttpPut("updateuser")]
        public async Task<IActionResult> UpdateUser(UserDTO userDTO)
        {
            await _userMangeRepository.UpdateUser(userDTO);
            return Ok("User updated successfully");
        }

        [HttpPut("updatestatus")]
        public async Task<IActionResult> UpdateStatus(StatusDTO statusDTO)
        {
            await _userMangeRepository.UpdateStatus(statusDTO);
            return Ok("Status updated successfully");
        }

        [HttpPut("updaterole")]
        public async Task<IActionResult> UpdateRole(RoleDTO roleDTO)
        {
            await _userMangeRepository.UpdateRole(roleDTO);
            return Ok("Role updated successfully");
        }

        //delete
        [HttpDelete("deleteuser/{userId}")]
        public async Task<IActionResult> DeleteUser(int userId)
        {
            await _userMangeRepository.DeleteUser(userId);
            return Ok("User deleted successfully");
        }

        [HttpDelete("deletestatus/{statusId}")]
        public async Task<IActionResult> DeleteStatus(int statusId)
        {
            await _userMangeRepository.DeleteStatus(statusId);
            return Ok("Status deleted successfully");
        }

        [HttpDelete("deleterole/{roleId}")]
        public async Task<IActionResult> DeleteRole(int roleId)
        {
            await _userMangeRepository.DeleteRole(roleId);
            return Ok("Role deleted successfully");

        }
    }
}
