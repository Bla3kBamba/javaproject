
function updateTable() {
    let currentUserEmail = localStorage.getItem('currentUser');
    let shifts = JSON.parse(localStorage.getItem(currentUserEmail + '-shifts')) || [];
    let table = document.querySelector('.shifts-table');
    table.innerHTML = '<tr><th>תאריך</th><th>שעת התחלה</th><th>שעת סיום</th><th>שכר שעתי</th><th>תפקיד</th><th>סניף</th><th>שכר כולל למשמרת</th></tr>';

    let totalWages = 0;
    shifts.forEach(function (shift) {
        let row = table.insertRow();
        row.innerHTML = '<td>' + shift.date + '</td><td>'
         + shift.startTime + '</td><td>'
          + shift.endTime + '</td><td>'
           + shift.hourlyWage + '</td><td>'
            + shift.role + '</td><td>'
             + shift.branch + '</td><td>'
              + shift.totalWage.toFixed(2) + '</td>';
            


        totalWages += shift.totalWage;
    });


    let totalRow = table.insertRow();
    totalRow.innerHTML = '<td colspan="6">סה"כ שכר</td><td>' + totalWages.toFixed(2) + '</td>';
}


updateTable();
