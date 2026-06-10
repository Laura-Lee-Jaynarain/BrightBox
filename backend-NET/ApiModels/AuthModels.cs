using System.ComponentModel.DataAnnotations;

namespace backend_NET.ApiModels
{
    public class RegisterModel
    {
        [Required(ErrorMessage = "Full name is required")]
        [StringLength(100, MinimumLength = 2, ErrorMessage = "Full name must be between 2 and 100 characters")]
        public string FullName { get; set; } = string.Empty;
        [Required(ErrorMessage = "Email is required")]
        [EmailAddress(ErrorMessage = "Invalid email address")]
        public string Email { get; set; } = string.Empty;
        [Required(ErrorMessage = "Password is required")]
        [MinLength(8, ErrorMessage = "Password must be at least 8 characters long")]
        public string Password { get; set; } = string.Empty;
    }

    public class LoginModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
    }

    public class ForgotPasswordModel
    {
        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;
    }

    public class ResetPasswordModel
    {
        [Required]
        public string Token { get; set; } = string.Empty;
        [Required]
        [MinLength(8)]
        public string NewPassword { get; set; } = string.Empty;
    }

    public class GoogleLoginModel
    {
        [Required]
        public string Credential { get; set; } = string.Empty;
    }

    // Used by POST /api/auth/update-profile after registration
    public class UpdateProfileModel
    {
        [Required]
        public Guid UserId { get; set; }

        public int? PostalCode { get; set; }    // matches User.PostalCode (int?)
        public int? HouseHoldSize { get; set; } // matches User.HouseHoldSize (int?)
    }
}