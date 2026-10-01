// ========================================
// CONFIGURAÇÃO
// ========================================

const URL_SCRIPT =
    "https://script.google.com/macros/s/AKfycbzb41RMu9FM6zmgoab2EtRiexLT6jmtR0A0Mgn4-a5CA2DGHCws8fo8GIwcwWjuVR7LWw/exec";


// ========================================
// ELEMENTOS DA PÁGINA
// ========================================

const formulario = document.getElementById("formPresenca");
const nomeInput = document.getElementById("nome");
const botao = document.getElementById("botao");
const mensagem = document.getElementById("mensagem");


// ========================================
// ENVIO DO FORMULÁRIO
// ========================================

formulario.addEventListener("submit", async function (event) {

    event.preventDefault();

    const nome = nomeInput.value.trim();


    // ========================================
    // VERIFICAÇÃO DO NOME
    // ========================================

    if (nome === "") {

        mostrarMensagem(
            "Digite seu nome.",
            "erro"
        );

        return;
    }


    // ========================================
    // ALTERA O BOTÃO
    // ========================================

    botao.disabled = true;

    botao.textContent = "Registrando...";

    limparMensagem();


    // ========================================
    // ENVIA PARA O GOOGLE APPS SCRIPT
    // ========================================

    try {

        await fetch(URL_SCRIPT, {

            method: "POST",

            mode: "no-cors",

            headers: {
                "Content-Type":
                    "text/plain;charset=utf-8"
            },

            body: JSON.stringify({
                nome: nome
            })

        });


        // ========================================
        // SUCESSO
        // ========================================

        mostrarMensagem(
            "✓ Presença registrada com sucesso!",
            "sucesso"
        );

        nomeInput.value = "";


    } catch (erro) {

        // ========================================
        // ERRO
        // ========================================

        console.error(
            "Erro ao registrar presença:",
            erro
        );

        mostrarMensagem(
            "Não foi possível registrar a presença. Tente novamente.",
            "erro"
        );


    } finally {

        // ========================================
        // RESTAURA O BOTÃO
        // ========================================

        botao.disabled = false;

        botao.textContent =
            "Marcar presença";
    }

});


// ========================================
// MOSTRAR MENSAGEM
// ========================================

function mostrarMensagem(texto, tipo) {

    mensagem.textContent = texto;

    mensagem.className = tipo;
}


// ========================================
// LIMPAR MENSAGEM
// ========================================

function limparMensagem() {

    mensagem.textContent = "";

    mensagem.className = "";
}