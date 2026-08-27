namespace F1Atlas.API.Models;

public class JolpicaCircuit
{
    public string CircuitId { get; set; } = string.Empty;

    public string CircuitName { get; set; } = string.Empty;

    public JolpicaLocation Location { get; set; } = new();
}