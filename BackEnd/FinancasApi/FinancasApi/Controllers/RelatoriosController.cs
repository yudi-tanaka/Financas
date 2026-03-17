using Microsoft.AspNetCore.Mvc;
using FinancasApi.Data;
using FinancasApi.Models;
using Microsoft.EntityFrameworkCore;
using FinancasApi.Models.DTOs;
using Microsoft.OpenApi.Services;

namespace FinancasApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class RelatoriosController : ControllerBase
    {

        private readonly AppDbContext _context;
        public RelatoriosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("PorCategoria")]
        public async Task<ActionResult<RelatorioCategoriaDto>> GetRelatorioPorCategoria()
        {
            var categoriasDb = await _context.Categorias.ToArrayAsync();
            var transacoesDb = await _context.Transacoes.ToArrayAsync();

            var categorias = (
                from c in categoriasDb
                join t in transacoesDb
                on c.Descricao equals t.Categoria
                into transacoes 
                select new CategoriaTotaisDto
                {
                    CategoriaId = c.Id,
                    Descricao = c.Descricao,
                    TotalReceita = transacoes.Where(x => x.Tipo == TipoTransacao.Receita).Sum(x => (decimal?)x.Valor) ?? 0,
                    TotalDespesa = transacoes.Where(x => x.Tipo == TipoTransacao.Despesa).Sum(x => (decimal?)x.Valor) ?? 0,
                }
            ).ToList();


            foreach (var categoria in categorias) 
            {
                categoria.Saldo = categoria.TotalReceita - categoria.TotalDespesa;
            }

            var totalGeral = new TotalGeralDto
            {
                TotalReceita = categorias.Sum(x => x.TotalReceita),
                TotalDespesa = categorias.Sum(x => x.TotalDespesa),
                Saldo = categorias.Sum(x => x.Saldo)
            };

            var resultado = new RelatorioCategoriaDto
            {
                Categorias = categorias,
                TotalGeral = totalGeral
            };

            return resultado;
        }


        [HttpGet("PorPessoa")]
        public async Task<ActionResult<RelatorioPessoaDto>> GetRelatorioPorPessoa()
        {
            var pessoasDb = await _context.Pessoas.ToArrayAsync();
            var transacoesDb = await _context.Transacoes.ToArrayAsync();

            var pessoas = (
                from p in pessoasDb
                join t in transacoesDb on p.Id equals t.PessoaId into transacoes
                select new PessoaTotaisDto
                {
                    PessoaId = p.Id,
                    Nome = p.Nome,
                    TotalReceita = transacoes.Where(x=>x.Tipo == TipoTransacao.Receita).Sum(x=>(decimal?)x.Valor) ?? 0,
                    TotalDespesa = transacoes.Where(x=>x.Tipo == TipoTransacao.Despesa).Sum(x=>(decimal?)x.Valor) ?? 0,
                }
            ).ToList();

            foreach (var pessoa in pessoas)
            {
                pessoa.Saldo = pessoa.TotalReceita - pessoa.TotalDespesa;
            }

            var totalGeral = new TotalGeralDto
            {
                TotalReceita = pessoas.Sum(x => x.TotalReceita),
                TotalDespesa = pessoas.Sum(x => x.TotalDespesa),
                Saldo = pessoas.Sum(x => x.Saldo),

            };

            var resultado = new RelatorioPessoaDto
            {
                Pessoas = pessoas,
                TotalGeral = totalGeral,
            };

            return resultado;
        }

    }
}
