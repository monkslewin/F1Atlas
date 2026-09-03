namespace F1Atlas.Core.Models;

public class CircuitStatistics
{
    public int Year { get; set; }

    public string CircuitName { get; set; } = "";
    public string Winner { get; set; } = "";
    public string PolePosition { get; set; } = "";

    public string PolePositionResult { get; set; } = "";

    public string FastestLap { get; set; } = "";

    public string FastestLapTime { get; set; } = "";

    public string WinMargin { get; set; } = "";

    public bool HasRaceHappened { get; set; }
}