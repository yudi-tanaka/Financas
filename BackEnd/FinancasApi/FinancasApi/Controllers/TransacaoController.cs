using Microsoft.AspNetCore.Mvc;
using FinancasApi.Data;
using FinancasApi.Models;
using Microsoft.EntityFrameworkCore;

namespace FinancasApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TransacaoController : ControllerBase
    {
        private readonly AppDbContext _context;

        public TransacaoController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Transacao>>> GetTransmissoes()
        {
            return await _context.Transacoes.ToListAsync();
        }        

        [HttpPost]
        public async Task<ActionResult<Transacao>> PostTransmissao(Transacao transacao)
        {
            //validar pessoa
            var pessoa = await _context.Pessoas.FindAsync(transacao.PessoaId);

            if (pessoa == null)
                return NotFound("'PessoaId' não encontrada.");

            //validar menor de idade
            if (pessoa.Idade < 18 && transacao.Tipo != TipoTransacao.Despesa)
                return BadRequest("Menores de idade só podem cadastrar despesas.");

            //validar categoria
            var categoriaExiste = await _context.Categorias.AnyAsync(c => c.Descricao == transacao.Categoria);

            if (!categoriaExiste)
                return BadRequest("Categoria inválida.");

            //criar transacao
            _context.Transacoes.Add(transacao);
            await _context.SaveChangesAsync();
            return Ok(transacao);            
        }   

    }
}
