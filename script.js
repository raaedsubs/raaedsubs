const sheetId = "1yJFfUHMJCLBpd8yLWtodRCT1r9ucci2kR5O6_lgYX7I";
const sheetName = "Sheet1"; // اسم الورقة
const apiKey = "AIzaSyC_DYo3WavStFbToNWxhG21DqAi7_QAm6Q"; // API Key الذي حصلت عليه

// استعلام API
const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const rows = data.values;
    if (rows.length > 0) {
      const table = document.getElementById('table'); // تأكد من أن لديك العنصر table في HTML
      rows.forEach((row, index) => {
        if (index > 0) { // تخطي السطر الأول إذا كان يحتوي على العناوين
          const tr = document.createElement('tr');
          row.forEach(cell => {
            const td = document.createElement('td');
            td.textContent = cell;
            tr.appendChild(td);
          });
          table.appendChild(tr);
        }
      });
    }
  })
  .catch(error => {
    console.error('Error fetching data from Google Sheets:', error);
  });
