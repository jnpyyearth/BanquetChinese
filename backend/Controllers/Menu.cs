using Microsoft.AspNetCore.Mvc;
using backnet.Models;
using backnet.Data;
using Microsoft.EntityFrameworkCore;
using System.Data;
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
            try{ //ดึงข้อมูลจากตาราง Menu ที่ Menu_Type เป็น maindish
                var maindish = await _context.Menu.Where(maindish=>maindish.Menu_Type =="maindish").ToListAsync();
                //tolistasync คือดึงรายการทั้งหมด

                if(maindish ==null||!maindish.Any()){
                    return NotFound(new{Message="Not found"});
                }
                //ถ้าไม่เจอ ให้ return 404
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
        [HttpPost("AddMenu")]
        public async Task<IActionResult> AddMenu([FromBody] Menu addMenuRequest){
            if(addMenuRequest ==null){
                return BadRequest("Invalid register input");
            }
            try{
                _context.Menu.Add(addMenuRequest);
                await _context.SaveChangesAsync();
                 return Created($"/api/menu/{addMenuRequest.Menu_ID}", addMenuRequest);
            }catch(Exception ex){
                 return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
        [HttpPut("EditMenu/{id}")]
        public async Task<IActionResult> EditMenu(int id,[FromBody] EditMenuModel editMenuRequest){
           
            if(editMenuRequest ==null){
                return NotFound("Invalid editMenu input");
            }

            var existingMenu = await _context.Menu.FindAsync(id);
            if (existingMenu == null)
            {
                return NotFound($"Menu with ID {id} not found.");
            }
            existingMenu.Menu_Name = editMenuRequest.Menu_Name;
            existingMenu.Menu_Price = editMenuRequest.Menu_Price;
            try{
                await _context.SaveChangesAsync();
            }catch(DbUpdateConcurrencyException){
                return StatusCode(500, "Error updating the menu. Please try again.");
            }
             return Ok(new { message = "Menu updated successfully.", Data=editMenuRequest });
        }
        [HttpPut("CancelMenu/{id}")]
        public async Task<IActionResult> CancelMenu(int id,[FromBody] CancelMenuModel cancelModelRequest){
            if(cancelModelRequest==null){
                return NotFound($"dont have Request data");
            }
             Console.WriteLine($"📢 ค่า Menu_Status ที่ได้รับ: {cancelModelRequest.Menu_Status}");
            var existingMenu =await _context.Menu.FindAsync(id);
            if(existingMenu == null){
                return NotFound($"this menu id {id} not found");
            }
            existingMenu.Menu_Status = cancelModelRequest.Menu_Status;
            
            try{
                await _context.SaveChangesAsync();
            }catch(DbUpdateConcurrencyException){
                  return StatusCode(500, "Error updating the menuStatus. Please try again.");
            }
             return Ok(new { message = "Menu updated successfully.", Data=cancelModelRequest });

        }

        }
    }




  