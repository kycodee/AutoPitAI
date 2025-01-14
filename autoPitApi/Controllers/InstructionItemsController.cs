using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using AutoPitApi.Models;
using OpenAI.Chat;
using dotenv.net;


namespace autoPitApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class InstructionItemsController : ControllerBase
    {
        private readonly InstructionContext _context;

        public InstructionItemsController(InstructionContext context)
        {
            _context = context;
        }

        // GET: api/InstructionItems
        [HttpGet]
        public async Task<ActionResult<IEnumerable<InstructionItem>>> GetInstructionItems()
        {
        //     DotEnv.Load();

        // ChatClient client = new(model: "gpt-4o", apiKey: Environment.GetEnvironmentVariable("OPENAI_API_KEY"));

        // ChatCompletion completion = client.CompleteChat("Say 'this is a test.'");

        // Console.WriteLine($"[ASSISTANT]: {completion.Content[0].Text}");
            return await _context.InstructionItems.ToListAsync();
        }

        // GET: api/InstructionItems/5
        [HttpGet("{id}")]
        public async Task<ActionResult<InstructionItem>> GetInstructionItem(long id)
        {
            var instructionItem = await _context.InstructionItems.FindAsync(id);

            if (instructionItem == null)
            {
                return NotFound();
            }

            return instructionItem;
        }

        // PUT: api/InstructionItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutInstructionItem(long id, InstructionItem instructionItem)
        {
            if (id != instructionItem.Id)
            {
                return BadRequest();
            }

            _context.Entry(instructionItem).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!InstructionItemExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/InstructionItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<InstructionItem>> PostInstructionItem(InstructionItem instructionItem)
        {
            _context.InstructionItems.Add(instructionItem);
            await _context.SaveChangesAsync();

            // return CreatedAtAction("GetInstructionItem", new { id = instructionItem.Id }, instructionItem);
            return CreatedAtAction(nameof(GetInstructionItem), new { id = instructionItem.Id }, instructionItem);
        }

        // DELETE: api/InstructionItems/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteInstructionItem(long id)
        {
            var instructionItem = await _context.InstructionItems.FindAsync(id);
            if (instructionItem == null)
            {
                return NotFound();
            }

            _context.InstructionItems.Remove(instructionItem);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool InstructionItemExists(long id)
        {
            return _context.InstructionItems.Any(e => e.Id == id);
        }
    }
}
