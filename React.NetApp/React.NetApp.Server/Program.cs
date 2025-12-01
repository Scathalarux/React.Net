
using Microsoft.EntityFrameworkCore;
using React.NetApp.Server.Application.Interfaces;
using React.NetApp.Server.Application.Services;
using React.NetApp.Server.Domain.Repository;
using React.NetApp.Server.Domain.Repository.Base;
using React.NetApp.Server.Infrastructure.Data;
using React.NetApp.Server.Infrastructure.Repository;
using React.NetApp.Server.Infrastructure.Repository.Base;
using React.NetApp.Server.Mapper;

namespace React.NetApp.Server
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
            builder.Services.AddScoped(typeof(IRepository<>), typeof(Repository<>));
            builder.Services.AddScoped<ITareaRepository, TareaRepository>();
            builder.Services.AddScoped<ITareaService, TareaService>();
            builder.Services.AddAutoMapper(cfg => { },typeof(TareaMapperProfiles));


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
