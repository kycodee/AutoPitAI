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



        ChatCompletion completion = client.CompleteChat([$"{userRequest}", new SystemChatMessage("You are a helpful assistant that talks like a cool mechanic. If a user tells you what kind of car they have and says a specific car part, give them a list of tools needed and a list of instructions to fix it. If they ask another question about their car, just give them the info.")]);
        // ChatCompletion completion = client.CompleteChat("Tell me what the weather is like in Baton Rouge and give me a couple of events happening in the city this weekend");
        // var completion = client.CompleteChat("Say 'this is a test.'");

        // Console.WriteLine($"[ASSISTANT]: {completion.Content[0].Text}");
        return Ok($"{completion.Content[0].Text}");
        // return Ok($"{completion.Value}");
    }

    //working version
    // [HttpGet]
    // public IActionResult GetOpenAiTest()
    // {
    //     // ChatClient client = new(model: "gpt-4o-mini", apiKey: "my api key was here");
    //     ChatClient client = new(model: "gpt-4o-mini", apiKey: Environment.GetEnvironmentVariable("OPENAI_API_KEY"));

    //     // ChatCompletion completion = client.CompleteChat($"{chatRequest}");
    //     ChatCompletion completion = client.CompleteChat("Tell me what the weather is like in Baton Rouge and give me a couple of events happening in the city this weekend");
    //     // var completion = client.CompleteChat("Say 'this is a test.'");

    //     // Console.WriteLine($"[ASSISTANT]: {completion.Content[0].Text}");
    //     return Ok($"{completion.Content[0].Text}");
    //     // return Ok($"{completion.Value}");
    // }

    

}

