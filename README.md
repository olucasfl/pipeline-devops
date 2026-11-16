# pipeline-devops

Projeto da disciplina Cultura e Praticas DevOps (CI/CD).

Quadro Kanban em HTML, CSS e JavaScript puro, com pipeline no GitHub Actions.

## Pipeline

lint -> test -> build -> sast -> dast -> deploy

Se uma etapa falha, as seguintes nao rodam.

- **SAST (Semgrep):** analisa o codigo-fonte em `src/`. Falha se achar vulnerabilidade
  (regras `p/javascript` + `.semgrep/rules.yml`, que proibe `eval()` e `innerHTML =`).
- **DAST (OWASP ZAP):** sobe o site do build e ataca a aplicacao rodando. Falha se faltar
  algum cabecalho de seguranca definido em `.zap/rules.tsv` (CSP, nosniff, anti-clickjacking).
- **SAST x DAST (Aula 09):** o SAST e teste de caixa branca, le o codigo-fonte sem executar
  e roda cedo no ciclo. O DAST e teste de caixa preta, ataca a aplicacao em execucao, sem
  acesso ao codigo. Um complementa o outro.
- Os relatorios ficam como artefatos da execucao no GitHub Actions.
- **DefectDojo (opcional):** se os secrets `DEFECTDOJO_URL` e `DEFECTDOJO_TOKEN` existirem,
  os relatorios sao enviados para la. Sem eles, o envio e pulado.

## Rodar local

```bash
bash script_lint.sh
bash script_test.sh
bash script_build.sh
```

Depois abra `dist/index.html` no navegador.

## Estrutura

- `src/tasks.js`: regras das tarefas (criar, mover, filtrar, estatisticas)
- `src/storage.js`: persistencia no localStorage e exportacao
- `src/app.js`: interface (DOM)
- `test/`: testes unitarios e verificacao do HTML
