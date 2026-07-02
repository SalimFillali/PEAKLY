document.addEventListener("DOMContentLoaded", () => {

    const container = document.querySelector(".particles");

    if (!container) return;

    const mainContent = document.querySelector("main.page_content");
    const isThankYouPage = document.body.id === "remerciements" || mainContent?.id === "remerciements";

    const NB_PARTICLES = isThankYouPage ? 45 : 70;

    for (let i = 0; i < NB_PARTICLES; i++) {

        const particle = document.createElement("div");

        particle.className = isThankYouPage
            ? "particle hero_particle money_bill"
            : "particle hero_particle";

        if (isThankYouPage) {
            const size = Math.random() * 10 + 8;
            particle.style.width = size + "px";
            particle.style.height = size * 0.55 + "px";
            particle.style.left = Math.random() * 100 + "%";
            particle.style.top = -20 + Math.random() * 15 + "%";
            particle.style.opacity = 0.2 + Math.random() * 0.55;
            particle.style.animationDuration = (10 + Math.random() * 12) + "s";
            particle.style.animationDelay = (-Math.random() * 20) + "s";
            const drift = Math.random() * 120 - 60;
            particle.style.setProperty("--drift", drift + "px");
        } else {
            const size = Math.random() * 5 + 2;
            particle.style.width = size + "px";
            particle.style.height = size + "px";
            particle.style.left = Math.random() * 100 + "%";
            particle.style.top = Math.random() * 100 + "%";
            particle.style.opacity = 0.15 + Math.random() * 0.55;
            particle.style.animationDuration = (15 + Math.random() * 25) + "s";
            particle.style.animationDelay = (-Math.random() * 30) + "s";
        }

        container.appendChild(particle);
    }

});