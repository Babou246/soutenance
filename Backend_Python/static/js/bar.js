fetch('/dash/data')
  .then(response => response.json())
  .then(data => {
    const labels = data.map(item => item.Commerce);
    const listeCaracteres = data.map(item => item.Chiffre);
    const values = listeCaracteres.map(chiffre => parseInt(chiffre));
    console.log("==========>",labels)

    // Créer un tableau de données pour Chart.js
    const chartData = {
      labels: labels,
      datasets: [
        {
          label: 'Valeurs',
          backgroundColor: 'rgba(255, 99, 132, 0.2)',
          borderColor: 'rgba(255, 99, 132, 1)',
          borderWidth: 1,
          data: values,
        },
      ],
    };

    // Récupérer le canvas
    const ctx = document.getElementById('bar').getContext('2d');

    // Créer le graphique avec Chart.js
    const myChart = new Chart(ctx, {
      type: 'bar',
      data: chartData,
      options: {
        scales: {
          y: {
            beginAtZero: true,
          },
        },
      },
    });
  })
  .catch(error => console.error(error));