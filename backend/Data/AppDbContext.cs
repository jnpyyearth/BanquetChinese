// AppDbContext.cs
using Microsoft.EntityFrameworkCore;
using backnet.Models; // Ensure this is included

namespace backnet.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Tour> Tour { get; set; } = null!;
        public DbSet <User> Users{get;set;}=null!;
        public DbSet <Menu> Menu {get;set; } = null!;
        public DbSet <Table> Table {get;set; } = null!;
        public DbSet <Order> Order {get;set; } = null!;
        public DbSet <OrderDetail> OrderDetail {get;set; } = null!;
        // public DbSet<Customer> Customers { get; set; } = null!;
    protected override void OnModelCreating(ModelBuilder modelBuilder)
{
    modelBuilder.Entity<Order>()
        .Property(o => o.Orderdate)
        .HasColumnType("date"); // 👉 บอกให้ใช้ SQL Server `DATE` แทน `DATETIME2`
    
    modelBuilder.Entity<Order>()
        .Property(o => o.Eventdate)
        .HasColumnType("date"); // 👉 ใช้กับ Eventdate ด้วย
}

    } 
}