using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using backend_NET.ApiModels;
using backend_NET.Models;
using BCrypt.Net;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using backend_NET.Services;

namespace backend_NET.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IUserRepository _userRepo;
        private readonly JwtSettings _jwtSettings;
        private readonly IEmailService _emailService;

        public AuthController(IUserRepository userRepo, JwtSettings jwtSettings, IEmailService emailService)
        {
            _userRepo = userRepo;
            _jwtSettings = jwtSettings;
            _emailService = emailService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] RegisterModel model)
        {
            if (await _userRepo.EmailExistsAsync(model.Email.Trim().ToLower()))
                return BadRequest(new { message = "Email already in use." });

            var user = new User
            {
                Id = Guid.NewGuid(),
                FullName = model.FullName.Trim(),
                Email = model.Email.Trim().ToLower(),
                PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.Password)
            };

            await _userRepo.AddAsync(user);
            await _userRepo.SaveChangesAsync();

            var token = GenerateJwtToken(user);
            return Ok(new
            {
                message = "Account created successfully.",
                token = token,
                userId = user.Id,
                fullName = user.FullName,
                email = user.Email,
                postalCode = user.PostalCode,
                householdSize = user.HouseHoldSize
            });
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel model)
        {
            var user = await _userRepo.GetByEmailAsync(model.Email.Trim().ToLower());

            if (user == null || !BCrypt.Net.BCrypt.Verify(model.Password, user.PasswordHash))
                return Unauthorized(new { message = "Invalid email or password." });

            var token = GenerateJwtToken(user);

            return Ok(new
            {
                message = "Login successful.",
                token = token,
                userId = user.Id,
                fullName = user.FullName,
                email = user.Email,
                postalCode = user.PostalCode,
                householdSize = user.HouseHoldSize
            });
        }

        [HttpPost("google-login")]
        public async Task<IActionResult> GoogleLogin([FromBody] GoogleLoginModel model)
        {
            try
            {
                var handler = new JwtSecurityTokenHandler();
                var jwtToken = handler.ReadJwtToken(model.Credential);

                var email = jwtToken.Claims.FirstOrDefault(c => c.Type == "email")?.Value;
                var name = jwtToken.Claims.FirstOrDefault(c => c.Type == "name")?.Value;

                if (string.IsNullOrEmpty(email))
                    return BadRequest(new { message = "Invalid Google token." });

                var user = await _userRepo.GetByEmailAsync(email.ToLower());
                bool isNewUser = false;

                if (user == null)
                {
                    isNewUser = true;
                    user = new User
                    {
                        Id = Guid.NewGuid(),
                        FullName = name ?? "Google User",
                        Email = email.ToLower(),
                        PasswordHash = BCrypt.Net.BCrypt.HashPassword(Guid.NewGuid().ToString())
                    };
                    await _userRepo.AddAsync(user);
                    await _userRepo.SaveChangesAsync();
                }

                var token = GenerateJwtToken(user);
                return Ok(new
                {
                    message = "Login successful.",
                    token,
                    userId = user.Id,
                    fullName = user.FullName,
                    email = user.Email,
                    postalCode = user.PostalCode,
                    householdSize = user.HouseHoldSize,
                    isNewUser
                });
            }
            catch (Exception)
            {
                return BadRequest(new { message = "Failed to process Google login." });
            }
        }

        [HttpPost("update-profile")]
        [Authorize]
        public async Task<IActionResult> UpdateProfile([FromBody] UpdateProfileModel model)
        {
            var user = _userRepo.GetUser(model.UserId);

            if (user == null)
                return NotFound(new { message = "User not found." });

            if (model.PostalCode.HasValue)
                user.PostalCode = model.PostalCode.Value;

            if (model.HouseHoldSize.HasValue)
                user.HouseHoldSize = model.HouseHoldSize.Value;

            await _userRepo.SaveChangesAsync();

            return Ok(new { message = "Profile updated successfully." });
        }

        [HttpPost("forgot-password")]
        public async Task<IActionResult> ForgotPassword([FromBody] ForgotPasswordModel model)
        {
            var user = await _userRepo.GetByEmailAsync(model.Email.Trim().ToLower());

            if (user != null)
            {
                user.ResetToken = Guid.NewGuid().ToString();
                user.ResetTokenExpiry = DateTime.UtcNow.AddHours(1);
                await _userRepo.SaveChangesAsync();

                string resetLink = $"http://localhost:5173/reset-password?token={user.ResetToken}";
                await _emailService.SendPasswordResetEmailAsync(model.Email, resetLink);
            }

            return Ok(new { message = "If that email exists, a reset link has been sent." });
        }

        [HttpPost("reset-password")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordModel model)
        {
            var user = await _userRepo.GetByResetTokenAsync(model.Token);

            if (user == null || user.ResetTokenExpiry < DateTime.UtcNow)
                return BadRequest(new { message = "Invalid or expired reset token." });

            user.PasswordHash = BCrypt.Net.BCrypt.HashPassword(model.NewPassword);
            user.ResetToken = null;
            user.ResetTokenExpiry = null;

            await _userRepo.SaveChangesAsync();

            return Ok(new { message = "Password has been reset successfully." });
        }

        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.UTF8.GetBytes(_jwtSettings.SecretKey);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new[]
                {
                    new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                    new Claim(ClaimTypes.Email,          user.Email),
                    new Claim(ClaimTypes.Name,           user.FullName)
                }),
                Expires = DateTime.UtcNow.AddMinutes(_jwtSettings.ExpirationMinutes),
                Issuer = _jwtSettings.Issuer,
                Audience = _jwtSettings.Audience,
                SigningCredentials = new SigningCredentials(
                    new SymmetricSecurityKey(key),
                    SecurityAlgorithms.HmacSha256Signature)
            };

            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}