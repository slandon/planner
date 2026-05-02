const strengthRoutine = `
<strong>Two sets of 10 each (except planks)</strong><br><br>

<strong>1. Plank</strong><br>
Hold the top of a push-up, shoulders stacked over wrists; back flat (no sagging or hiking up your hips); and abs, thighs and butt engaged. Gaze a few inches in front of your hands. Hold for as long as you can. That’s 1 rep. Repeat.<br><br>

<strong>2. Squat</strong><br>
Stand with your feet hip-width apart and toes slightly turned out. Push your hips back and bend your knees wide to lower into a squat until your hip crease is below your knees. Push through your feet to return to start.<br><br>

<strong>3. Lateral Box Push-Ups</strong><br>
Kneel beside a box. One hand on the box, one on the floor. Lower into a push-up, then move across the box while maintaining plank position. Alternate sides.<br><br>

<strong>4. Elevated Split Squat</strong><br>
Stand in front of a box, one foot elevated behind. Lower until back knee nearly touches floor. Repeat, then switch sides.<br><br>

<strong>5. Bicycle Crunch</strong><br>
Lie on your back, rotate torso bringing opposite elbow to knee while extending the other leg. Alternate sides.<br><br>

<strong>6. Single-Leg Glute Bridge</strong><br>
Lift hips with one leg extended, forming a straight line from shoulders to knee. Repeat, then switch sides.<br><br>

<strong>7. Lateral Step-Up</strong><br>
Step onto a box sideways, drive through the working leg, then lower back down. Switch sides.<br><br>

<strong>8. One-Arm Bent-Over Row</strong><br>
Hinge forward and row the weight toward your ribs. Lower and repeat, then switch sides.<br><br>

<strong>9. Kneeling Curl to Press</strong><br>
Curl the weight, then press overhead. Reverse and repeat, then switch sides.<br><br>

<strong>10. Single-Leg Romanian Deadlift</strong><br>
Balance on one leg, hinge forward into a “T” shape, then return to standing. Repeat, then switch sides.
`;

const mobilityRoutine = `
<strong>Mobility Routine</strong><br><br>

<strong>1. Adductor Rockbacks</strong><br>
• Start on hands and knees, one leg extended out to the side<br>
• Rock hips back slowly<br>
2 sets of 8–10 reps each side<br><br>

<strong>2. 90/90 Hip Rotations</strong><br>
• Sit in 90/90 position<br>
• Rotate knees side to side (controlled, no forcing)<br>
2 sets of 6–8 reps per side<br><br>

<strong>3. Standing Hip CARs (Controlled Circles)</strong><br>
• Lift one knee, move it in a slow circle<br>
• Keep torso stable<br>
5 slow circles each direction per leg<br><br>

<strong>4. Glute Bridge (light activation)</strong><br>
• Feet on floor, lift hips slowly<br>
• Pause at top<br>
2 sets of 10 reps<br><br>

<strong>5. Side-Lying Adductor Lift</strong><br>
• Bottom leg straight, top leg bent over<br>
• Lift the bottom leg slightly<br>
2 sets of 8–10 reps (easy effort)<br><br>

<strong>6. Gentle Inner Thigh Stretch</strong><br>
• Butterfly stretch or side lunge hold<br>
• No aggressive pushing<br>
Hold 20–30 seconds
`;

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
calendar.className = "calendar";
const detailsDiv = document.createElement("div");
detailsDiv.style.marginTop = "20px";
detailsDiv.style.padding = "15px";
detailsDiv.style.background = "white";
detailsDiv.style.borderRadius = "12px";
detailsDiv.style.boxShadow = "0 2px 6px rgba(0,0,0,0.05)";

headerCard.className = "header-card";
calendar.className = "calendar";

// build layout
app.appendChild(select);
headerCard.appendChild(dateDiv);
headerCard.appendChild(noteDiv);
headerCard.appendChild(mileageDiv);
app.appendChild(headerCard);
app.appendChild(calendar);
app.appendChild(detailsDiv);

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
div.style.cursor = "pointer";

div.addEventListener("click", () => {
  if (day.includes("strength")) {
   detailsDiv.innerHTML = `
  <strong>Strength Routine</strong><br><br>
  ${strengthRoutine}
`;
} else if (day.includes("Recover")) {
  detailsDiv.innerHTML = mobilityRoutine;
} else {
    detailsDiv.innerHTML = `<strong>${day}</strong>`;
  }
});
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
