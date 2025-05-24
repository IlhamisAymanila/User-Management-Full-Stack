using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using UserManage_Amdt_ilham_Api.DomainEntity;
using UserManage_Amdt_ilham_Api.DTOs;
using UserManage_Amdt_ilham_Api.Interfaces;

namespace UserManage_Amdt_ilham_Api.Services
{
    public class TokenService(IConfiguration configuration) : ITokenService
    {
        public string CreateToken(UserDTO userDetails)
        {
            var tokenKey = configuration["TokenKey"] ?? throw new Exception("Cannot access token");

            if (tokenKey.Length < 64) throw new("Your tokenKey needs to be longer");

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(tokenKey));

            var claims = new List<Claim>
         {
            new(ClaimTypes.NameIdentifier, userDetails.Email)
         };

            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = creds
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
