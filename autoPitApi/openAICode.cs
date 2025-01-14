using OpenAI.Chat;
using System;
using dotenv.net;


namespace OpenAI.Examples;
public partial class ChatExamples
{
    public void Example01_SimpleChat()
    {
        DotEnv.Load();

        ChatClient client = new(model: "gpt-4o", apiKey: Environment.GetEnvironmentVariable("OPENAI_API_KEY"));

        ChatCompletion completion = client.CompleteChat("Say 'this is a test.'");

        Console.WriteLine($"[ASSISTANT]: {completion.Content[0].Text}");
    }
}