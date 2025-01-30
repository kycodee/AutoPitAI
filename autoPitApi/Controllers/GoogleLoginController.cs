using Microsoft.AspNetCore.Mvc;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Google;

namespace autoPitApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GoogleLoginController : Controller
    {
        /// <summary>
        /// Google Login Redirection To Google Login Page
        /// </summary>
        /// <returns></returns>
        [HttpGet("login")]
        public IActionResult Index()
        {
            return new ChallengeResult(
                GoogleDefaults.AuthenticationScheme,
                new AuthenticationProperties
                {
                    RedirectUri = Url.Action("GoogleResponse", "GoogleLogin") // Where google responds back
                });
        }


        /// <summary>
        /// Google Login Response After Login Operation From Google Page
        /// </summary>
        /// <returns></returns>
        [HttpGet("response")]
        public async Task<IActionResult> GoogleResponse()
        {
            //Check authentication response as mentioned on startup file as o.DefaultSignInScheme = "External"
            var authenticateResult = await HttpContext.AuthenticateAsync("External");
            if (!authenticateResult.Succeeded)
                return BadRequest(); // TODO: Handle this better.

            //Check if the redirection has been done via google or any other links
            if (authenticateResult.Principal.Identities.ToList()[0].AuthenticationType!.ToLower() == "google")
            {
                //check if principal value exists or not 
                if (authenticateResult.Principal != null)
                {
                    //get google account id for any operation to be carried out on the basis of the id
                    var googleAccountId = authenticateResult.Principal.FindFirst(ClaimTypes.NameIdentifier)?.Value;
                    //claim value initialization as mentioned on the startup file with o.DefaultScheme = "Application"
                    var claimsIdentity = new ClaimsIdentity("Application");
                    if (authenticateResult.Principal != null)
                    {
                        //Now add the values on claim and redirect to the page to be accessed after successful login
                        var details = authenticateResult.Principal.Claims.ToList();
                        claimsIdentity.AddClaim(authenticateResult.Principal.FindFirst(ClaimTypes.NameIdentifier)!);// Full Name Of The User
                        claimsIdentity.AddClaim(authenticateResult.Principal.FindFirst(ClaimTypes.Email)!); // Email Address of The User
                        await HttpContext.SignInAsync("Application", new ClaimsPrincipal(claimsIdentity));
                        return Redirect("https://www.airbnb.com");
                    }
                }
            }
            return RedirectToAction("Index", "Home");
        }


        /// <summary>
        /// Google Login Sign out
        /// </summary>
        /// <returns></returns>
        [HttpPost("signout")]
        public async Task SignOutFromGoogleLogin()
        {
            //Check if any cookie value is present
            if (HttpContext.Request.Cookies.Count > 0)
            {
                //Check for the cookie value with the name mentioned for authentication and delete each cookie
                var siteCookies = HttpContext.Request.Cookies.Where(c => c.Key.Contains(".AspNetCore.") || c.Key.Contains("Microsoft.Authentication"));
                foreach (var cookie in siteCookies)
                {
                    Response.Cookies.Delete(cookie.Key);
                }
            }
            //signout with any cookie present 
            await HttpContext.SignOutAsync("External");
            RedirectToAction("Index", "Home");
        }
    }
}