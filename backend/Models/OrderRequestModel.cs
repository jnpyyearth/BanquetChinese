using System.ComponentModel.DataAnnotations;
namespace backnet.Models;
   using System;
using System.Collections.Generic;


public class OrderRequestModel{
    // public int User_ID { get; set; }  
    // public string Contact_Name { get; set; } =null!; 
    // public string Province { get; set;}=null!;
    // public string PlaceEvent { get; set; } =null!;

    // public string 
 

    public string username { get; set; }
    public string Province { get; set; }
    public string PlaceEvent { get; set; }
    public int GuestAmount { get; set; }
    public DateTime Orderdate { get; set; }
    public DateTime Eventdate { get; set; }
    public int Table_ID { get; set; }
   
    public decimal SumMenuPrice { get; set; }
     public string Contact_Name { get; set; }
        public List<OrderDetailDto> OrderDetails { get; set; }
}

public class OrderDetailDto
{
    public int Menu_ID { get; set; }
}


