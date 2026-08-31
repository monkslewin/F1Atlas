namespace F1Atlas.API.Models;

public class JolpicaMRData
{
    public JolpicaCircuitTable CircuitTable { get; set; } = new();

    public JolpicaRaceTable? RaceTable { get; set; }
    
}