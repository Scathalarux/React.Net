using React.NetApp2.Server.Domain.Entities.Base;
using System.Globalization;

namespace React.NetApp2.Server.Domain.Entities
{
    public class Contacto: BaseEntity
    {
        public string Nombre { get; set; }
        public string Email { get; set; }
        public string Telefono { get; set; }
    }
}
