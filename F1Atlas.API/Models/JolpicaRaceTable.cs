namespace F1Atlas.API.Models;

public class JolpicaRaceTable
{
    public string CircuitId { get; set; } = "";

    public List<JolpicaRace> Races { get; set; } = new();
}