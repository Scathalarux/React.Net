
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using React.NetApp3.Server.Domain.Entities;
using React.NetApp3.Server.Infrastructure.Data;
using System.Security.Claims;

namespace React.NetApp3.Server
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

            // Para la autenticacion
            builder.Services.AddAuthorization();
            builder.Services.AddIdentityApiEndpoints<AppUser>().AddEntityFrameworkStores<AppDbContext>();

            var app = builder.Build();

            app.UseDefaultFiles();
            app.UseStaticFiles();

            /* 
             * Added
             */
            // Para mapear los endpoints de la minimal API
            app.UseAuthorization();
            app.MapIdentityApi<AppUser>();

            //Endpoints extras
            app.MapPost("/logout", async (SignInManager<AppUser> signInManager) =>
            {
                await signInManager.SignOutAsync(); //elimina la cookie y se asegura de que esta deslogeado
                return Results.Ok();
            }).RequireAuthorization();

            //Para poder decirle a la parte de front que hay alguien logeado, pues FE no ve la cookie que gestiona .Net
            app.MapGet("/pingauth",(ClaimsPrincipal user) =>
            {
               var email = user.FindFirstValue(ClaimTypes.Email);
                return Results.Json(new { Email = email });
            }).RequireAuthorization();




            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();



            app.MapControllers();

            app.MapFallbackToFile("/index.html");

            app.Run();
        }
    }
}
