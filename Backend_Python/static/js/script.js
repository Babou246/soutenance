
function refresh() {
    // Rafraîchir l'élément HTML toutes les 5 secondes
    
    let refreshElement = document.getElementById('card');
    //   refreshElement.textContent = 'Nouveau contenu à ' + new Date().toLocaleTimeString();
    
  
    // Recharger la page entière après 30 secondes
    setTimeout(function() {
      location.reload();
    }, 30000);
  }
  setInterval(refresh,5000)
  

function load(){
    // -======================================================================================
    fetch('/dash/data')
    .then(response => response.json())
    .then(data => {
    // Récupérer les labels et les données à partir des données de l'API
    const labels = data.map(item => item.pays);
    // console.log(labels)
    const listeCaracteres = data.map(item => item.quantite);
    let value = listeCaracteres.filter((element, index) => {
        return listeCaracteres.indexOf(element) === index;
    });
    let valeur = value.slice(0, 7);

    let label = labels.filter((element, index) => {
        return labels.indexOf(element) === index;
    });
    let labelss = label.slice(0, 7).sort((a, b) => a - b);

    // BAR CHART
    var barChartOptions = {
    series: [{
        data: valeur,
        name: "Quantité de Produit Vendus",
    }],
    chart: {
        type: "bar",
        background: "transparent",
        height: 350,
        toolbar: {
        show: false,
        },
    },
    colors: [
        "#2962ff",
        "#d50000",
        "#2e7d32",
        "#ff6d00",
        "#583cb3",
    ],
    plotOptions: {
        bar: {
        distributed: true,
        borderRadius: 4,
        horizontal: false,
        columnWidth: "70%",
        }
    },
    dataLabels: {
        enabled: false,
    },
    fill: {
        opacity: 1,
    },
    grid: {
        borderColor: "#55596e",
        yaxis: {
        lines: {
            show: true,
        },
        },
        xaxis: {
        lines: {
            show: true,
        },
        },
    },
    legend: {
        labels: {
        colors: "#f5f7ff",
        },
        show: false,
        position: "top",
    },
    stroke: {
        colors: ["transparent"],
        show: true,
        width: 2
    },
    tooltip: {
        shared: true,
        intersect: false,
        theme: "dark",
    },
    xaxis: {
        categories: labelss,
        title: {
        style: {
            color: "#f5f7ff",
        },
        },
        axisBorder: {
        show: true,
        color: "#55596e",
        },
        axisTicks: {
        show: true,
        color: "#55596e",
        },
        labels: {
        style: {
            colors: "#f5f7ff",
        },
        },
    },
    yaxis: {
        title: {
        text: "Count",
        style: {
            color:  "#f5f7ff",
        },
        },
        axisBorder: {
        color: "#55596e",
        show: true,
        },
        axisTicks: {
        color: "#55596e",
        show: true,
        },
        labels: {
        style: {
            colors: "#f5f7ff",
        },
        },
    }
    };
    var barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
    barChart.render();
    })
    // =======================================================================================
    fetch('/dash/data')
    .then(response => response.json())
    .then(data => {
    // Récupérer les labels et les données à partir des données de l'API
    const labels = data.map(item => item.produit);
    let p = labels.filter((element, index) => {
        return labels.indexOf(element) === index;
    });
    let produit = p.slice(0, 4);
    console.log('<******************>',produit)
    // console.log(labels)
    const values = data.map(item => item.quantite);

    let valeur = values.slice(0, 4);
    // Créer l'objet de configuration du graphique
    var pieChartOptions = {
        series: valeur,
        labels: produit,
        chart: {
        type: "pie",
        height: 350,
        },
        colors: [
        "#2962ff",
        "#d50000",
        "#2e7d32",
        "#ff6d00",
        "#583cb3",
        ],
        dataLabels: {
        enabled: true,
        formatter: function (val, opts) {
            const total = opts.w.globals.seriesTotals.reduce((a, b) => a + b, 0);
            const percentage = ((val / total) * 100).toFixed(2) + "%";
            return `${percentage}`;
        },
        style: {
            fontSize: "24px",
            fontFamily: "Helvetica, Arial, sans-serif",
            fontWeight: 400,
            colors: undefined,
        },
        dropShadow: {
            enabled: true,
            blur: 3,
            opacity: 0.8,
        },
        },
        legend: {
        position: "bottom",
        labels: {
            colors: "#f5f7ff",
        },
        },
        tooltip: {
        theme: "dark",
        },
    };

    // Créer le graphique
    var pieChart = new ApexCharts(document.querySelector("#pie-chart"), pieChartOptions);
    pieChart.render();
    })


    fetch('/dash/data')
    .then(response => response.json())
    .then(data => {
    // Récupérer les labels et les données à partir des données de l'API
    const labels = data.map(item => item.benefice);
    const values = data.map(item => item.produit);
    const q = data.map(item => item.quantite);
    const prix = data.map(item => item.prix_unitaire);
    const chiffre = [];

    for (let i = 0; i < prix.length; i++) {
        chiffre.push(q[i] * prix[i]);
    }


    let v = chiffre.filter((element, index) => {
        return chiffre.indexOf(element) === index;
    });
    let lab = v.slice(0, 10);
    console.log('<============================>',lab)

    let p = values.filter((element, index) => {
        return values.indexOf(element) === index;
    });
    let value = p.slice(0, 4);
    console.log('<============================>',value)
    

    // ================================
    // Formatage de la date '2021-11-30T00:00:00.000Z';
    const d = data.map(item => item.date);
    const formattedDates = [];
    for (const dateStr of d) {
    const date = new Date(dateStr);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    formattedDates.push(`${year}/${month}/${day}`);
    }

    // console.log(formattedDates);
    let l = formattedDates.filter((element, index) => {
        return formattedDates.indexOf(element) === index;
    });
    let date = l.slice(0, 15);

    // Rendre Unique les elements
    



    // AREA CHART
    var areaChartOptions = {
    series: [{
        name: "Bénéfices",
        data: lab,
    }, {
        name: "Produits",
        data: value,
    }],
    chart: {
        type: "area",
        background: "transparent",
        height: 350,
        stacked: false,
        toolbar: {
        show: false,
        },
    },
    colors: ["#00ab57", "#d50000"],
    labels: date,
    dataLabels: {
        enabled: false,
    },
    fill: {
        gradient: {
        opacityFrom: 0.4,
        opacityTo: 0.1,
        shadeIntensity: 1,
        stops: [0, 100],
        type: "vertical",
        },
        type: "gradient",
    },
    grid: {
        borderColor: "#55596e",
        yaxis: {
        lines: {
            show: true,
        },
        },
        xaxis: {
        lines: {
            show: true,
        },
        },
    },
    legend: {
        labels: {
        colors: "#f5f7ff",
        },
        show: true,
        position: "top",
    },
    markers: {
        size: 6,
        strokeColors: "#1b2635",
        strokeWidth: 3,
    },
    stroke: {
        curve: "smooth",
    },
    xaxis: {
        axisBorder: {
        color: "#55596e",
        show: true,
        },
        axisTicks: {
        color: "#55596e",
        show: true,
        },
        labels: {
        offsetY: 5,
        style: {
            colors: "#f5f7ff",
        },
        },
    },
    yaxis: 
    [
        {
        title: {
            text: "Bénéfices",
            style: {
            color: "#f5f7ff",
            },
        },
        labels: {
            style: {
            colors: ["#f5f7ff"],
            },
        },
        },
        {
        opposite: true,
        title: {
            text: "Chiffre d'affaires",
            style: {
            color:  "#f5f7ff",
            },
        },
        labels: {
            style: {
            colors: ["#f5f7ff"],
            },
        },
        },
    ],
    tooltip: {
        shared: true,
        intersect: false,
        theme: "dark",
    }
    };

    var areaChart = new ApexCharts(document.querySelector("#area-chart"), areaChartOptions);
    areaChart.render();
    })

    // ====================================================================


    fetch('/dash/data')
    .then(response => response.json())
    .then(data => {
    // Récupérer les labels et les données à partir des données de l'API
    const labels = data.map(item => item.nom);

    const listeCaracteres = data.map(item => item.quantite);
    // const values = listeCaracteres.map(chiffre => parseInt(chiffre));
    let value = listeCaracteres.filter((element, index) => {
        return listeCaracteres.indexOf(element) === index;
    });
    // console.log('==========xxxxx',value)
    let valeur = value.slice(0, 15);
    console.log('HHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH',valeur)

    let label = labels.filter((element, index) => {
        return labels.indexOf(element) === index;
    });
    console.log("label",label)

    let lab = label.slice(0, 15);

    // BAR CHART
    var barChartOptions = {
    series: [{
        data: valeur,
        name: "Clients",
    }],
    chart: {
        type: "bar",
        background: "transparent",
        height: 350,
        toolbar: {
        show: false,
        },
    },
    colors: [
        "#2962ff",
        "#d50000",
        "#2e7d32",
        "#ff6d00",
        "#583cb3",
    ],
    plotOptions: {
        bar: {
        distributed: true,
        borderRadius: 4,
        horizontal: true,
        columnWidth: "70%",
        }
    },
    dataLabels: {
        enabled: false,
    },
    fill: {
        opacity: 1,
    },
    grid: {
        borderColor: "#55596e",
        yaxis: {
        lines: {
            show: true,
        },
        },
        xaxis: {
        lines: {
            show: true,
        },
        },
    },
    legend: {
        labels: {
        colors: "#f5f7ff",
        },
        show: false,
        position: "top",
    },
    stroke: {
        colors: ["transparent"],
        show: true,
        width: 2
    },
    tooltip: {
        shared: true,
        intersect: false,
        theme: "dark",
    },
    xaxis: {
        categories: lab,
        title: {
        style: {
            color: "#f5f7ff",
        },
        },
        axisBorder: {
        show: true,
        color: "#55596e",
        },
        axisTicks: {
        show: true,
        color: "#55596e",
        },
        labels: {
        style: {
            colors: "#f5f7ff",
        },
        },
    },
    yaxis: {
        title: {
        text: "Client",
        style: {
            color:  "#f5f7ff",
        },
        },
        axisBorder: {
        color: "#55596e",
        show: true,
        },
        axisTicks: {
        color: "#55596e",
        show: true,
        },
        labels: {
        style: {
            colors: "#f5f7ff",
        },
        },
    }
    };
    var barChart = new ApexCharts(document.querySelector("#barh-chart"), barChartOptions);
    barChart.render();
    })
}

setInterval(load,3000)
  