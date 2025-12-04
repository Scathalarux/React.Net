using React.NetApp2.Server.Domain.Entities;
using React.NetApp2.Server.DTOs;

namespace React.NetApp2.Server.Application.Interfaces
{
    public interface IContactoService
    {
        Task<IEnumerable<Contacto>> GetListadoContactos();
        Task<ListaPaginada<Contacto>> GetFilteredListadoContactos(Filtros filtros);
        Task<Contacto?> GetContactoById(int id);
        Task<Contacto?> AddContacto(Contacto contacto);
        Task<Contacto?> UpdateContacto(Contacto contacto);
        Task<Contacto?> DeleteContacto(Contacto contacto);
        List<string> ValidateContacto(Contacto contacto);
    }
}
