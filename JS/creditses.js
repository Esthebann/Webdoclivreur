const aboutButton = document.getElementById("aboutButton");
const creditsSection = document.getElementById("creditsSection");
let showingAbout = false;

aboutButton.addEventListener("click", function () {
    if (!showingAbout) {
        creditsSection.style.transform = "translateX(-100%)";

        creditsSection.addEventListener("transitionend", function handler() {
            creditsSection.removeEventListener("transitionend", handler);

            creditsSection.innerHTML = `
              <h3>Este web-documental fue realizado por:</h3>
              <p class="remerciement">
                Gabriel bisson-barret <br>
                Kilian Beney<br>
                Brice Bréart<br>
                Noah Laborde<br>
                Esthebann Volle<br>
              </p>
            `;

            creditsSection.style.transition = "none";
            creditsSection.style.transform = "translateX(100%)";
            void creditsSection.offsetWidth;
            creditsSection.style.transition = "transform 0.5s ease-in-out";
            creditsSection.style.transform = "translateX(0%)";

            showingAbout = true;
        });

    } else {
        creditsSection.style.transform = "translateX(100%)";

        creditsSection.addEventListener("transitionend", function handler() {
            creditsSection.removeEventListener("transitionend", handler);

            creditsSection.innerHTML = `
              <h3>Un gran agradecimiento a:</h3>
              <p class="remerciement">
                Sin su apoyo, colaboración y confianza, este reportaje nunca habría visto la luz. Su compromiso apasionado permitió capturar momentos auténticos e inolvidables y estamos profundamente agradecidos.
              </p>
            `;

            creditsSection.style.transition = "none";
            creditsSection.style.transform = "translateX(-100%)";
            void creditsSection.offsetWidth;
            creditsSection.style.transition = "transform 0.5s ease-in-out";
            creditsSection.style.transform = "translateX(0%)";

            showingAbout = false;
        });
    }
});
