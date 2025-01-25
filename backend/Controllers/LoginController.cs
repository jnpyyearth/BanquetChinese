using Microsoft.AspNetCore.Mvc;
using backnet.Data;
using Microsoft.EntityFrameworkCore;
using backnet.Models;

namespace backnet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController:ControllerBase{
        //inject db เข้ามา
        private readonly AppDbContext _context;
        public LoginController(AppDbContext context){
            _context = context; 
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestModel loginRequest ){//รับ request มา
            if(loginRequest ==null){ //check ว่า มี request ใช่มั้ย
                return BadRequest("Invalid request body");
            }
            var user = await _context.Users.Where(u=>u.username==loginRequest.username) //queryทุกcolumn ตาม Users where ตามนั้น เเล้วก็เอาเเถวเเรกที่select ได้
            .FirstOrDefaultAsync();

            if(user== null){//check if dont have match data
                return Unauthorized("Invalid username or password");
            }
            //check  password compared to hash
            if(!BCrypt.Net.BCrypt.Verify(loginRequest.password,user.password)){
                return Unauthorized("invalid hash password");
            }//
            return Ok(new{Message="login successful",Username =user.username});
        }
    }
}