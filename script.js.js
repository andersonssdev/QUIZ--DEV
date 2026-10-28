
const perguntas = [
    {
        pergunta: "Para que serve o HTML?",
        opcoes: [
            "Criar a estrutura de uma página",
            "Gerenciar o banco de dados",
            "Proteger o computador",
            "Criar sistemas operacionais"
        ],
        correta: 0
    },
    {
        pergunta: "Qual é a função do CSS?",
        opcoes: [
            "Armazenar informações",
            "Estilizar páginas web",
            "Executar consultas SQL",
            "Criar servidores"
        ],
        correta: 1
    },
    {
        pergunta: "Qual linguagem permite adicionar interatividade a uma página web?",
        opcoes: ["HTML", "CSS", "JavaScript", "SQL"],
        correta: 2
    },
    {
        pergunta: "Qual símbolo é usado para comentários de uma linha em JavaScript?",
        opcoes: ["##", "//", "<!--", "**"],
        correta: 1
    },
    {
        pergunta: "Qual comando exibe uma mensagem no console JavaScript?",
        opcoes: [
            "print()",
            "echo()",
            "console.log()",
            "show()"
        ],
        correta: 2
    },
    {
        pergunta: "Qual tag HTML cria um link?",
        opcoes: ["<link>", "<a>", "<href>", "<url>"],
        correta: 1
    },
    {
        pergunta: "Qual propriedade CSS altera a cor do texto?",
        opcoes: ["background", "font-size", "color", "border"],
        correta: 2
    },
    {
        pergunta: "Qual palavra pode declarar uma variável em JavaScript?",
        opcoes: ["variable", "let", "define", "dim"],
        correta: 1
    },
    {
        pergunta: "Qual estrutura permite repetir um bloco de código?",
        opcoes: ["if", "else", "for", "switch"],
        correta: 2
    },
    {
        pergunta: "O que significa CSS?",
        opcoes: [
            "Computer Style System",
            "Cascading Style Sheets",
            "Creative Software System",
            "Code Styling Script"
        ],
        correta: 1
    }
];

const elementoPergunta = document.querySelector("#pergunta");
const elementoOpcoes = document.querySelector("#opcoes");
const elementoNumero = document.querySelector("#numero-pergunta");
const elementoPontuacao = document.querySelector("#pontuacao");
const barraProgresso = document.querySelector("#barra-progresso");
const feedback = document.querySelector("#feedback");
const botaoProxima = document.querySelector("#proxima");
const telaQuiz = document.querySelector("#quiz");
const telaResultado = document.querySelector("#resultado");
const pontuacaoFinal = document.querySelector("#pontuacao-final");
const mensagemFinal = document.querySelector("#mensagem-final");
const botaoReiniciar = document.querySelector("#reiniciar");

let indiceAtual = 0;
let pontos = 0;
let respondeu = false;

function mostrarPergunta() {
    respondeu = false;

    const atual = perguntas[indiceAtual];

    elementoPergunta.textContent = atual.pergunta;
    elementoNumero.textContent =
        `Pergunta ${indiceAtual + 1} de ${perguntas.length}`;

    elementoPontuacao.textContent = `Pontos: ${pontos}`;

    barraProgresso.style.width =
        `${(indiceAtual / perguntas.length) * 100}%`;

    feedback.textContent = "";
    botaoProxima.hidden = true;
    elementoOpcoes.innerHTML = "";

    atual.opcoes.forEach((opcao, indice) => {
        const botao = document.createElement("button");

        botao.type = "button";
        botao.className = "opcao";
        botao.textContent = opcao;

        botao.addEventListener("click", () => {
            verificarResposta(indice, botao);
        });

        elementoOpcoes.appendChild(botao);
    });
}

function verificarResposta(indice, botaoEscolhido) {
    if (respondeu) return;

    respondeu = true;

    const correta = perguntas[indiceAtual].correta;
    const botoes = elementoOpcoes.querySelectorAll(".opcao");

    botoes.forEach((botao, indice) => {
        botao.disabled = true;

        if (indice === correta) {
            botao.classList.add("correta");
        }
    });

    if (indice === correta) {
        pontos++;
        feedback.textContent = "Resposta correta! Muito bem!";
    } else {
        botaoEscolhido.classList.add("errada");
        feedback.textContent =
            "Resposta incorreta. Veja a alternativa verde.";
    }

    elementoPontuacao.textContent = `Pontos: ${pontos}`;

    botaoProxima.hidden = false;
    botaoProxima.textContent =
        indiceAtual === perguntas.length - 1
            ? "Ver resultado"
            : "Próxima pergunta";
}

function finalizarQuiz() {
    telaQuiz.hidden = true;
    telaResultado.hidden = false;

    barraProgresso.style.width = "100%";

    pontuacaoFinal.textContent =
        `Você acertou ${pontos} de ${perguntas.length} perguntas.`;

    if (pontos === perguntas.length) {
        mensagemFinal.textContent =
            "Excelente! Você acertou todas!";
    } else if (pontos >= 7) {
        mensagemFinal.textContent =
            "Muito bem! Você tem bons conhecimentos!";
    } else if (pontos >= 5) {
        mensagemFinal.textContent =
            "Bom trabalho! Continue praticando!";
    } else {
        mensagemFinal.textContent =
            "Continue estudando. Você vai evoluir!";
    }
}

botaoProxima.addEventListener("click", () => {
    if (!respondeu) return;

    if (indiceAtual < perguntas.length - 1) {
        indiceAtual++;
        mostrarPergunta();
    } else {
        finalizarQuiz();
    }
});

botaoReiniciar.addEventListener("click", () => {
    indiceAtual = 0;
    pontos = 0;
    respondeu = false;

    telaResultado.hidden = true;
    telaQuiz.hidden = false;

    mostrarPergunta();
});

mostrarPergunta();
