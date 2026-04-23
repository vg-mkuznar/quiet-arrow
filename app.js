import {
  groceryGroups,
  itinerary,
  packing,
  places,
  pugChecklist,
  recipes,
  trip,
} from "./trip-data.js";

const storage = {
  get(key, fallback) {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) : fallback;
    } catch {
      return fallback;
    }
  },
  set(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  },
};

const state = {
  activeScreen: "today",
  recipeFavorites: storage.get("qa.recipeFavorites", {}),
  placeFavorites: storage.get("qa.placeFavorites", {}),
  itineraryEdits: storage.get("qa.itineraryEdits", {}),
  checklist: storage.get("qa.checklist", {}),
  notes: storage.get("qa.notes", {}),
  themeDark: storage.get(
    "qa.themeDark",
    window.matchMedia("(prefers-color-scheme: dark)").matches,
  ),
  reduceMotion: storage.get(
    "qa.reduceMotion",
    window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  ),
  timer: storage.get("qa.timer", {
    preset: 50,
    remaining: 50 * 60,
    running: false,
    lastTick: null,
  }),
};

const els = {
  screens: document.querySelectorAll(".screen"),
  navItems: document.querySelectorAll(".nav-item"),
  jumpButtons: document.querySelectorAll("[data-jump]"),
  tripStatusTitle: document.querySelector("#trip-status-title"),
  tripStatusCopy: document.querySelector("#trip-status-copy"),
  statusPill: document.querySelector("#status-pill"),
  todayLabel: document.querySelector("#today-label"),
  nextUp: document.querySelector("#next-up"),
  todayPlan: document.querySelector("#today-plan"),
  weatherSummary: document.querySelector("#weather-summary"),
  weatherDays: document.querySelector("#weather-days"),
  anchorSummary: document.querySelector("#anchor-summary"),
  stayReminders: document.querySelector("#stay-reminders"),
  itineraryDays: document.querySelector("#itinerary-days"),
  recipeList: document.querySelector("#recipe-list"),
  groceryGroups: document.querySelector("#grocery-groups"),
  placesList: document.querySelector("#places-list"),
  writingSummary: document.querySelector("#writing-summary"),
  pugReminders: document.querySelector("#pug-reminders"),
  packingGroups: document.querySelector("#packing-groups"),
  pugGroups: document.querySelector("#pug-groups"),
  writingSessions: document.querySelector("#writing-sessions"),
  timerDisplay: document.querySelector("#timer-display"),
  focusOverlayTime: document.querySelector("#focus-overlay-time"),
  focusOverlay: document.querySelector("#focus-overlay"),
  focusToggle: document.querySelector("#focus-toggle"),
  exitFocus: document.querySelector("#exit-focus"),
  themeToggle: document.querySelector("#theme-toggle"),
  motionToggle: document.querySelector("#motion-toggle"),
  installButton: document.querySelector("#install-button"),
  splash: document.querySelector("#splash"),
};

let deferredPrompt = null;
let timerInterval = null;

function setScreen(target) {
  state.activeScreen = target;
  els.screens.forEach((screen) => {
    screen.classList.toggle("active", screen.dataset.screen === target);
  });
  els.navItems.forEach((item) => {
    item.classList.toggle("active", item.dataset.target === target);
  });
}

function formatCountdown(start) {
  const now = new Date();
  const diff = start.getTime() - now.getTime();
  if (diff <= 0) return "Trip in progress";
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return `${days} day${days === 1 ? "" : "s"} to go`;
}

function getActiveDayIndex() {
  const now = new Date();
  const start = new Date(trip.dates.start);
  const end = new Date(trip.dates.end);
  if (now < start) return 0;
  if (now > end) return itinerary.length - 1;
  const day = now.getDate();
  const match = itinerary.findIndex((item) => new Date(`2026 ${item.dateLabel}`).getDate() === day);
  return match === -1 ? 0 : match;
}

function getTripStatus() {
  const start = new Date(trip.dates.start);
  const end = new Date(trip.dates.end);
  const now = new Date();
  if (now < start) {
    return {
      title: "A slow mountain weekend is coming up.",
      copy: `${formatCountdown(start)}. You’re set up for sleep-ins, writing blocks, grill nights, and unhurried pug time.`,
      pill: "Pre-trip",
    };
  }
  if (now > end) {
    return {
      title: "Weekend complete, calm hopefully retained.",
      copy: "Your lists, notes, and favorites stay here for the next trip or a rerun.",
      pill: "Trip complete",
    };
  }
  return {
    title: "You’re in the getaway now.",
    copy: "Keep the pace easy. Use Today for the next move and let the rest stay soft.",
    pill: "In progress",
  };
}

