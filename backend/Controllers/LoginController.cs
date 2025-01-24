// using Microsoft.AspNetCore.Mvc;
// using backnet.Data;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.AspNetCore.Identity.Data;
// using backnet.Models;

// namespace backnet.Controllers
// {
//     [Route("api/[controller]")]
//     [ApiController]
//     public class LoginController:ControllerBase{
//         //inject db เข้ามา
//         private readonly AppDbContext _context;
//         public LoginController(AppDbContext context){
//             _context = context; 
//         }
//         [HttpPost("login")]
//         public async Task<IActionResult> Login([FromBody] LoginRequestModel loginRequest ){
//             if(loginRequest ==null){
//                 return BadRequest("Invalid request body");
//             }
//             var user = await _context.Users.Where(u=>u.username==loginRequest.username&&u.password==loginRequest.password)
//             .FirstOrDefaultAsync();

//             if(user== null){
//                 return Unauthorized("Invalid username or password");
//             }
//             if(!BCrypt)
//             return Ok(new{Message="login successful",Username =user.username});
//         }
//     }
// }