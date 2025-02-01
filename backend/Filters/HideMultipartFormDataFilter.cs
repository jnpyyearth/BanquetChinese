using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.SwaggerGen;

namespace Filters  // ✅ เพิ่ม namespace Filters
{
public class HideMultipartFormDataFilter : IDocumentFilter
{
    public void Apply(OpenApiDocument swaggerDoc, DocumentFilterContext context)
    {
        // ✅ ลบ API ที่ใช้ multipart/form-data ออกจาก Swagger
        var pathsToRemove = swaggerDoc.Paths
            .Where(path => path.Value.Operations.Any(op => 
                op.Value.RequestBody?.Content?.Keys.Contains("multipart/form-data") == true))
            .Select(path => path.Key)
            .ToList();

        foreach (var path in pathsToRemove)
        {
            swaggerDoc.Paths.Remove(path);
        }
    }
}
}