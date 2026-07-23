# Deploy da landing page na Hostinger

O workflow `.github/workflows/deploy-hostinger.yml` gera uma versão estática e
publica apenas a landing page em `https://brazhits.com.br/pack-de-clipes/`.
O restante do WordPress não é enviado, alterado ou removido pelo workflow.

## Secrets do GitHub

Em **Settings → Secrets and variables → Actions**, configure:

- `FTP_SERVER`: servidor FTP/FTPS mostrado pela Hostinger;
- `FTP_USERNAME`: usuário FTP;
- `FTP_PASSWORD`: senha FTP;
- `FTP_SERVER_DIR`: diretório remoto completo da landing page, sempre terminado
  em `/`.

O valor mais comum para `FTP_SERVER_DIR` é:

```text
public_html/pack-de-clipes/
```

Se a conta FTP já abrir diretamente dentro de `public_html`, use:

```text
pack-de-clipes/
```

Confirme esse caminho no Gerenciador de Arquivos da Hostinger antes do primeiro
deploy. Nunca configure `FTP_SERVER_DIR` apenas como `public_html/`, pois isso
colocaria a landing page na raiz do WordPress.

## Publicação

Todo push na branch `main` executa o deploy. Também é possível iniciar
manualmente em **Actions → Publicar na Hostinger → Run workflow**.

O arquivo de estado do FTP fica dentro da própria pasta da landing page. O
workflow pode substituir versões anteriores que ele publicou nessa pasta, mas
não executa limpeza total e não alcança arquivos da pasta pai.
