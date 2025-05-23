using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backnet.Models;
public class Order
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Order_ID { get; set; }
    [ForeignKey("User")]
    public int User_ID { get; set; }

    [Required]
    [StringLength(100)]
    public string Province { get; set; }

    [Required]
    [StringLength(200)]
    public string PlaceEvent { get; set; }

    public int GuestAmount { get; set; }

    [Required]
    [Column(TypeName = "date")] // ✅ ใช้ `DATE` ใน SQL Server
    public DateTime Orderdate { get; set; }

    [Required]
    [Column(TypeName = "date")] // ✅ ใช้ `DATE` ใน SQL Server
    public DateTime Eventdate { get; set; }

    public int Table_ID { get; set; }

    public decimal TotalPrice { get; set; }

    public int Cancelled { get; set; }
    public string? Contact_Name { get; set; }

    public string? Payment_Status {get;set;}="pending";
    public string? phone { get; set; }
    public ICollection<OrderDetail> OrderDetail { get; set; }
    public virtual User User { get; set; }

}
