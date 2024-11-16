const rowsPerPage = 30;
let currentPage = 1;
let tableData = []; // لتخزين البيانات من Google Sheets

const tableBody = document.getElementById("table-body");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const pageInfo = document.getElementById("page-info");
const searchInput = document.getElementById("search");

function renderTable(page = 1, query = "") {
    const start = (page - 1) * rowsPerPage;
    const filteredData = tableData.filter(row =>
        Object.values(row).some(value => value.toString().includes(query))
    );
    const paginatedData = filteredData.slice(start, start + rowsPerPage);

    tableBody.innerHTML = paginatedData
        .map(
            row => `
            <tr>
                <td>${row['الاسم']}</td>
                <td>${row['النوع']}</td>
                <td>${row['الحالة']}</td>
                <td>${row['عدد الحلقات']}</td>
                <td>${row['الترجمة']}</td>
            </tr>
        `
        )
        .join("");

    pageInfo.textContent = `صفحة ${page} من ${Math.ceil(filteredData.length / rowsPerPage)}`;

    prevBtn.disabled = page === 1;
    nextBtn.disabled = page === Math.ceil(filteredData.length / rowsPerPage);
}

prevBtn.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        renderTable(currentPage, searchInput.value);
    }
});

nextBtn.addEventListener("click", () => {
    currentPage++;
    renderTable(currentPage, searchInput.value);
});

searchInput.addEventListener("input", (e) => {
    currentPage = 1;
    renderTable(currentPage, e.target.value);
});

// جلب البيانات من Google Sheets
function fetchDataFromSheet() {
    Tabletop.init({
        key: "YOUR_GOOGLE_SHEET_URL", // ضع رابط Google Sheets هنا
        simpleSheet: true,
        callback: function (data) {
            tableData = data;
            renderTable();
        },
    });
}

// استدعاء الدالة لجلب البيانات
fetchDataFromSheet();
