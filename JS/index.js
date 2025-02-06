/********************************************************
 * FONCTION : CHANGER LA LANGUE
 ********************************************************/
function setLanguage(lang) {
    console.log("Langue sélectionnée : " + lang);
    // Pour cette version, la redirection s'effectue via le lien href
  }
  
  /********************************************************
   * IMAGES DU PERSONNAGE
   ********************************************************/
  const baseCyclist = "../PICTURE/livreur.svg";
  const characterScenes = [
    "../PICTURE/cycliste_scene1.svg",
    "../PICTURE/cycliste_scene2.png",
    "../PICTURE/cycliste_scene3.png",
    "../PICTURE/ambulance.svg"
  ];
  
  /********************************************************
   * DONNÉES DES POINTS AVEC ZONES CONFIGURABLES ET BOUTONS DE NAVIGATION
   ********************************************************/
  const pointsData = [
    {
      image: "../PICTURE/legal.png",
      navButtonImage: "../PICTURE/maisonmdl.svg",  // Bouton "légal"
      zones: [
        { video: "../PICTURE/MVI_0094.mp4", bottom: "2%", left: "0%", width: "300px", height: "170px" },
        { video: "../PICTURE/MVI_0094.mp4", top: "0%", right: "0%", width: "280px", height: "250px" },
        { video: "../PICTURE/MVI_0094.mp4", bottom: "0%", right: "12%", width: "150px", height: "150px" }
      ]
    },
    {
      image: "../PICTURE/aide.png",
      navButtonImage: "../PICTURE/maisonmdl.svg",  // Bouton "Aides"
      zones: [
        { video: "../PICTURE/MVI_0094.mp4", bottom: "2%", left: "14%", width: "200px", height: "225px" },
        { video: "../PICTURE/MVI_0094.mp4", top: "0%", right: "0%", width: "100px", height: "150px" },
        { video: "../PICTURE/MVI_0094.mp4", bottom: "3%", right: "0%", width: "300px", height: "250px" }
       
      ]
    },
    {
      image: "../PICTURE/accidentsfond.png",
      navButtonImage: "../PICTURE/accidentbouton.svg",  // Bouton "accidents"
      zones: [
        { video: "../PICTURE/MVI_0094.mp4", top: "40%", left: "30%", width: "120px", height: "120px" },
        { video: "../PICTURE/MVI_0093.mp4", top: "40%", right: "30%", width: "120px", height: "120px" }
      ]
    },
    {
      image: "../PICTURE/newfond.png",
      navButtonImage: "../PICTURE/hopital.svg",  // Bouton "santé"
      zones: [
        { video: "MVI_0103.mp4", top: "50%", left: "45%", width: "100px", height: "100px" }
      ]
    }
  ];
  
  let currentPointIndex = 0;
  let watchedCount = 0;
  
  /********************************************************
   * FONCTION : LOAD PROGRESS BAR
   ********************************************************/
  function loadProgressBar() {
    const pointsContainer = document.getElementById("points-container");
    pointsContainer.innerHTML = "";
  
    pointsData.forEach((pt, index) => {
      // Création d'un conteneur pour le bouton et le label
      const pointWrapper = document.createElement("div");
      pointWrapper.className = "point-wrapper";
  
      // Pour le point "condition de travail" (index 3), on augmente la largeur du conteneur
      if (index === 3) {
        pointWrapper.style.width = "200px"; // Ajustez cette valeur si nécessaire
      }
  
      // Création du bouton
      const btn = document.createElement("button");
      btn.dataset.pointIndex = index;
      if (index === currentPointIndex) {
        btn.classList.add("point-actif");
      }
      if (pt.navButtonImage) {
        const img = document.createElement("img");
        img.src = pt.navButtonImage;
        img.alt = `Bouton ${index + 1}`;
        btn.appendChild(img);
      }
      pointWrapper.appendChild(btn);
  
      // Création du label
      const label = document.createElement("span");
      if (index === 0) label.textContent = "légal";
      else if (index === 1) label.textContent = "Aides";
      else if (index === 2) label.textContent = "accidents";
      else if (index === 3) {
        label.textContent = "conditions de travail";
        label.style.whiteSpace = "nowrap"; // Empêche le retour à la ligne
      }
      pointWrapper.appendChild(label);
  
      pointsContainer.appendChild(pointWrapper);
  
      btn.addEventListener("click", () => {
        currentPointIndex = index;
        document.getElementById("character").style.backgroundImage =
          currentPointIndex === 3 ? "url('../PICTURE/ambulance.svg')" : "url('" + baseCyclist + "')";
        loadPoint(currentPointIndex);
        updateProgressBar();
      });
    });
    updateCharacterPosition();
  }
  
  /********************************************************
   * FONCTION : UPDATE PROGRESS BAR & POSITION DU PERSONNAGE
   ********************************************************/
  function updateProgressBar() {
    const pointsContainer = document.getElementById("points-container");
    if (!pointsContainer) return;
    // Réinitialiser les classes actives sur tous les boutons
    pointsContainer.querySelectorAll("button").forEach(btn => btn.classList.remove("point-actif"));
    const activeBtn = pointsContainer.querySelector(`button[data-point-index="${currentPointIndex}"]`);
    if (activeBtn) {
      activeBtn.classList.add("point-actif");
    }
    updateCharacterPosition();
  }
  
  function updateCharacterPosition() {
    const pointsContainer = document.getElementById("points-container");
    const character = document.getElementById("character");
    if (!pointsContainer || !character) return;
    const activeBtn = pointsContainer.querySelector(`button[data-point-index="${currentPointIndex}"]`);
    character.style.backgroundImage =
      currentPointIndex === 3 ? "url('../PICTURE/ambulance.svg')" : "url('" + baseCyclist + "')";
    if (activeBtn) {
      const containerRect = pointsContainer.getBoundingClientRect();
      const btnRect = activeBtn.getBoundingClientRect();
      const leftOffset = btnRect.left - containerRect.left + btnRect.width / 2;
      character.style.left = leftOffset + "px";
    }
  }
  
  document.getElementById("character").addEventListener("transitionend", function() {
    this.style.backgroundImage = `url('${characterScenes[currentPointIndex]}')`;
  });
  
  /********************************************************
   * FONCTION : LOAD POINT
   ********************************************************/
  function loadPoint(index) {
    currentPointIndex = index;
    watchedCount = 0;
    const pointData = pointsData[index];
    const container = document.getElementById("image-container");
    container.innerHTML = "";
  
    // Insertion de l'image de fond du point
    const img = document.createElement("img");
    img.className = "bg-image";
    img.src = pointData.image;
    container.appendChild(img);
  
    // Création des zones cliquables
    pointData.zones.forEach((zoneData, i) => {
      const zone = document.createElement("div");
      zone.className = "clickable-zone";
  
      // Dimensions par défaut ou définies
      zone.style.width = zoneData.width || "100px";
      zone.style.height = zoneData.height || "100px";
  
      // Positionnement si défini
      if (zoneData.top) zone.style.top = zoneData.top;
      if (zoneData.left) zone.style.left = zoneData.left;
      if (zoneData.right) zone.style.right = zoneData.right;
      if (zoneData.bottom) zone.style.bottom = zoneData.bottom;
      if (zoneData.transform) zone.style.transform = zoneData.transform;
  
      zone.dataset.zoneIndex = i;
      zone.dataset.watched = "false";
      zone.addEventListener("click", function(){
        if(zone.dataset.watched === "true") return;
        playVideoForZone(i);
      });
      container.appendChild(zone);
    });
    updateProgressBar();
  }
  
  /********************************************************
   * FONCTION : PLAY VIDEO POUR UNE ZONE
   ********************************************************/
  function playVideoForZone(zoneIndex) {
    const videoSource = pointsData[currentPointIndex].zones[zoneIndex].video;
    const overlay = document.createElement("div");
    overlay.className = "video-overlay";
  
    const videoCard = document.createElement("div");
    videoCard.className = "video-card";
    videoCard.addEventListener("click", (e) => e.stopPropagation());
  
    const video = document.createElement("video");
    video.setAttribute("playsinline", "");
    video.setAttribute("controls", "");
    const source = document.createElement("source");
    source.src = videoSource;
    source.type = "video/mp4";
    video.appendChild(source);
  
    videoCard.appendChild(video);
    overlay.appendChild(videoCard);
    document.body.appendChild(overlay);
  
    setTimeout(() => {
      videoCard.classList.add("show");
    }, 100);
  
    video.addEventListener("loadedmetadata", function(){
      video.currentTime = 10;
    }, { once: true });
  
    video.play();
  
    overlay.addEventListener("click", function() {
      videoCard.classList.remove("show");
      setTimeout(() => overlay.remove(), 500);
    });
  
    video.addEventListener("ended", function(){
      videoCard.classList.remove("show");
      setTimeout(() => overlay.remove(), 500);
  
      const container = document.getElementById("image-container");
      const zones = container.querySelectorAll(".clickable-zone");
      zones[zoneIndex].dataset.watched = "true";
      watchedCount++;
      if(watchedCount >= pointsData[currentPointIndex].zones.length) {
        setTimeout(() => { nextPoint(); }, 1000);
      }
    });
  }
  
  /********************************************************
   * FONCTION : PASSER AU POINT SUIVANT
   ********************************************************/
  function nextPoint() {
    if(currentPointIndex < pointsData.length - 1) {
      loadPoint(currentPointIndex + 1);
      updateProgressBar();
    } else {
      console.log("Tous les points sont terminés.");
    }
  }
  
  /********************************************************
   * INITIALISATION
   ********************************************************/
  document.addEventListener("DOMContentLoaded", function(){
    loadProgressBar();
    loadPoint(0);
  });
  