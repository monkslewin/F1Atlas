namespace F1Atlas.API.Models;

public class JolpicaRace
{
    public string Season { get; set; } = "";
    public string Round { get; set; } = "";

    public string Date { get; set; } = "";
    
    public JolpicaCircuit Circuit { get; set; } = new();
    public List<JolpicaResult> Results { get; set; } = new();
}