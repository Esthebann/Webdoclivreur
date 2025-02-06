const aboutButton = document.getElementById("aboutButton");
const creditsSection = document.getElementById("creditsSection");
let showingAbout = false;

aboutButton.addEventListener("click", function () {
    if (!showingAbout) {
        creditsSection.style.transform = "translateX(-100%)";

        creditsSection.addEventListener("transitionend", function handler() {
            creditsSection.removeEventListener("transitionend", handler);

            creditsSection.innerHTML = `
              <h3>This web-documentary was created by:</h3>
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
              <h3>A big thank you to:</h3>
              <p class="remerciement">
                Without their support, collaboration and trust, this documentary would have never seen the light of day. Their passionate commitment allowed us to capture authentic and unforgettable moments, and we are deeply grateful.
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
