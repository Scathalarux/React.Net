using React.NetApp.Server.Domain.Entities;

namespace React.NetApp.Server.Domain.Repository.Base
{
    public interface IRepository<T> where T : class
    {
        Task<IReadOnlyList<T>> GetAllAsync();

        Task<T> AddAsync(T entity);

        Task DeleteAsync(T entity);

        Task<T?> GetByIdAsync(int id);
    }
}
