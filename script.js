let originalData;

// Fetch data using .then
function fetchDataWithThen() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
        .then(response => response.json())
        .then(data => {
            console.log("Fetched data with .then:", data);
            originalData = data;
            renderTable(data);
        })
        .catch(error => console.error('Error fetching data:', error));
}

// Function to fetch data using async/await
async function fetchDataWithAsync() {
    try {
        const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
        const data = await response.json();
        console.log("Fetched data with async/await:", data);
        originalData = data;
        renderTable(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Function to render data in table
function renderTable(data) {
    const tableBody = document.getElementById('cryptoData');
    tableBody.innerHTML = '';

    data.forEach(item => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.symbol}</td>
            <td><img src="${item.image}" alt="${item.name}" width="50"></td>
            <td>${item.current_price}</td>
            <td>${item.total_volume}</td>
        `;
        tableBody.appendChild(row);
    });
}

// Search functionality
function search() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const filteredData = originalData.filter(item => item.name.toLowerCase().includes(input) || item.symbol.toLowerCase().includes(input));
    renderTable(filteredData);
}

// Sort by market cap
function sortByMarketCap() {
    const sortedData = originalData.slice().sort((a, b) => a.market_cap - b.market_cap);
    renderTable(sortedData);
}

// Sort by percentage change
function sortByPercentageChange() {
    const sortedData = originalData.slice().sort((a, b) => a.price_change_percentage_24h - b.price_change_percentage_24h);
    renderTable(sortedData);
}

// Initial data fetch and rendering
document.addEventListener('DOMContentLoaded', () => {
    fetchDataWithThen(); // or fetchDataWithAsync();
});
