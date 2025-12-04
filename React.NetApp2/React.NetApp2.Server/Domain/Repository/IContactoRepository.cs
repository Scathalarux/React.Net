using React.NetApp2.Server.Domain.Entities;
using React.NetApp2.Server.Domain.Repository.Base;

namespace React.NetApp2.Server.Domain.Repository
{
    public interface IContactoRepository : IRepository<Contacto>
    {
        Task<Contacto?> GetById(int id);
        Task<ListaPaginada<Contacto>> GetFilteredAllAsync(Filtros filtros);
    }
}