function getPeriodText(dayId, period, fallback) {
  return state.itineraryEdits[`${dayId}.${period}`] || fallback;
}

function renderTripHeader() {
  const status = getTripStatus();
  els.tripStatusTitle.textContent = status.title;
  els.tripStatusCopy.textContent = status.copy;
  els.statusPill.textContent = status.pill;
}

function renderWeather() {
  els.weatherSummary.textContent = trip.weather.summary;
  els.weatherDays.innerHTML = trip.weather.days
    .map(
      (day) => `
        <div class="weather-day">
          <strong>${day.label}</strong>
          <div>${day.condition}</div>
          <div class="muted">${day.high}° / ${day.low}°</div>
        </div>
      `,
    )
    .join("");
}

function renderStayMeta() {
  els.anchorSummary.textContent = `${trip.anchor.detail} ${trip.anchor.address}`;
  els.stayReminders.innerHTML = `
    <li>${trip.reminders.checkIn}</li>
    <li>${trip.reminders.checkOut}</li>
  `;
}

function renderToday() {
  const activeDay = itinerary[getActiveDayIndex()];
  const nextItem = activeDay.blocks[0];
  els.todayLabel.textContent = `${activeDay.label}, ${activeDay.dateLabel}`;
  els.nextUp.innerHTML = `
    <div class="next-card">
      <strong>${nextItem.time} · ${nextItem.title}</strong>
      <span class="muted">${getPeriodText(activeDay.id, "notes", activeDay.periods.notes)}</span>
    </div>
  `;
  els.todayPlan.innerHTML = activeDay.blocks
    .map(
      (block) => `
        <div class="glance-item">
          <strong>${block.time} · ${block.title}</strong>
          <span class="glance-meta">${block.type}</span>
        </div>
      `,
    )
    .join("");
  els.writingSummary.textContent = activeDay.writing;
  els.pugReminders.innerHTML = trip.pugReminders.map((item) => `<li>${item}</li>`).join("");
}

function renderItinerary() {
  els.itineraryDays.innerHTML = itinerary
    .map((day) => {
      const periods = ["morning", "afternoon", "evening", "optional", "notes"];
      return `
        <article class="glass day-card">
          <div class="day-header">
            <div>
              <p class="eyebrow">${day.dateLabel}</p>
              <h3>${day.label}</h3>
            </div>
            <span class="chip">${day.writing}</span>
          </div>
          <div class="period-grid">
            ${periods
              .map(
                (period) => `
                  <div class="period-card">
                    <div class="period-top">
                      <strong>${period.charAt(0).toUpperCase() + period.slice(1)}</strong>
                      <button class="edit-button" data-day="${day.id}" data-period="${period}" type="button">Edit</button>
                    </div>
                    <div>${getPeriodText(day.id, period, day.periods[period])}</div>
                  </div>
                `,
              )
              .join("")}
          </div>
        </article>
      `;
    })
    .join("");

  document.querySelectorAll(".edit-button").forEach((button) => {
    button.addEventListener("click", () => {
      const key = `${button.dataset.day}.${button.dataset.period}`;
      const day = itinerary.find((item) => item.id === button.dataset.day);
      const current = getPeriodText(button.dataset.day, button.dataset.period, day.periods[button.dataset.period]);
      const updated = window.prompt(`Edit ${button.dataset.period}`, current);
      if (updated !== null) {
        state.itineraryEdits[key] = updated.trim() || current;
        storage.set("qa.itineraryEdits", state.itineraryEdits);
        renderItinerary();
        vibrate();
      }
    });
  });
}

function toggleFavorite(bucket, id) {
  state[bucket][id] = !state[bucket][id];
  storage.set(`qa.${bucket}`, state[bucket]);
  vibrate();
}

function renderRecipes() {
  els.recipeList.innerHTML = recipes
    .map(
      (recipe) => `
        <article class="glass recipe-card ${state.recipeFavorites[recipe.id] ? "favorite" : ""}">
          <div class="panel-head">
            <h3>${recipe.title}</h3>
            <button class="text-button favorite-button" data-recipe-favorite="${recipe.id}" type="button">
              ${state.recipeFavorites[recipe.id] ? "Saved" : "Save"}
            </button>
          </div>
          <div class="recipe-meta">
            <span class="chip">Prep ${recipe.prep}</span>
            <span class="chip">Grill ${recipe.grill}</span>
          </div>
          <p>${recipe.fit}</p>
          <ul class="recipe-points">
            <li><strong>Ingredients:</strong> ${recipe.ingredients.join(", ")}</li>
            <li><strong>How:</strong> ${recipe.steps.join(" ")}</li>
          </ul>
        </article>
      `,
    )
    .join("");

  document.querySelectorAll("[data-recipe-favorite]").forEach((button) => {
    button.addEventListener("click", () => {
      toggleFavorite("recipeFavorites", button.dataset.recipeFavorite);
      renderRecipes();
    });
  });
}

