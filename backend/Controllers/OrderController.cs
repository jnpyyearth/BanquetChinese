using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using backnet.Models;
using backnet.Data;
using Microsoft.Identity.Client; // นำเข้า Models
[ApiController]
[Route("api/orders")]
public class OrderController : ControllerBase{
    private readonly AppDbContext _context;
    public OrderController(AppDbContext context){//
        _context = context;
    }//
    [HttpPost("addOrder")]
    public async Task<IActionResult> CreateOrder([FromBody] OrderRequestModel orderRequest){
        if(orderRequest==null||orderRequest.OrderDetails==null||orderRequest.OrderDetails.Count==0){//
            return BadRequest("Invalid order data");
        }//
        using(var transaction = await _context.Database.BeginTransactionAsync()){
            try{//get user_ID
                var user = await _context.Users.FirstOrDefaultAsync(u=>u.username ==orderRequest.username);
                if(user==null){//
                    return BadRequest("User not found");
                }//
                    //query Table_Size Table_Price
                    var table = await _context.Table.FirstOrDefaultAsync(t=>t.Table_ID==orderRequest.Table_ID);
                    if(table ==null){//
                        return BadRequest("Table not found");
                    }//
                    decimal TotalPrice =(table.Table_Price+orderRequest.SumMenuPrice)*((decimal)orderRequest.GuestAmount/table.Table_Size);
                    var order = new Order{
                    User_ID = user.User_ID, // ได้จากการ Query
                    Province = orderRequest.Province,
                    PlaceEvent = orderRequest.PlaceEvent,
                    GuestAmount = orderRequest.GuestAmount,
                    Orderdate = orderRequest.Orderdate,
                    Eventdate = orderRequest.Eventdate,
                    Table_ID = orderRequest.Table_ID,
                    Contact_Name=orderRequest.Contact_Name,
                    TotalPrice = TotalPrice, 
                    phone = orderRequest.phone,
                    
                    };
                    _context.Order.Add(order);
                    await _context.SaveChangesAsync();

                    var orderDetail =orderRequest.OrderDetails.Select(detail =>new OrderDetail{
                        Order_ID =order.Order_ID,
                        Menu_ID =detail.Menu_ID
                    }).ToList();
                    _context.OrderDetail.AddRange(orderDetail);
                    await _context.SaveChangesAsync();
                    await transaction.CommitAsync();
                    return Ok(new{message="Order created successfully!",Order_ID =order.Order_ID,TotalPrice =TotalPrice});
                }catch{
                    await transaction.RollbackAsync();
                    return StatusCode(500,"Error while creating order.");
                };
            }
           
        }
         [HttpGet("getOrderReport")]
            public async Task<IActionResult> GetOrderReport(){
                try{
                    var order = await _context.Order 
            .Include(o => o.User) // ดึงข้อมูล User ที่เกี่ยวข้อง
            .Select(o => new 
            {
                o.Order_ID,
                o.User_ID,
                Username = o.User.username, // เพิ่ม Username
                o.Province,
                o.PlaceEvent,
                o.GuestAmount,
                o.Orderdate,
                o.Eventdate,
                o.Table_ID,
                o.TotalPrice,
                o.Cancelled,
                o.Contact_Name,
                o.Payment_Status,
                o.phone
            })
            .ToListAsync();
                    if(order==null || !order.Any()){
                        return BadRequest("not found order");
                    }
                    return Ok(new{message="query successful Data=",Data=order});
                }catch(Exception ex){
                    return StatusCode(500,new{message="internal error",Error=ex.Message});    
                }
            }
    }







