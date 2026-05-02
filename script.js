const startDate = new Date("2026-04-27");
const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function getWeekRange(weekNumber) {
  const start = new Date(startDate);
  start.setDate(start.getDate() + (weekNumber - 1) * 7);

  const end = new Date(start);
  end.setDate(start.getDate() + 6);

  const options = { month: "short", day: "numeric" };

  return `${start.toLocaleDateString("en-US", options)} – ${end.toLocaleDateString("en-US", options)}`;
}

// --- TRAINING PLAN ---
const trainingPlan = [
  { week: 1, days: ["3 mi", "PT", "3 mi + strength", "Recovery/mobility", "2.5 mi", "Rest", "4.5 mi"] },
  { week: 2, days: ["3 mi", "PT", "3.5 mi + strength", "Recovery/mobility", "2.5 mi", "Rest", "5 mi"] },
  { week: 3, days: ["3 mi", "PT", "3.5 mi + strength", "Recovery/mobility", "3 mi", "Rest", "5 mi"] },
  { week: 4, note: "Cutback", days: ["2.5 mi", "PT", "3 mi + light strength", "Recovery/mobility", "2 mi", "Rest", "4 mi"] },
  { week: 5, days: ["3.5 mi", "PT", "4 mi + strength", "Recovery/mobility", "3 mi", "Rest", "5.5 mi"] },
  { week: 6, days: ["3.5 mi", "PT", "4 mi + strength", "Recovery/mobility", "3 mi", "Rest", "6 mi"] },
  { week: 7, days: ["4 mi", "PT", "4 mi + strength", "Recovery/mobility", "3 mi", "Rest", "6 mi"] },
  { week: 8, days: ["4 mi", "PT", "4.5 mi + strength", "Recovery/mobility", "3 mi", "Rest", "6.5 mi"] },
  { week: 9, days: ["4.5 mi", "PT", "4.5 mi + strength", "Recovery/mobility", "3–3.5 mi (5:1 test)", "Rest", "7 mi"] },
  { week: 10, note: "Cutback", days: ["3.5 mi", "PT", "4 mi + strength", "Recovery/mobility", "3 mi", "Rest", "5.5 mi"] },
  { week: 11, days: ["4.5 mi", "PT", "5 mi + strength", "Recovery/mobility", "3.5 mi", "Rest", "7.5 mi"] },
  { week: 12, days: ["4.5 mi", "PT", "5 mi + strength", "Recovery/mobility", "3.5 mi", "Rest", "8 mi"] }
];

// --- PHASE 3 ---
const longRuns = [9,10,11,8,12,13,14,10,15,16.5];

longRuns.forEach((lr, i) => {
  trainingPlan.push({
    week: 13 + i,
    days: ["4–5 mi", "PT", "5–6 mi + strength", "Recovery/mobility", "3–4 mi", "Rest", `${lr} mi`]
  });
});

// --- TAPER ---
trainingPlan.push(
  { week: 23, days: ["4 mi", "PT", "4–5 mi + light strength", "Recovery/mobility", "3 mi", "Rest", "14 mi"] },
  { week: 24, days: ["4 mi", "PT", "4 mi + light strength", "Recovery/mobility", "3 mi", "Rest", "10 mi"] },
  { week: 25, days: ["3 mi", "PT", "3 mi + light strength", "Recovery/mobility", "2–3 mi", "Rest", "6–8 mi"] },
  { week: 26, note: "Race Week", days: ["3 mi", "PT (light)", "2–3 mi", "Recovery/mobility", "2 mi", "Rest", "Marathon"] }
);

// --- UI SETUP ---
const app = document.getElementById("app");

const select = document.createElement("select");
const headerCard = document.createElement("div");
const dateDiv = document.createElement("div");
const noteDiv = document.createElement("div");
const mileageDiv = document.createElement("div");
const calendar = document.createElement("div");

headerCard.className = "header-card";
calendar.className = "calendar";

// build layout
app.appendChild(select);
headerCard.appendChild(dateDiv);
headerCard.appendChild(noteDiv);
headerCard.appendChild(mileageDiv);
app.appendChild(headerCard);
app.appendChild(calendar);

// dropdown
trainingPlan.forEach((w, i) => {
  const option = document.createElement("option");
  option.value = i;
  option.text = `Week ${w.week} (${getWeekRange(w.week)})`;
  select.appendChild(option);
});

// render
function renderWeek(index) {
  const week = trainingPlan[index];

  // header
  dateDiv.innerHTML = `<div class="week-title">Week ${week.week}</div>
  <div>${getWeekRange(week.week)}</div>`;

  noteDiv.innerText = week.note || "";

  // mileage
  let total = 0;
  week.days.forEach(day => {
    const match = day.match(/[\d.]+/);
    if (match) total += parseFloat(match[0]);
  });

  mileageDiv.innerText = `Weekly Mileage: ${total.toFixed(1)} mi`;

  // calendar
  calendar.innerHTML = "";

  const todayIndex = (new Date().getDay() + 6) % 7;

  week.days.forEach((day, i) => {
    const div = document.createElement("div");
    div.className = "day";

    // highlight today
    div.style.border = i === todayIndex ? "2px solid black" : "1px solid #ccc";

    // color coding
    if (i === 6) div.style.backgroundColor = "#e6f2ff";
    else if (day.includes("PT")) div.style.backgroundColor = "#f0f0f0";
    else if (day.includes("Recovery") || day.includes("Rest")) div.style.backgroundColor = "#fafafa";

    div.innerHTML = `<strong>${daysOfWeek[i]}</strong><br>${day}`;
    calendar.appendChild(div);
  });
}

select.addEventListener("change", e => renderWeek(e.target.value));

renderWeek(0);
