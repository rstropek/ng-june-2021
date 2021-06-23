using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using UserManagement.WebApi.Services;

namespace UserManagement.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserManagementService userManagementService;

        public UsersController(IUserManagementService userManagementService)
        {
            this.userManagementService = userManagementService;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetAll([FromQuery(Name = "q")] string? nameFilter)
        {
            if (nameFilter != null)
            {
                return Ok(await userManagementService.GetFiltered(nameFilter));
            }

            return Ok(await userManagementService.GetAll());
        }

        [HttpPost]
        public async Task<ActionResult<User>> Add([FromBody] NewUser u)
            // In practice, consider returning CREATED (201) instead of OK (200)
            => Ok(await userManagementService.Add(u));

        [HttpDelete("{userId}")]
        public async Task<ActionResult> Delete(Guid userId)
        {
            await userManagementService.Delete(userId);

            // In practice, return NOT FOUND if given user id does not exist
            return NoContent();
        }

        [HttpPatch("{userId}")]
        public async Task<ActionResult<User>> Patch(Guid userId, [FromBody] PatchUser p)
            // In practice, return NOT FOUND if given user id does not exist
            => Ok(await userManagementService.Patch(userId, p));
    }
}
