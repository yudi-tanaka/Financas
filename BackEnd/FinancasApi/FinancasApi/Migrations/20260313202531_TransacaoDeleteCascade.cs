using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinancasApi.Migrations
{
    /// <inheritdoc />
    public partial class TransacaoDeleteCascade : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Transacao_PessoaId",
                table: "Transacao",
                column: "PessoaId");

            migrationBuilder.AddForeignKey(
                name: "FK_Transacao_Pessoa_PessoaId",
                table: "Transacao",
                column: "PessoaId",
                principalTable: "Pessoa",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Transacao_Pessoa_PessoaId",
                table: "Transacao");

            migrationBuilder.DropIndex(
                name: "IX_Transacao_PessoaId",
                table: "Transacao");
        }
    }
}
