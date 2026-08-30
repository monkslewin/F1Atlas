using F1Atlas.API.Models;

namespace F1Atlas.API.Services;

public class F1Service
{
    private readonly HttpClient _httpClient;

    public F1Service(HttpClient httpClient)
    {
        _httpClient = httpClient;
    }

    public async Task<JolpicaResponse> GetCircuits()
    {
        _httpClient.DefaultRequestHeaders.UserAgent.ParseAdd("F1Atlas/1.0.0");

        var response = await _httpClient.GetFromJsonAsync<JolpicaResponse>(
            "https://api.jolpi.ca/ergast/f1/2026/circuits"

        ) ?? throw new Exception("Error getting data from API. Please try again later.");
        
        Console.WriteLine(response);
        return response;
    }
}