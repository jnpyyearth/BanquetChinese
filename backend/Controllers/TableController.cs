using Microsoft.AspNetCore.Mvc;
using backnet.Models;
using backnet.Data;
using Microsoft.EntityFrameworkCore;
namespace backnet.Controllers{
    [Route("api/Table")]
    [ApiController]
    public class TableController:ControllerBase{
         private readonly AppDbContext _context;
         public TableController(AppDbContext context){
            _context = context;
        }
        [HttpGet("GetTable")]
        public async Task<IActionResult> GetTable(){
            try{
                var table =await _context.Table.ToListAsync();
                if(table ==null){
                    return NotFound(new{Message="not have Table data"});

                }
                return Ok(new{message="got Table",Data=table});
            }catch(Exception ex){
                return StatusCode(500,new{Message="internal error",Error = ex.Message});
            }
        }
    }
} 