using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backnet.Models;

public partial class User
{
    [Key]
    public int User_ID { get; set; }

    public string username { get; set; } = null!;

    public string password { get; set; } = null!;

    public string email { get; set; } = null!;

    public string firstname { get; set; } = null!;

    public string lastname { get; set; } = null!;

    public string phone { get; set; } = null!;

    public string? role { get; set; }

    public string? User_Address { get; set; }=null!;

    [NotMapped] // ระบุว่าไม่ต้องแมปกับฐานข้อมูล
     public string confirmPassword { get; set; } = null!;
   public virtual ICollection<Order> Orders { get; set; } = new List<Order>();

}
