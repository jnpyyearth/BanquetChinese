using System.ComponentModel.DataAnnotations;
namespace backnet.Models;
public class RegisterRequestModel{
   public string username { get; set; } = null!;

    public string password { get; set; } = null!;

    public string email { get; set; } = null!;

    public string firstname { get; set; } = null!;

    public string lastname { get; set; } = null!;

    public string phone { get; set; } = null!;

    public string confirmpassword { get; set; } = null!;

    public string? role { get; set; }=null!;

    public string? User_Address { get; set; } = null!; 
   

}