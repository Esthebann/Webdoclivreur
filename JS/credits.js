const aboutButton = document.getElementById("aboutButton");
const credits = document.getElementById("creditsSection");
let showingAbout = false; // État actuel

aboutButton.addEventListener("click", function () {
    if (!showingAbout) {
        // Animation de sortie vers la gauche
        credits.style.transform = "translateX(-100%)";

        credits.addEventListener("transitionend", function handler() {
            credits.removeEventListener("transitionend", handler);

            // Mise à jour du contenu une fois l'animation terminée
            credits.innerHTML = `
            <h3>Ce web-documentaire a été réalisé par :</h3>
            <p class="remerciement">
              Réalisateur : MOi <br>
              Scénario : toujours moi <br>
              Montage : KiKi<br>
              Musique : Showtime<br>
              Direction artistique : Personne<br>
            </p>
          `;

            // Préparer l'animation d'entrée vers la droite
            credits.style.transition = "none";
            credits.style.transform = "translateX(100%)";
            void credits.offsetWidth; // Forcer recalcul du navigateur
            credits.style.transition = "transform 0.5s ease-in-out";
            credits.style.transform = "translateX(0%)";

            showingAbout = true;
        });

    } else {
        // Animation de sortie vers la droite
        credits.style.transform = "translateX(100%)";

        credits.addEventListener("transitionend", function handler() {
            credits.removeEventListener("transitionend", handler);

            // Revenir au texte original
            credits.innerHTML = `
            <h3>Un grand merci à :</h3>
            <p class="remerciement">
              Sans leur soutien, leur collaboration et leur confiance, ce reportage n'aurait jamais vu le jour. Leur engagement passionné a permis de capturer des moments authentiques et inoubliables, et nous leur en sommes infiniment reconnaissants.
            </p>
          `;

            // Préparer l'animation de retour vers la gauche
            credits.style.transition = "none";
            credits.style.transform = "translateX(-100%)";
            void credits.offsetWidth;
            credits.style.transition = "transform 0.5s ease-in-out";
            credits.style.transform = "translateX(0%)";

            showingAbout = false;
        });
    }
});