// بيانات Zoho Sheet
const zohoApiKey = "Bearer 89av70ceb1c18c9a54782a44ed91e475f4bdb"; // توكن Zoho الخاص بك
const zohoSheetId = "a8fea67ffe6c76bf52fae79b8e8dc0554c0252d1035f7ad265799f89538a7bbc"; // معرف الورقة
const rowsPerPage = 20; // عدد الصفوف في كل صفحة
let currentPage = 1;
let data = [];

// جلب البيانات من Zoho Sheet
async function fetchZohoData() {
    try {
        const response = await fetch(`https://sheet.zoho.com/api/v2/${zohoSheetId}/rows`, {
            headers: {
                "Authorization": zohoApiKey
            }
        });

        if (!response.ok) {
            throw new Error("خطأ أثناء جلب البيانات من Zoho Sheet.");
        }

        const result = await response.json();
        data = result.data.map(row => ({
            title: row.columns["العنوان"] || "غير متوفر",
            type: row.columns["النوع"] || "غير متوفر",
            episodes: row.columns["الحلقات"] || "غير متوفر",
            status: row.columns["الحالة"] || "غير متوفر",
            translation: row.columns["الترجمة"] || "غير متوفر"
        }));

        renderTable(currentPage);
        renderPagination();
    } catch (error) {
        console.error("خطأ:", error);
        alert("حدث خطأ أثناء الاتصال بواجهة Zoho API. تأكد من صحة التوكن والمعرف.");
    }
}

// عرض البيانات داخل الجدول
function renderTable(page = 1) {
    const tableBody = document.querySelector("#contentTable tbody");
    tableBody.innerHTML = "";

    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const pageData = data.slice(start, end);

    pageData.forEach(row => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${row.title}</td>
            <td>${row.type}</td>
            <td>${row.episodes}</td>
            <td>${row.status}</td>
            <td>${generateLink(row.translation)}</td>
        `;
        tableBody.appendChild(tr);
    });
}

// إنشاء روابط الهايبرلنك
function generateLink(value) {
    if (value.startsWith("http://") || value.startsWith("https://")) {
        return `<a href="${value}" target="_blank">رابط</a>`;
    }
    return value;
}

// عرض الترقيم
function renderPagination() {
    const pagination = document.querySelector(".pagination");
    pagination.innerHTML = "";

    const totalPages = Math.ceil(data.length / rowsPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i.toLocaleString("ar-EG");
        button.classList.add(i === currentPage ? "active" : "");
        button.addEventListener("click", () => {
            currentPage = i;
            renderTable(currentPage);
            renderPagination();
        });
        pagination.appendChild(button);
    }
}

// التشغيل عند التحميل
fetchZohoData();
