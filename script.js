{\rtf1\ansi\ansicpg1252\cocoartf2761
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\paperw11900\paperh16840\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx566\tx1133\tx1700\tx2267\tx2834\tx3401\tx3968\tx4535\tx5102\tx5669\tx6236\tx6803\pardirnatural\partightenfactor0

\f0\fs24 \cf0 const rowsPerPage = 30;\
let currentPage = 1;\
let tableData = []; // \uc0\u1604 \u1578 \u1582 \u1586 \u1610 \u1606  \u1575 \u1604 \u1576 \u1610 \u1575 \u1606 \u1575 \u1578  \u1605 \u1606  Google Sheets\
\
const tableBody = document.getElementById("table-body");\
const prevBtn = document.getElementById("prev-btn");\
const nextBtn = document.getElementById("next-btn");\
const pageInfo = document.getElementById("page-info");\
const searchInput = document.getElementById("search");\
\
function renderTable(page = 1, query = "") \{\
    const start = (page - 1) * rowsPerPage;\
    const filteredData = tableData.filter(row =>\
        Object.values(row).some(value => value.toString().includes(query))\
    );\
    const paginatedData = filteredData.slice(start, start + rowsPerPage);\
\
    tableBody.innerHTML = paginatedData\
        .map(\
            row => `\
            <tr>\
                <td>$\{row['\uc0\u1575 \u1604 \u1575 \u1587 \u1605 ']\}</td>\
                <td>$\{row['\uc0\u1575 \u1604 \u1606 \u1608 \u1593 ']\}</td>\
                <td>$\{row['\uc0\u1575 \u1604 \u1581 \u1575 \u1604 \u1577 ']\}</td>\
                <td>$\{row['\uc0\u1593 \u1583 \u1583  \u1575 \u1604 \u1581 \u1604 \u1602 \u1575 \u1578 ']\}</td>\
                <td>$\{row['\uc0\u1575 \u1604 \u1578 \u1585 \u1580 \u1605 \u1577 ']\}</td>\
            </tr>\
        `\
        )\
        .join("");\
\
    pageInfo.textContent = `\uc0\u1589 \u1601 \u1581 \u1577  $\{page\} \u1605 \u1606  $\{Math.ceil(filteredData.length / rowsPerPage)\}`;\
\
    prevBtn.disabled = page === 1;\
    nextBtn.disabled = page === Math.ceil(filteredData.length / rowsPerPage);\
\}\
\
prevBtn.addEventListener("click", () => \{\
    if (currentPage > 1) \{\
        currentPage--;\
        renderTable(currentPage, searchInput.value);\
    \}\
\});\
\
nextBtn.addEventListener("click", () => \{\
    currentPage++;\
    renderTable(currentPage, searchInput.value);\
\});\
\
searchInput.addEventListener("input", (e) => \{\
    currentPage = 1;\
    renderTable(currentPage, e.target.value);\
\});\
\
// \uc0\u1580 \u1604 \u1576  \u1575 \u1604 \u1576 \u1610 \u1575 \u1606 \u1575 \u1578  \u1605 \u1606  Google Sheets\
function fetchDataFromSheet() \{\
    Tabletop.init(\{\
        key: "YOUR_GOOGLE_SHEET_URL", // \uc0\u1590 \u1593  \u1585 \u1575 \u1576 \u1591  Google Sheets \u1607 \u1606 \u1575 \
        simpleSheet: true,\
        callback: function (data) \{\
            tableData = data;\
            renderTable();\
        \},\
    \});\
\}\
\
// \uc0\u1575 \u1587 \u1578 \u1583 \u1593 \u1575 \u1569  \u1575 \u1604 \u1583 \u1575 \u1604 \u1577  \u1604 \u1580 \u1604 \u1576  \u1575 \u1604 \u1576 \u1610 \u1575 \u1606 \u1575 \u1578 \
fetchDataFromSheet();\
}