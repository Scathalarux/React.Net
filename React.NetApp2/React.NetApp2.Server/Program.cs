
using Microsoft.EntityFrameworkCore;
using React.NetApp2.Server.Application.Interfaces;
using React.NetApp2.Server.Application.Services;
using React.NetApp2.Server.Domain.Repository;
using React.NetApp2.Server.Domain.Repository.Base;
using React.NetApp2.Server.Infrastructure.Data;
using React.NetApp2.Server.Infrastructure.Repository;
using React.NetApp2.Server.Infrastructure.Repository.Base;
using React.NetApp2.Server.Mapper;

namespace React.NetApp2.Server
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();


            builder.Services.AddDbContext<AppDbContext>(opt => opt.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));
            builder.Services.AddAutoMapper(cfg => { }, typeof(ContactoMapperProfiles));
            builder.Services.AddScoped(typeof(IRepository<>),typeof(Repository<>));
            builder.Services.AddScoped<IContactoService, ConctactoService>();
            builder.Services.AddScoped<IContactoRepository, ContactoRepository>();

            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
