namespace AutoPitApi.Models;

public class User {
    public int Id { get; set; }
    public string? Name { get; set; }
    public string? Email { get; set; }
    public string? ProfilePicture { get; set; }
    public string? GoogleId { get; set; }
    public ICollection<InstructionItem>? Instructions { get; set; }
}