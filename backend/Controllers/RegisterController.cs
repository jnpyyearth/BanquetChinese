using Microsoft.AspNetCore.Mvc;
using backnet.Models;
using backnet.Data;
using Microsoft.EntityFrameworkCore;
using backnet.Model;

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
            if(registerRequest.password !=registerRequest.confirmpassword){
                return badRequest("password and confirmpassword unmatch");
            }
            try{
                registerRequest.role ="customer";
                registerRequest.password=BCrypt.Net.BCrypt.HashPassword(registerRequest.password);
                _context.Users.Add(registerRequest);
                await _context.SaveChangesAsync();
                return Ok(new{Message ="register successfully",Data =registerRequest});
            }catch(Exception ex){
                return StatusCode(500,new{Message ="error while add register",Error =ex.Message});
            }
            
        }
    }
}