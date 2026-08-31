using F1Atlas.API.Services;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/[controller]")]
public class CircuitsController : ControllerBase
{
    private readonly F1Service _F1Service;

    public CircuitsController(F1Service F1Service)
    {
        _F1Service = F1Service;
    }

    // expose service so frontend can access circuit data
    [HttpGet]
    public async Task<IActionResult> GetCircuits()
    {
        var circuits = await _F1Service.GetCircuits();

        return Ok(circuits);
    }

    [HttpGet("{circuitId}/statistics")]
    public async Task<IActionResult> GetStatistics(string circuitId)
    {
        var statistics = await _F1Service.GetCircuitStatistics(circuitId);

        return Ok(statistics);
    }

}