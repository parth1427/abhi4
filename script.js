/* =========================================
   PHOTO SCROLL REVEAL
   ========================================= */

const photos = document.querySelectorAll(".photo");

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("show");
            }
        });
    },
    {
        threshold: 0.12
    }
);

photos.forEach((photo) => {
    observer.observe(photo);
});


/* =========================================
   PHOTO LIGHTBOX
   ========================================= */

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

photos.forEach((photo) => {

    photo.addEventListener("click", () => {

        const image = photo.querySelector("img");

        if (!image) return;

        lightboxImg.src = image.src;

        lightbox.classList.add("active");
    });

});


lightbox.addEventListener("click", (event) => {

    if (event.target === lightbox) {
        lightbox.classList.remove("active");
    }

});


document.addEventListener("keydown", (event) => {

    if (event.key === "Escape") {
        lightbox.classList.remove("active");
    }

});


/* =========================================
   MUSIC PLAYER
   ========================================= */

const birthdaySong =
    document.getElementById("birthday-song");

const musicToggle =
    document.getElementById("music-toggle");

const musicProgress =
    document.getElementById("music-progress");

const currentTime =
    document.getElementById("current-time");

const duration =
    document.getElementById("duration");


function formatTime(seconds) {

    if (!Number.isFinite(seconds)) {
        return "0:00";
    }

    const minutes = Math.floor(seconds / 60);

    const secondsLeft =
        Math.floor(seconds % 60);

    return `${minutes}:${secondsLeft
        .toString()
        .padStart(2, "0")}`;
}


/* Play / pause */

musicToggle.addEventListener("click", async () => {

    try {

        if (birthdaySong.paused) {

            await birthdaySong.play();

            musicToggle.textContent = "❚❚";

        } else {

            birthdaySong.pause();

            musicToggle.textContent = "▶";

        }

    } catch (error) {

        console.error("Audio could not play:", error);

    }

});


/* Load duration */

birthdaySong.addEventListener("loadedmetadata", () => {

    duration.textContent =
        formatTime(birthdaySong.duration);

});


/* Update progress */

birthdaySong.addEventListener("timeupdate", () => {

    if (!birthdaySong.duration) return;

    musicProgress.value =
        (birthdaySong.currentTime /
        birthdaySong.duration) * 100;

    currentTime.textContent =
        formatTime(birthdaySong.currentTime);

});


/* Seek */

musicProgress.addEventListener("input", () => {

    if (!birthdaySong.duration) return;

    birthdaySong.currentTime =
        (musicProgress.value / 100) *
        birthdaySong.duration;

});


/* Finished */

birthdaySong.addEventListener("ended", () => {

    musicToggle.textContent = "▶";

    musicProgress.value = 0;

    currentTime.textContent = "0:00";

});

const twenty = document.getElementById("twenty");
const birthdayMessage = document.getElementById("birthday-message");

twenty.addEventListener("click", () => {
    twenty.classList.add("clicked");

    setTimeout(() => {
        birthdayMessage.classList.add("show");
    }, 450);
});

/* =========================================
   MIDNIGHT UNLOCK
   ========================================= */

(() => {

    const unlockScreen =
        document.getElementById("unlock-screen");

    const countdown =
        document.getElementById("countdown");

    const unlockButton =
        document.getElementById("unlock-button");


    if (!unlockScreen || !countdown || !unlockButton) {
        console.log("Midnight unlock elements not found.");
        return;
    }


    // 12:00 AM IST — August 11, 2026
    // 18:30 UTC — August 10, 2026

    
       const unlockTime = 
           new Date("2026-08-10T18:30:00Z").getTime();


    function updateCountdown() {

        const now = Date.now();

        const difference =
            unlockTime - now;

        // Midnight has arrived
        if (difference <= 0) {

            countdown.textContent = "00:00:00";

            unlockButton.disabled = false;

            unlockButton.classList.add("ready");

            unlockButton.innerHTML =
                "✦ <span>OPEN</span>";

            const unlockable =
                document.getElementById("unlock-label");

            if (unlockable) {
                unlockable.textContent = "IT'S TIME!";
            }

            return true;
        }


        const totalSeconds =
            Math.floor(difference / 1000);

        const hours =
            Math.floor(totalSeconds / 3600);

        const minutes =
            Math.floor((totalSeconds % 3600) / 60);

        const seconds =
            totalSeconds % 60;


        countdown.textContent =
            String(hours).padStart(2, "0") + ":" +
            String(minutes).padStart(2, "0") + ":" +
            String(seconds).padStart(2, "0");

        return false;
    }


    // Run immediately
    updateCountdown();


    // Update every second
    const timer = setInterval(() => {

        if (updateCountdown()) {
            clearInterval(timer);
        }

    }, 1000);


    // Open website after midnight
    unlockButton.addEventListener("click", () => {

        if (Date.now() < unlockTime) {
            return;
        }

        unlockScreen.classList.add("hidden");

       if (birthdaySong) {
          birthdaySong.play();
       }

    });

})();
unlockLabel.classList.add("ready");