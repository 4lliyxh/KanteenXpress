// Beginwaarden voor de voedingsstoffen
var goals = {
  calorieGoal: 0,
  carbGoal: 0,
  proteinGoal: 0,
  fatGoal: 0
};

// Verplaats intake bovenaan, zodat deze overal beschikbaar is
var intake = {
  calories: 0,
  carbs: 0,
  protein: 0,
  fat: 0
};

// Functie om de voortgang van de voedingsstoffen bij te werken
function updateProgressBars() {
  var calorieProgress = (intake.calories / goals.calorieGoal) * 100;
  var carbProgress = (intake.carbs / goals.carbGoal) * 100;
  var proteinProgress = (intake.protein / goals.proteinGoal) * 100;
  var fatProgress = (intake.fat / goals.fatGoal) * 100;

  calorieProgress = Math.min(Math.max(calorieProgress, 0), 100);
  carbProgress = Math.min(Math.max(carbProgress, 0), 100);
  proteinProgress = Math.min(Math.max(proteinProgress, 0), 100);
  fatProgress = Math.min(Math.max(fatProgress, 0), 100);

  // Update de progress bars en de tekst
  document.getElementById('calorieProgress').value = calorieProgress;
  document.getElementById('carbProgress').value = carbProgress;
  document.getElementById('proteinProgress').value = proteinProgress;
  document.getElementById('fatProgress').value = fatProgress;

  document.getElementById('calorieCount').innerText = Math.round(calorieProgress) + "%";
  document.getElementById('carbCount').innerText = Math.round(carbProgress) + "%";
  document.getElementById('proteinCount').innerText = Math.round(proteinProgress) + "%";
  document.getElementById('fatCount').innerText = Math.round(fatProgress) + "%";
}

// Laad de doelen en inname van localStorage
function loadDataFromLocalStorage() {
  if (localStorage.getItem('goals')) {
    goals = JSON.parse(localStorage.getItem('goals'));
  }

  const currentDate = new Date().toLocaleDateString('nl-NL');
  const lastSavedDate = localStorage.getItem('lastSavedDate');

  if (lastSavedDate !== currentDate) {
    intake = { calories: 0, carbs: 0, protein: 0, fat: 0 };
    localStorage.setItem('lastSavedDate', currentDate);
    saveIntakeToLocalStorage();
  } else if (localStorage.getItem('intake')) {
    intake = JSON.parse(localStorage.getItem('intake'));
  }

  updateProgressBars();

  document.getElementById('calorieGoal').value = goals.calorieGoal;
  document.getElementById('carbGoal').value = goals.carbGoal;
  document.getElementById('proteinGoal').value = goals.proteinGoal;
  document.getElementById('fatGoal').value = goals.fatGoal;
}

function saveGoalsToLocalStorage() {
  localStorage.setItem('goals', JSON.stringify(goals));
}

function saveIntakeToLocalStorage() {
  localStorage.setItem('intake', JSON.stringify(intake));
}

$('#setGoalsBtn').click(function() {
  goals.calorieGoal = parseInt($('#calorieGoal').val());
  goals.carbGoal = parseInt($('#carbGoal').val());
  goals.proteinGoal = parseInt($('#proteinGoal').val());
  goals.fatGoal = parseInt($('#fatGoal').val());

  if (goals.calorieGoal > 0 && goals.carbGoal > 0 && goals.proteinGoal > 0 && goals.fatGoal > 0) {
    saveGoalsToLocalStorage();
    updateProgressBars();
    alert("Doelen ingesteld!");
  } else {
    alert("Voer geldige doelstellingen in!");
  }
});

// Voeg voedingswaarde toe aan de inname
function addToIntake(voedingswaarden) {
  intake.calories += voedingswaarden.calories;
  intake.carbs += voedingswaarden.carbs;
  intake.protein += voedingswaarden.protein;
  intake.fat += voedingswaarden.fat;
  saveIntakeToLocalStorage();
  updateProgressBars();
}

