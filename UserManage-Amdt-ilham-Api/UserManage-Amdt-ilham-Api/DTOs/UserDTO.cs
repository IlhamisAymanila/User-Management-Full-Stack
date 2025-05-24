namespace UserManage_Amdt_ilham_Api.DTOs
{
    public class UserDTO
    {

        public int? UserId { get; set; }
        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public DateTime DateOfBirth { get; set; }

        public int? RoleTypeId { get; set; }

        public int? StatusId { get; set; }

        public string? RoleName { get; set; }

        public string? statusName { get; set; }
    }
}
