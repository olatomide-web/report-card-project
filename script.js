function getGrade(score) {
score = 0;
grade = "F";
message = "Fail (Absent/Invalid)";
color = "red";
} else {
({ grade, message, color } = getGrade(score));
}


reportHTML += `<tr style="color:${color};">
<td>${sub}</td>
<td>${score}</td>
<td>${grade}</td>
<td>${message}</td>
</tr>`;


total += score;
});


document.getElementById("reportBody").innerHTML = reportHTML;


let average = Math.floor(total / subjects.length);
let { grade, message, color } = getGrade(average);
document.getElementById("overall").innerHTML =
`Overall Average: ${average} → Grade ${grade} - ${message}`;
document.getElementById("overall").style.color = color;


// Progress bar update
let progressFill = document.getElementById("progressFill");
let progressBar = document.querySelector(".progress-bar");
progressBar.style.display = "block";
progressFill.style.width = average + "%";
progressFill.textContent = average + "%";


// Show student details
const name = document.getElementById("studentName").value || "N/A";
const studentClass = document.getElementById("studentClass").value || "N/A";
const term = document.getElementById("studentTerm").value || "N/A";
const date = document.getElementById("studentDate").value || "N/A";
document.getElementById("studentDetails").innerHTML =
`Name: ${name} | Class: ${studentClass} | Term: ${term} | Date: ${date}`;


document.getElementById("studentDetails").style.display = "block";
document.getElementById("reportTable").style.display = "table";
}


document.querySelectorAll('input[type=number]').forEach(input => {
input.addEventListener("keydown", function(e) {
if (["e", "+", "-", "."].includes(e.key)) e.preventDefault();
});
});