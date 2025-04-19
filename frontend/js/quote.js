document.addEventListener('DOMContentLoaded', function() {
  const API_URL = '/api/quotes';
  
  const quoteForm = document.getElementById('quoteForm');
  const alertMessage = document.getElementById('alertMessage');
  
  // Submission handler
  quoteForm.addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
      contractorName: document.getElementById('contractorName').value,
      companyName: document.getElementById('companyName').value,
      roofSize: parseInt(document.getElementById('roofSize').value),
      roofType: document.getElementById('roofType').value,
      city: document.getElementById('city').value,
      state: document.getElementById('state').value,
      projectDate: document.getElementById('projectDate').value
    };
    
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (response.ok) {
        showAlert('Quote submitted successfully!', 'success');
        quoteForm.reset();
        const today = new Date();
        const formattedDate = today.toISOString().split('T')[0];
        document.getElementById('projectDate').value = formattedDate;
      } else {
        throw new Error(data.error || 'Submission failed, please try again');
      }
    } catch (error) {
      showAlert(`Error: ${error.message}`, 'danger');
    }
  });
    
  const today = new Date();
  const formattedDate = today.toISOString().split('T')[0];
  document.getElementById('projectDate').value = formattedDate;
}); 