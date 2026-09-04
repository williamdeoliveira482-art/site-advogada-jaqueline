# Landing Page — Escritório de Advocacia

Projeto estático (HTML + CSS + JS puro), sem dependências e sem build. Basta abrir `index.html` ou subir a pasta em qualquer hospedagem estática (Vercel, GitHub Pages, Netlify).

## O que revisar antes de publicar

- **OAB**: o rodapé e a seção "A Advogada" trazem apenas `OAB/SC — Subseção Chapecó`, sem número de inscrição — inclua o número real da carteira nesses dois pontos.
- **E-mail**: `contato@jaquelinebalsanelloadv.com.br` é um palpite baseado no site atual — confirme o endereço de e-mail correto e ajuste em `index.html`.
- **Telefone / WhatsApp**: já preenchido com `(49) 99834-4072` em todos os pontos (header, hero, seção de destaque, botão flutuante e contato).
- **Fotografia**: em `index.html`, procurar o comentário `Espaço reservado para fotografia profissional da advogada` (seção "A Advogada") e substituir o bloco `<div class="photo-frame">...</div>` por uma tag `<img>` com a foto real. O mesmo vale para o painel ilustrativo do hero (`.hero-illustration`), que é opcional.
- **Horário de atendimento**: preenchido como "até as 18h30" (única informação disponível) — complete com o horário de abertura, se desejar.

## Formulário de contato

O formulário já vem validado no navegador, mas como o projeto é estático ele ainda não envia a mensagem para lugar nenhum — isso está documentado em `script.js`. Três caminhos simples:

1. **Formspree ou Web3Forms**: serviços prontos que recebem o POST do formulário e encaminham por e-mail. Basta trocar a URL de envio.
2. **Webhook (ex.: n8n)**: como o fluxo já está pronto em `script.js` para um `fetch()`, dá para apontar direto para um webhook do n8n e tratar notificação/CRM por lá.
3. **Função serverless** na própria hospedagem (Vercel/Netlify), caso prefira manter tudo em um único provedor.

## Estrutura

- `index.html` — estrutura e conteúdo
- `style.css` — sistema de design (cores, tipografia, layout, responsividade)
- `script.js` — header ao rolar, menu mobile, revelação suave das seções e validação do formulário
