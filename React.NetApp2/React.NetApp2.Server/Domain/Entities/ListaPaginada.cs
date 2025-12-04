namespace React.NetApp2.Server.Domain.Entities
{
  public class ListaPaginada<T> : List<T>
  {
    public int CurrentPage { get; private set; }
    public int TotalPages { get; private set; }
    public int PageSize { get; private set; }
    public int TotalCount { get; private set; }

    public bool HasPrevious => CurrentPage > 1;

    public bool HasNext => CurrentPage < TotalPages;

    public ListaPaginada(List<T> items, int count, int page, int pageSize)
    {
      TotalCount = count;
      CurrentPage = page;
      PageSize = pageSize;
      TotalPages = (int)Math.Ceiling((double)count / pageSize);

      AddRange(items);
    }

    public static ListaPaginada<T> ToPaginatedList(IQueryable<T> query, int page, int pageSize)
    {
      var count = query.Count();
      var offset = (page - 1) * pageSize;
      var list = query.Skip(offset).Take(pageSize).ToList();

      return new ListaPaginada<T>(list, count, page, pageSize);
    }


  }
}