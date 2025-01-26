using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

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

   
}
