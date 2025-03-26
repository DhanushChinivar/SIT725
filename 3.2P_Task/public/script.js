async function fetchQuote() {
    try {
      const response = await fetch('/api/quote');
      const data = await response.json();
      document.getElementById('quote-text').textContent = `"${data.quote}"`;
    } catch (error) {
      document.getElementById('quote-text').textContent = '';
      console.error('Error fetching quote:', error);
    }
  }
  
  document.getElementById('new-quote').addEventListener('click', fetchQuote);
  
  // Load one on start
  fetchQuote();
  