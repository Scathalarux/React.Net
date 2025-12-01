using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using React.NetApp.Server.Application.Interfaces;
using React.NetApp.Server.Domain.Entities;
using React.NetApp.Server.Models;

namespace React.NetApp.Server.Controllers
{
    [Route("api/tarea")]
    [ApiController]
    public class TareaController : ControllerBase
    {
        private readonly ITareaService _tareaService;
        private readonly IMapper _mapper;

        public TareaController(ITareaService tareaService, IMapper mapper)
        {
            _tareaService = tareaService;
            _mapper = mapper;
        }

        [HttpGet("listaTareas")]
        public async Task<IEnumerable<Tarea>> GetListaTareas()
        {
            var listaTareas = await _tareaService.GetListaTareas();

            return _mapper.Map<IEnumerable<Tarea>>(listaTareas);
        }

        [HttpPost("tarea")]
        public async Task<TareaDto> AddTarea(TareaDto request)
        {
            var tarea = _mapper.Map<Tarea>(request);

            var entityDto = await _tareaService.AddTarea(tarea);
            return _mapper.Map<TareaDto>(entityDto);
        }

        [HttpDelete("tarea/{id:int}")]
        public async Task DeleteTarea(int id)
        {
            await _tareaService.DeleteTarea(id);
        }
    }
}
