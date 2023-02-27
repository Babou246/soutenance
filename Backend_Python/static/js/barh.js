var ctx = document.getElementById('barh').getContext('2d');
var myChart = new Chart(ctx, {
  type: 'scatter',
  data: {
    labels: ['Label 1', 'Label 2', 'Label 3', 'Label 4', 'Label 5'],
    datasets: [{
      label: 'Dataset Label',
      data: [10, 20, 30, 40, 50],
      backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56', '#2ecc71', '#f1c40f']
    }]
  },
  options: {
    scales: {
      x: {
        beginAtZero: true
      }
    }
  }
});