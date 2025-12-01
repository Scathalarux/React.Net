using Microsoft.EntityFrameworkCore;
using React.NetApp.Server.Domain.Entities;

namespace React.NetApp.Server.Infrastructure.Data
{
    public class AppDbContext: DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options): base (options)
        {
            
        }

        public DbSet<Tarea> Tareas { get; set; }
    }
}
