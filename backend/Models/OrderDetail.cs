using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backnet.Models;

public class OrderDetail
{
    [Key] // 👉 กำหนดให้ OrderDetail_ID เป็น Primary Key
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)] // 👉 ให้เพิ่มค่าอัตโนมัติ
    public int OrderDetail_ID { get; set; }

    [Required]
    [ForeignKey("Order")] // 👉 เชื่อมกับ Order (FK)
    public int Order_ID { get; set; }

    [Required]
    [ForeignKey("Menu")] // 👉 เชื่อมกับ Menu (FK)
    public int Menu_ID { get; set; }

    // ✅ Navigation Properties (เชื่อมกับตารางอื่น)
    public Order Order { get; set; }
    public Menu Menu { get; set; }
}
