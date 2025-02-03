// using System;
// using System.Collections.Generic;
// using System.Linq;
// using System.Threading.Tasks;
// using Microsoft.AspNetCore.Http;
// using Microsoft.AspNetCore.Mvc;
// using Microsoft.EntityFrameworkCore;
// using AutoPitApi.Models;
// using OpenAI.Chat;
// using dotenv.net;


// namespace autoPitApi.Controllers
// {
//     [Route("api/[controller]")]
//     [ApiController]
//     public class UsersController : ControllerBase
//     {
//         private readonly UserContext _context;

//         public UsersController(UserContext context)
//         {
//             _context = context;
//         }

//         // GET: api/Users
//         [HttpGet]
//         public async Task<ActionResult<IEnumerable<User>>> GetUsers()
//         {
//         //     DotEnv.Load();

//         // ChatClient client = new(model: "gpt-4o", apiKey: Environment.GetEnvironmentVariable("OPENAI_API_KEY"));

//         // ChatCompletion completion = client.CompleteChat("Say 'this is a test.'");

//         // Console.WriteLine($"[ASSISTANT]: {completion.Content[0].Text}");
//             return await _context.Users.ToListAsync();
//         }

//         // GET: api/Users/5
//         [HttpGet("{id}")]
//         public async Task<ActionResult<User>> GetUser(long id)
//         {
//             var user = await _context.Users.FindAsync(id);

//             if (user == null)
//             {
//                 return NotFound();
//             }

//             return user;
//         }

//         // PUT: api/Users/5
//         // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
//         [HttpPut("{id}")]
//         public async Task<IActionResult> PutUser(long id, User User)
//         {
//             if (id != User.Id)
//             {
//                 return BadRequest();
//             }

//             _context.Entry(User).State = EntityState.Modified;

//             try
//             {
//                 await _context.SaveChangesAsync();
//             }
//             catch (DbUpdateConcurrencyException)
//             {
//                 if (!UserExists(id))
//                 {
//                     return NotFound();
//                 }
//                 else
//                 {
//                     throw;
//                 }
//             }

//             return NoContent();
//         }

//         // POST: api/Users
//         // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
//         [HttpPost]
//         public async Task<ActionResult<User>> PostUser(User User)
//         {
//             _context.Users.Add(User);
//             await _context.SaveChangesAsync();

//             // return CreatedAtAction("GetUser", new { id = User.Id }, User);
//             return CreatedAtAction(nameof(GetUser), new { id = User.Id }, User);
//         }

//         // DELETE: api/Users/5
//         [HttpDelete("{id}")]
//         public async Task<IActionResult> DeleteUser(long id)
//         {
//             var User = await _context.Users.FindAsync(id);
//             if (User == null)
//             {
//                 return NotFound();
//             }

//             _context.Users.Remove(User);
//             await _context.SaveChangesAsync();

//             return NoContent();
//         }

//         private bool UserExists(long id)
//         {
//             return _context.Users.Any(e => e.Id == id);
//         }
//     }
// }
