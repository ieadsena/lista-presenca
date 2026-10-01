// =========================================================
// LISTA DE PRESENÇA
// ASSEMBLEIA DE DEUS SENA MADUREIRA
// =========================================================


// =========================================================
// URL DO GOOGLE APPS SCRIPT
// =========================================================

const URL_SCRIPT =
  "https://script.google.com/macros/s/AKfycbzb41RMu9FM6zmgoab2EtRiexLT6jmtR0A0Mgn4-a5CA2DGHCws8fo8GIwcwWjuVR7LWw/exec";


// =========================================================
// ELEMENTOS DA PÁGINA
// =========================================================

const formulario =
  document.getElementById("formPresenca");

const nomeInput =
  document.getElementById("nome");

const botao =
  document.getElementById("botao");

const textoBotao =
  document.getElementById("textoBotao");

const mensagem =
  document.getElementById("mensagem");


// =========================================================
// ENVIO DO FORMULÁRIO
// =========================================================

formulario.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();


    // Pega o nome digitado

    const nome =
      nomeInput.value.trim();


    // =====================================================
    // VALIDAÇÃO
    // =====================================================

    if (!nome) {

      mostrarMensagem(
        "Digite seu nome completo para continuar.",
        "erro"
      );

      nomeInput.focus();

      return;
    }


    if (nome.length < 3) {

      mostrarMensagem(
        "Digite seu nome completo.",
        "erro"
      );

      nomeInput.focus();

      return;
    }


    // =====================================================
    // ATIVA O LOADING
    // =====================================================

    botao.disabled = true;

    botao.classList.add("loading");

    textoBotao.textContent =
      "Registrando...";

    limparMensagem();


    // =====================================================
    // ENVIA PARA O GOOGLE APPS SCRIPT
    // =====================================================

    try {

      await fetch(
        URL_SCRIPT,
        {

          method: "POST",

          mode: "no-cors",

          headers: {

            "Content-Type":
              "text/plain;charset=utf-8"

          },

          body: JSON.stringify({
            nome: nome
          })

        }
      );


      // ===================================================
      // SUCESSO
      // ===================================================

      mostrarMensagem(
        "✓ Presença registrada com sucesso! Deus abençoe.",
        "sucesso"
      );


      // Limpa o campo

      nomeInput.value = "";


    } catch (erro) {

      // ===================================================
      // ERRO
      // ===================================================

      console.error(
        "Erro ao registrar presença:",
        erro
      );


      mostrarMensagem(
        "Não foi possível registrar agora. Verifique sua conexão e tente novamente.",
        "erro"
      );


    } finally {

      // ===================================================
      // RESTAURA O BOTÃO
      // ===================================================

      botao.disabled = false;

      botao.classList.remove("loading");

      textoBotao.textContent =
        "Marcar presença";

    }

  }
);


// =========================================================
// MOSTRAR MENSAGEM
// =========================================================

function mostrarMensagem(
  texto,
  tipo
) {

  mensagem.textContent =
    texto;

  mensagem.className =
    tipo;

}


// =========================================================
// LIMPAR MENSAGEM
// =========================================================

function limparMensagem() {

  mensagem.textContent =
    "";

  mensagem.className =
    "";

}
