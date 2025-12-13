document.addEventListener('DOMContentLoaded', function () {
    var name = document.getElementsByClassName('name');
    console.log(name);
    name[0].innerText = 'JOHN A. EISENHART';
    
    const ctx = document.getElementById('englishChart').getContext('2d');
    const englishChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['English'],
            datasets: [{
                label: 'Proficiency',
                data: [95, 5],
                backgroundColor: ['#ff8474', '#404e5d'],
                borderColor: ['#ff8474', '#404e5d'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            cutout: '80%',
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false },
                datalabels: {
                    display: true,
                    color: '#ffffff',
                    font: { weight: 'bold', size: 18 },
                    formatter: (value, context) => {
                        const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                        const percentage = Math.round((value / total) * 100);
                        return percentage + '%\nEnglish';
                    },
                    align: 'center',
                    anchor: 'center'
                }
            }
        }
    });

    const ctx2 = document.getElementById('germanChart').getContext('2d');
    const germanChart = new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['German'],
            datasets: [{
                label: 'Proficiency',
                data: [60, 40],
                backgroundColor: ['#ff8474', '#404e5d'],
                borderColor: ['#ff8474', '#404e5d'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            cutout: '80%',
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false },
                datalabels: {
                    display: true,
                    color: '#ffffff',
                    font: { weight: 'bold', size: 18 },
                    formatter: (value, context) => {
                        const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                        const percentage = Math.round((value / total) * 100);
                        return percentage + '%\nGerman';
                    },
                    align: 'center',
                    anchor: 'center'
                }
            }
        }
    });

    const ctx3 = document.getElementById('spanishChart').getContext('2d');
    const spanishChart = new Chart(ctx3, {
        type: 'doughnut',
        data: {
            labels: ['Spanish'],
            datasets: [{
                label: 'Proficiency',
                data: [45, 55],
                backgroundColor: ['#ff8474', '#404e5d'],
                borderColor: ['#ff8474', '#404e5d'],
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            cutout: '80%',
            plugins: {
                legend: { display: false },
                tooltip: { enabled: false },
                datalabels: {
                    display: true,
                    color: '#ffffff',
                    font: { weight: 'bold', size: 18 },
                    formatter: (value, context) => {
                        const total = context.dataset.data.reduce((acc, val) => acc + val, 0);
                        const percentage = Math.round((value / total) * 100);
                        return percentage + '%\nSpanish';
                    },
                    align: 'center',
                    anchor: 'center'
                }
            }
        }
    });

    var arrows=$('.show-hide-main');
    var paths=$('.show-hide-main path');
    var up='bi-chevron-up';
    var down='bi-chevron-down';
    var d_up='M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z';
    var d_down='M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z';
    var drop_downs = $('.drop-down');
    arrows.each(function(index) {
        $(this).click(function() {
            drop_downs.eq(index).slideToggle(500, function() {
                if ($(arrows.eq(index)).hasClass(up)) {
                    $(arrows.eq(index)).removeClass(up).addClass(down);
                    $(paths.eq(index)).attr("d", d_down);
                } else {
                    $(arrows.eq(index)).removeClass(down).addClass(up);
                    $(paths.eq(index)).attr("d", d_up);
                }
            });
        });
    });

    //lab4
    // var langEducation = [
    //     {
    //         "proficiency": 95,
    //         "language": "English"
    //     },
    //     {
    //         "proficiency": 60,
    //         "language": "German"
    //     },
    //     {
    //         "proficiency": 45,
    //         "language": "Spanish"
    //     }
    // ]

    // updateCharts(langEducation);

    // Функція для отримання даних з data.json за допомогою Fetch API
    async function fetchDataFetchAPI() {
        try {
            // Запит до JSON-файлу
            const response = await fetch('http://localhost:3000/data/data.json', { cache: "no-store" });

            // Перевірка статусу відповіді
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            // Парсимо JSON-дані
            const data = await response.json();
            console.log("Fetched data using Fetch API:", data);

            // Оновлюємо графіки після отримання нових даних
            updateCharts(data);
        } catch (error) {
            console.error('Error fetching data using Fetch API:', error);
        }
    }

    function updateCharts(data) {
        var percentElements = $('.percent');
        var langElements = $('.lang');

        for (let i = 0; i < percentElements.length; i++){
            percentElements[i].innerText = data[i].proficiency + '%';
            langElements[i].innerText = data[i].language;
        }
        // Оновлення для English Chart
        englishChart.data.datasets[0].data = [data[0].proficiency, 100 - data[0].proficiency];
        englishChart.update();

        // Оновлення для German Chart
        germanChart.data.datasets[0].data = [data[1].proficiency, 100 - data[1].proficiency];
        germanChart.update();

        // Оновлення для Spanish Chart
        spanishChart.data.datasets[0].data = [data[2].proficiency, 100 - data[2].proficiency];
        spanishChart.update();
    }

    //lab5
   fetchDataFetchAPI();

    setInterval(fetchDataFetchAPI, 30000);
});
