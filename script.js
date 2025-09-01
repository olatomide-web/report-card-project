function generateReport() {
  const subjects = [
    { name: "Math", score: parseInt(document.getElementById("math").value) || 0 },
    { name: "English", score: parseInt(document.getElementById("english").value) || 0 },
    { name: "Physics", score: parseInt(document.getElementById("physics").value) || 0 },
    { name: "Chemistry", score: parseInt(document.getElementById("chemistry").value) || 0 }
  ];

  let reportTable = `
    <table>
      <tr>
        <th>Subject</th>
        <th>Score</th>
        <th>Grade</th>
        <th>Remark</th>
      </tr>
  `;

  let total = 0;
  subjects.forEach(subj => {
    const { grade, remark } = getGrade(subj.score);
    total += subj.score;
    reportTable += `
      <tr>
        <td>${subj.name}</td>
        <td>${subj.score}</td>
        <td>${grade}</td>
        <td>${remark}</td>
      </tr>
    `;
  });

  const average = total / subjects.length;
  const { grade: finalGrade, remark: finalRemark } = getGrade(average);

  reportTable += `
    <tr>
      <th colspan="2">Overall Average</th>
      <td>${average.toFixed(2)}</td>
      <td>${finalGrade} - ${finalRemark}</td>
    </tr>
    </table>
  `;

  document.getElementById("report").innerHTML = reportTable;

  // Add date issued
  document.getElementById("dateIssued").textContent = new Date().toLocaleDateString();
}

function getGrade(score) {
  if (score >= 70) return { grade: "A", remark: "Excellent" };
  if (score >= 60) return { grade: "B", remark: "Very Good" };
  if (score >= 50) return { grade: "C", remark: "Good" };
  if (score >= 45) return { grade: "D", remark: "Fair" };
  if (score >= 40) return { grade: "E", remark: "Pass" };
  return { grade: "F", remark: "Fail" };
}
