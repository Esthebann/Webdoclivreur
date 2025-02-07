
const baseCyclist = "../PICTURE/livreur.svg";
const characterScenes = [
  "../PICTURE/cycliste_scene1.svg",
  "../PICTURE/cycliste_scene2.png",
  "../PICTURE/cycliste_scene3.png",
  "../PICTURE/ambulance.svg"
];

const pointsData = [
  {
    image: "../PICTURE/legal.png",
    navButtonImage: "../PICTURE/vector 15.png",
    zones: [
      {
        video: "https://www.youtube.com/watch?v=9lHGPfybFIs",
        bottom: "2%",
        left: "0%",
        width: "300px",
        height: "170px"
      },
      {
        video: "https://www.youtube.com/watch?v=xzJpLcK6psc",
        top: "0%",
        right: "0%",
        width: "280px",
        height: "250px"
      },
      {
        video: "https://www.youtube.com/watch?v=Xuzmdb6QGw0",
        bottom: "0%",
        right: "12%",
        width: "150px",
        height: "150px"
      }
    ]
  },
  {
    image: "../PICTURE/aide.png",
    navButtonImage: "../PICTURE/maisonmdl.svg",
    zones: [
      {
        video: "https://www.youtube.com/watch?v=LSFYzCnHX1M&feature=youtu.be",
        bottom: "2%",
        left: "14%",
        width: "200px",
        height: "225px"
      },
      {
        video: "https://www.youtube.com/watch?v=lhaMUTpItyk&feature=youtu.be",
        bottom: "20%",
        left: "0%",
        width: "100px",
        height: "220px"
      },
      {
        video: "https://www.youtube.com/watch?v=D4JuUVveek4",
        top: "0%",
        right: "0%",
        width: "100px",
        height: "150px"
      },
      {
        video: "https://www.youtube.com/watch?v=LPKfYXiNRLc",
        top: "15%",
        right: "45%",
        width: "170px",
        height: "140px"
      },
      {
        video: "https://www.youtube.com/watch?v=e12oBJ2_-W8&feature=youtu.be",
        bottom: "3%",
        right: "40%",
        width: "150px",
        height: "100px"
      },
      {
        video: "https://www.youtube.com/watch?v=CKnO2_djKe0",
        bottom: "3%",
        right: "0%",
        width: "300px",
        height: "250px"
      }
    ]
  },
  {
    image: "../PICTURE/accidentsfond.png",
    navButtonImage: "../PICTURE/accidentbouton.svg",
    zones: [
      {
        video: "https://www.youtube.com/watch?v=X_C5EZwJDEk&feature=youtu.be",
        top: "65%",
        left: "12%",
        width: "160px",
        height: "120px"
      },
      {
        video: "https://www.youtube.com/watch?v=kxkHdOggqK8&feature=youtu.be",
        bottom: "2%",
        right: "0%",
        width: "450px",
        height: "140px"
      },
      {
        video: "https://www.youtube.com/watch?v=O0U3vHW_lN0&feature=youtu.be",
        top: "35%",
        right: "12%",
        width: "250px",
        height: "140px"
      },
      {
        video: "https://www.youtube.com/watch?v=arfNXHD2_Rs",
        top: "0%",
        right: "12%",
        width: "500px",
        height: "140px"
      }
    ]
  },
  {
    image: "../PICTURE/conditions.png",
    navButtonImage: "../PICTURE/hopital.svg",
    zones: [
      {
        video: "https://www.youtube.com/watch?v=Z-HIRJzhmVw&feature=youtu.be",
        top: "20%",
        left: "25%",
        width: "100px",
        height: "90px"
      },
      {
        video: "https://www.youtube.com/watch?v=2BqsA5o5YS0&feature=youtu.be",
        top: "25%",
        left: "3%",
        width: "120px",
        height: "330px"
      },
      {
        video: "https://www.youtube.com/watch?v=7A65wkCmaHQ&feature=youtu.be",
        bottom: "2%",
        right: "25%",
        width: "200px",
        height: "140px"
      },
      {
        video: "https://www.youtube.com/watch?v=rW-PsJU9ZLs&feature=youtu.be",
        top: "35%",
        right: "10%",
        width: "150px",
        height: "140px"
      },
      {
        video: "https://www.youtube.com/watch?v=cwKfV9DyiMg&feature=youtu.be",
        top: "10%",
        right: "16%",
        width: "100px",
        height: "80px"
      }
    ]
  }
];

let currentPointIndex = 0;
let watchedCount = 0;

function loadProgressBar() {
  const pointsContainer = document.getElementById("points-container");
  if (!pointsContainer) return;
  pointsContainer.innerHTML = "";

  pointsData.forEach((pt, index) => {
    const pointWrapper = document.createElement("div");
    pointWrapper.className = "point-wrapper";

    if (index === 3) {
      pointWrapper.style.width = "200px";
    }

    const btn = document.createElement("button");
    btn.dataset.pointIndex = index;
    if (index === currentPointIndex) {
      btn.classList.add("point-actif");
    }
    if (pt.navButtonImage) {
      const img = document.createElement("img");
      img.src = pt.navButtonImage;
      img.alt = `Button ${index + 1}`;
      btn.appendChild(img);
    }
    pointWrapper.appendChild(btn);

    const label = document.createElement("span");
    if (index === 0) label.textContent = "Legal";
    else if (index === 1) label.textContent = "Assistance";
    else if (index === 2) label.textContent = "Accidents";
    else if (index === 3) {
      label.textContent = "Working Conditions";
      label.style.whiteSpace = "nowrap";
    }
    pointWrapper.appendChild(label);

    pointsContainer.appendChild(pointWrapper);

    btn.addEventListener("click", () => {
      currentPointIndex = index;
      document.getElementById("character").style.backgroundImage =
        currentPointIndex === 3
          ? "url('../PICTURE/ambulance.svg')"
          : "url('" + baseCyclist + "')";
      loadPoint(currentPointIndex);
      updateProgressBar();
    });
  });
  updateCharacterPosition();
}

