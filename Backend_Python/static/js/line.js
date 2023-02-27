// Récupérer les données de l'API via une requête fetch
fetch('/dash/data')
  .then(response => response.json())
  .then(data => {
    // Récupérer les labels et les données à partir des données de l'API
    const labels = data.map(item => item.Ville);
    const listeCaracteres = data.map(item => item.Chiffre);
    const values = listeCaracteres.map(chiffre => parseInt(chiffre));


    // const listeCaracteres = ['1', '2', '3', '4', '5'];
    // const listeEntiers = listeCaracteres.map(chiffre => parseInt(chiffre));
    // console.log(listeEntiers); // [1, 2, 3, 4, 5]



    // Créer un nouveau graphique en utilisant les labels et les données récupérées
    const ctx = document.getElementById('line').getContext('2d');
    const myChart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Valeurs',
          data: values,
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
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
  });
