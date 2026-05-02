// --- ROUTINES ---
const strengthRoutine = `...REPLACE WITH YOUR EXISTING STRING...`;
const mobilityRoutine = `...REPLACE WITH YOUR EXISTING STRING...`;

// --- DATES ---
const startDate = new Date("2026-04-27");
const raceDate = new Date("2026-11-01");
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// --- HELPERS ---
function updateCountdown() {
  const today = new Date();
  const diffTime = raceDate - today;
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  const el = document.getElementById("countdown");

  if (!el) return;

  if (days > 0) el.innerText = ` — ${days} days to race day`;
  else if (days === 0) el.innerText = " — Race Day!";
  else el.innerText = " — Completed 🎉";
}

function getWeekRange(weekNumber) {
  const start = new Date(startDate);
  start.setDate(start.getDate() + (weekNumber - 1) * 7);
  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const options = { month: "short", day: "numeric" };
  return `${start.toLocaleDateString("en-US", options)} – ${end.toLocaleDateString("en-US", options)}`;
}

function getCurrentWeekIndex() {
  const today = new Date();
  const diffDays = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  return Math.floor(diffDays / 7);
}

// --- TRAINING PLAN ---
const trainingPlan = [
  { week: 1, days: ["3 mi", "PT", "3 mi + strength", "Recovery/mobility", "2.5 mi", "Rest", "4.5 mi"] },
  { week: 2, days: ["3 mi", "PT", "3.5 mi + strength", "Recovery/mobility", "2.5 mi", "Rest", "5 mi"] },
  { week: 3, days: ["3 mi", "PT", "3.5 mi + strength", "Recovery/mobility", "3 mi", "Rest", "5 mi"] },
  { week: 4, note: "Cutback", days: ["2.5 mi", "PT", "3 mi + light strength", "Recovery/mobility", "2 mi", "Rest", "4 mi"] },
  { week: 5, days: ["3.5 mi", "PT", "4 mi + strength", "Recovery/mobility", "3 mi", "Rest", "5.5 mi"] },
  { week: 6, days: ["3.5 mi", "PT", "4 mi + strength", "Recovery/mobility", "3 mi", "Rest", "6 mi"] }
];

const longRuns = [9,10,11,8,12,13,14,10,15,16.5];
longRuns.forEach((lr, i) => {
  trainingPlan.push({
    week: 7 + i,
    days: ["4–5 mi", "PT", "5–6 mi + strength", "Recovery/mobility", "3–4 mi", "Rest", `${lr} mi`]
  });
});

// --- UI ---
const app = document.getElementById("app");

const select = document.createElement("select");
const headerCard = document.createElement("div");
const dateDiv = document.createElement("div");
const mileageDiv = document.createElement("div");
const calendar = document.createElement("div");
const detailsDiv = document.createElement("div");
const fullPlanDiv = document.createElement("div");

headerCard.className = "header-card";
calendar.className = "calendar";

detailsDiv.style.marginTop = "20px";
detailsDiv.style.padding = "15px";
detailsDiv.style.background = "white";
detailsDiv.style.borderRadius = "12px";

fullPlanDiv.style.marginTop = "40px";

// layout
app.appendChild(select);
headerCard.appendChild(dateDiv);
headerCard.appendChild(mileageDiv);
app.appendChild(headerCard);
app.appendChild(calendar);
app.appendChild(detailsDiv);
app.appendChild(fullPlanDiv);

// dropdown
trainingPlan.forEach((w, i) => {
  const option = document.createElement("option");
  option.value = i;
  option.text = `Week ${w.week}`;
  select.appendChild(option);
});

// --- RENDER WEEK ---
function renderWeek(index) {
  const week = trainingPlan[index];
  const currentWeekIndex = getCurrentWeekIndex();

  const label = index === currentWeekIndex ? "This Week" : `Week ${week.week}`;

  dateDiv.innerHTML = `<div class="week-title">${label}</div>
  <div>${getWeekRange(week.week)}</div>`;

  let total = 0;
  week.days.forEach(d => {
    const m = d.match(/[\d.]+/);
    if (m) total += parseFloat(m[0]);
  });

  mileageDiv.innerText = `Weekly Mileage: ${total.toFixed(1)} mi`;

  calendar.innerHTML = "";

  week.days.forEach((day, i) => {
  const todayIndex = (new Date().getDay() + 6) % 7;
    const div = document.createElement("div");
    div.className = "day";
    if (i === todayIndex) {
  div.style.border = "2px solid #2e7d32";
  div.style.backgroundColor = "#e8f5e9";
} else {
  div.style.border = "1px solid #ccc";
}
    div.style.cursor = "pointer";

    div.addEventListener("click", () => {
      if (day.includes("strength")) {
        detailsDiv.innerHTML = `<strong>Strength Routine</strong><br><br>${strengthRoutine}`;
      } else if (day.includes("Recover")) {
        detailsDiv.innerHTML = mobilityRoutine;
      } else {
        detailsDiv.innerHTML = `<strong>${day}</strong>`;
      }
    });

    div.innerHTML = `<strong>${daysOfWeek[i]}</strong><br>${day}`;
    calendar.appendChild(div);
  });
}

// --- FULL PLAN ---
function renderFullPlan() {
  fullPlanDiv.innerHTML = "<h3>Full Training Plan</h3>";

  const grid = document.createElement("div");
  grid.className = "full-grid";

  const currentWeekIndex = getCurrentWeekIndex();

  const rawIndex = getCurrentWeekIndex();
const safeIndex = Math.max(0, Math.min(rawIndex, trainingPlan.length - 1));
  
  trainingPlan.forEach((week, index) => {
    const row = document.createElement("div");
    row.className = "full-row";
if (index === safeIndex) {
  row.classList.add("current-week");
}
    const rawIndex = getCurrentWeekIndex();
const safeIndex = Math.max(0, Math.min(rawIndex, trainingPlan.length - 1));
    if (index === currentWeekIndex) {
      row.classList.add("current-week");
    }

    let total = 0;
    week.days.forEach(d => {
      const m = d.match(/[\d.]+/);
      if (m) total += parseFloat(m[0]);
    });

    const label = document.createElement("div");
    label.className = "full-week";
    label.innerText = `W${week.week} (${total.toFixed(1)})`;

    row.appendChild(label);

    week.days.forEach(day => {
      const cell = document.createElement("div");
      cell.className = "full-cell";

      cell.innerText = day
        .replace(" mi", "")
        .replace("Recovery/mobility", "Rec")
        .replace("Rest", "R")
        .replace(" + strength", "+S");

      row.appendChild(cell);
    });

    grid.appendChild(row);
  });

  fullPlanDiv.appendChild(grid);
}

// --- INIT ---
const currentWeekIndex = getCurrentWeekIndex();
const safeIndex = Math.max(0, Math.min(currentWeekIndex, trainingPlan.length - 1));

select.value = safeIndex;

select.addEventListener("change", e => renderWeek(e.target.value));

renderWeek(safeIndex);
renderFullPlan();
updateCountdown();
