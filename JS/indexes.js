/********************************************************
 * FUNCIÓN: CAMBIAR IDIOMA
 ********************************************************/
function setLanguage(lang) {
  console.log("Idioma seleccionado: " + lang);
  // En esta versión, la redirección se gestiona mediante el href del enlace en el menú.
}

/********************************************************
 * IMÁGENES DEL PERSONAJE
 ********************************************************/
const baseCyclist = "../PICTURE/livreur.svg";
const characterScenes = [
  "../PICTURE/cycliste_scene1.svg",
  "../PICTURE/cycliste_scene2.png",
  "../PICTURE/cycliste_scene3.png",
  "../PICTURE/ambulance.svg"
];

/********************************************************
 * DATOS DE LOS PUNTOS CON ZONAS CLICABLES Y BOTONES DE NAVEGACIÓN
 ********************************************************/
const pointsData = [
  {
    image: "../PICTURE/legal.png",
    navButtonImage: "../PICTURE/maisonmdl.svg",  // Botón "legal"
    zones: [
      { video: "../PICTURE/MVI_0094.mp4", bottom: "2%", left: "0%", width: "300px", height: "170px" },
      { video: "../PICTURE/MVI_0094.mp4", top: "0%", right: "0%", width: "280px", height: "250px" },
      { video: "../PICTURE/MVI_0094.mp4", bottom: "0%", right: "12%", width: "150px", height: "150px" }
    ]
  },
  {
    image: "../PICTURE/newfond.png",
    navButtonImage: "../PICTURE/maisonmdl.svg",  // Botón "Asistencia"
    zones: [
      { video: "../PICTURE/MVI_0094.mp4", top: "20%", left: "10%", width: "100px", height: "100px" },
      { video: "../PICTURE/MVI_0094.mp4", top: "20%", right: "10%", width: "100px", height: "100px" },
      { video: "../PICTURE/MVI_0096.mp4", bottom: "20%", left: "50%", transform: "translateX(-50%)", width: "100px", height: "100px" }
    ]
  },
  {
    image: "../PICTURE/accidentsfond.png",
    navButtonImage: "../PICTURE/accidentbouton.svg",  // Botón "Accidentes"
    zones: [
      { video: "../PICTURE/MVI_0094.mp4", top: "40%", left: "30%", width: "120px", height: "120px" },
      { video: "../PICTURE/MVI_0093.mp4", top: "40%", right: "30%", width: "120px", height: "120px" }
    ]
  },
  {
    image: "../PICTURE/newfond.png",
    navButtonImage: "../PICTURE/hopital.svg",  // Botón "Salud"
    zones: [
      { video: "MVI_0103.mp4", top: "50%", left: "45%", width: "100px", height: "100px" }
    ]
  }
];

let currentPointIndex = 0;
let watchedCount = 0;

/********************************************************
 * FUNCIÓN: CARGAR LA BARRA DE PROGRESO
 ********************************************************/
function loadProgressBar() {
  const pointsContainer = document.getElementById("points-container");
  pointsContainer.innerHTML = "";

  pointsData.forEach((pt, index) => {
    // Crear un contenedor para el botón y la etiqueta
    const pointWrapper = document.createElement("div");
    pointWrapper.className = "point-wrapper";

    // Para el punto "condiciones laborales" (índice 3), aumentar el ancho del contenedor
    if (index === 3) {
      pointWrapper.style.width = "200px"; // Ajusta este valor si es necesario
    }

    // Crear el botón
    const btn = document.createElement("button");
    btn.dataset.pointIndex = index;
    if (index === currentPointIndex) {
      btn.classList.add("point-actif");
    }
    if (pt.navButtonImage) {
      const img = document.createElement("img");
      img.src = pt.navButtonImage;
      img.alt = `Botón ${index + 1}`;
      btn.appendChild(img);
    }
    pointWrapper.appendChild(btn);

    // Crear la etiqueta
    const label = document.createElement("span");
    if (index === 0) label.textContent = "legal";
    else if (index === 1) label.textContent = "Asistencia";
    else if (index === 2) label.textContent = "accidentes";
    else if (index === 3) {
      label.textContent = "condiciones trabajo";
      label.style.whiteSpace = "nowrap"; // Evita el salto de línea
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
 * FUNCIÓN: ACTUALIZAR BARRA DE PROGRESO Y POSICIÓN DEL PERSONAJE
 ********************************************************/
function updateProgressBar() {
  const pointsContainer = document.getElementById("points-container");
  if (!pointsContainer) return;
  // Remover la clase activa de todos los botones
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
 * FUNCIÓN: CARGAR PUNTO
 ********************************************************/
function loadPoint(index) {
  currentPointIndex = index;
  watchedCount = 0;
  const pointData = pointsData[index];
  const container = document.getElementById("image-container");
  container.innerHTML = "";

  // Insertar la imagen de fondo del punto
  const img = document.createElement("img");
  img.className = "bg-image";
  img.src = pointData.image;
  container.appendChild(img);

  // Crear zonas clicables
  pointData.zones.forEach((zoneData, i) => {
    const zone = document.createElement("div");
    zone.className = "clickable-zone";

    // Establecer dimensiones predeterminadas o las definidas
    zone.style.width = zoneData.width || "100px";
    zone.style.height = zoneData.height || "100px";

    // Posicionamiento si está definido
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
 * FUNCIÓN: REPRODUCIR VÍDEO PARA UNA ZONA
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
 * FUNCIÓN: PASAR AL SIGUIENTE PUNTO
 ********************************************************/
function nextPoint() {
  if(currentPointIndex < pointsData.length - 1) {
    loadPoint(currentPointIndex + 1);
    updateProgressBar();
  } else {
    console.log("Todos los puntos han finalizado.");
  }
}

/********************************************************
 * INICIALIZACIÓN
 ********************************************************/
document.addEventListener("DOMContentLoaded", function(){
  loadProgressBar();
  loadPoint(0);
});
