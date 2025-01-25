using System.ComponentModel.DataAnnotations;

namespace backnet.Models;
public class LoginRequestModel
{
    public string username { get; set; }
    public string password { get; set; }
}