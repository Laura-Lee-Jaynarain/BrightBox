using AutoMapper;
using backend_NET.ApiModels;
using backend_NET.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace backend_NET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class NotificationController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly INotificationRepository _notificationRepository;
        private readonly IUserRepository _userRepository;

        public NotificationController(INotificationRepository notificationRepository, IUserRepository userRepository, IMapper mapper)
        {
            _notificationRepository = notificationRepository;
            _userRepository = userRepository;
            _mapper = mapper;
        }

        [HttpGet("of/{id}")]
        public ActionResult<IEnumerable<ReturnNotificationDTO>> GetNotificationsOf(Guid id) { 
            User? user = _userRepository.GetUser(id);
            if (user == null)
            {
                return NotFound();
            }
            else
            {
                IEnumerable<Notification> notifications = _notificationRepository.GetNotificationsOf(user);
                IEnumerable<ReturnNotificationDTO> notificationDTOs = _mapper.Map<IEnumerable<ReturnNotificationDTO>>(notifications);
                return Ok(notificationDTOs);
            }
        }

        [HttpPut("read/{id}")]
        public IActionResult ReadNotification(Guid id)
        {
            bool result = _notificationRepository.MarkNotificationAsRead(id);
            if (result)
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }

        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteNotification(Guid id)
        {
            bool result = _notificationRepository.RemoveNotification(id);
            if (result)
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }

        [HttpPost]
        public IActionResult PostNotification(CreateNotificationDTO model)
        {
            Notification newNotification = _mapper.Map<Notification>(model);
            newNotification.User = _userRepository.GetUser(model.UserId);
            _notificationRepository.AddNotification(newNotification);
            return Created();
        }
    }
}
