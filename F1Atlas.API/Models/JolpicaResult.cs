namespace F1Atlas.API.Models;

public class JolpicaResult
{
    public string Position { get; set; } = "";
    public JolpicaDriver Driver { get; set; } = new();
    public JolpicaFastestLap? FastestLap { get; set; }
}