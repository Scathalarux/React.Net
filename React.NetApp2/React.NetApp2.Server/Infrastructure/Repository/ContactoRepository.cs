using System.Data.Common;
using Microsoft.EntityFrameworkCore;
using React.NetApp2.Server.Domain.Entities;
using React.NetApp2.Server.Domain.Repository;
using React.NetApp2.Server.Infrastructure.Data;
using React.NetApp2.Server.Infrastructure.Repository.Base;

namespace React.NetApp2.Server.Infrastructure.Repository
{
    public class ContactoRepository : Repository<Contacto>, IContactoRepository
    {

        private readonly int DEFAULT_PAGE_SIZE = 10;
        private readonly int DEFAULT_PAGE = 1;

        private readonly AppDbContext _context;
        public ContactoRepository(AppDbContext context) : base(context)
        {
            _context = context;
        }

        public async Task<ListaPaginada<Contacto>> GetFilteredAllAsync(Filtros filtros)
        {
            var query = from c in _context.Contactos
                        select c;

            if (filtros.Nombre != null)
            {
                query = query.Where(c => c.Nombre.ToLower().Contains(filtros.Nombre.ToLower()));
            }

            if (filtros.Email != null)
            {
                query = query.Where(c => c.Email.ToLower().Contains(filtros.Email.ToLower()));
            }

            if (filtros.Telefono != null)
            {
                query = query.Where(c => c.Telefono.ToLower().Contains(filtros.Telefono.ToLower()));
            }


            if (filtros.Page > 0)
            {
                if (filtros.PageSize != DEFAULT_PAGE_SIZE)
                {
                    return ListaPaginada<Contacto>.ToPaginatedList(query, filtros.Page, filtros.PageSize);
                }
                return ListaPaginada<Contacto>.ToPaginatedList(query, filtros.Page, DEFAULT_PAGE_SIZE);
            }


            return ListaPaginada<Contacto>.ToPaginatedList(query, 1, DEFAULT_PAGE_SIZE);
        }

        public int CalcMaxPage(Filtros filtros)
        {
            var query = from c in _context.Contactos
                        select c;

            if (filtros.Nombre != null)
            {
                query = query.Where(c => c.Nombre.ToLower().Contains(filtros.Nombre.ToLower()));
            }

            if (filtros.Email != null)
            {
                query = query.Where(c => c.Email.ToLower().Contains(filtros.Email.ToLower()));
            }

            if (filtros.Telefono != null)
            {
                query = query.Where(c => c.Telefono.ToLower().Contains(filtros.Telefono.ToLower()));
            }

            var rowCount = query.Count();

            var maxPage = Math.Ceiling((double)(rowCount / DEFAULT_PAGE_SIZE));

            return (int)maxPage;
        }

        public async Task<Contacto?> GetById(int id)
        {
            var entity = await _context.Contactos.FindAsync(id);
            return entity;
        }
    }
}
