/* ==========================================================================
   NUNO GARCIA — DJ | Mini-player de áudio (cabeçalho, versão PC)
   ========================================================================== */

/* Lista de sons do leitor. Todos pertencem ao DJ Nuno Garcia.
   Vazia por omissão — o leitor fica escondido em todo o site até se
   acrescentar aqui a primeira faixa. Ver audio/README.md para o passo a
   passo (colocar o mp3 em audio/tracks/, a capa em audio/covers/, e
   acrescentar uma linha aqui). */
const PLAYER_TRACKS = [
  // { file: "nome-do-ficheiro.mp3", cover: "nome-da-capa.jpg", title: "Nome da Faixa" },
];

(function () {
  const TRACKS_BASE = "/audio/tracks/";
  const COVERS_BASE = "/audio/covers/";
  const DEFAULT_COVER = "/images/audio-cover-placeholder.svg";
  const STORAGE_KEY = "djng_player_state_v1";

  let state = {
    trackIndex: 0,
    currentTime: 0,
    isPlaying: false,
    volume: 0.8,
    expanded: false,
  };

  function loadState() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw);
      state = Object.assign({}, state, saved);
      if (state.trackIndex < 0 || state.trackIndex >= PLAYER_TRACKS.length) {
        state.trackIndex = 0;
      }
    } catch (e) {
      /* localStorage indisponível (modo privado, etc.) — segue com os valores por omissão */
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      /* ignora — não é crítico */
    }
  }

  function formatTime(seconds) {
    if (!isFinite(seconds) || seconds < 0) seconds = 0;
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return `${m}:${String(s).padStart(2, "0")}`;
  }

  function init() {
    if (!PLAYER_TRACKS.length) return;
    loadState();

    const player = document.getElementById("mini-player");
    if (!player) return;

    const toggle = document.getElementById("mpToggle");
    const toggleCover = document.getElementById("mpToggleCover");
    const cover = document.getElementById("mpCover");
    const title = document.getElementById("mpTitle");
    const iconPlay = document.getElementById("mpIconPlay");
    const iconPause = document.getElementById("mpIconPause");
    const volumeSlider = document.getElementById("mpVolume");
    const seekSlider = document.getElementById("mpSeek");
    const currentTimeEl = document.getElementById("mpCurrentTime");
    const durationEl = document.getElementById("mpDuration");
    const audio = document.getElementById("mpAudio");

    const withFallback = (imgEl, src) => {
      imgEl.onerror = () => {
        imgEl.onerror = null;
        imgEl.src = DEFAULT_COVER;
      };
      imgEl.src = src;
    };

    function applyExpandedUI() {
      player.classList.toggle("is-open", state.expanded);
      toggle.setAttribute("aria-expanded", String(state.expanded));
    }

    function updatePlayIcon() {
      const playing = !audio.paused && !audio.ended;
      iconPlay.hidden = playing;
      iconPause.hidden = !playing;
      player.classList.toggle("is-playing", playing);
    }

    function updateSeekUI() {
      const dur = audio.duration || 0;
      seekSlider.max = "1000";
      seekSlider.value = dur ? String((audio.currentTime / dur) * 1000) : "0";
      currentTimeEl.textContent = formatTime(audio.currentTime);
      durationEl.textContent = formatTime(dur);
      const pct = dur ? (audio.currentTime / dur) * 100 : 0;
      seekSlider.style.setProperty("--mp-fill", pct + "%");
    }

    function loadTrack(index, { resumeTime = 0, autoplay = false } = {}) {
      state.trackIndex = ((index % PLAYER_TRACKS.length) + PLAYER_TRACKS.length) % PLAYER_TRACKS.length;
      const track = PLAYER_TRACKS[state.trackIndex];

      audio.src = TRACKS_BASE + track.file;
      title.textContent = track.title || track.file;
      const coverSrc = track.cover ? COVERS_BASE + track.cover : DEFAULT_COVER;
      withFallback(cover, coverSrc);
      withFallback(toggleCover, coverSrc);

      const start = () => {
        if (resumeTime > 0) audio.currentTime = resumeTime;
        if (autoplay) {
          audio.play().catch(() => {
            state.isPlaying = false;
            updatePlayIcon();
            saveState();
          });
        }
        updateSeekUI();
      };
      audio.addEventListener("loadedmetadata", start, { once: true });
    }

    function playPause() {
      if (audio.paused) {
        audio.play().catch(() => {});
      } else {
        audio.pause();
      }
    }

    function next() {
      const wasPlaying = !audio.paused;
      loadTrack(state.trackIndex + 1, { autoplay: wasPlaying });
      saveState();
    }

    function prev() {
      const wasPlaying = !audio.paused;
      loadTrack(state.trackIndex - 1, { autoplay: wasPlaying });
      saveState();
    }

    toggle.addEventListener("click", () => {
      state.expanded = true;
      applyExpandedUI();
      saveState();
    });

    player.querySelector('[data-mp="close"]').addEventListener("click", () => {
      state.expanded = false;
      applyExpandedUI();
      saveState();
    });

    player.querySelector('[data-mp="playpause"]').addEventListener("click", playPause);
    player.querySelector('[data-mp="prev"]').addEventListener("click", prev);
    player.querySelector('[data-mp="next"]').addEventListener("click", next);

    volumeSlider.addEventListener("input", () => {
      audio.volume = parseFloat(volumeSlider.value);
      state.volume = audio.volume;
      saveState();
    });

    let isSeeking = false;
    seekSlider.addEventListener("input", () => {
      isSeeking = true;
      const dur = audio.duration || 0;
      if (dur) {
        audio.currentTime = (parseFloat(seekSlider.value) / 1000) * dur;
        currentTimeEl.textContent = formatTime(audio.currentTime);
        seekSlider.style.setProperty("--mp-fill", (parseFloat(seekSlider.value) / 10) + "%");
      }
    });
    seekSlider.addEventListener("change", () => {
      isSeeking = false;
    });

    audio.addEventListener("timeupdate", () => {
      if (isSeeking) return;
      updateSeekUI();
      state.currentTime = audio.currentTime;
    });
    audio.addEventListener("play", () => {
      state.isPlaying = true;
      updatePlayIcon();
      saveState();
    });
    audio.addEventListener("pause", () => {
      state.isPlaying = false;
      updatePlayIcon();
      saveState();
    });
    audio.addEventListener("ended", () => {
      loadTrack(state.trackIndex + 1, { autoplay: true });
    });

    window.addEventListener("beforeunload", () => {
      state.currentTime = audio.currentTime;
      saveState();
    });

    player.hidden = false;
    audio.volume = state.volume;
    volumeSlider.value = String(state.volume);
    applyExpandedUI();
    loadTrack(state.trackIndex, { resumeTime: state.currentTime, autoplay: state.isPlaying });
  }

  document.addEventListener("DOMContentLoaded", init);
})();
