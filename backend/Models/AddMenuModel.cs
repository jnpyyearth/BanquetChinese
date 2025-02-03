using System.ComponentModel.DataAnnotations;

namespace backnet.Models;
public class ADdMenuModel
{
   [Key]
   public int Menu_ID {set;get;}
    public string Menu_Name {set;get;} 
    public string Menu_Type {set;get;}  

    public string? Menu_Picturename {set;get;} =null!;

    public decimal? Menu_Price {set;get;} =null!;
}