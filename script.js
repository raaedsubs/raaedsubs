const sheetId = "1yJFfUHMJCLBpd8yLWtodRCT1r9ucci2kR5O6_lgYX7I";
const sheetName = "Sheet1";  // اسم الورقة (تأكد من أنه يطابق اسم الورقة في Google Sheets)
const apiKey = "AIzaSyC_DYo3WavStFbToNWxhG21DqAi7_QAm6Q";  // API Key الخاص بك

const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${sheetName}?key=${apiKey}`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    if (data.values && data.values.length > 0) {
      const rows = data.values;
      const table = document.getElementById('table'); // تأكد من وجود عنصر table في HTML

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
    } else {
      console.log("لا توجد بيانات في الجدول.");
    }
  })
  .catch(error => {
    console.error('خطأ في جلب البيانات من Google Sheets:', error);
  });
