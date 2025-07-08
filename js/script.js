document.querySelector(".submit-btn").addEventListener("click", gradeQuiz);
displayQ4Choices();

var score = 0;
var attempts = localStorage.getItem("total_attempts") || 0;

function displayQ4Choices() {
  let q4ChoicesArray = _.shuffle(["Maine", "Rhode Island", "Maryland", "Delaware"]);
  for (let i = 0; i < q4ChoicesArray.length; i++) {
    document.querySelector("#q4Choices").innerHTML +=
      `<input type="radio" name="q4" id="${q4ChoicesArray[i]}" value="${q4ChoicesArray[i]}">
       <label for="${q4ChoicesArray[i]}"> ${q4ChoicesArray[i]}</label><br>`;
  }
}

function isFormValid() {
  let valid = true;
  if (document.querySelector("#q1").value === "") {
    document.querySelector("#validationFdbk").innerHTML = "Please answer question 1.";
    valid = false;
  } else {
    document.querySelector("#validationFdbk").innerHTML = "";
  }
  return valid;
}

function rightAnswer(index) {
  document.querySelector(`#q${index}Feedback`).innerHTML = "✅ Correct!";
  document.querySelector(`#q${index}Feedback`).className = "text-success";
  document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/check.png' width='20'>";
  score += 10;
}

function wrongAnswer(index) {
  document.querySelector(`#q${index}Feedback`).innerHTML = "❌ Incorrect!";
  document.querySelector(`#q${index}Feedback`).className = "text-danger";
  document.querySelector(`#markImg${index}`).innerHTML = "<img src='img/x.png' width='20'>";
}

function gradeQuiz() {
  if (!isFormValid()) return;
  score = 0;

  // Question 1
  let q1 = document.querySelector("#q1").value.toLowerCase().trim();
  q1 === "sacramento" ? rightAnswer(1) : wrongAnswer(1);

  // Question 2
  let q2 = document.querySelector("#q2").value;
  q2 === "Alaska" ? rightAnswer(2) : wrongAnswer(2);

  // Question 3
  let jefferson = document.querySelector("#Jefferson").checked;
  let roosevelt = document.querySelector("#Roosevelt").checked;
  let jackson = document.querySelector("#Jackson").checked;
  let franklin = document.querySelector("#Franklin").checked;
  (jefferson && roosevelt && !jackson && !franklin) ? rightAnswer(3) : wrongAnswer(3);

  // Question 4
  let q4 = document.querySelector("input[name=q4]:checked");
  q4 && q4.value === "Rhode Island" ? rightAnswer(4) : wrongAnswer(4);

  // Question 5
  let q5 = parseInt(document.querySelector("#q5").value);
  q5 === 50 ? rightAnswer(5) : wrongAnswer(5);

  // Question 6
  let q6 = document.querySelector("#q6").value;
  q6 === "California" ? rightAnswer(6) : wrongAnswer(6);

  // Question 7
  let pr = document.querySelector("#PuertoRico").checked;
  let guam = document.querySelector("#Guam").checked;
  let hawaii = document.querySelector("#Hawaii").checked;
  let usvi = document.querySelector("#USVirginIslands").checked;
  (pr && guam && usvi && !hawaii) ? rightAnswer(7) : wrongAnswer(7);

  // Question 8
  let q8 = document.querySelector("#q8").value.toLowerCase().trim();
  q8 === "florida" ? rightAnswer(8) : wrongAnswer(8);

  // Question 9
  let q9 = document.querySelector("#q9").value;
  q9 === "Hawaii" ? rightAnswer(9) : wrongAnswer(9);

  // Question 10
  let superior = document.querySelector("#LakeSuperior").checked;
  let tahoe = document.querySelector("#LakeTahoe").checked;
  let michigan = document.querySelector("#LakeMichigan").checked;
  let george = document.querySelector("#LakeGeorge").checked;
  (superior && michigan && !tahoe && !george) ? rightAnswer(10) : wrongAnswer(10);

  // Display total score
  const scoreDiv = document.querySelector("#totalScore");
  scoreDiv.innerHTML = `Total Score: ${score}`;
  scoreDiv.className = score >= 80 ? "text-success" : "text-danger";

  if (score >= 80) {
    scoreDiv.innerHTML += "<br>🎉 Congratulations!";
  }

  // Update attempts
  attempts++;
  document.querySelector("#totalAttempts").innerHTML = `Quiz taken: ${attempts} time(s)`;
  localStorage.setItem("total_attempts", attempts);
}