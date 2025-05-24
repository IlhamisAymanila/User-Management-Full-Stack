using Microsoft.EntityFrameworkCore;
using UserManage_Amdt_ilham_Api.Data;
using UserManage_Amdt_ilham_Api.DomainEntity;
using UserManage_Amdt_ilham_Api.DTOs;
using UserManage_Amdt_ilham_Api.Interfaces;

namespace UserManage_Amdt_ilham_Api.Repositories
{
    public class UserManageRepository : IUserMangeRepository
    {
        private readonly DataContext _context;

        public UserManageRepository(DataContext context)
        {
            _context = context;
        }

        public async Task<string> AddRoleAsync(RoleDTO roleDTO)
        {
            var role = new RoleType
            {
                RoleName = roleDTO.RoleName,
                Description = roleDTO.Description,
                StatusId = roleDTO.StatusId
            };

            await _context.RoleType.AddAsync(role);
            await _context.SaveChangesAsync();

            return roleDTO.RoleName;
        }

        public async Task<string> AddStatusAsync(StatusDTO statusDTO)
        {
            var status = new Status
            {
                StatusName = statusDTO.StatusName,
                Description = statusDTO.Description
            };

            await _context.Status.AddAsync(status);
            await _context.SaveChangesAsync();

            return statusDTO.StatusName;
        }

        public async Task<string> AddUserDetailsAsync(UserDTO userDTO)
        {


            // Mapping UserDTO to UserDetails
            var userDetails = new UserDetails
            {
                FirstName = userDTO.FirstName,
                LastName = userDTO.LastName,
                Email = userDTO.Email,
                Password = userDTO.Password,
                DateOfBirth = userDTO.DateOfBirth,
                RoleTypeId = userDTO.RoleTypeId,
                StatusId = userDTO.StatusId
            };
            // Adding UserDetails to the database
            await _context.UserDetails.AddAsync(userDetails);
            await _context.SaveChangesAsync();

            // Returning the FirstName of the user for success message
            return userDetails.FirstName;
        }

        public async Task<bool> CheckRoleNameExist(string roleName)
        {
            bool isExist = await _context.RoleType.AnyAsync(x => x.RoleName == roleName);

            return isExist;
        }

        public async Task<bool> CheckStatusNameExist(string statusName)
        {
            bool isExist = await _context.Status.AnyAsync(x => x.StatusName == statusName);

            return isExist;
        }

        public async Task<bool> CheckUserEmailExist(string email)
        {
            bool isExist = await _context.UserDetails.AnyAsync(x => x.Email == email);

            return isExist;
        }

        //delete
        public async Task DeleteRole(int roleId)
        {
            var role = await _context.RoleType.FindAsync(roleId);

            if(role != null)
            {
                _context.RoleType.Remove(role);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteStatus(int statusId)
        {
            var status = await _context.Status.FindAsync(statusId);

            if (status != null)
            {
                _context.Status.Remove(status);
                await _context.SaveChangesAsync();
            }
        }

        public async Task DeleteUser(int userId)
        {
            var user = await _context.UserDetails.FindAsync(userId);
            if (user != null) 
            {
                _context.UserDetails.Remove(user);
                await _context.SaveChangesAsync();
            }
        }

        public async Task<IEnumerable<RoleDTO>> GetAllRoleAsync()
        {
           var roleList = await _context.RoleType.Include(x=>x.Status).ToListAsync();
            var roles = roleList.Select(x => new RoleDTO
            {
                RoleTypeId = x.RoleTypeId,
                RoleName = x.RoleName,
                Description = x.Description,
                StatusId = x.StatusId,
                StatusName = x.Status?.StatusName
            });

            return roles;
        }

        public async Task<IEnumerable<StatusDTO>> GetAllStatusAsync()
        {
            var statusList = await _context.Status.ToListAsync();
            var status = statusList.Select(x => new StatusDTO
            {
                StatusId = x.StatusId,
                StatusName = x.StatusName,
                Description = x.Description
            });

            return status;
        }

        public async Task<IEnumerable<UserDTO>> GetAllUsersAsync()
        {
            var userDetailsList = await _context.UserDetails.Include(x => x.RoleType).Include(x => x.Status).ToListAsync();
            var users = userDetailsList.Select(x => new UserDTO
            {
                UserId = x.UserId,
                FirstName = x.FirstName,
                LastName = x.LastName,
                Email = x.Email,
                Password =x.Password,
                DateOfBirth = x.DateOfBirth,
                RoleTypeId = x.RoleTypeId,
                StatusId = x.StatusId,
                RoleName = x.RoleType?.RoleName,
                statusName = x.Status?.StatusName
            });

            return users;
        }

        public async Task<UserDTO> GetUserByEmailAsync(string email)
        {
           var user = await _context.UserDetails.Where(x=>x.Email == email).FirstOrDefaultAsync();
            if (user == null)
                return null;
            return new UserDTO
            {
                UserId = user.UserId,
                FirstName = user.FirstName,
                LastName = user.LastName,
                Email = user.Email,
                Password = user.Password,
                DateOfBirth = user.DateOfBirth,
                RoleTypeId = user.RoleTypeId,
                StatusId = user.StatusId,
                RoleName = user.RoleType?.RoleName,
                statusName = user.Status?.StatusName
            };
        }

        public async Task UpdateRole(RoleDTO roleDTO)
        {
            var existingRole = await _context.RoleType.FindAsync(roleDTO.RoleTypeId);
            if (existingRole == null)
                throw new Exception("Role not found");

            // Update only the necessary fields
            existingRole.RoleName = roleDTO.RoleName;
            existingRole.Description = roleDTO.Description;
            existingRole.StatusId = roleDTO.StatusId;

            await _context.SaveChangesAsync();
        }

        public async Task UpdateStatus(StatusDTO statusDTO)
        {
            var existingStatus = await _context.Status.FindAsync(statusDTO.StatusId);
            if (existingStatus == null)
                throw new Exception("Status not found");

            existingStatus.StatusName = statusDTO.StatusName;
            existingStatus.Description = statusDTO.Description;

            await _context.SaveChangesAsync();
        }

        public async Task UpdateUser(UserDTO userDTO)
        {
            var existingUser = await _context.UserDetails.FindAsync(userDTO.UserId);
            if (existingUser == null)
                throw new Exception("User not found");

            existingUser.FirstName = userDTO.FirstName;
            existingUser.LastName = userDTO.LastName;
            existingUser.Email = userDTO.Email;
            existingUser.Password = userDTO.Password;
            existingUser.DateOfBirth = userDTO.DateOfBirth;
            existingUser.RoleTypeId = userDTO.RoleTypeId;
            existingUser.StatusId = userDTO.StatusId;

            await _context.SaveChangesAsync();
        }
    }
}
