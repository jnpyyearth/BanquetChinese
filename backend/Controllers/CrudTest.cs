using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Mvc; 
namespace CT.Controllers;
[ApiController]
[Route("api")]
public class CrudTestController : ControllerBase{
    private static List<Product>_products =new List<Product>{
        new Product{Id =1,Name="Laptop",Price =1000},
        new Product{Id =2,Name ="Mouse",Price =20}
    };

    //1.ดึงข้อมูลทั้งหมด
    [HttpGet("getProducts")]
    public IActionResult GetAllProduct(){
        return Ok(_products);
    }
    //2.query by Id
    [HttpGet("getById/{id}")]
    public IActionResult GetProductById(int id){
        var product =_products.FirstOrDefault(p=>p.Id==id);
        if(product==null){
            return NotFound($"Product with ID {id} not found.");
        }
        return Ok(product);
    }

    //3.addProducts
    [HttpPost("addProduct")]
    public IActionResult AddProduct([FromBody]Product  newProduct){
        if(newProduct ==null||string.IsNullOrWhiteSpace(newProduct.Name)){
            return BadRequest("Invalid product data.");//400 bad request
        }
        newProduct.Id =_products.Any()?_products.Max(p=>p.Id)+1:1;
        _products.Add(newProduct);
        return CreatedAtAction(nameof(GetProductById),new{id =newProduct.Id},newProduct); //201 created
    }
    //4.updateProduct
    [HttpPut("updateProduct/{id}")]
public IActionResult UpdateProduct(int id,[FromBody] Product updateProduct){
    var product =_products.FirstOrDefault(p=>p.Id==id);
    if(product ==null){
        return NotFound($"Product with ID {id}not found");//404 notfound
    }
    product.Name =updateProduct.Name;
    product.Price =updateProduct.Price;
    return Ok(updateProduct);//204 No Content
}
//5.deleteProduct
[HttpDelete("DeleteProduct/{id}")]
public IActionResult DeleteProduct(int id){
    var product =_products.FirstOrDefault(p=>p.Id==id);
    if(product ==null){
        return NotFound($"Product with ID {id} not found");
    }
    _products.Remove(product);
    return Ok($"Product with ID {id}deleted");//200 ok
}
}
public class Product{
    public int Id {get;set;}
    public string Name{get;set;}
    public double Price{get;set;}   
}