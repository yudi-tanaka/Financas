namespace FinancasApi.Models.DTOs
{
    public class RelatorioCategoriaDto
    {
        public List<CategoriaTotaisDto> Categorias { get; set; }
        public TotalGeralDto TotalGeral { get; set; }
    }
}
