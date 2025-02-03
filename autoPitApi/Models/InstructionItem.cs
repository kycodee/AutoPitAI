namespace AutoPitApi.Models;

public class InstructionItem
{
    public long Id { get; set; }
    public string? Name { get; set; }
    public bool IsComplete { get; set; }
    public int UserId { get; set; }
    public User? User { get; set; }
}