// WAEC Grading System
function getGrade(score) {
  if (score >= 75) return { grade: "A1", remark: "Excellent", color: "green" };
  if (score >= 70) return { grade: "B2", remark: "Very Good", color: "blue" };
  if (score >= 65) return { grade: "B3", remark: "Good", color: "blue" };
  if (score >= 60) return { grade: "C4", remark: "Credit", color: "orange" };
  if (score >= 55) return { grade: "C5", remark: "Credit", color: "orange" };
  if (score >= 50) return { grade: "C6", remark: "Credit", color: "orange" };
  if (score >= 45) return { grade: "D7", remark: "Pass", color: "purple" };
  if (score >= 40) return { grade: "E8", remark: "Pass", color: "brown" };
  return { grade: "F9", remark: "Fail", color: "red" };
}

// Subjects per Class
const subjectsByClass = {
  "JSS1": ["Math", "English", "Basic Science", "Social Studies"],
  "JSS2": ["Math", "English", "Basic Science", "Business Studies"],
  "JSS3": ["Math", "English", "Basic Science", "Agricultural Science"],
  "SS1 Science": ["Math", "English", "Physics", "Chemistry", "Biology"],
  "SS2 Science": ["Math", "English", "Physics", "Chemistry", "Biology"],
  "SS3 Science": ["Math", "English", "Physics", "Chemistry", "Biology"],
  "SS1 Art": ["Math", "English", "Government", "Literature", "CRK"],
  "SS2 Art": ["Math", "English", "Government", "Literature", "CRK"],
  "SS3 Art": ["Math", "English", "Government", "Literature", "CRK"],
  "SS1 Commercial": ["Math", "English", "Economics", "Commerce", "Accounting"],
  "SS2 Commercial": ["Math", "English", "Economics", "Commerce", "Accounting"],
  "SS3 Commercial": ["Math", "English", "Economics", "Commerce", "Accounting"]
};

// Auto-fill session
document.addEventListener("DOMContentLoaded", () => {
  const year = new Date().getFullYear();
  document.getElementById("studentSession").value = `${year}/${year + 1}`;
});

// Update subjects when class changes + auto clear info
document.getElementById("studentClass").addEventListener("change", function() {
  const subjectsContainer = document.getElementById("subjectsContainer");
  subjectsContainer.innerHTML = "";

  document.getElementById("studentName").value = "";
  document.getElementById("studentTerm").value = "";
  
  const selectedClass = this.value;
  if (subjectsByClass[selectedClass]) {
    subjectsByClass[selectedClass].forEach(subject => {
      subjectsContainer.innerHTML += `
        <div class="form-group">
          <label>${subject}:</label>
          <input type="number" id="${subject.toLowerCase().replace(/ /g,'')}" min="0" max="100" required>
        </div>
      `;
    });
  }
});

// Generate Report
function generateReport() {
  const name = document.getElementById("studentName").value;
  const studentClass = document.getElementById("studentClass").value;
  const term = document.getElementById("studentTerm").value;
  const session = document.getElementById("studentSession").value;

  
  if (!name || !studentClass || !term) {
    alert("Please fill all details.");
    return;
  }
  // Date in long style
  const today = new Date();
  const longDate = today.toLocaleDateString("en-US", { day: "numeric", month: "long", year: "numeric" });

  document.getElementById("infoName").textContent = name;
  document.getElementById("infoClass").textContent = studentClass;
  document.getElementById("infoTerm").textContent = term;
  document.getElementById("infoSession").textContent = session;
  document.getElementById("infoDate").textContent = longDate;

  const subjects = subjectsByClass[studentClass] || [];
  let total = 0;
  let reportHTML = "";

  subjects.forEach(subject => {
    const input = document.getElementById(subject.toLowerCase().replace(/ /g,''));
    let score = Number(input.value);
    if (isNaN(score) || score < 0 || score > 100) score = 0;

    const { grade, remark, color } = getGrade(score);
    reportHTML += `<tr style="color:${color};">
      <td>${subject}</td>
      <td>${score}</td>
      <td>${grade}</td>
      <td>${remark}</td>
    </tr>`;
    total += score;
  });

  const average = Math.round(total / subjects.length);
  const { grade, remark, color } = getGrade(average);

  document.getElementById("reportBody").innerHTML = reportHTML;
  document.getElementById("overall").innerHTML = `Overall Average: ${average} → Grade ${grade} - ${remark}`;
  document.getElementById("overall").style.color = color;

  document.getElementById("reportCard").style.display = "block";
}

// Block invalid keys
document.addEventListener("keydown", function(e) {
  if (["e", "+", "-", "."].includes(e.key) && e.target.type === "number") {
    e.preventDefault();
  }
});
