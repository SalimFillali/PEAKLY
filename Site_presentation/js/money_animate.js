document.addEventListener("DOMContentLoaded", () => {

    const page = document.body.id || document.querySelector("main.page_content")?.id;

    if (page !== "remerciements") return;

    const container = document.querySelector(".money_layer");

    if (!container) return;

    const NB_PARTICLES = 35;

    for (let i = 0; i < NB_PARTICLES; i++) {
        const particle = document.createElement("div");
        particle.className = "money_bill";

        const size = Math.random() * 10 + 8;
        particle.style.width = size + "px";
        particle.style.height = size * 0.55 + "px";
        particle.style.left = Math.random() * 100 + "%";
        particle.style.top = -20 + Math.random() * 15 + "%";
        particle.style.opacity = 0.2 + Math.random() * 0.55;
        particle.style.animationDuration = (10 + Math.random() * 12) + "s";
        particle.style.animationDelay = (-Math.random() * 20) + "s";
        particle.style.setProperty("--drift", (Math.random() * 120 - 60) + "px");

        container.appendChild(particle);
    }
});