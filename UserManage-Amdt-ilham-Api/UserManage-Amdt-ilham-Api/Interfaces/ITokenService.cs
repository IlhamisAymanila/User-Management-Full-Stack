using UserManage_Amdt_ilham_Api.DomainEntity;
using UserManage_Amdt_ilham_Api.DTOs;

namespace UserManage_Amdt_ilham_Api.Interfaces
{
    public interface ITokenService
    {
        public string CreateToken(UserDTO userDetails);
    }
}
