const { log, error } = console;

// making a fetch() request from custom proxy server
const getData = async () => {
    const resp = await fetch("http://localhost:5000/BTCUSDT/1m");
    const data = await resp.json();
    log(data);
    return data;
};

// getData();

const renderChart = async() => {
    const chartProperties = {
        timeScale: {
            timeVisible: true,
            secondVisable: true,
        },
    };

    // creating a chart at the dom element created with id "tvchart"
    const domElement = document.getElementById("tvchart");
    const chart = LightweightCharts.createChart(domElement, chartProperties);
    const candleSeries = chart.addCandlestickSeries();
    let klinedata = await getData(); // get data from proxy server
    candleSeries.setData(klinedata); // set the candleSeries data recieved from proxy server
};

renderChart();