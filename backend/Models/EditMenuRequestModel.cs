using System.ComponentModel.DataAnnotations;

namespace backnet.Models;
public class EditMenuModel{
    
    
    public string Menu_Name { get; set; }
    public decimal Menu_Price{ get; set; }
    
}
public class CancelMenuModel{
    public int Menu_Status { get; set; }
}