using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Table
{
    [Key] // 👉 กำหนดให้ Table_ID เป็น Primary Key
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // 👉 ให้เพิ่มค่าอัตโนมัติ
    public int Table_ID { get; set; }

    [Required] // 👉 ห้ามเป็นค่า NULL
    public int Table_Size { get; set; } // 👉 ขนาดโต๊ะ (เช่น 2 ที่นั่ง, 4 ที่นั่ง)

    // [Required] 
    public decimal Table_Price { get; set; } // 👉 ราคาของโต๊ะ
}
