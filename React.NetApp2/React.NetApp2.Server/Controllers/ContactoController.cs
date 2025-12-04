using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using React.NetApp2.Server.Application.Interfaces;
using React.NetApp2.Server.Domain.Entities;
using React.NetApp2.Server.DTOs;
using System.Reflection.Metadata.Ecma335;
using System.Text.Json;

namespace React.NetApp2.Server.Controllers
{
    [Route("api/")]
    [ApiController]
    public class ContactoController : ControllerBase
    {

        private readonly IContactoService _contactoService;
        private readonly IMapper _mapper;

        public ContactoController(IContactoService contactoService, IMapper mapper)
        {
            _contactoService = contactoService;
            _mapper = mapper;
        }

        [HttpGet("contacto/lista")]
        public async Task<ActionResult<IEnumerable<ContactoDto>>> GetListadoContactos([FromQuery] FiltrosDto filtrosDto)
        {

            if (filtrosDto == null)
            {
                /* sin filtros */
                return Ok(await _contactoService.GetListadoContactos());
            }

            /* con filtros */
            var filtros = _mapper.Map<Filtros>(filtrosDto);
            var listadoContactos = await _contactoService.GetFilteredListadoContactos(filtros);
            var metadata = new
            {
                listadoContactos.TotalCount,
                listadoContactos.PageSize,
                listadoContactos.CurrentPage,
                listadoContactos.TotalPages,
                listadoContactos.HasNext,
                listadoContactos.HasPrevious
            };

            Response.Headers.Add("X-Pagination", JsonSerializer.Serialize(metadata));

            return Ok(_mapper.Map<IEnumerable<ContactoDto>>(listadoContactos));
        }

        [HttpPost("contacto/add")]
        public async Task<ActionResult<dynamic?>> AddContacto(ContactoDto contacto)
        {
            var c = _mapper.Map<Contacto>(contacto);

            var errores = _contactoService.ValidateContacto(c);
            //errores
            if (errores.Count != 0) return BadRequest(errores);
            var result = await _contactoService.AddContacto(c);
            //contacto ya existente
            if (result == null) return new StatusCodeResult(404);

            return Ok(_mapper.Map<ContactoDto>(result));
        }


        [HttpPut("contacto/edit")]
        public async Task<ActionResult<dynamic?>> UpdateContacto(ContactoDto contacto)
        {
            var c = _mapper.Map<Contacto>(contacto);
            //contacto no existente
            if (contacto == null) return new StatusCodeResult(404);

            var errores = _contactoService.ValidateContacto(c);
            //errores
            if (errores.Count != 0) return BadRequest(errores);


            var result = await _contactoService.UpdateContacto(c);
            return Ok(_mapper.Map<ContactoDto>(result));
        }

        [HttpDelete("contacto/delete/{id:int}")]
        public async Task<ActionResult<ContactoDto?>> DeleteContacto(int id)
        {
            var contacto = await _contactoService.GetContactoById(id);
            if (contacto == null) return new StatusCodeResult(404);


            var c = await _contactoService.DeleteContacto(contacto);
            return Ok(_mapper.Map<ContactoDto>(c));
        }



    }
}
