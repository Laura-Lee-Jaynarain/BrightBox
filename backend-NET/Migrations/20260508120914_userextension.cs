using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend_NET.Migrations
{
    /// <inheritdoc />
    public partial class userextension : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "HouseHoldSize",
                table: "Users",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "PostalCode",
                table: "Users",
                type: "int",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HouseHoldSize",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "PostalCode",
                table: "Users");
        }
    }
}
