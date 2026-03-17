using FinancasApi.Data;
using Microsoft.EntityFrameworkCore;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// Adiciona suporte a controllers e configura serialização de enums como string no JSON.
// Exemplo: "Receita" em vez de 0.
builder.Services.AddControllers()
    .AddJsonOptions(options =>
    {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

// Serviços necessários para geração do Swagger/OpenAPI.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Registra o AppDbContext usando SQLite.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"))
);

var app = builder.Build();

// Habilita geração da documentação Swagger.
app.UseSwagger();
app.UseSwaggerUI();

// Aplica automaticamente as migrations pendentes na inicialização da aplicação.
using (var scope = app.Services.CreateScope())
{
    var db = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    db.Database.Migrate();
}

// Redirecionamento HTTPS.
app.UseHttpsRedirection();

// Middleware de autorização.
app.UseAuthorization();

// Mapeia os endpoints dos controllers.
app.MapControllers();

// Inicia a aplicação.
app.Run();