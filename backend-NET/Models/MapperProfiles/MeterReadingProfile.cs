using AutoMapper;
using backend_NET.ApiModels;

namespace backend_NET.Models.MapperProfiles
{
    public class MeterReadingProfile : Profile
    {
        public MeterReadingProfile()
        {
            CreateMap<CreateMeterReadingDTO, MeterReading>()
                .ForMember(dest => dest.MeterReadingID, opt => opt.Ignore())
                .ForMember(dest => dest.User, opt => opt.Ignore())
                .ForMember(dest => dest.Time, opt => opt.Ignore())
                .ForMember(dest => dest.MeterImage, opt => opt.Ignore())
                .ForMember(dest => dest.Status, opt => opt.MapFrom(_ => Status.PENDING));

            CreateMap<MeterReading, ReturnMeterReadingDTO>();
        }
    }
}
