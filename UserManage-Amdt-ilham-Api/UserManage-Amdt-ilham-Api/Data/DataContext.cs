using Microsoft.EntityFrameworkCore;
using UserManage_Amdt_ilham_Api.DomainEntity;

namespace UserManage_Amdt_ilham_Api.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions options) : base(options)
        {
        }

        public DbSet<UserDetails> UserDetails { get; set; }
        public DbSet<RoleType> RoleType { get; set; }
        public DbSet<Status> Status { get; set; }

        public override int SaveChanges()
        {
            SetAuditInfo();
            return base.SaveChanges();
        }

        public override async Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        {
            SetAuditInfo();
            return await base.SaveChangesAsync(cancellationToken);
        }

        private void SetAuditInfo()
        {
            foreach (var entry in ChangeTracker.Entries<AutitableEntity>())
            {
                if (entry.State == EntityState.Added)
                {
                    entry.Entity.CreatedAt = DateTime.UtcNow;
                    entry.Entity.ModifiedAt = DateTime.UtcNow;
                }
                else if (entry.State == EntityState.Modified)
                {
                    entry.Entity.ModifiedAt = DateTime.UtcNow;
                }
            }
        }
    }
}
