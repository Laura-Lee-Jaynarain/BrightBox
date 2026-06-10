using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend_NET.Migrations
{
    /// <inheritdoc />
    public partial class notificationUpdate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Message",
                table: "Notifications",
                newName: "Body");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Body",
                table: "Notifications",
                newName: "Message");
        }
    }
}
