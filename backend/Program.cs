
//////////////////////////////////////////////////////////////////////////////////
using backnet.Data;
using backnet.Models;
using Microsoft.OpenApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;

var builder = WebApplication.CreateBuilder(args);


var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlServer(connectionString));

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAngularApp", builder =>
    {
        builder.WithOrigins("http://localhost:4200")
               .AllowAnyMethod()
               .AllowAnyHeader();
    });
});

builder.Services.AddControllers();

// ✅ ตั้งค่า Swagger ให้รองรับ File Upload
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo
    {
        Title = "Upload API",
        Version = "v1"
    });

    // ✅ รองรับ multipart/form-data ใน .NET 8
    c.MapType<IFormFile>(() => new OpenApiSchema
    {
        Type = "string",
        Format = "binary"
    });
      // ✅ เพิ่ม Support สำหรับ File Upload
    c.OperationFilter<SwaggerFileOperationFilter>(); 
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseCors("AllowAngularApp");
app.UseStaticFiles();

app.MapControllers();

// ✅ Minimal API สำหรับ Upload File
var uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "uploads");
if (!Directory.Exists(uploadPath))
{
    Directory.CreateDirectory(uploadPath);
}

app.MapPost("/api/file/upload", async (IFormFile file) =>
{
    if (file == null || file.Length == 0)
        return Results.BadRequest("No file uploaded.");

    try
    {
        var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
        var filePath = Path.Combine(uploadPath, fileName);
        var fileUrl = $"/uploads/{fileName}";

        using (var stream = new FileStream(filePath, FileMode.Create))
        {
            await file.CopyToAsync(stream);
        }

        return Results.Ok(new { fileUrl });
    }
    catch (Exception ex)
    {
        return Results.Problem("Internal server error: " + ex.Message);
    }
})
.Accepts<IFormFile>("multipart/form-data") // ✅ ให้ Swagger รองรับ File Upload
.Produces(200)
.DisableAntiforgery();

app.MapGet("/api/Uploads/{fileName}", async (string fileName) =>
{
    var filePath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads", fileName);

    if (!System.IO.File.Exists(filePath))
        return Results.NotFound("File not found.");

    var fileStream = System.IO.File.OpenRead(filePath);
    var contentType = "application/octet-stream"; // ใช้ MIME Type ทั่วไป

    return Results.File(fileStream, contentType, fileName);
});
app.UseStaticFiles(new StaticFileOptions
{
    FileProvider = new PhysicalFileProvider(uploadPath),
    RequestPath = "/uploads"
});

app.Run();