using F1Atlas.Core.Models;
namespace F1Atlas.Web.Services;

public class CircuitService
{
    private readonly HttpClient _httpClient;

    public CircuitService(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<List<Circuit>> GetCircuits()
    {
        var circuits = await _httpClient.GetFromJsonAsync<List<Circuit>>(
            "api/circuits"
        );

        return circuits ?? new List<Circuit>();
    }
}