function updateChecklistValue(key, checked) {
  state.checklist[key] = checked;
  storage.set("qa.checklist", state.checklist);
}

function renderChecklistGroups(target, groups, prefix) {
  target.innerHTML = groups
    .map(
      (group) => `
        <section class="check-group">
          <h4>${group.title}</h4>
          <div class="checklist">
            ${group.items
              .map((item, index) => {
                const key = `${prefix}.${group.title}.${index}`;
                return `
                  <label class="check-item">
                    <input type="checkbox" data-check-key="${key}" ${state.checklist[key] ? "checked" : ""} />
                    <span>${item}</span>
                  </label>
                `;
              })
              .join("")}
          </div>
        </section>
      `,
    )
    .join("");
}

function bindChecklistInputs() {
  document.querySelectorAll("[data-check-key]").forEach((input) => {
    input.addEventListener("change", () => {
      updateChecklistValue(input.dataset.checkKey, input.checked);
      vibrate();
    });
  });
}

function renderPlaces() {
  els.placesList.innerHTML = places
    .map(
      (place) => `
        <article class="glass place-card ${state.placeFavorites[place.id] ? "favorite" : ""}">
          <div class="panel-head">
            <div>
              <p class="eyebrow">${place.category}</p>
              <h3>${place.name}</h3>
            </div>
            <button class="text-button" data-place-favorite="${place.id}" type="button">
              ${state.placeFavorites[place.id] ? "Saved" : "Save"}
            </button>
          </div>
          <div class="meta-row">
            <span class="chip">${place.time}</span>
            <span class="chip">${place.address}</span>
          </div>
          <p>${place.useful}</p>
          <div class="store-actions">
            <a href="${place.url}" target="_blank" rel="noreferrer">Open in Maps</a>
            <a href="${trip.anchor.directionsUrl}" target="_blank" rel="noreferrer">Cabin directions</a>
          </div>
        </article>
      `,
    )
    .join("");

  document.querySelectorAll("[data-place-favorite]").forEach((button) => {
    button.addEventListener("click", () => {
      toggleFavorite("placeFavorites", button.dataset.placeFavorite);
      renderPlaces();
    });
  });
}

function renderWritingSessions() {
  els.writingSessions.innerHTML = itinerary
    .map(
      (day) => `
        <div class="writing-session">
          <strong>${day.label}</strong>
          <span class="muted">${day.writing}</span>
        </div>
      `,
    )
    .join("");
}

function syncNotes() {
  document.querySelectorAll(".note-pad").forEach((area) => {
    area.value = state.notes[area.id] || "";
    area.addEventListener("input", () => {
      state.notes[area.id] = area.value;
      storage.set("qa.notes", state.notes);
    });
  });
}

function applyTheme() {
  document.body.classList.toggle("theme-dark", state.themeDark);
  document.body.classList.toggle("reduce-motion", state.reduceMotion);
  els.themeToggle.checked = state.themeDark;
  els.motionToggle.checked = state.reduceMotion;
}

function formatTime(seconds) {
  const safe = Math.max(0, seconds);
  const mins = Math.floor(safe / 60);
  const secs = safe % 60;
  return `${String(mins).padStart(2, "0")}:${String(secs).padStart(2, "0")}`;
}

function updateTimerUI() {
  const text = formatTime(state.timer.remaining);
  els.timerDisplay.textContent = text;
  els.focusOverlayTime.textContent = text;
  document.querySelectorAll("[data-timer-preset]").forEach((button) => {
    button.classList.toggle("active", Number(button.dataset.timerPreset) === state.timer.preset);
  });
}

function stopTimer() {
  state.timer.running = false;
  state.timer.lastTick = null;
  storage.set("qa.timer", state.timer);
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
  }
}

function tickTimer() {
  const now = Date.now();
  if (state.timer.running && state.timer.lastTick) {
    const elapsed = Math.floor((now - state.timer.lastTick) / 1000);
    if (elapsed > 0) {
      state.timer.remaining = Math.max(0, state.timer.remaining - elapsed);
      state.timer.lastTick = now;
      storage.set("qa.timer", state.timer);
      updateTimerUI();
      if (state.timer.remaining === 0) {
        stopTimer();
        vibrate([70, 30, 70]);
      }
    }
  }
}