// Functie voor broodjes
const broodjes = {
  "Mozzarella": { calories: 375, carbs: 35, protein: 17, fat: 22 },
  "Gezond": { calories: 425, carbs: 45, protein: 23, fat: 18 },
  "Zalm": { calories: 375, carbs: 35, protein: 22, fat: 24 },
  "Filet Americain": { calories: 200, carbs: 10, protein: 16, fat: 12 },
  "Zuiverlspread": { calories: 150, carbs: 10, protein: 4, fat: 12 },
  "Hete kipreepjes": { calories: 350, carbs: 35, protein: 25, fat: 10 },
  "Brood Salade": { calories: 300, carbs: 30, protein: 12, fat: 15 }
};

$('#addBroodjeBtn').click(function() {
  var selectedBroodje = $('#broodjeDropdown').val();
  if (broodjes[selectedBroodje]) {
    addToIntake(broodjes[selectedBroodje]);
  }
});

// Functie voor drankjes
const drankjes = {
  "Water": { calories: 0, carbs: 0, protein: 0, fat: 0 },
  "Passion Fruit blikje": { calories: 50, carbs: 12, protein: 0, fat: 0 },
  "CapriSun": { calories: 60, carbs: 14, protein: 0, fat: 0 },
  "Wicky Blauw": { calories: 55, carbs: 13, protein: 0, fat: 0 },
  "Crystal Clear Orange": { calories: 5, carbs: 1, protein: 0, fat: 0 },
  "Crystal Clear Lemon": { calories: 5, carbs: 1, protein: 0, fat: 0 },
  "Sisi": { calories: 45, carbs: 10, protein: 0, fat: 0 },
  "Pepsi": { calories: 42, carbs: 11, protein: 0, fat: 0 },
  "Karnemelk": { calories: 75, carbs: 9, protein: 4, fat: 4 },
  "Optimel Drink": { calories: 50, carbs: 7, protein: 5, fat: 1 },
  "Chocomelk": { calories: 125, carbs: 28, protein: 7, fat: 4 },
  "Vitamin Water": { calories: 65, carbs: 16, protein: 0, fat: 0 },
  "7-Up": { calories: 37, carbs: 9.6, protein: 0, fat: 0 },
  "Lipton Sparkling": { calories: 15, carbs: 3, protein: 0, fat: 0 },
  "Lipton Peach": { calories: 35, carbs: 9, protein: 0, fat: 0 },
  "Lipton Green Tea": { calories: 2, carbs: 0.5, protein: 0, fat: 0 }
};

$('#addDrankjeBtn').click(function() {
  var selectedDrankje = $('#drankjeDropdown').val();
  if (drankjes[selectedDrankje]) {
    addToIntake(drankjes[selectedDrankje]);
  }
});

// Functie voor snacks
const snacks = {
  "laysClassic": { name: "Lays Classic", calories: 150, carbs: 15, protein: 2, fat: 9 },
  "laysPaprika": { name: "Lays Paprika", calories: 150, carbs: 15, protein: 2, fat: 9 },
  "noodleGroente": { name: "Noodle Groente", calories: 120, carbs: 25, protein: 4, fat: 2 },
  "noodleKip": { name: "Noodle Kip", calories: 130, carbs: 26, protein: 5, fat: 2 }
};

$('#addSnackBtn').click(function() {
  var selectedSnack = $('#snackDropdown').val();  // ID aangepast naar 'snackDropdown'
  if (snacks[selectedSnack]) {
    addToIntake(snacks[selectedSnack]);
  }
});

// Functie om de datum weer te geven
function updateDatetime() {
  const currentDate = new Date().toLocaleDateString('nl-NL');
  document.getElementById('datetime').innerText = currentDate;
}

// Initialiseer alles bij het laden van de pagina
$(document).ready(function() {
  loadDataFromLocalStorage(); // Zorgt ervoor dat opgeslagen gegevens worden geladen
  updateDatetime();            // Zorgt ervoor dat de datum en tijd correct worden weergegeven
});
