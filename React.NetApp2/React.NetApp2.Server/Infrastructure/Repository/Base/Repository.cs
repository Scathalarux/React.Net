using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.ChangeTracking;
using React.NetApp2.Server.Domain.Entities.Base;
using React.NetApp2.Server.Domain.Repository.Base;
using React.NetApp2.Server.Infrastructure.Data;
using System.Reflection.Metadata;

namespace React.NetApp2.Server.Infrastructure.Repository.Base
{
    public class Repository<T> : IRepository<T> where T : BaseEntity
    {
        private readonly AppDbContext _context;
        public Repository(AppDbContext context)
        {
            _context = context;
        }
        public async Task<IReadOnlyList<T>> GetAllAsync()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public async Task<T> AddAsync(T entity)
        {
            await _context.Set<T>().AddAsync(entity);
            await _context.SaveChangesAsync();
            return entity;
        }

        public async Task<T> DeleteAsync(T entity)
        {
            _context.Set<T>().Remove(entity);
            await _context.SaveChangesAsync();

            return entity;
        }


        public async Task<T> UpdateAsync(T entity)
        {
            var oldEntity = await _context.Set<T>().FirstOrDefaultAsync(x=> x.Id == entity.Id);

            _context.Entry<T>(oldEntity).CurrentValues.SetValues(entity);
            _context.Set<T>().Update(oldEntity);
            await _context.SaveChangesAsync();
            return oldEntity;
        }
    }
}
