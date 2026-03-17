namespace FinancasApi.Models.DTOs
{
    public class RelatorioPessoaDto
    {
        public List<PessoaTotaisDto> Pessoas { get; set; } = new();
        public TotalGeralDto TotalGeral { get; set; }
    }
}
