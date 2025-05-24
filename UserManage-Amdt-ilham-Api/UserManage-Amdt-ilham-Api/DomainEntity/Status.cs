using System.ComponentModel.DataAnnotations;
namespace UserManage_Amdt_ilham_Api.DomainEntity
{
    public class Status: AutitableEntity
    {
        [Key]
        public int StatusId { get; set; }
        public string StatusName { get; set; }
        public string Description { get; set; }
      
    }
}
