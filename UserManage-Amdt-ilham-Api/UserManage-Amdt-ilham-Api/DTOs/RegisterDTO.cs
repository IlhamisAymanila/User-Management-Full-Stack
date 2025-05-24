using System.ComponentModel.DataAnnotations;

namespace UserManage_Amdt_ilham_Api.DTOs
{
    public class RegisterDTO
    {
        [Required]
        public required string Username { get; set; }

        [Required]
        public required string Password { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }
        public DateTime DateOfBirth { get; set; }
    }
}
