using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema; // ต้องใช้ namespace นี้

namespace backnet.Models
{
    public partial class Tour
    {
        [Key]
        [Column("Tour_ID")]  
        public int Tour_Id { get; set; }

        [Column("Tour_Name")]  
        public string TourName { get; set; } = null!;

        [Column("Tour_Country")]  // กำหนดชื่อคอลัมน์ในฐานข้อมูลให้เป็น "Tour_Country"
        public string TourCountry { get; set; } = null!;

        [Column("Tour_Picture")]  // กำหนดชื่อคอลัมน์ในฐานข้อมูลให้เป็น "Tour_Picture"
        public string? TourPicture { get; set; }

        [Column("Hotel")]  // กำหนดชื่อคอลัมน์ในฐานข้อมูลให้เป็น "Hotel"
        public string? Hotel { get; set; }

        [Column("Type_Status")]  // กำหนดชื่อคอลัมน์ในฐานข้อมูลให้เป็น "Type_Status"
        public string? TypeStatus { get; set; }
    }
}
