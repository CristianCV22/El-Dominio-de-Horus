document.addEventListener("DOMContentLoaded", () => {
  // Módulo 1: Contador
  const counterElement = document.getElementById("volume-counter");
  const targetVolume = 6600000000000;
  let currentVolume = 0;
  const increment = targetVolume / 200;
  const interval = setInterval(() => {
    currentVolume += increment;
    if (currentVolume >= targetVolume) {
      currentVolume = targetVolume;
      clearInterval(interval);
    }
    counterElement.textContent =
      "$" + Math.floor(currentVolume).toLocaleString("en-US");
  }, 10);

  // Módulo 2: Definición
  const forexDef = document.getElementById("forex-definition");
  const definitionReveal = document.getElementById("definition-reveal");
  forexDef.addEventListener("click", () => {
    forexDef.classList.add("hidden");
    definitionReveal.classList.remove("hidden");
  });

  // Módulo 4: Juego de Arrastrar y Soltar
  const draggables = document.querySelectorAll(".draggable");
  const dropZones = document.querySelectorAll(".drop-zone");
  let correctDrops = 0;

  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", () => {
      draggable.classList.add("dragging");
    });
    draggable.addEventListener("dragend", () => {
      draggable.classList.remove("dragging");
    });
  });

  dropZones.forEach((zone) => {
    zone.addEventListener("dragover", (e) => {
      e.preventDefault();
      zone.classList.add("hovered");
    });
    zone.addEventListener("dragleave", () => {
      zone.classList.remove("hovered");
    });
    zone.addEventListener("drop", (e) => {
      e.preventDefault();
      zone.classList.remove("hovered");
      const draggedId = e.dataTransfer.getData("text");
      const draggedElement = document.getElementById(draggedId);

      if (zone.dataset.match === draggedId) {
        zone.innerHTML = "";
        zone.appendChild(draggedElement);
        zone.classList.add("correct");
        draggedElement.setAttribute("draggable", "false");
        draggedElement.style.cursor = "default";
        correctDrops++;
        if (correctDrops === 4) {
          showReward();
        }
      } else {
        zone.classList.add("incorrect");
        setTimeout(() => zone.classList.remove("incorrect"), 1000);
      }
    });
  });

  // setData is required for Firefox
  draggables.forEach((draggable) => {
    draggable.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text", e.target.id);
    });
  });

  // Recompensa
  const rewardModal = document.getElementById("reward-modal");
  function showReward() {
    setTimeout(() => {
      rewardModal.classList.remove("hidden");
      launchConfetti();
    }, 500);
  }

  // Confetti
  const confettiContainer = document.getElementById("confetti-container");
  function launchConfetti() {
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");
      const colors = ["#34D399", "#EF4444", "#F59E0B", "#3B82F6", "#EC4899"];
      confetti.style.backgroundColor =
        colors[Math.floor(Math.random() * colors.length)];
      confetti.style.left = Math.random() * 100 + "vw";
      confetti.style.animationDelay = Math.random() * 2 + "s";
      confetti.style.transform = `rotate(${Math.random() * 360}deg)`;
      confettiContainer.appendChild(confetti);

      setTimeout(() => {
        confetti.remove();
      }, 3000);
    }
  }
});
