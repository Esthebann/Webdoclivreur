/* ------------------------------------------------------------------
   1) ANIMATION CRÉDITS / À PROPOS
------------------------------------------------------------------ */

const aboutButton = document.getElementById("aboutButton");
const creditsSection = document.getElementById("creditsSection");
let showingAbout = false; // false => on affiche "Crédits" par défaut

aboutButton.addEventListener("click", () => {
  if (!showingAbout) {
    // Sortie vers la gauche
    creditsSection.style.transform = "translateX(-100%)";
    creditsSection.addEventListener("transitionend", function handler() {
      creditsSection.removeEventListener("transitionend", handler);

      // Mise à jour du contenu
      creditsSection.innerHTML = `
        <h3>Ce web-documentaire a été réalisé par :</h3>
        <p class="remerciement">
          Gabriel Bisson--Barret <br>
          Kilian Beney<br>
          Brice Bréart<br>
          Noah Laborde<br>
          Esthebann Volle<br>
        </p>
      `;

      // Animation d’entrée depuis la droite
      creditsSection.style.transition = "none";
      creditsSection.style.transform = "translateX(100%)";
      void creditsSection.offsetWidth; // force reflow
      creditsSection.style.transition = "transform 0.5s ease-in-out";
      creditsSection.style.transform = "translateX(0%)";

      showingAbout = true;
    });
  } else {
    // Sortie vers la droite
    creditsSection.style.transform = "translateX(100%)";
    creditsSection.addEventListener("transitionend", function handler() {
      creditsSection.removeEventListener("transitionend", handler);

      // Retour au texte original
      creditsSection.innerHTML = `
        <h3>Un grand merci à :</h3>
        <p class="remerciement">
          Jonathan L’utile Chevalier, Ben Moumen Slimane, 
          Charles-Alexandre Delestage, Willy Ivart,
          Gwendal Judic, Delphine Reyss, Thomas Brunel de Montmejan,
          Oscar Motta, Claire d’Hennezel, Mélanie Bourdaa,
          Allan Deneuville, Martine Bornerie...
          <br><br>
          Sans leur soutien, leur collaboration et leur confiance,
          ce reportage n'aurait jamais vu le jour. Leur engagement
          passionné a permis de capturer des moments authentiques
          et inoubliables, et nous leur en sommes infiniment reconnaissants.
        </p>
      `;

      // Animation de retour depuis la gauche
      creditsSection.style.transition = "none";
      creditsSection.style.transform = "translateX(-100%)";
      void creditsSection.offsetWidth;
      creditsSection.style.transition = "transform 0.5s ease-in-out";
      creditsSection.style.transform = "translateX(0%)";

      showingAbout = false;
    });
  }
});

/* ------------------------------------------------------------------
   2) GESTION DE L'OVERLAY VIDÉO (BOUTON "VOIR LA VIDÉO")
------------------------------------------------------------------ */

const videoButton = document.getElementById("videoButton");

// Exemple d'URL YouTube
const myVideoUrl = "https://www.youtube.com/watch?v=_UE3Z0CGLsY";

/**
 * Booléen pour empêcher le spam d’ouverture
 * (une seule overlay à la fois)
 */
let overlayOpen = false;

videoButton.addEventListener("click", () => {
  openVideoOverlay(myVideoUrl);
});

/* ------------------------------------------------------------------
   OUVERTURE DE L'OVERLAY VIDÉO
   - Gère YouTube (via API) ou .mp4 local
------------------------------------------------------------------ */

function openVideoOverlay(videoSource) {
  // Empêcher le spam de clic
  if (overlayOpen) return;
  overlayOpen = true;

  // Optionnel : remonter la page tout en haut
  window.scrollTo(0, 0);
  // Optionnel : bloquer le défilement du body
  document.body.style.overflow = "hidden";

  // Créer l'overlay
  const overlay = document.createElement("div");
  overlay.className = "video-overlay";

  // Conteneur (videoCard)
  const videoCard = document.createElement("div");
  videoCard.className = "video-card";

  // Bouton de fermeture
  const closeBtn = document.createElement("span");
  closeBtn.className = "close-video";
  closeBtn.innerHTML = "&times;";
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeOverlay(overlay, videoCard);
  });
  videoCard.appendChild(closeBtn);

  // Empêcher la propagation sur la vidéo
  videoCard.addEventListener("click", (e) => e.stopPropagation());

  // ----- Si c’est un lien YouTube -----
  if (videoSource.includes("https://www.youtube.com/watch?v=9lHGPfybFIs")) {
    // On extrait l'ID depuis l'URL
    const urlObj = new URL(videoSource);
    const videoId = urlObj.searchParams.get("v") || "";
    const uniquePlayerId = "player-" + Date.now();

    // Créer un div pour le player
    const playerContainer = document.createElement("div");
    playerContainer.id = uniquePlayerId;
    videoCard.appendChild(playerContainer);

    // Initialiser le lecteur YT après un bref délai (API chargée ?)
    setTimeout(() => {
      new YT.Player(uniquePlayerId, {
        width: 560,
        height: 315,
        videoId: videoId,
        playerVars: {
          autoplay: 1
        },
        events: {
          onStateChange: (event) => {
            // Fermer si la vidéo se termine
            if (event.data === YT.PlayerState.ENDED) {
              closeOverlay(overlay, videoCard);
            }
          }
        }
      });
    }, 100);
    
  } else {
    // ----- Sinon, on suppose un .mp4 local -----
    const video = document.createElement("video");
    video.setAttribute("playsinline", "");
    video.setAttribute("controls", "");

    // Optionnel : style adaptatif
    video.style.maxWidth = "100%";
    video.style.maxHeight = "100%";

    // Source
    const source = document.createElement("source");
    source.src = videoSource;
    source.type = "video/mp4";
    video.appendChild(source);

    videoCard.appendChild(video);
    video.play();

    // Fermer après la fin
    video.addEventListener("ended", () => {
      closeOverlay(overlay, videoCard);
    });
  }

  // Ajouter la carte vidéo à l'overlay
  overlay.appendChild(videoCard);
  // Ajouter l’overlay au body
  document.body.appendChild(overlay);

  // Petite animation “zoom” (class .show)
  requestAnimationFrame(() => {
    videoCard.classList.add("show");
  });

  // Fermer si on clique sur l’overlay (fond)
  overlay.addEventListener("click", () => {
    closeOverlay(overlay, videoCard);
  });
}

/* ------------------------------------------------------------------
   FERMETURE DE L'OVERLAY
------------------------------------------------------------------ */

function closeOverlay(overlay, videoCard) {
  // Retirer la classe “show” => animation inverse
  videoCard.classList.remove("show");

  // Retirer l’overlay après un délai pour laisser l'anim se finir
  setTimeout(() => {
    overlay.remove();
    document.body.style.overflow = ""; // reautoriser le scroll
    overlayOpen = false;               // autoriser la réouverture
  }, 300);
}

/* ------------------------------------------------------------------
   CALLBACK APPELÉ PAR L'API YOUTUBE
------------------------------------------------------------------ */
function onYouTubeIframeAPIReady() {
  console.log("YouTube Iframe API is ready.");
  // Rien de spécial ici, le player est créé dans openVideoOverlay().
}
