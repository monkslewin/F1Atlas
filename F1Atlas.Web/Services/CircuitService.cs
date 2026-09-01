using F1Atlas.Core.Models;
using F1Atlas.Web.Components;
namespace F1Atlas.Web.Services;

public class CircuitService
{
    private readonly HttpClient _httpClient;

    public CircuitService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<List<Circuit>> GetCircuits(int year)
    {
        var circuits = await _httpClient.GetFromJsonAsync<List<Circuit>>(
            $"api/circuits/{year}"
        );

        return circuits ?? new List<Circuit>();
    }

    public async Task<CircuitStatistics?> GetCircuitStatistics(string circuitId, int year)
    {
        var statistics = await _httpClient.GetFromJsonAsync<CircuitStatistics>(
            $"api/circuits/{year}/{circuitId}/statistics"
        );

        return statistics;
    }
}