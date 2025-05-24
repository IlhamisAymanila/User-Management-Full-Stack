using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace UserManage_Amdt_ilham_Api.DomainEntity
{
    public class UserDetails : AutitableEntity
    {
        [Key]
        public int UserId { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string Email { get; set; }

        public string Password { get; set; }

        public DateTime DateOfBirth { get; set; }
        
        public int? RoleTypeId { get; set; }

        public int? StatusId { get; set; }

        [ForeignKey("RoleTypeId")]
        public RoleType RoleType { get; set; }

        [ForeignKey("StatusId")]
        public Status Status { get; set; }  


        


    }
}
