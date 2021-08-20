let xlabels = []
let ylabels = []

async function grafico() {
    const validador = validadorDatas()
    if (validador.length > 0) {
        swal("Oops", validador.join("\r\n"), "error")
        return;
    }
    let body = $("body");

    body.addClass("loading");
    await buscar()
    const ctx = document.getElementById('myChart').getContext('2d');
    Chart.defaults.global.defaultFontColor = 'white';
    Chart.defaults.global.defaultFontFamily = "'Lato', sans-serif";
    body.removeClass("loading");
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: xlabels,
            datasets: [{
                label: "Bitcon(em real)/dia",
                data: ylabels,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                ],
                borderWidth: 1
            }]
        },
        options: {
            legend: {
                fontColor: "red"
            },
            scales: {
                yAxes: [{
                    ticks: {
                        fontColor: "white",
                        fontSize: 18,
                        beginAtZero: true
                    }
                }],
                xAxes: [{
                    ticks: {
                        fontColor: "white",
                        fontSize: 18,
                        beginAtZero: false
                    }
                }]
            }
        }
    })
}


async function buscar() {
    ylabels = []
    xlabels = []
    let termo = document.getElementById("dataInicial").value;
    let termo2 = document.getElementById("dataFinal").value;
    let url = `https://api.coinpaprika.com/v1/coins/btc-bitcoin/ohlcv/historical?start=${termo}&end=${termo2}`

    const conversorChamada = await conversor()
    const conversorPraReal = conversorChamada.USD_BRL


    try {
        const resposta = await fetch(url)
        if (resposta.status !== 400) {
            let json = await resposta.json()
            json.forEach((item) => {
                const calculo = item.close * conversorPraReal
                xlabels.push(formataData(item.time_open))
                let conversaoFinal = calculo.toLocaleString('pt-br', {
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                });
                ylabels.push(conversaoFinal)
            })
        } else {
            swal("Oops", "Não existe informação atrelada a esses dados!", "error")
        }

    } catch (e) {
        swal("Oops", `${e}`, "error")
    }


}


async function conversor() {
    let url = "https://free.currconv.com/api/v7/convert?q=USD_BRL&compact=ultra&apiKey=1ac03c21bb77e91149df"
    const response = await fetch(url);
    return await response.json()
}


function formataData(time_open) {
    return time_open.split("T")[0]
}

function limpar() {
    document.querySelector("#meuGrafico").innerHTML = '<canvas id="myChart"></canvas>';
    $("#dataInicial").val("")
    $("#dataFinal").val("")
    $("#dataInicial").focus()
}

$('.btnRes').click(function () {
    $('.items').toggleClass("show");
    $('ul li').toggleClass("hide");
});

