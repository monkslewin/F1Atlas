namespace F1Atlas.Core.Models;

public class Circuit
{
    public string Id { get; set; } = string.Empty;
    public string Name { get; set; } = string.Empty;

    public double Latitude { get; set; }

    public double Longitude { get; set; }

    public string Locality { get; set; } = string.Empty;

    public string Country { get; set; } = string.Empty;
}

