using Microsoft.AspNetCore.Mvc;
using backnet.Data;
using backnet.Models;
using Microsoft.EntityFrameworkCore;

namespace backnet.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ToursController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ToursController(AppDbContext context)
        {
            _context = context;
        }

        // Endpoint เพื่อดึงข้อมูลทั้งหมดจากตาราง Tour
        [HttpGet]
        public async Task<IActionResult> GetAllTours() //Task<IActionResult>  คือการเล่นกับ asynchronus
        {
            try
            {
                // ดึงข้อมูลทั้งหมดจากตาราง Tour
                var tours = await _context.Tour.ToListAsync();

                // ส่งข้อมูลกลับหากพบ
                if (tours == null || !tours.Any())
                {
                    return NotFound(new { Message = "No tours found" });
                }

                return Ok(new { Message = "Tours retrieved successfully", Data = tours });
            }
            catch (Exception ex)
            {
                // หากเกิดข้อผิดพลาด
                return StatusCode(500, new { Message = "An error occurred while fetching data", Error = ex.Message });
            }
        }
    }
}
