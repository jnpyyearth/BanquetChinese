using Microsoft.AspNetCore.Mvc;
using backnet.Models;
using backnet.Data;
using Microsoft.EntityFrameworkCore;
using backnet.Models;

namespace backnet.Controllers
{
    [Route ("api/register")]
    [ApiController]
    public class RegisterController: ControllerBase{
        private readonly AppDbContext _context;
        public RegisterController(AppDbContext context){
            _context = context;
        }
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User registerRequest){
            if(registerRequest ==null){
                return BadRequest("Invalid register input");
            }
            if (registerRequest.password != registerRequest.confirmPassword){         
                  return StatusCode(402, new { Status = 402, Message = "Password and Confirm Password do not match" });
               }
            try{
                registerRequest.role ="customer";
                registerRequest.password=BCrypt.Net.BCrypt.HashPassword(registerRequest.password);
                _context.Users.Add(registerRequest);
                await _context.SaveChangesAsync();
                return Ok(new{ Status=200 ,Message ="register successfully",Data =registerRequest});
            }catch(Exception ex){
                return StatusCode(500,new{Message ="error while add register",Error =ex.Message});
            }
            
        }
    }
}