function startTimerLoop() {
  if (timerInterval) clearInterval(timerInterval);
  timerInterval = setInterval(tickTimer, 1000);
}

function setTimerPreset(minutes) {
  state.timer.preset = minutes;
  state.timer.remaining = minutes * 60;
  state.timer.running = false;
  state.timer.lastTick = null;
  storage.set("qa.timer", state.timer);
  updateTimerUI();
}

function bindControls() {
  els.navItems.forEach((button) => {
    button.addEventListener("click", () => setScreen(button.dataset.target));
  });

  els.jumpButtons.forEach((button) => {
    button.addEventListener("click", () => setScreen(button.dataset.jump));
  });

  document.querySelector("#reset-groceries").addEventListener("click", () => {
    Object.keys(state.checklist)
      .filter((key) => key.startsWith("groceries."))
      .forEach((key) => delete state.checklist[key]);
    storage.set("qa.checklist", state.checklist);
    render();
  });

  document.querySelector("#reset-packing").addEventListener("click", () => {
    Object.keys(state.checklist)
      .filter((key) => key.startsWith("packing."))
      .forEach((key) => delete state.checklist[key]);
    storage.set("qa.checklist", state.checklist);
    render();
  });

  document.querySelector("#reset-pugs").addEventListener("click", () => {
    Object.keys(state.checklist)
      .filter((key) => key.startsWith("pugs."))
      .forEach((key) => delete state.checklist[key]);
    storage.set("qa.checklist", state.checklist);
    render();
  });

  els.themeToggle.addEventListener("change", () => {
    state.themeDark = els.themeToggle.checked;
    storage.set("qa.themeDark", state.themeDark);
    applyTheme();
  });

  els.motionToggle.addEventListener("change", () => {
    state.reduceMotion = els.motionToggle.checked;
    storage.set("qa.reduceMotion", state.reduceMotion);
    applyTheme();
  });

  document.querySelectorAll("[data-timer-preset]").forEach((button) => {
    button.addEventListener("click", () => setTimerPreset(Number(button.dataset.timerPreset)));
  });

  document.querySelector("#timer-start").addEventListener("click", () => {
    state.timer.running = true;
    state.timer.lastTick = Date.now();
    storage.set("qa.timer", state.timer);
    startTimerLoop();
    updateTimerUI();
  });

  document.querySelector("#timer-pause").addEventListener("click", () => {
    tickTimer();
    stopTimer();
    updateTimerUI();
  });

  document.querySelector("#timer-reset").addEventListener("click", () => {
    setTimerPreset(state.timer.preset);
  });

  els.focusToggle.addEventListener("click", () => {
    els.focusOverlay.classList.remove("hidden");
    document.body.style.overflow = "hidden";
  });

  els.exitFocus.addEventListener("click", () => {
    els.focusOverlay.classList.add("hidden");
    document.body.style.overflow = "";
  });
}

function vibrate(pattern = 10) {
  if (navigator.vibrate) navigator.vibrate(pattern);
}

function setupInstallPrompt() {
  window.addEventListener("beforeinstallprompt", (event) => {
    event.preventDefault();
    deferredPrompt = event;
    els.installButton.classList.remove("hidden");
  });

  els.installButton.addEventListener("click", async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    await deferredPrompt.userChoice;
    deferredPrompt = null;
    els.installButton.classList.add("hidden");
  });
}

function setupStandaloneMode() {
  const standalone =
    window.matchMedia("(display-mode: standalone)").matches ||
    window.navigator.standalone === true;
  document.body.classList.toggle("standalone", standalone);
}

function registerServiceWorker() {
  if ("serviceWorker" in navigator && window.location.protocol !== "file:") {
    navigator.serviceWorker.register("./sw.js");
  }
}

function render() {
  renderTripHeader();
  renderWeather();
  renderStayMeta();
  renderToday();
  renderItinerary();
  renderRecipes();
  renderChecklistGroups(els.groceryGroups, groceryGroups, "groceries");
  renderChecklistGroups(els.packingGroups, packing, "packing");
  renderChecklistGroups(els.pugGroups, pugChecklist, "pugs");
  bindChecklistInputs();
  renderPlaces();
  renderWritingSessions();
  syncNotes();
  applyTheme();
  updateTimerUI();
}

function init() {
  render();
  bindControls();
  setupInstallPrompt();
  setupStandaloneMode();
  registerServiceWorker();
  startTimerLoop();
  if (state.timer.running && !state.timer.lastTick) {
    state.timer.lastTick = Date.now();
  }
  setTimeout(() => els.splash.classList.add("hidden"), 1500);
}

init();
