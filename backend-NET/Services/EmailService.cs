using SendGrid;
using SendGrid.Helpers.Mail;

namespace backend_NET.Services
{
    public class EmailService : IEmailService
    {
        private readonly IConfiguration _configuration;

        public EmailService(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SendPasswordResetEmailAsync(string toEmail, string resetLink)
        {
            var apiKey = _configuration["EmailSettings:SendGridApiKey"]
                ?? throw new InvalidOperationException("SendGrid API Key is not configured.");

            var client = new SendGridClient(apiKey);
            var from = new EmailAddress(
                _configuration["EmailSettings:FromEmail"],
                _configuration["EmailSettings:FromName"]
            );
            var subject = "Reset Your BrightBlock Password";
            var to = new EmailAddress(toEmail);
            var htmlContent = $@"
                <h2>Password Reset Request - BrightBlock</h2>
                <p>You requested to reset your password.</p>
                <p>Click the button below to set a new password:</p>
                <a href='{resetLink}' 
                   style='display:inline-block; padding:14px 28px; background-color:#2563eb; color:white; text-decoration:none; border-radius:6px; font-weight:bold; margin:20px 0;'>
                   Reset Password
                </a>
                <p>This link will expire in 1 hour.</p>
                <p style='color:#666; font-size:14px;'>If you did not request this, please ignore this email.</p>";

            var msg = MailHelper.CreateSingleEmail(from, to, subject, "", htmlContent);
            var response = await client.SendEmailAsync(msg);

            // Log the response
            Console.WriteLine($"SendGrid Status: {response.StatusCode}");
            var body = await response.Body.ReadAsStringAsync();
            Console.WriteLine($"SendGrid Response: {body}");

            if ((int)response.StatusCode >= 400)
            {
                throw new Exception($"SendGrid failed: {response.StatusCode} - {body}");
            }
        }
    }
}