public class MenuDTO
{
    public int Menu_ID { get; set; }
    public string Menu_Name { get; set; }
    public string Menu_Type { get; set; }
    public string? Menu_Picturename { get; set; }
    public decimal? Menu_Price { get; set; }
}

//เอาไว้ใช้รับส่งข้อมูลเมนูต่างๆ ที่มีในระบบ