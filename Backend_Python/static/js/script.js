// SIDEBAR TOGGLE

var sidebarOpen = false;
var sidebar = document.getElementById("sidebar");

function openSidebar() {
  if(!sidebarOpen) {
    sidebar.classList.add("sidebar-responsive");
    sidebarOpen = true;
  }
}

function closeSidebar() {
  if(sidebarOpen) {
    sidebar.classList.remove("sidebar-responsive");
    sidebarOpen = false;
  }
}



// ---------- CHARTS ----------
fetch('/dash/data')
  .then(response => response.json())
  .then(data => {
    // Récupérer les labels et les données à partir des données de l'API
    const labels = data.map(item => item.Ville);
    console.log(labels)
    const listeCaracteres = data.map(item => item.Chiffre);
    const values = listeCaracteres.map(chiffre => parseInt(chiffre));
    let value = values.filter((element, index) => {
        return values.indexOf(element) === index;
    });
    let valeur = value.slice(0, 7);

    let label = labels.filter((element, index) => {
        return labels.indexOf(element) === index;
    });
    let labelss = label.slice(0, 7);

// BAR CHART
    var barChartOptions = {
    series: [{
        data: valeur,
        name: "Chiffre d'affaire en $",
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

// var barChart = new ApexCharts(document.querySelector("#bar-chart"), barChartOptions);
// barChart.render();


fetch('/dash/data')
  .then(response => response.json())
  .then(data => {
    // Récupérer les labels et les données à partir des données de l'API
    const labels = data.map(item => item.Ville);
    const listeCaracteres = data.map(item => item.Benefice);
    const values = listeCaracteres.map(chiffre => parseInt(chiffre));
    let v = values.filter((element, index) => {
        return values.indexOf(element) === index;
    });
    let valuees = v.slice(0, 10);

    // Chiffre daffaire
    const liste = data.map(item => item.Chiffre);
    const value = liste.map(chiffre => parseInt(chiffre));
    
    let valuee = value.slice(0, 10);
    // la date des commande
    const listeArticle = data.map(item => item.Date);
    let l = listeArticle.filter((element, index) => {
        return listeArticle.indexOf(element) === index;
    });
    let listeArticles = l.slice(0, 15);

    // Rendre Unique les elements
    



    // AREA CHART
    var areaChartOptions = {
    series: [{
        name: "Bénéfices",
        data: valuees,
    }, {
        name: "Chiffre d'affaires",
        data: valuee,
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
    labels: listeArticles,
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