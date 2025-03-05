using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.Identity.Client;

public class Table
{
    [Key] 
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] 
    public int Table_ID { get; set; }

    [Required] 
    public int Table_Size { get; set; } 

    public decimal Table_Price { get; set; }
}
public class GetTableByIdRequestModel{
    public int Table_ID { get; set;}
}