using Microsoft.EntityFrameworkCore;

namespace AutoPitApi.Models;

public class InstructionContext : DbContext
{
    public InstructionContext(DbContextOptions<InstructionContext> options)
        : base(options)
    {
    }

    public DbSet<InstructionItem> InstructionItems { get; set; } = null!;
}
