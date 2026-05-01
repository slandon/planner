const trainingPlan = [
  {
    week: 1,
    days: ["Rest", "4 mi easy", "6 mi tempo", "Rest", "5 mi easy", "8 mi long", "Cross-train"]
  },
  {
    week: 2,
    days: ["Rest", "5 mi easy", "7 mi tempo", "Rest", "5 mi easy", "10 mi long", "Cross-train"]
  }
];

const daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const container = document.createElement("div");
const select = document.createElement("select");
const calendar = document.createElement("div");

calendar.style.display = "grid";
calendar.style.gridTemplateColumns = "repeat(7, 1fr)";
calendar.style.gap = "10px";

document.body.appendChild(select);
document.body.appendChild(container);
container.appendChild(calendar);

// populate dropdown
trainingPlan.forEach((week, index) => {
  const option = document.createElement("option");
  option.value = index;
  option.text = `Week ${week.week}`;
  select.appendChild(option);
});

// render function
function renderWeek(index) {
  calendar.innerHTML = "";

  trainingPlan[index].days.forEach((day, i) => {
    const div = document.createElement("div");
    div.style.border = "1px solid #ccc";
    div.style.padding = "10px";

    div.innerHTML = `<strong>${daysOfWeek[i]}</strong><br>${day}`;
    calendar.appendChild(div);
  });
}

select.addEventListener("change", (e) => {
  renderWeek(e.target.value);
});

// initial render
renderWeek(0);
