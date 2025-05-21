using Microsoft.AspNetCore.Mvc;
using backnet.Data;
using Microsoft.EntityFrameworkCore;
using backnet.Models;
using System.IdentityModel.Tokens.Jwt;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;

namespace backnet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController:ControllerBase{
        //inject db เข้ามาใช้ใน Controller นี้
        private readonly AppDbContext _context;
        public LoginController(AppDbContext context){
            _context = context; 
        }
        //รับ HTTP POST ที่ api/login
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginRequestModel loginRequest ){//รับ request มา
            Console.WriteLine("Login Request Received");
    Console.WriteLine($"Username: {loginRequest?.username}");
    Console.WriteLine($"Password: {loginRequest?.password}");
           
           
            if(loginRequest ==null){ //check ว่า มี request ใช่มั้ย
                return BadRequest("Invalid request body");
            }
            var user = await _context.Users.Where(u=>u.username==loginRequest.username) //queryทุกcolumn ตาม Users where ตามนั้น เเล้วก็เอาเเถวเเรกที่select ได้
            .FirstOrDefaultAsync();

            if(user== null){//check if dont have match data ถ้าไม่เจอ username นี้
             Console.WriteLine("Invalid username: User not found");
                return Unauthorized("Invalid username or password");
            }
            //check  password compared to hash , เทียบpass ที่รับเข้ามากับรหัสผ่านที่ถูก hash แล้วใน BCrypt เพื่อความปลอดภัย
            if(!BCrypt.Net.BCrypt.Verify(loginRequest.password,user.password)){
             Console.WriteLine("Invalid password: Password does not match");
                return Unauthorized("invalid hash password");
            }//

            //create token
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes("aP9#Df6!Xz&Kw3@Lm7V8Gh$NqYpTzUj2");
            var tokenDescriptor =new SecurityTokenDescriptor{
                Subject = new ClaimsIdentity(new[]{
                    new Claim("username",user.username),
                    new Claim("role",user.role ??""),
                    new Claim("User_ID", user.User_ID.ToString())
                }),
                Expires =DateTime.UtcNow.AddHours(1), // 1 hour
                 SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
                };
                var token =tokenHandler.CreateToken(tokenDescriptor);
                var tokenString =tokenHandler.WriteToken(token);
                Console.WriteLine($"Generated Token: {tokenString}");
            return Ok(new{Message="login successful",Token =tokenString});
            //ถ้าเข้าสู่ระบบสำเร็จ ส่ง JWT Token ให้หน้าบ้านไว้
        }
        
    }
    
}