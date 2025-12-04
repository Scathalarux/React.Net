
using System.ComponentModel;

namespace React.NetApp2.Server.Domain.Entities
{
  public class Filtros
  {
    public string Nombre { get; set; }
    public string Email { get; set; }
    public string Telefono { get; set; }
    public int Page { get; set; }
    public int PageSize { get; set; }

  }

  public enum PageSizes : int
  {
    size10 = 10,
    size20 = 20,
    size50 = 50,
    size100 = 100
  }
}
