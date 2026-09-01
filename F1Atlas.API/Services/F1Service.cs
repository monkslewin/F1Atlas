using F1Atlas.API.Models;
using F1Atlas.Core.Models;

namespace F1Atlas.API.Services;

public class F1Service
{
    private readonly HttpClient _httpClient;

    public F1Service(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<List<Circuit>> GetCircuits()
    {
        _httpClient.DefaultRequestHeaders.UserAgent.ParseAdd(
            "F1Atlas/1.0.0"
        );

        var response = await _httpClient.GetFromJsonAsync<JolpicaResponse>(
            "https://api.jolpi.ca/ergast/f1/2026/circuits"
        ) ?? throw new Exception(
            "Error getting data from API. Please try again later."
        );

        var circuits = new List<Circuit>();

        foreach (var jolpicaCircuit in response.MRData.CircuitTable.Circuits)
        {
            var circuit = new Circuit
            {
                Id = jolpicaCircuit.CircuitId,
                Name = jolpicaCircuit.CircuitName,
                Latitude = double.Parse(jolpicaCircuit.Location.Lat),
                Longitude = double.Parse(jolpicaCircuit.Location.Long),
                Locality = jolpicaCircuit.Location.Locality,
                Country = jolpicaCircuit.Location.Country
            };

            circuits.Add(circuit);
        }

        return circuits;
    }

    public async Task<CircuitStatistics?> GetCircuitStatistics(string circuitId)
    {
        _httpClient.DefaultRequestHeaders.UserAgent.ParseAdd(
            "F1Atlas/1.0.0"
        );

        var response = await _httpClient.GetFromJsonAsync<JolpicaResponse>(
            $"https://api.jolpi.ca/ergast/f1/2026/circuits/{circuitId}/results/"
        ) ?? throw new Exception(
            "Error getting data from API. Please try again later."
        );

        var races = response.MRData.RaceTable.Races;

        if (races.Count == 0)
        {
            return null;
        }

        var race = races.First();

        var date = DateTime.Parse(race.Date);

        var winner = race.Results
            .FirstOrDefault(result => result.Position == "1");

        var secondPlace = race.Results
            .FirstOrDefault(result => result.Position == "2");

        var fastestLap = race.Results
            .Where(result => result.FastestLap != null)
            .OrderBy(result => result.FastestLap!.Time.Time)
            .FirstOrDefault();

        return new CircuitStatistics
        {
            CircuitName = race.Circuit.CircuitName,

            Winner = winner == null
                ? "N/A"
                : $"{winner.Driver.GivenName} {winner.Driver.FamilyName}",
            

            WinMargin = secondPlace?.Time?.Time ?? "N/A",

            FastestLap = fastestLap == null
                ? "N/A"
                : $"{fastestLap.Driver.GivenName} {fastestLap.Driver.FamilyName}",

            FastestLapTime = fastestLap == null
                ? "N/A"
                : fastestLap.FastestLap!.Time.Time,

            HasRaceHappened = date <= DateTime.Today,
        };
    }
}