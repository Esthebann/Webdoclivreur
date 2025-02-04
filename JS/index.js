// Configuration
const config = {
    checkpoints: [10, 20],
    roadSpeed: 40,
    period: 60
};

// Mapping des zones cliquables
const zonesMapping = {
    "clickable-zone1": { card: "video-card1", video: "secondary-video1", checkpoint: 1 },
    "clickable-zone2": { card: "video-card2", video: "secondary-video2", checkpoint: 1 },
    "clickable-zone3": { card: "video-card3", video: "secondary-video3", checkpoint: 2 },
    "clickable-zone4": { card: "video-card4", video: "secondary-video4", checkpoint: 2 }
};

document.addEventListener('DOMContentLoaded', () => {
    const video = document.getElementById("video");
    const clickableZones = Array.from(document.querySelectorAll(".clickable-zone"));
    const character = document.getElementById("character");
    const checkpointElems = {
        1: document.getElementById("checkpoint1"),
        2: document.getElementById("checkpoint2")
    };
    const road = document.querySelector('.road');
    const messageBubble = document.getElementById("message-bubble");

    let completedVideos = { 1: 0, 2: 0 };
    let validatedCheckpoints = { 1: false, 2: false };
    let mainVideoPausedTime = null;

    const updateTimeline = () => {
        if (!video.duration) return;
        const container = document.querySelector('.timeline-container');
        const wrapper = document.querySelector('.timeline-wrapper');
        const containerRect = container.getBoundingClientRect();
        const wrapperRect = wrapper.getBoundingClientRect();

        config.checkpoints.forEach((time, idx) => {
            const cpElem = checkpointElems[idx + 1];
            cpElem.style.left = `${(time / video.duration) * wrapperRect.width}px`;
        });

        const progressRatio = video.currentTime / video.duration;
        if (video.currentTime >= video.duration) {
            const restaurantElem = document.getElementById('restaurant');
            const restaurantRect = restaurantElem.getBoundingClientRect();
            character.style.left = `${restaurantRect.left - character.offsetWidth - 5}px`;
        } else {
            const wrapperOffsetLeft = wrapperRect.left - containerRect.left;
            character.style.left = `${wrapperOffsetLeft + progressRatio * wrapperRect.width - (character.offsetWidth / 2)}px`;
        }
    };

    const updateRoad = () => {
        const offset = (video.currentTime * config.roadSpeed) % config.period;
        road.style.backgroundPosition = `-${offset}px 0`;
        requestAnimationFrame(updateRoad);
    };

    // Nouvelle version : se baser sur le conteneur plutôt que sur la vidéo seule
    const positionClickableZones = () => {
        const container = document.querySelector('.container');
        const containerRect = container.getBoundingClientRect();

        // Calculer des positions relatives au conteneur
        const positions = [
            { left: containerRect.width / 3 - 50, top: containerRect.height / 2 - 50 },
            { left: (2 * containerRect.width) / 3 - 50, top: containerRect.height / 2 - 50 },
            { left: containerRect.width / 4 - 50, top: containerRect.height / 3 - 50 },
            { left: (3 * containerRect.width) / 4 - 50, top: containerRect.height / 3 - 50 }
        ];

        clickableZones.forEach((zone, i) => {
            zone.style.left = `${positions[i].left}px`;
            zone.style.top = `${positions[i].top}px`;
            // Vous pouvez temporairement forcer l'affichage pour le débug
            // zone.style.display = "block";
        });
    };

    const showZone = (index) => {
        clickableZones[index].style.display = "block";
    };

    const showVideoCard = (zoneId) => {
        const { card, video: vid, checkpoint } = zonesMapping[zoneId];
        const zoneIndex = parseInt(zoneId.slice(-1)) - 1;
        clickableZones[zoneIndex].style.display = "none";
        document.querySelectorAll('.video-card').forEach(card => card.classList.remove("show"));
        const cardElem = document.getElementById(card);
        cardElem.classList.add("show");
        const videoElem = document.getElementById(vid);
        videoElem.play();
        videoElem.addEventListener('ended', () => {
            closeVideoCard(card, vid, checkpoint);
        }, { once: true });
    };

    const closeVideoCard = (card, vid, checkpoint) => {
        document.getElementById(card).classList.remove("show");
        const secVideo = document.getElementById(vid);
        secVideo.pause();
        secVideo.currentTime = 0;
        completedVideos[checkpoint]++;
        if (completedVideos[checkpoint] === 2) {
            validatedCheckpoints[checkpoint] = true;
            if (mainVideoPausedTime !== null) {
                video.currentTime = mainVideoPausedTime;
                video.play();
                mainVideoPausedTime = null;
            }
            completedVideos[checkpoint] = 0;
        }
    };

    const resetCheckpoint = (checkpoint) => {
        validatedCheckpoints[checkpoint] = false;
        completedVideos[checkpoint] = 0;
        video.currentTime = config.checkpoints[checkpoint - 1];
        video.pause();
        clickableZones.forEach(zone => zone.style.display = "none");
        if (checkpoint === 1) { showZone(0); showZone(1); }
        else if (checkpoint === 2) { showZone(2); showZone(3); }
        mainVideoPausedTime = video.currentTime;
    };

    video.addEventListener("loadedmetadata", updateTimeline);
    video.addEventListener("timeupdate", () => {
        updateTimeline();
        const currentTime = video.currentTime;
        config.checkpoints.forEach((time, idx) => {
            const cp = idx + 1;
            if (currentTime >= time && currentTime < time + 1 && !validatedCheckpoints[cp]) {
                video.pause();
                mainVideoPausedTime = currentTime;
                if (cp === 1) { showZone(0); showZone(1); }
                if (cp === 2) { showZone(2); showZone(3); }
            }
        });
    });

    video.addEventListener("ended", () => {
        messageBubble.style.display = "block";
    });

    Object.keys(zonesMapping).forEach(zoneId => {
        document.getElementById(zoneId).addEventListener("click", () => showVideoCard(zoneId));
    });

    Object.keys(checkpointElems).forEach(cp => {
        checkpointElems[cp].addEventListener("click", () => resetCheckpoint(parseInt(cp)));
    });

    messageBubble.addEventListener("click", () => {
        window.location.href = "credits.html";
    });

    positionClickableZones();
    window.addEventListener('resize', positionClickableZones);
    requestAnimationFrame(updateRoad);
});