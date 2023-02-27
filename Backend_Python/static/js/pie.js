fetch('/dash/data')
  .then(response => response.json())
  .then(data => {
    const labels = data.map(d => d.Article);
    const listeCaracteres = data.map(d => d.Quantité);
    const values = listeCaracteres.map(chiffre => parseInt(chiffre));

    const config = {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [
          {
            data: values,
            backgroundColor: [
              'red',
              'orange',
              'yellow'
            ]
          }
        ]
      },
      options: {
        responsive: false,
        plugins: {
          legend: {
            position: 'bottom'
          }
        }
      }
    };

    const ctx = document.getElementById('pie').getContext('2d');
    new Chart(ctx, config);
  });
