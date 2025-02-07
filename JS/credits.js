/* ------------------------------------------------------------------
   1) ANIMATION CRÉDITS / À PROPOS
------------------------------------------------------------------ */

const aboutButton = document.getElementById("aboutButton");
const creditsSection = document.getElementById("creditsSection");
let showingAbout = false;

aboutButton.addEventListener("click", () => {
  if (!showingAbout) {

    creditsSection.style.transform = "translateX(-100%)";
    creditsSection.addEventListener("transitionend", function handler() {
      creditsSection.removeEventListener("transitionend", handler);


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

      creditsSection.style.transition = "none";
      creditsSection.style.transform = "translateX(100%)";
      void creditsSection.offsetWidth; // force reflow
      creditsSection.style.transition = "transform 0.5s ease-in-out";
      creditsSection.style.transform = "translateX(0%)";

      showingAbout = true;
    });
  } else {

    creditsSection.style.transform = "translateX(100%)";
    creditsSection.addEventListener("transitionend", function handler() {
      creditsSection.removeEventListener("transitionend", handler);


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


      creditsSection.style.transition = "none";
      creditsSection.style.transform = "translateX(-100%)";
      void creditsSection.offsetWidth;
      creditsSection.style.transition = "transform 0.5s ease-in-out";
      creditsSection.style.transform = "translateX(0%)";

      showingAbout = false;
    });
  }
});


const videoButton = document.getElementById("videoButton");


const myVideoUrl = "https://www.youtube.com/watch?v=p2CIyVs9ZA8";


let overlayOpen = false;

videoButton.addEventListener("click", () => {
  openVideoOverlay(myVideoUrl);
});



function openVideoOverlay(videoSource) {

  if (overlayOpen) return;
  overlayOpen = true;


  window.scrollTo(0, 0);

  document.body.style.overflow = "hidden";


  const overlay = document.createElement("div");
  overlay.className = "video-overlay";


  const videoCard = document.createElement("div");
  videoCard.className = "video-card";


  const closeBtn = document.createElement("span");
  closeBtn.className = "close-video";
  closeBtn.innerHTML = "&times;";
  closeBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    closeOverlay(overlay, videoCard);
  });
  videoCard.appendChild(closeBtn);

  videoCard.addEventListener("click", (e) => e.stopPropagation());

  if (videoSource.includes("https://www.youtube.com/watch?v=p2CIyVs9ZA8")) {

    const urlObj = new URL(videoSource);
    const videoId = urlObj.searchParams.get("v") || "";
    const uniquePlayerId = "player-" + Date.now();

    const playerContainer = document.createElement("div");
    playerContainer.id = uniquePlayerId;
    videoCard.appendChild(playerContainer);


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

            if (event.data === YT.PlayerState.ENDED) {
              closeOverlay(overlay, videoCard);
            }
          }
        }
      });
    }, 100);
    
  } else {

    const video = document.createElement("video");
    video.setAttribute("playsinline", "");
    video.setAttribute("controls", "");


    video.style.maxWidth = "100%";
    video.style.maxHeight = "100%";


    const source = document.createElement("source");
    source.src = videoSource;
    source.type = "video/mp4";
    video.appendChild(source);

    videoCard.appendChild(video);
    video.play();

    video.addEventListener("ended", () => {
      closeOverlay(overlay, videoCard);
    });
  }


  overlay.appendChild(videoCard);

  document.body.appendChild(overlay);

  requestAnimationFrame(() => {
    videoCard.classList.add("show");
  });

  overlay.addEventListener("click", () => {
    closeOverlay(overlay, videoCard);
  });
}



function closeOverlay(overlay, videoCard) {

  videoCard.classList.remove("show");


  setTimeout(() => {
    overlay.remove();
    document.body.style.overflow = "";
    overlayOpen = false;
  }, 300);
}


function onYouTubeIframeAPIReady() {
  console.log("YouTube Iframe API is ready.");

}
