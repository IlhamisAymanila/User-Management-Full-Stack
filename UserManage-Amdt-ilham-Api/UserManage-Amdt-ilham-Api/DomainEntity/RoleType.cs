using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UserManage_Amdt_ilham_Api.DomainEntity
{
    public class RoleType : AutitableEntity
    {
        [Key]
        public int RoleTypeId { get; set; }
        public string RoleName { get; set; }
        public string Description { get; set; }

        public int? StatusId { get; set; }

        [ForeignKey("StatusId")]
        public Status Status { get; set; }

    }
}
