# pipeline-devops

Projeto da disciplina Cultura e Praticas DevOps (CI/CD).

Quadro Kanban em HTML, CSS e JavaScript puro, com pipeline no GitHub Actions.

## Pipeline

lint -> test -> build -> deploy

Se uma etapa falha, as seguintes nao rodam.

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
