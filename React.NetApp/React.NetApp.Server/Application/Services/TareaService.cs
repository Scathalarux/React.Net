using React.NetApp.Server.Application.Interfaces;
using React.NetApp.Server.Domain.Entities;
using React.NetApp.Server.Domain.Repository;
using React.NetApp.Server.Infrastructure.Data;
using React.NetApp.Server.Models;

namespace React.NetApp.Server.Application.Services
{
    public class TareaService : ITareaService
    {
        private readonly ITareaRepository _tareaRepository;
        public TareaService(ITareaRepository tareaRepository)
        {
            _tareaRepository = tareaRepository;
        }

        public async Task<Tarea> AddTarea(Tarea request)
        {
            var newTarea = await _tareaRepository.AddAsync(request);
            return newTarea;
        }

        public async Task DeleteTarea(int id)
        {
            var entity = await _tareaRepository.GetByIdAsync(id);
            if (entity != null) await _tareaRepository.DeleteAsync(entity);
        }

        public async Task<IEnumerable<Tarea>> GetListaTareas()
        {
            return await _tareaRepository.GetAllAsync();
        }
    }
}
