using React.NetApp.Server.Domain.Entities.Base;

namespace React.NetApp.Server.Domain.Entities
{
    public class Tarea: BaseEntity
    {
        public string Descripcion { get; set;}
        public DateTime Fecha_registro { get; set;}
    }
}
