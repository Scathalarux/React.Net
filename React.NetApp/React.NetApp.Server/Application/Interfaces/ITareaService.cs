using React.NetApp.Server.Domain.Entities;
using React.NetApp.Server.Models;

namespace React.NetApp.Server.Application.Interfaces
{
    public interface ITareaService
    {
        Task<IEnumerable<Tarea>> GetListaTareas();
        Task<Tarea> AddTarea(Tarea request);
        Task DeleteTarea(int id);
    }
}