function updateProgressBar() {
  const pointsContainer = document.getElementById("points-container");
  if (!pointsContainer) return;
  pointsContainer.querySelectorAll("button").forEach(btn => {
    btn.classList.remove("point-actif");
  });
  const activeBtn = pointsContainer.querySelector(
    `button[data-point-index="${currentPointIndex}"]`
  );
  if (activeBtn) {
    activeBtn.classList.add("point-actif");
  }
  updateCharacterPosition();
}

function updateCharacterPosition() {
  const pointsContainer = document.getElementById("points-container");
  const character = document.getElementById("character");
  if (!pointsContainer || !character) return;
  const activeBtn = pointsContainer.querySelector(
    `button[data-point-index="${currentPointIndex}"]`
  );
  character.style.backgroundImage =
    currentPointIndex === 3
      ? "url('../PICTURE/ambulance.svg')"
      : "url('" + baseCyclist + "')";

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

function loadPoint(index) {
  currentPointIndex = index;
  watchedCount = 0;
  const pointData = pointsData[index];

  const container = document.getElementById("image-container");
  if (!container) return;
  container.innerHTML = "";
  const img = document.createElement("img");
  img.className = "bg-image";
  img.src = pointData.image;
  container.appendChild(img);

  pointData.zones.forEach((zoneData, i) => {
    const zone = document.createElement("div");
    zone.className = "clickable-zone";
    zone.style.width = zoneData.width || "100px";
    zone.style.height = zoneData.height || "100px";
    if (zoneData.top) zone.style.top = zoneData.top;
    if (zoneData.left) zone.style.left = zoneData.left;
    if (zoneData.right) zone.style.right = zoneData.right;
    if (zoneData.bottom) zone.style.bottom = zoneData.bottom;
    if (zoneData.transform) zone.style.transform = zoneData.transform;

    zone.dataset.zoneIndex = i;
    zone.dataset.watched = "false";
    zone.addEventListener("click", function() {
      if (zone.dataset.watched === "true") return;
      playVideoForZone(i);
    });

    container.appendChild(zone);
  });

  updateProgressBar();
}

function playVideoForZone(zoneIndex) {
  const zoneInfo = pointsData[currentPointIndex].zones[zoneIndex];
  const videoSource = zoneInfo.video;
  const overlay = document.createElement("div");
  overlay.className = "video-overlay";
  const videoCard = document.createElement("div");
  videoCard.className = "video-card";
  videoCard.addEventListener("click", (e) => e.stopPropagation());

  overlay.appendChild(videoCard);
  document.body.appendChild(overlay);
  if (videoSource.includes("youtube.com/watch")) {
    const playerContainer = document.createElement("div");
    const uniquePlayerId = "player-" + Date.now();
    playerContainer.id = uniquePlayerId;
    videoCard.appendChild(playerContainer);
    const urlObj = new URL(videoSource);
    const videoId = urlObj.searchParams.get("v") || "";
    const widthVal = zoneInfo.width
      ? zoneInfo.width.replace("px", "")
      : "560";
    const heightVal = zoneInfo.height
      ? zoneInfo.height.replace("px", "")
      : "315";

    const player = new YT.Player(uniquePlayerId, {
      width: widthVal,
      height: heightVal,
      videoId: videoId,
      playerVars: {
        autoplay: 1
      },
      events: {
        onStateChange: function(event) {
          if (event.data === YT.PlayerState.ENDED) {
            closeOverlay(overlay, videoCard);
            markZoneAsWatched(zoneIndex);
          }
        }
      }
    });
  } else {
    const video = document.createElement("video");
    video.setAttribute("playsinline", "");
    video.setAttribute("controls", "");

    const source = document.createElement("source");
    source.src = videoSource;
    source.type = "video/mp4";
    video.appendChild(source);

    videoCard.appendChild(video);
    video.play();

    video.addEventListener("ended", () => {
      closeOverlay(overlay, videoCard);
      markZoneAsWatched(zoneIndex);
    });
  }

  videoCard.classList.add("show");
  overlay.addEventListener("click", function() {
    closeOverlay(overlay, videoCard);
  });
}

function closeOverlay(overlay, videoCard) {
  videoCard.classList.remove("show");
  setTimeout(() => {
    overlay.remove();
  }, 300);
}

function markZoneAsWatched(zoneIndex) {
  const container = document.getElementById("image-container");
  if (!container) return;

  const zones = container.querySelectorAll(".clickable-zone");
  if (!zones[zoneIndex]) return;

  zones[zoneIndex].dataset.watched = "true";
  watchedCount++;

  if (watchedCount >= pointsData[currentPointIndex].zones.length) {
    setTimeout(() => {
      nextPoint();
    }, 1000);
  }
}

function nextPoint() {
  if (currentPointIndex < pointsData.length - 1) {
    loadPoint(currentPointIndex + 1);
    updateProgressBar();
  } else {
    console.log("All points have been completed. Redirecting in 2 seconds...");
    setTimeout(() => {
      window.location.href = "../HTML/creditsen.html";
    }, 2000);
  }
}

function onYouTubeIframeAPIReady() {
  console.log("YouTube Iframe API is ready.");
}

document.addEventListener("DOMContentLoaded", function() {
  loadProgressBar();
  loadPoint(0);
});
