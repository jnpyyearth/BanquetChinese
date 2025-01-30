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
        // public DbSet<Customer> Customers { get; set; } = null!;

    } 
}