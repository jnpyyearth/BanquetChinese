// using Microsoft.AspNetCore.Http;
// using Microsoft.AspNetCore.Mvc;
// using System;
// using System.IO;
// using System.Threading.Tasks;

// namespace backnet.Controllers
// {
//     [Route("apa/file")] // ✅ ตรวจสอบว่า Route ถูกต้อง
//     [ApiController]
//     public class UploadController : ControllerBase
//     {
//         private readonly string _uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "Uploads");

//         public UploadController()
//         {
//             if (!Directory.Exists(_uploadPath))
//             {
//                 Directory.CreateDirectory(_uploadPath);
//             }
//         }

//         /// <summary>
//         /// อัปโหลดไฟล์รูปภาพ
//         /// </summary>
//         [HttpPost("upload")] // ✅ ตรวจสอบว่าใช้ `[HttpPost("upload")]` จริง
//         [Consumes("multipart/form-data")] 
//         public async Task<IActionResult> UploadFile([FromForm] IFormFile file)
//         {
//             if (file == null || file.Length == 0)
//                 return BadRequest("No file uploaded.");

//             try
//             {
//                 var fileName = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
//                 var filePath = Path.Combine(_uploadPath, fileName);
//                 var fileUrl = $"/Uploads/{fileName}";

//                 using (var stream = new FileStream(filePath, FileMode.Create))
//                 {
//                     await file.CopyToAsync(stream);
//                 }

//                 return Ok(new { fileName, fileUrl });
//             }
//             catch (Exception ex)
//             {
//                 return StatusCode(500, "Internal server error: " + ex.Message);
//             }
//         }
//     }
// }


// using Microsoft.AspNetCore.Http;
// using Microsoft.AspNetCore.Mvc;
// using System;
// using System.IO;
// using System.Threading.Tasks;

// namespace backnet.Controllers
// {
//     [Route("apiiiiiii/file")] // ✅ ตรวจสอบว่า Route ถูกต้อง
//     [ApiController]
//     [ApiExplorerSettings(IgnoreApi = true)] 
//     public class UploadController : ControllerBase
//     {
//         private readonly string _uploadPath = Path.Combine(Directory.GetCurrentDirectory(), "uploads");

//         public UploadController()
//         {
//             if (!Directory.Exists(_uploadPath))
//             {
//                 Directory.CreateDirectory(_uploadPath);
//             }
//         }

//         /// <summary>
//         /// อัปโหลดไฟล์รูปภาพ
//         /// </summary>
//         [HttpPost("upload")]
//         [Consumes("multipart/form-data")] // ✅ สำคัญ: แจ้งให้ Swagger รู้ว่าต้องใช้ multipart/form-data
//         public async Task<IActionResult> UploadFile([FromForm] IFormFile file)
//         {
//             if (file == null || file.Length == 0)
//                 return BadRequest("No file uploaded.");

//             try
//             {
//                 var fileName = $"{Guid.NewGuid()}{Path.GetExtension(file.FileName)}";
//                 var filePath = Path.Combine(_uploadPath, fileName);
//                 var fileUrl = $"/uploads/{fileName}";

//                 using (var stream = new FileStream(filePath, FileMode.Create))
//                 {
//                     await file.CopyToAsync(stream);
//                 }

//                 return Ok(new { fileUrl });
//             }
//             catch (Exception ex)
//             {
//                 return StatusCode(500, "Internal server error: " + ex.Message);
//             }
//         }
//     }
// }
