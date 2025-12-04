using Microsoft.EntityFrameworkCore;
using React.NetApp2.Server.Domain.Entities;

namespace React.NetApp2.Server.Infrastructure.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base (options)
        {
            
        }


        public DbSet<Contacto> Contactos { get; set; }
    }

}
