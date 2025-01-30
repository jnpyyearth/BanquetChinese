using Microsoft.AspNetCore.Mvc;
using backnet.Models;
using backnet.Data;
using Microsoft.EntityFrameworkCore;
namespace backnet.Controllers
{
 [Route ("api/Menu")]
    [ApiController]
    public class MenuController:ControllerBase{
        private readonly AppDbContext _context;
         public MenuController(AppDbContext context){
            _context = context;
        }
        [HttpGet("getMainDish")]
        public async Task<IActionResult> GetMainDish(){
            try{
                var maindish = await _context.Menu.Where(maindish=>maindish.Menu_Type =="maindish").ToListAsync();
                if(maindish ==null||!maindish.Any()){
                    return NotFound(new{Message="Not found"});
                }
                return Ok(new{Message ="got maindish",Data =maindish});
            }catch (Exception ex){
                return StatusCode(500,new{Mesasge="error while fecthing data",Error =ex.Message});
            };
        }
        [HttpGet("Getdessert")]
        public async Task<IActionResult> GetDessert(){
            try{
                var getdessert = await _context.Menu.Where(getdessert =>getdessert.Menu_Type=="dessert").ToListAsync();
                if(getdessert ==null || !getdessert.Any()){
                    return BadRequest(new{Mesasge="no data"});
                }
                return Ok(new{Mesasge="got data ",Data =getdessert});
            }catch (Exception ex){
                return StatusCode(500, new{Mesasge="can not fecthing dessert data",Error=ex.Message});
            }
        }
         [HttpGet("GetAppetizer")]
        public async Task<IActionResult> GetAppetizer(){
            try{
                var getAppetizer = await _context.Menu.Where(getAppetizer =>getAppetizer.Menu_Type=="appetizer").ToListAsync();
                if(getAppetizer ==null || !getAppetizer.Any()){
                    return BadRequest(new{Mesasge="no data"});
                }
                return Ok(new{Mesasge="got data ",Data =getAppetizer});
            }catch (Exception ex){
                return StatusCode(500, new{Mesasge="can not fecthing Appetizer data",Error=ex.Message});
            }
        }
          [HttpGet("GetDrink")]
        public async Task<IActionResult> GetDrink(){
            try{
                var getDrink = await _context.Menu.Where(getDrink =>getDrink.Menu_Type=="drink").ToListAsync();
                if(getDrink ==null || !getDrink.Any()){
                    return BadRequest(new{Mesasge="no data"});
                }
                return Ok(new{Mesasge="got data ",Data =getDrink});
            }catch (Exception ex){
                return StatusCode(500, new{Mesasge="can not fecthing Drink data",Error=ex.Message});
            }
        }
    }
    
}