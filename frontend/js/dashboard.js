document.addEventListener('DOMContentLoaded', function() {
  const API_URL = '/api/quotes';
  
  const COLORS = ['#4e73df', '#1cc88a', '#36b9cc', '#f6c23e', '#e74a3b'];
  
  const stateFilter = document.getElementById('stateFilter');
  const roofTypeFilter = document.getElementById('roofTypeFilter');
  const applyBtn = document.getElementById('applyFilters');
  const resetBtn = document.getElementById('resetFilters');

  let allQuotes = [];
  let filteredQuotes = [];
  
  let stateChart = null;
  let roofTypeChart = null;
  let monthlyChart = null;
  let energySavingsChart = null;
  
  fetch(API_URL)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      allQuotes = data.data;
      filteredQuotes = [...allQuotes];
      
      // Populate state dropdown
      const states = [...new Set(allQuotes.map(quote => quote.state))].sort();
      stateFilter.innerHTML = '<option value="">All States</option>';
      states.forEach(state => {
        const option = document.createElement('option');
        option.value = state;
        option.textContent = state;
        stateFilter.appendChild(option);
      });
      
      updateDashboard();
    })
    .catch(error => {
      alert('Could not load data. Please try again.');
    });
  
  applyBtn.addEventListener('click', function() {
    const state = stateFilter.value;
    const roofType = roofTypeFilter.value;
    
    filteredQuotes = allQuotes.filter(quote => {
      return (!state || quote.state === state) && 
             (!roofType || quote.roofType === roofType);
    });
    
    updateDashboard();
  });
  
  resetBtn.addEventListener('click', function() {
    stateFilter.value = '';
    roofTypeFilter.value = '';
    filteredQuotes = [...allQuotes];
    updateDashboard();
  });
  
  // Export CSV function
  document.getElementById('exportCSV').addEventListener('click', function() {
    let csv = "ID,Contractor,Company,Roof Size,Roof Type,City,State,Date\n";
    
    filteredQuotes.forEach(quote => {
      csv += `${quote.id},${quote.contractorName},${quote.companyName},${quote.roofSize},${quote.roofType},${quote.city},${quote.state},${new Date(quote.projectDate).toLocaleDateString()}\n`;
    });
    
    const link = document.createElement('a');
    link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
    link.download = 'quote_data.csv';
    link.style.display = 'none';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
  
  // Main dashboard update function
  function updateDashboard() {
    updateStats();
    createStateChart();
    createRoofTypeChart();
    createMonthlyTrendChart();
    createEnergySavingsChart();
  }
  
  function updateStats() {
    // Count total projects
    document.getElementById('totalProjects').textContent = filteredQuotes.length;
    
    // Calculate average roof size
    const totalSize = filteredQuotes.reduce((sum, quote) => sum + quote.roofSize, 0);
    const avgSize = filteredQuotes.length ? Math.round(totalSize / filteredQuotes.length) : 0;
    document.getElementById('avgRoofSize').textContent = avgSize.toLocaleString();
    
    // Count states
    const uniqueStates = new Set(filteredQuotes.map(quote => quote.state));
    document.getElementById('statesCovered').textContent = uniqueStates.size;
    
    // Calculate energy savings (simple estimate)
    const totalEnergy = filteredQuotes.reduce((sum, quote) => sum + (quote.roofSize * 0.7), 0);
    document.getElementById('totalEnergySavings').textContent = Math.round(totalEnergy).toLocaleString();
  }
  
  // Create state chart
  function createStateChart() {
    const stateCounts = {};
    filteredQuotes.forEach(quote => {
      stateCounts[quote.state] = (stateCounts[quote.state] || 0) + 1;
    });
    
    const states = Object.keys(stateCounts)
      .sort((a, b) => stateCounts[b] - stateCounts[a])
      .slice(0, 5);
    
    const counts = states.map(state => stateCounts[state]);
    
    if (stateChart) {
      stateChart.destroy();
    }
    
    // Create bar chart
    const ctx = document.getElementById('stateProjectsChart').getContext('2d');
    stateChart = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: states,
        datasets: [{
          label: 'Number of Projects',
          data: counts,
          backgroundColor: COLORS[0],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  // Create roof type chart
  function createRoofTypeChart() {
    const typeCounts = {};
    filteredQuotes.forEach(quote => {
      typeCounts[quote.roofType] = (typeCounts[quote.roofType] || 0) + 1;
    });
    
    const types = Object.keys(typeCounts);
    const counts = types.map(type => typeCounts[type]);
    
    if (roofTypeChart) {
      roofTypeChart.destroy();
    }
    
    // Create pie chart
    const ctx = document.getElementById('roofSizeByTypeChart').getContext('2d');
    roofTypeChart = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: types,
        datasets: [{
          data: counts,
          backgroundColor: COLORS,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });
  }
  
  // Create monthly trend chart
  function createMonthlyTrendChart() {
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const today = new Date();
    const months = [];
    const monthCounts = {};
    
    for (let i = 5; i >= 0; i--) {
      const month = new Date(today.getFullYear(), today.getMonth() - i, 1);
      const monthKey = `${month.getFullYear()}-${month.getMonth()}`;
      const monthLabel = `${monthNames[month.getMonth()]} ${month.getFullYear()}`;
      
      months.push(monthLabel);
      monthCounts[monthKey] = 0;
    }
    
    filteredQuotes.forEach(quote => {
      const date = new Date(quote.projectDate);
      const monthKey = `${date.getFullYear()}-${date.getMonth()}`;
      
      if (monthCounts.hasOwnProperty(monthKey)) {
        monthCounts[monthKey]++;
      }
    });
    
    // Convert to arrays for chart
    const counts = Object.values(monthCounts);
    
    if (monthlyChart) {
      monthlyChart.destroy();
    }
    
    // Create line chart
    const ctx = document.getElementById('monthlyTrendChart').getContext('2d');
    monthlyChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: months,
        datasets: [{
          label: 'Projects',
          data: counts,
          backgroundColor: COLORS[2],
          borderColor: COLORS[2],
          borderWidth: 2,
          tension: 0.1
        }]
      },
      options: {
        responsive: true,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
  }
  
  // Create energy savings chart
  function createEnergySavingsChart() {
    const typeSavings = {};
    filteredQuotes.forEach(quote => {
      let savingFactor = 0.7; 
      
      // Different roof types have different efficiency
      if (quote.roofType === 'Metal') savingFactor = 0.8;
      else if (quote.roofType === 'TPO') savingFactor = 0.7;
      else if (quote.roofType === 'Foam') savingFactor = 0.9;
      else if (quote.roofType === 'Shingle') savingFactor = 0.6;
      
      const saving = quote.roofSize * savingFactor;
      
      typeSavings[quote.roofType] = (typeSavings[quote.roofType] || 0) + saving;
    });
    
    const types = Object.keys(typeSavings);
    const savings = types.map(type => Math.round(typeSavings[type]));
    
    if (energySavingsChart) {
      energySavingsChart.destroy();
    }
    
    // Create doughnut chart
    const ctx = document.getElementById('energySavingsByTypeChart').getContext('2d');
    energySavingsChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: types,
        datasets: [{
          data: savings,
          backgroundColor: COLORS,
          borderWidth: 1
        }]
      },
      options: {
        responsive: true
      }
    });
  }
}); 