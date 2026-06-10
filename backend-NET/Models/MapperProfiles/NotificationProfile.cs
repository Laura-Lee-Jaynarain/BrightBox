using AutoMapper;
using backend_NET.ApiModels;

namespace backend_NET.Models.MapperProfiles
{
    public class NotificationProfile : Profile
    {
        public NotificationProfile() {

            CreateMap<Notification, ReturnNotificationDTO>()
                .ForMember(dest => dest.Type, opt => opt.MapFrom(src => src.Type.ToString()));
            CreateMap<CreateNotificationDTO, Notification>()
                .ForMember(dest => dest.Id, opt => opt.Ignore())
                .ForMember(dest => dest.User, opt => opt.Ignore())
                .ForMember(dest => dest.Read, opt => opt.MapFrom(_ => false));
        }

    }
}
