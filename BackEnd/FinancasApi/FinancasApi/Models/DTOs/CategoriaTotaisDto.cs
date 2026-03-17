namespace FinancasApi.Models.DTOs
{
    public class CategoriaTotaisDto
    {
        public int CategoriaId { get; set; }
        public string Descricao { get; set; }
        public decimal TotalReceita { get; set; }
        public decimal TotalDespesa { get; set; }
        public decimal Saldo { get; set; }
    }
}
