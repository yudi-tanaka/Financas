using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinancasApi.Models
{
    [Table("Transacao")]
    public class Transacao
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "O campo 'Descrição' é obrigatório.")]
        [StringLength(400, ErrorMessage = "A descrição deve ter no máximo 400 caracteres.")]
        public string Descricao { get; set; } = string.Empty;

        [Required(ErrorMessage = "O campo 'Valor' é obrigatório.")]
        [Range(0.01, double.MaxValue, ErrorMessage = "O valor deve ser maior que zero.")]
        [Column(TypeName = "NUMERIC")]
        public decimal Valor { get; set; }

        [Required(ErrorMessage = "O campo 'Tipo' é obrigatório.")]
        public TipoTransacao Tipo { get; set; }

        [Required(ErrorMessage = "O campo 'Categoria' é obrigatório.")]
        public string Categoria { get; set; } = string.Empty;

        [Required(ErrorMessage = "O campo 'PessoaId' é obrigatório.")]
        public int PessoaId { get; set; }
    }

    public enum TipoTransacao
    {
        Receita,
        Despesa
    }
}
