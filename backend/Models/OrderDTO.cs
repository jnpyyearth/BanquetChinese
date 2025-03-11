public class OrderDTO
{
    public int Order_ID { get; set; }
    public string Province { get; set; }
    public string PlaceEvent { get; set; }
    public int GuestAmount { get; set; }
    public DateTime Orderdate { get; set; }
    public DateTime Eventdate { get; set; }
    public decimal TotalPrice { get; set; }
    public string? Contact_Name { get; set; }
    public string? Payment_Status { get; set; }

    
    public List<MenuDTO> Menus { get; set; } = new List<MenuDTO>();
}
