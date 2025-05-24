using UserManage_Amdt_ilham_Api.DTOs;

namespace UserManage_Amdt_ilham_Api.Interfaces
{
    public interface IUserMangeRepository
    {
        //save user details get firstname as success string
        Task<string> AddUserDetailsAsync(UserDTO userDTO);
        Task<string> AddStatusAsync(StatusDTO statusDTO);
        Task<string> AddRoleAsync(RoleDTO roleDTO);

        //check if email exist return bool
        Task<bool> CheckUserEmailExist(string email);

        Task<bool> CheckRoleNameExist(string roleName);

        Task<bool> CheckStatusNameExist(string statusName);

        //GET All Users
        Task<IEnumerable<UserDTO>> GetAllUsersAsync();
        Task<IEnumerable<RoleDTO>> GetAllRoleAsync();
        Task<IEnumerable<StatusDTO>> GetAllStatusAsync();

        //update
        Task UpdateUser(UserDTO userDTO);
        Task UpdateStatus(StatusDTO statusDTO);
        Task UpdateRole(RoleDTO roleDTO);

        //delete
        Task DeleteUser(int userId);
        Task DeleteStatus(int statusId);
        Task DeleteRole(int roleId);

        //GetByEmail
        Task<UserDTO> GetUserByEmailAsync(string email);






    }
}
