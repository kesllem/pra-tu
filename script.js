
// ================================
// NAVEGAÇÃO ENTRE AS TELAS
// ================================

function goTo(screenId) {

    const screens = document.querySelectorAll(".screen");

    screens.forEach(screen => {
        screen.classList.remove("active");
    });

    const selectedScreen = document.getElementById(screenId);

    selectedScreen.classList.add("active");

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


// ================================
// MENSAGENS DOS CARTÕES
// ================================

const messages = [

    {
        title: "uma verdade ♡",
        emoji: "💗",
        text: "Mesmo quando eu erro feio, uma coisa não muda: você continua sendo uma pessoa muito especial pra mim. E eu sei que gostar muito de alguém também significa aprender a respeitar, ouvir e reconhecer quando a gente passa dos limites."
    },

    {
        title: "sobre nós 🌷",
        emoji: "🎀",
        text: "Eu gosto da nossa amizade do jeitinho que ela é. Das conversas aleatórias, das brincadeiras, da nossa conexão e até das pequenas coisas que talvez pareçam bobas pra outras pessoas. Não quero deixar de valorizar tudo isso."
    },

    {
        title: "um desejo ✨",
        emoji: "🌷",
        text: "Quero aprender a lidar melhor com o que sinto, sem descontar em você. Quero que nossa amizade tenha espaço pra sinceridade, carinho, respeito e tranquilidade. Não prometo ser perfeita, mas quero me esforçar pra fazer melhor."
    }

];


// ================================
// CONTROLE DOS CARTÕES
// ================================

const openedCards = new Set();

function revealCard(index) {

    const message = messages[index];

    document.getElementById("modalTitle").textContent =
        message.title;

    document.getElementById("modalEmoji").textContent =
        message.emoji;

    document.getElementById("modalMessage").textContent =
        message.text;

    const modal = document.getElementById("cardModal");

    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");

    document.body.style.overflow = "hidden";

    // Marca o cartão como descoberto.

    openedCards.add(index);

    const cards = document.querySelectorAll(".message-card");

    cards[index].classList.add("opened");

    cards[index].querySelector(".card-hint").textContent =
        "descoberto ♡";

    // Atualiza o progresso.

    document.getElementById("cardProgress").textContent =
        `${openedCards.size} de 3 cartõezinhos descobertos ♡`;

    // Libera o próximo botão quando todos forem abertos.

    if (openedCards.size === messages.length) {

        document.getElementById("continueButton")
            .classList.remove("hidden");

        document.getElementById("cardProgress").textContent =
            "todos os cartõezinhos foram descobertos! ♡";

    }

}


// ================================
// FECHAR A JANELINHA
// ================================

function closeModal() {

    const modal = document.getElementById("cardModal");

    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");

    document.body.style.overflow = "";

}


// Fecha a janela ao clicar fora da mensagem.

document.getElementById("cardModal").addEventListener(
    "click",
    function(event) {

        if (event.target === this) {
            closeModal();
        }

    }
);


// Fecha a janela usando a tecla ESC.

document.addEventListener("keydown", function(event) {

    if (event.key === "Escape") {
        closeModal();
    }

});


// ================================
// RECOMEÇAR O PASSEIO
// ================================

function restartSite() {

    closeModal();

    openedCards.clear();

    const cards = document.querySelectorAll(".message-card");

    cards.forEach(card => {

        card.classList.remove("opened");

        card.querySelector(".card-hint").textContent =
            "clica aqui!";

    });

    document.getElementById("cardProgress").textContent =
        "0 de 3 cartõezinhos descobertos ♡";

    document.getElementById("continueButton")
        .classList.add("hidden");

    goTo("home");

}