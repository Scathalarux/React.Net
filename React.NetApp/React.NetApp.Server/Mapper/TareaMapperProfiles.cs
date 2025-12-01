using AutoMapper;
using React.NetApp.Server.Domain.Entities;
using React.NetApp.Server.Models;

namespace React.NetApp.Server.Mapper
{
    public class TareaMapperProfiles : Profile
    {
        public TareaMapperProfiles()
        {
            CreateMap<TareaDto, Tarea>().ReverseMap();
        }

    }
}
