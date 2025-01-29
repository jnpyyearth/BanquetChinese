using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
namespace backnet.Models;
public class Menu{
    [Key]
   public int Menu_ID {set;get;}
    public string Menu_Name {set;get;} 
    public string Menu_Type {set;get;}  

    public string? Menu_Picturename {set;get;} =null!;

    public int? Menu_Status {set;get;} =null!;
}