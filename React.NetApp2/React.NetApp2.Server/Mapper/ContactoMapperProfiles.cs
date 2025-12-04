using React.NetApp2.Server.Domain.Entities;
using React.NetApp2.Server.DTOs;
using AutoMapper;

namespace React.NetApp2.Server.Mapper
{
    public class ContactoMapperProfiles: Profile
    {
        public ContactoMapperProfiles()
        {
            CreateMap<ContactoDto, Contacto>().ReverseMap();
            CreateMap<FiltrosDto, Filtros>().ReverseMap();
        }
    }
}
