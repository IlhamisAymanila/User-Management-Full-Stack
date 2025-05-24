namespace UserManage_Amdt_ilham_Api.DomainEntity
{
    public abstract class AutitableEntity
    {
        //help of this class audit will save(DataContext)
        public DateTime CreatedAt { get; set; }
        public DateTime ModifiedAt { get; set; }
    }
}
