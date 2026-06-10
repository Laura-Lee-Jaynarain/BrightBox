using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend_NET.Migrations
{
    /// <inheritdoc />
    public partial class questionmark : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "HouseholdSize",
                table: "Users",
                newName: "HouseHoldSize");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "HouseHoldSize",
                table: "Users",
                newName: "HouseholdSize");
        }
    }
}
