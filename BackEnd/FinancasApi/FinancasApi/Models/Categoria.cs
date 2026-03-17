using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinancasApi.Models
{
    [Table("Categoria")]
    public class Categoria
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "O campo 'Descrição' é obrigatório.")]
        [StringLength(400, ErrorMessage = "O campo 'Descrição' deve ter no máximo 400 caracteres.")]
        public string Descricao { get; set; } = string.Empty;

        [Required(ErrorMessage = "O campo 'Finalidade' é obrigatório.")]
        [StringLength(100, ErrorMessage = "O campo 'Finalidade' deve ter no máximo 100 caracteres.")]
        public string Finalidade { get; set; } = string.Empty;
    }
}


