using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace FinancasApi.Models
{
    [Table("Pessoa")]
    public class Pessoa
    {
        [Key]
        public int Id { get; set; }

        [Required(ErrorMessage = "O campo 'Nome' é obrigatório.")]
        [StringLength(200, ErrorMessage = "O campo 'Nome' deve ter no máximo 200 caracteres.")]
        public string Nome { get; set; } = string.Empty;

        [Required(ErrorMessage = "O campo 'Idade' é obrigatório.")]
        [Range(0, 150, ErrorMessage = "O campo 'Idade' deve estar entre 0 e 150 anos.")]
        public int Idade { get; set; }
    }
}
