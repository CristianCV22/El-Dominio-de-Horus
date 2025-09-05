document.addEventListener("DOMContentLoaded", () => {
  // Módulo 1: Simulación de Comercio
  const mxnCard = document.getElementById("mxn-card");
  const forexMachine = document.getElementById("forex-machine");
  const copCard = document.getElementById("cop-card");
  const copAmount = document.getElementById("cop-amount");
  const tradeResult = document.getElementById("trade-result");

  mxnCard.setAttribute("draggable", "true");
  mxnCard.classList.add("clickable");

  mxnCard.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", "mxn");
    mxnCard.classList.add("dragging");
  });
  mxnCard.addEventListener("dragend", () => {
    mxnCard.classList.remove("dragging");
  });

  forexMachine.addEventListener("dragover", (e) => {
    e.preventDefault();
    forexMachine.classList.add("hovered");
  });
  forexMachine.addEventListener("dragleave", () => {
    forexMachine.classList.remove("hovered");
  });
  forexMachine.addEventListener("drop", (e) => {
    e.preventDefault();
    forexMachine.classList.remove("hovered");
    if (e.dataTransfer.getData("text/plain") === "mxn") {
      mxnCard.style.display = "none";
      copCard.classList.remove("opacity-25");
      copAmount.textContent = "227,300,000"; // Valor de ejemplo
      tradeResult.classList.remove("opacity-0");
    }
  });

  // Módulo 2: Balanza
  const balanceContainer = document.getElementById("balance-scale-container");
  const tradePercent = document.getElementById("trade-percent");
  const specPercent = document.getElementById("speculation-percent");
  const balanceInstruction = document.getElementById("balance-instruction");

  balanceContainer.addEventListener(
    "click",
    () => {
      // 1. Update text content first
      tradePercent.textContent = "~10%";
      specPercent.textContent = "~90%";

      // 2. Trigger the animation after a short delay for better effect
      setTimeout(() => {
        balanceContainer.classList.add("tilted");
      }, 100);

      balanceInstruction.textContent =
        "Hoy, la especulación domina el mercado.";
      balanceContainer.classList.remove("clickable");
      balanceContainer.style.cursor = "default";
    },
    { once: true }
  );

  // Módulo 3: Juego Clasificador
  const gameCards = [
    {
      text: "Apple paga a un proveedor en China en Yuanes.",
      type: "comercio",
      hint: "Piensa: ¿Hay un intercambio de bienes o servicios entre países? Si es así, es comercio.",
    },
    {
      text: "Un trader compra Euros esperando que suban contra el Dólar.",
      type: "especulacion",
      hint: "Analiza la intención: ¿Se busca un beneficio por el cambio de precio de la moneda? Eso es especular.",
    },
    {
      text: "Una turista cambia Dólares por Pesos para sus vacaciones en México.",
      type: "comercio",
      hint: "Considera el propósito: ¿El dinero se usará para comprar cosas en otro país? Es para facilitar una actividad económica real.",
    },
    {
      text: "Un fondo de inversión vende Yenes masivamente creyendo que su valor caerá.",
      type: "especulacion",
      hint: "Fíjate en la motivación: Si la acción se basa en una predicción sobre el futuro del valor de una moneda, es especulación.",
    },
  ];
  let currentCardIndex = 0;
  let correctAnswers = 0;
  let incorrectlyAnswered = [];

  const cardContainer = document.getElementById("current-card-container");
  const feedbackEl = document.getElementById("game-feedback");
  const btnComercio = document.getElementById("btn-comercio");
  const btnEspeculacion = document.getElementById("btn-especulacion");
  const retryModal = document.getElementById("retry-modal");
  const retryHints = document.getElementById("retry-hints");
  const retryScoreEl = document.getElementById("retry-score");
  const retryBtn = document.getElementById("retry-game-btn");

  function showNextCard() {
    if (currentCardIndex >= gameCards.length) {
      // Fin del juego
      if (correctAnswers === gameCards.length) {
        feedbackEl.textContent = "¡Perfecto!";
        feedbackEl.style.color = "#34D399";
        document.getElementById("reward-modal").classList.remove("hidden");
      } else {
        retryScoreEl.textContent = `Tu Puntuación: ${correctAnswers}/${gameCards.length}. ¡No te rindas!`;
        let hintsHTML =
          '<h4 class="font-bold text-white mb-2">Consejos para tu próximo intento:</h4><ul class="list-disc list-inside">';
        incorrectlyAnswered.forEach((card) => {
          hintsHTML += `<li>${card.hint}</li>`;
        });
        hintsHTML += "</ul>";
        retryHints.innerHTML = hintsHTML;
        retryModal.classList.remove("hidden");
      }
      cardContainer.innerHTML = "";
      btnComercio.disabled = true;
      btnEspeculacion.disabled = true;
      return;
    }
    const cardData = gameCards[currentCardIndex];
    cardContainer.innerHTML = `<div class="interactive-card p-4 text-center rounded-lg">${cardData.text}</div>`;
  }

  function checkAnswer(chosenType) {
    if (currentCardIndex >= gameCards.length) {
      return;
    }
    const correctType = gameCards[currentCardIndex].type;
    if (chosenType === correctType) {
      feedbackEl.textContent = "¡Correcto!";
      feedbackEl.style.color = "#34D399";
      correctAnswers++;
    } else {
      feedbackEl.textContent = "Inténtalo de nuevo.";
      feedbackEl.style.color = "#EF4444";
      incorrectlyAnswered.push(gameCards[currentCardIndex]);
    }
    currentCardIndex++;
    setTimeout(() => {
      feedbackEl.textContent = "";
      showNextCard();
    }, 1000);
  }

  function resetGame() {
    currentCardIndex = 0;
    correctAnswers = 0;
    incorrectlyAnswered = [];
    retryModal.classList.add("hidden");
    btnComercio.disabled = false;
    btnEspeculacion.disabled = false;
    showNextCard();
  }

  retryBtn.addEventListener("click", resetGame);
  btnComercio.addEventListener("click", () => checkAnswer("comercio"));
  btnEspeculacion.addEventListener("click", () => checkAnswer("especulacion"));

  showNextCard();

  // Módulo 4: Lógica del Modal de Recompensa
  const continueBtn = document.getElementById("continue-btn");
  continueBtn.addEventListener("click", () => {
    // En una aplicación real, esto navegaría a la siguiente página/lección.
    // Por ahora, simplemente recargamos para simular un nuevo comienzo.
    location.reload();
  });
});
