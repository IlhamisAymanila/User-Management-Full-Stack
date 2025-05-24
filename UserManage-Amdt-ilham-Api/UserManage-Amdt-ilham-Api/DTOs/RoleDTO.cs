namespace UserManage_Amdt_ilham_Api.DTOs
{
    public class RoleDTO
    {
        public int? RoleTypeId { get; set; }
        public string RoleName { get; set; }
        public string Description { get; set; }

        public int? StatusId { get; set; }

        public string? StatusName { get; set; }
    }
}
