using System.Text.RegularExpressions;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using React.NetApp2.Server.Application.Interfaces;
using React.NetApp2.Server.Domain.Entities;
using React.NetApp2.Server.Domain.Repository;
using React.NetApp2.Server.Domain.Repository.Base;

namespace React.NetApp2.Server.Application.Services
{
    public class ConctactoService : IContactoService
    {
        private readonly IContactoRepository _contactoRepository;
        public ConctactoService(IContactoRepository contactoRepository)
        {
            _contactoRepository = contactoRepository;
        }

        public async Task<Contacto?> AddContacto(Contacto contacto)
        {
            var c = await _contactoRepository.GetById(contacto.Id);

            //si existe el usuario
            if (c != null) return null;

            var cont = await _contactoRepository.AddAsync(contacto);
            return cont;
        }

        public async Task<Contacto?> DeleteContacto(Contacto contacto)
        {
            var c = await _contactoRepository.GetById(contacto.Id);

            //si no existe el usuario
            if (c == null) return null;

            var con = await _contactoRepository.DeleteAsync(contacto);

            return con;
        }

        public async Task<Contacto?> GetContactoById(int id)
        {
            var contacto = await _contactoRepository.GetById(id);
            return contacto;
        }

        public async Task<IEnumerable<Contacto>> GetListadoContactos()
        {
            return await _contactoRepository.GetAllAsync();
        }

        public async Task<ListaPaginada<Contacto>> GetFilteredListadoContactos(Filtros filtros)
        {
            return await _contactoRepository.GetFilteredAllAsync(filtros);
        }


        public async Task<Contacto?> UpdateContacto(Contacto contacto)
        {
            var contact = await _contactoRepository.GetById(contacto.Id);

            //si no existe el usuario
            if (contact == null) return null;

            var result = await _contactoRepository.UpdateAsync(contacto);
            return result;
        }

        public List<string> ValidateContacto(Contacto contacto)
        {
            var listaErrores = new List<string>();
            if (Regex.Matches(contacto.Nombre, @"^\w").Count == 0)
            {
                listaErrores.Add("El nombre debe empezar por caracter");
            }

            if (Regex.Matches(contacto.Email, @"^[\w\-\.]+@([\w-]+\.)+[\w-]{2,}$").Count == 0)
            {
                listaErrores.Add("El email debe tener formato: ejemplo@prueba.com");
            }

            if (Regex.Matches(contacto.Telefono, @"^[+]?[\d]{9,}$").Count == 0)
            {
                listaErrores.Add("Debe contener al menos 9 dígitos");
            }
            return listaErrores;
        }
    }
}
