using React.NetApp.Server.Domain.Entities;
using React.NetApp.Server.Domain.Repository;
using React.NetApp.Server.Infrastructure.Data;
using React.NetApp.Server.Infrastructure.Repository.Base;

namespace React.NetApp.Server.Infrastructure.Repository
{
    public class TareaRepository : Repository<Tarea>, ITareaRepository
    {
        private readonly AppDbContext _context;
        public TareaRepository(AppDbContext context): base(context) 
        {
            _context = context;
        }

    }
}
