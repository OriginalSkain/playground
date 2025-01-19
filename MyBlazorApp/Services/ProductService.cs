using Microsoft.EntityFrameworkCore;
using MyBlazorApp.Data;
using MyBlazorApp.Models;

public class ProductService
{
    private readonly ApplicationDbContext _context;

    public ProductService(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<List<Product>> GetProductsAsync()
    {
        //_context.ChangeTracker.Clear();
        var items =  await _context.Products.ToListAsync();

        return items;
    }
}
