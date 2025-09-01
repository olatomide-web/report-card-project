function getGrade(score) {
if (score >= 70) return { grade: "A", message: "Excellent", color: "green" };
if (score >= 60) return { grade: "B", message: "Very Good", color: "blue" };
if (score >= 50) return { grade: "C", message: "Good", color: "orange" };
if (score >= 40) return { grade: "D", message: "Pass", color: "purple" };
return { grade: "F", message: "Fail", color: "red" };
}


function generateReport() {
const subjects = ["math", "english", "physics", "chemistry"];
let total = 0;
let reportHTML = "";


subjects.forEach(sub => {
let score = Math.floor(Number(document.getElementById(sub).value));
let grade, message, color;


if (isNaN(score) || score < 0 || score > 100) {
score = 0;
grade = "F";
message = "Fail (Absent/Invalid)";
color = "red";
} else {
({ grade, message, color } = getGrade(score));
}


reportHTML += `<div class="result" style="color:${color};">
${sub.toUpperCase()}: ${score} → Grade ${grade} - ${message}
</div>`;


total += score;
});


document.getElementById("report").innerHTML = reportHTML;


let average = Math.floor(total / subjects.length);
let { grade, message, color } = getGrade(average);
document.getElementById("overall").innerHTML =
`Overall Average: ${average} → Grade ${grade} - ${message}`;
document.getElementById("overall").style.color = color;
}


document.querySelectorAll('input[type=number]').forEach(input => {
input.addEventListener("keydown", function(e) {
if (["e", "+", "-", "."].includes(e.key)) e.preventDefault();
});
});