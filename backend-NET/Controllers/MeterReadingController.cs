
using AutoMapper;
using backend_NET.ApiModels;
using backend_NET.Models;
using Microsoft.AspNetCore.Mvc;



namespace backend_NET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MeterReadingController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly IMeterReadingRepository _repository;
        private readonly IUserRepository _userRepository;
        private readonly INotificationRepository _notificationRepository;

        public MeterReadingController(IMeterReadingRepository repository, IUserRepository userRepository, IMapper mapper, INotificationRepository notificationRepository)
        {
            _repository = repository;
            _userRepository = userRepository;
            _mapper = mapper;
            _notificationRepository = notificationRepository;
        }

        [HttpPost()]
        public async Task<ActionResult<MeterReading>> PostReading([FromForm] CreateMeterReadingDTO model)
        {
            string[] allowed = ["image/png", "image/jpeg"];
            if (!allowed.Contains(model.File.ContentType))
            {
                return BadRequest("Only PNG and JPG are allowed");
            }

            byte[] bytes;
            using (var ms = new MemoryStream())
            {
                await model.File.CopyToAsync(ms);
                bytes = ms.ToArray();
            }

            MeterReading newReading = _mapper.Map<MeterReading>(model);
            newReading.User = _userRepository.GetUser(model.UserId);
            newReading.MeterImage = bytes;
            newReading.Time = MeterReading.ExtractTimestamp(bytes);
            newReading.Status = Status.PENDING;
            _repository.AddReading(newReading);

            return Created();
        }

        [HttpGet("{id}/recent")]
        public ActionResult<IEnumerable<ReturnMeterReadingDTO>> GetRecentReadings(Guid id)
        {
            IEnumerable<MeterReading> readings = _repository.GetRecentReadingsOf(_userRepository.GetUser(id));
            IEnumerable<ReturnMeterReadingDTO> readingsDTO = _mapper.Map<IEnumerable<ReturnMeterReadingDTO>>(readings);
            return Ok(readingsDTO);
        }

        [HttpGet("{id}")]
        public ActionResult<GetMeterInfoDTO> GetUploadMeterPageInfo(Guid id)
        {
            User user = _userRepository.GetUser(id);
            IEnumerable<MeterReading> readings = _repository.GetReadingsOf(_userRepository.GetUser(id));
            GetMeterInfoDTO uploadMeterInfo = new GetMeterInfoDTO();
            uploadMeterInfo.RecentSubmissions = _mapper.Map<IEnumerable<ReturnMeterReadingDTO>>(readings);
            uploadMeterInfo.Progress = Math.Min(_repository.GetWeekProgress(user), uploadMeterInfo.Target);
            if (uploadMeterInfo.Progress == 7)
            {
                Notification newNotif = Notification.CreateNewNotification(user, "Reached weekly goal", "Congratulations, you've reached your weekly meterreading upload goal! Keep it up!", NotificationType.SUCCESS);
                _notificationRepository.AddNotification(newNotif);
            }
            return Ok(uploadMeterInfo);
        }
    }
}

