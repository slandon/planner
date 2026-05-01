const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// --- PHASE 1 + 2 ---
const trainingPlan = [
  { week: 1, days: ["3 mi", "PT", "3 mi + strength", "Recovery", "2.5 mi", "Rest", "4.5 mi"] },
  { week: 2, days: ["3 mi", "PT", "3.5 mi + strength", "Recovery", "2.5 mi", "Rest", "5 mi"] },
  { week: 3, days: ["3 mi", "PT", "3.5 mi + strength", "Recovery", "3 mi", "Rest", "5 mi"] },
  { week: 4, note: "Cutback", days: ["2.5 mi", "PT", "3 mi + light strength", "Recovery", "2 mi", "Rest", "4 mi"] },
  { week: 5, days: ["3.5 mi", "PT", "4 mi + strength", "Recovery", "3 mi", "Rest", "5.5 mi"] },
  { week: 6, days: ["3.5 mi", "PT", "4 mi + strength", "Recovery", "3 mi", "Rest", "6 mi"] },
  { week: 7, days: ["4 mi", "PT", "4 mi + strength", "Recovery", "3 mi", "Rest", "6 mi"] },
  { week: 8, days: ["4 mi", "PT", "4.5 mi + strength", "Recovery", "3 mi", "Rest", "6.5 mi"] },
  { week: 9, days: ["4.5 mi", "PT", "4.5 mi + strength", "Recovery", "3–3.5 mi (5:1 test)", "Rest", "7 mi"] },
  { week: 10, note: "Cutback", days: ["3.5 mi", "PT", "4 mi + strength", "Recovery", "3 mi", "Rest", "5.5 mi"] },
  { week: 11, days: ["4.5 mi", "PT", "5 mi + strength", "Recovery", "3.5 mi", "Rest", "7.5 mi"] },
  { week: 12, days: ["4.5 mi", "PT", "5 mi + strength", "Recovery", "3.5 mi", "Rest", "8 mi"] }
];

// --- PHASE 3 ---
const longRuns = [9,10,11,8,12,13,14,10,15,16.5];

longRuns.forEach((lr, i) => {
  trainingPlan.push({
    week: 13 + i,
    days: [
      "4–5 mi",
      "PT",
      "5–6 mi + strength",
      "Recovery",
      "3–4 mi",
      "Rest",
      `${lr} mi`
    ]
  });
});

// --- TAPER ---
trainingPlan.push(
  { week: 23, days: ["4 mi", "PT", "4–5 mi + light strength", "Recovery", "3 mi", "Rest", "14 mi"] },
  { week: 24, days: ["4 mi", "PT", "4 mi + light strength", "Recovery", "3 mi", "Rest", "10 mi"] },
  { week: 25, days: ["3 mi", "PT", "3 mi + light strength", "Recovery", "2–3 mi", "Rest", "6–8 mi"] },
  { week: 26, note: "Race Week", days: ["3 mi", "PT (light)", "2–3 mi", "Recovery", "2 mi", "Rest", "Marathon"] }
);

// --- UI ELEMENTS ---
const select = document.createElement("select");
const noteDiv = document.createElement("div");
const calendar = document.createElement("div");

calendar.style.display = "grid";
calendar.style.gridTemplateColumns = "repeat(7, 1fr)";
calendar.style.gap = "10px";

noteDiv.style.margin = "10px 0";
noteDiv.style.fontWeight = "bold";

document.body.appendChild(select);
document.body.appendChild(noteDiv);
document.body.appendChild(calendar);

// --- DROPDOWN ---
trainingPlan.forEach((w, i) => {
  const option = document.createElement("option");
  option.value = i;
  option.text = `Week ${w.week}`;
  select.appendChild(option);
});

// --- RENDER FUNCTION ---
function renderWeek(index) {
  const week = trainingPlan[index];
  calendar.innerHTML = "";
  noteDiv.innerText = week.note ? week.note : "";

  week.days.forEach((day, i) => {
    const div = document.createElement("div");

    // --- TODAY HIGHLIGHT ---
    const todayIndex = new Date().getDay();
    const adjustedToday = (todayIndex + 6) % 7;
    if (i === adjustedToday) {
      div.style.border = "2px solid black";
    } else {
      div.style.border = "1px solid #ccc";
    }

    // --- BASE STYLING ---
    div.style.padding = "10px";
    div.style.borderRadius = "8px";

    // --- COLOR CODING ---
    if (i === 6) {
      div.style.backgroundColor = "#e6f2ff"; // Sunday long run
    } else if (day.includes("PT")) {
      div.style.backgroundColor = "#f0f0f0";
    } else if (day.includes("Recovery") || day.includes("Rest")) {
      div.style.backgroundColor = "#fafafa";
    }

    div.innerHTML = `<strong>${daysOfWeek[i]}</strong><br>${day}`;
    calendar.appendChild(div);
  });
}

// --- EVENT ---
select.addEventListener("change", (e) => {
  renderWeek(e.target.value);
});

// --- INITIAL LOAD ---
renderWeek(0);
