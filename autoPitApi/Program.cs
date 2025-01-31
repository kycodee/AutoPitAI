using Microsoft.EntityFrameworkCore;
using AutoPitApi.Models;
using Microsoft.AspNetCore.Authentication.Google;
using Microsoft.AspNetCore.Authentication.Cookies;
using System.Security.Claims;
using dotenv.net;
using Microsoft.AspNetCore.Identity;
var builder = WebApplication.CreateBuilder(args);


DotEnv.Load();
// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddDbContext<InstructionContext>(opt =>
    opt.UseInMemoryDatabase("InstructionList"));
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSpecificOrigin",
        builder => builder.WithOrigins("http://localhost:3000")
                          .AllowAnyMethod() // Allows GET, POST, PUT, DELETE
                          .AllowAnyHeader()); // Allows any headers
});


builder.Services.AddAuthentication(o =>
            {
                o.DefaultScheme = "Application";
                o.DefaultSignInScheme = "External";
            })
            .AddCookie("Application")
            .AddCookie("External")
            .AddGoogle(o =>
            {
                o.ClientId = Environment.GetEnvironmentVariable("GOOGLE_CLIENT_ID")!;;
                o.ClientSecret = Environment.GetEnvironmentVariable("GOOGLE_CLIENT_SECRET")!;
                // o.Scope.Add("https://www.googleapis.com/auth/userinfo.profile");
                o.Scope.Add("profile");
                o.Events.OnCreatingTicket = (context) =>
                    {                      
                        var picture = context.User.GetProperty("picture").GetString();

                        context.Identity!.AddClaim(new Claim("picture", picture!));

                        return Task.CompletedTask;
                    };
            });


builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowSpecificOrigin");
app.UseHttpsRedirection();
//added from oauth docs
app.UseAuthentication();

app.UseAuthorization();

app.MapControllers();

app.Run();
