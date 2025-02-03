using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using OpenAI.Chat;
using dotenv.net;
using Microsoft.AspNetCore.SignalR.Protocol;


namespace autoPitApi.Controllers;

[Route("api/[controller]")]
[ApiController]

public class OpenAiController : ControllerBase
{
    private readonly ILogger<OpenAiController> _logger;


    public OpenAiController(ILogger<OpenAiController> logger)
    {
        _logger = logger;
        DotEnv.Load();
    }

    [HttpGet("{userRequest}")]
    public IActionResult GetOpenAiTest(string userRequest)
    {
        // ChatClient client = new(model: "gpt-4o-mini", apiKey: "my api key was here");
        ChatClient client = new(model: "gpt-4o-mini", apiKey: Environment.GetEnvironmentVariable("OPENAI_API_KEY"));


        //testing if I can set the openai system message to be an assistant with vehicles



        ChatCompletion completion = client.CompleteChat([$"{userRequest}", new SystemChatMessage("You are a helpful assistant that talks like a cool mechanic. " + 
        "If a user tells you what kind of car they have and says a specific car part, give them a list of specific tools needed, a list of parts with specific part numbers if needed, and a list of specific instructions to fix it. " + 
        "If it requires a certain size socket, tell them the exact socket they need. " +
        "If it requires a certain mesaurement amount, such as 6 quarts of oil for an oil change, be sure to tell them that specific amount. " +
        "These instructions should be specific to THEIR vehicle, not just general information. " + 
        "If they ask another question about their car, just give them the info. " +
        "When you return the proper information, only have a tools needed, parts needed, or instructions section. " + 
        "Don't make any other sections, such as a supplies needed section." + 
        "The sections should be structured like, ### Tools Needed:, ### Instructions:, and/or ### Parts Needed:." + 
        "The instructions should be structured like, 1. **Safety First**: Make sure your car is parked on a flat surface, and turn off the ignition. Pop the hood and secure it with the prop rod." + 
        "Every item under any of these lists should be structured in an ordered list with asteriks like this, 1. **Flathead screwdriver** or **Plastic trim tool**: For removing clips (if necessary).")]);
   

        return Ok($"{completion.Content[0].Text}");
    }

  
    

}

