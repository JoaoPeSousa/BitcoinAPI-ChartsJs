let data1 = document.getElementById("dataInicial")
let data2 = document.getElementById("dataFinal")

function validadorDatas() {
    const dataInicial = new Date(data1.value);
    const dataFinal = new Date(data2.value);
    let mensagens = []

    if (!checaValidez(dataInicial) || !checaValidez(dataFinal)) {
        mensagens.push('Datas/data inválida!')
    }
    if (mensagens.length === 0) {
        const dataInicial = new Date(data1.value);
        const dataFinal = new Date(data2.value);
        const hoje = new Date()
        const ONE_DAY = 1000 * 60 * 60 * 24;
        const difMiliseg = Math.abs(dataFinal - dataInicial);


        const difDias = difMiliseg / ONE_DAY

        if (dataInicial > dataFinal) {
            mensagens.push('Data inicial é maior que a final.')
        }
        if (dataInicial > hoje || dataFinal > hoje) {
            mensagens.push('As datas não podem ser maiores que o dia de hoje.')
        }
        if (difDias < 3) {
            mensagens.push('A diferença entre os dias não pode ser menor do que 3.')
        }
    }
    return mensagens
}

function checaValidez(d) {
    return d instanceof Date && !isNaN(d);
}

$('#dataInicial').mask('9999-99-99', {placeholder: "yyyy-mm-dd"});
$('#dataFinal').mask('9999-99-99', {placeholder: "yyyy-mm-dd"});