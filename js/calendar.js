const monthNames = [
  "იანვარი",
  "თებერვალი",
  "მარტი",
  "აპრილი",
  "მაისი",
  "ივნისი",
  "ივლისი",
  "აგვისტო",
  "სექტემბერი",
  "ოქტომბერი",
  "ნოემბერი",
  "დეკემბერი",
];

let currentYear, currentMonth;

const monthYear = document.getElementById("monthYear");
const daysContainer = document.getElementById("daysContainer");
const prevMonthBtn = document.getElementById("prevMonth");
const nextMonthBtn = document.getElementById("nextMonth");
const yearSelector = document.getElementById("yearSelector");

function buildCalendar(year, month) {
  daysContainer.innerHTML = "";
  monthYear.textContent = `${monthNames[month]} ${year}`;

  // დააყენე წლის სელექტში მიმდინარე წელი
  yearSelector.value = year;

  const today = new Date();

  const firstDay = new Date(year, month, 1);
  let startDay = firstDay.getDay();

  // JavaScript's getDay() returns 0 for Sunday, 1 for Monday, etc.
  // We want Monday to be the first day (index 0) if our calendar starts from Monday.
  // If your calendar starts from Sunday, you can remove this adjustment.
  // For Georgian calendar typically starts from Monday or Sunday based on preference.
  // If "კვ" is Sunday, then 0 for Sunday is fine. If "კვ" is Monday, then adjust.
  // Assuming "კვ" is Sunday:
  // No adjustment needed if getDay() matches your visual layout (Sunday=0, Monday=1, ..., Saturday=6)

  // If you want Monday to be the start of the week visually and logically:
  // if (startDay === 0) { // If it's Sunday (0), make it last day of previous week (6)
  //   startDay = 6;
  // } else { // Otherwise, shift by -1
  //   startDay--;
  // }

  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < startDay; i++) {
    const emptyCell = document.createElement("div");
    daysContainer.appendChild(emptyCell);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayCell = document.createElement("div");
    dayCell.textContent = day;

    if (
      day === today.getDate() &&
      month === today.getMonth() &&
      year === today.getFullYear()
    ) {
      dayCell.classList.add("today");
    }

    daysContainer.appendChild(dayCell);
  }
}

function populateYearSelector(startYear, endYear) {
  yearSelector.innerHTML = "";
  for (let y = startYear; y <= endYear; y++) {
    const option = document.createElement("option");
    option.value = y;
    option.textContent = y;
    yearSelector.appendChild(option);
  }
}

function initCalendar() {
  const now = new Date();
  currentYear = now.getFullYear();
  currentMonth = now.getMonth();

  // Populate selector წლები - მაგალითად, 1950-დან 2050-მდე
  populateYearSelector(1950, 2050);

  buildCalendar(currentYear, currentMonth);

  prevMonthBtn.addEventListener("click", () => {
    currentMonth--;
    if (currentMonth < 0) {
      currentMonth = 11;
      currentYear--;
      yearSelector.value = currentYear;
    }
    buildCalendar(currentYear, currentMonth);
  });

  nextMonthBtn.addEventListener("click", () => {
    currentMonth++;
    if (currentMonth > 11) {
      currentMonth = 0;
      currentYear++;
      yearSelector.value = currentYear;
    }
    buildCalendar(currentYear, currentMonth);
  });

  yearSelector.addEventListener("change", (e) => {
    currentYear = parseInt(e.target.value);
    buildCalendar(currentYear, currentMonth);
  });
}

// Initialize calendar when DOM is loaded
document.addEventListener("DOMContentLoaded", initCalendar);
