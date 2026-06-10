using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend_NET.Migrations
{
    /// <inheritdoc />
    public partial class AddHouseholdSize : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "HouseholdSize",
                table: "MeterReadings",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "HouseholdSize",
                table: "MeterReadings");
        }
    }
}
