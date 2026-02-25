# LinkedIn Contact Tracker (Chrome Extension)

Extensão Chrome simples para guardar contactos do LinkedIn e acompanhar o estado de cada contacto (ex: contactado, respondeu, entrevista, submissão).

---

## Para quem é este guia?

Para pessoas **non-tech**: sem programação, sem terminal, só com passos práticos.

---

## Opção A — Instalar no teu Chrome (uso pessoal, sem publicar)

> Esta é a forma mais rápida para começares já.

### Passo 1: Descarregar os ficheiros

Pede ao teu developer (ou colega técnico) a pasta chamada:

- `linkedin-contact-tracker`

Guarda essa pasta num local fácil de encontrar (ex: Desktop).

### Passo 2: Abrir as extensões do Chrome

1. Abre o Google Chrome.
2. Na barra de endereço escreve: `chrome://extensions`
3. Carrega Enter.

### Passo 3: Ativar modo de programador

1. No canto superior direito, ativa o botão **Developer mode**.

### Passo 4: Carregar a extensão

1. Clica em **Load unpacked**.
2. Escolhe a pasta `linkedin-contact-tracker`.
3. Clica em **Select folder**.

Pronto: a extensão fica instalada no teu browser.

### Passo 5: Fixar a extensão (opcional, mas recomendado)

1. Clica no ícone de puzzle (extensões) no Chrome.
2. Procura **LinkedIn Contact Tracker**.
3. Clica no alfinete (pin) para ficar sempre visível.

---

## Como usar (muito simples)

1. Clica no ícone da extensão.
2. Preenche:
   - **Nome** da pessoa
   - **Link LinkedIn**
3. Clica **Adicionar**.
4. Vai mudando o estado (Novo, Contactado, Respondeu, Entrevista, Submissão, etc.).
5. Vê as métricas no topo para perceber resultados:
   - Taxa de resposta
   - Taxa de entrevistas
   - Taxa de submissões

---

## Opção B — Publicar na Chrome Web Store (para partilhar com equipa)

> Eu não consigo publicar na tua conta Google por ti, mas este é o processo passo-a-passo.

### Antes de começar

Precisas de:

- Conta Google
- Conta de developer da Chrome Web Store (normalmente tem taxa única de registo)

### Passo 1: Criar o ficheiro ZIP da extensão

Pede ao teu developer para executar este comando:

```bash
bash linkedin-contact-tracker/scripts/build-extension.sh
```

Esse comando cria um ZIP pronto a publicar em:

- `linkedin-contact-tracker/dist/linkedin-contact-tracker-v1.0.0.zip`

### Passo 2: Entrar no portal de developer

1. Vai a: https://chrome.google.com/webstore/devconsole
2. Faz login com a conta Google de developer.

### Passo 3: Criar novo item

1. Clica em **New Item**.
2. Faz upload do ficheiro ZIP.

### Passo 4: Preencher os campos obrigatórios

No formulário da Web Store, adiciona:

- Nome da extensão
- Descrição curta e longa
- Capturas de ecrã
- Categoria
- Email/site de suporte
- Política de privacidade (se aplicável)

### Passo 5: Submeter para revisão

1. Clica em **Submit for review**.
2. Aguarda aprovação da equipa da Google.

Depois de aprovada, já podes partilhar o link da extensão com outras pessoas.

---

## Resumo rápido

- Queres usar só para ti? → **Opção A (Load unpacked)**.
- Queres distribuir para equipa/clientes? → **Opção B (Web Store)**.

---

## Armazenamento dos dados

Os dados dos contactos ficam guardados localmente no browser através de `chrome.storage.local`.
