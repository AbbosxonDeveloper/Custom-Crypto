let line = document.getElementById("line");
let cash = document.getElementById("cash");
let trade_input = document.getElementById("trade_amount");
let trade_btn = document.getElementById("trade_btn");
let trade_form = document.getElementById("trade_form");
let warn = document.getElementById("warn");
let plusminus = document.getElementById("plusminus");
let btn_stop = document.getElementById("trade_btn_stop");
let trade_btn_get = document.getElementById("trade_btn_get");
let select_time = document.getElementById("select_time");
let time_left = document.getElementById("time_left");

let getCash = JSON.parse(localStorage.getItem("cash"));
console.log(+getCash)
if (+getCash <= 0) {
    getCash = 15000;
}
let storageCash = localStorage.setItem("cash", getCash);

function numberWithCommas(x) {
    x = x.toString();
    let pattern = /(-?\d+)(\d{3})/;
    try {
        while (pattern.test(x))
            x = x.replace(pattern, "$1 $2");
        return x;
    } catch (error) {
        console.log(error)
    }
}

let cashvalue = +getCash;
cash.textContent = numberWithCommas(Number(getCash));

trade_form.onsubmit = (e) => {
    e.preventDefault();
    if (trade_input.value > getCash) {
        warn.textContent = "you don't have enough money";
        setTimeout(() => {
            warn.textContent = null;
        }, 2500)
    } else if (trade_input.value == 0 || trade_input.value <= 0) {
        warn.textContent = "you cannot trade with 0";
        setTimeout(() => {
            warn.textContent = null;
        }, 2500)
    } else {
        trade_input.style.display = "none";
        let lineval = +line.textContent;
        line.textContent = trade_input.value;
        localStorage.setItem("cash", JSON.stringify(+getCash - (+trade_input.value)));
        cashvalue = +getCash - +trade_input.value;
        cash.textContent = numberWithCommas(+getCash - +trade_input.value);



        trade_btn.style.display = "none";
        select_time.style.display = "none";

        let countdown = +select_time.value;
        let interval = setInterval(function () {
            // console.log('nimadir');
            let randline = Math.floor(Math.random() * 10000);
            let rand = Number((Math.random() * 25));

            time_left.textContent = countdown + " seconds";
            if (countdown <= 1) {
                time_left.textContent = countdown + " second";
            }
            if (countdown == 0) {
                setTimeout(() => {
                    time_left.textContent = ""
                }, 1000)
            }
            countdown--;
            if (randline % 2 !== 0) {
                let lineValDown = parseFloat((+line.textContent - line.textContent * rand / 100).toFixed(0));
                line.textContent = lineValDown;
                lineval = lineValDown;
                plusminus.style.color = "red";
                plusminus.textContent = numberWithCommas('-' + +(rand).toFixed(0)) + "%";
            } else {
                let lineValUp = parseFloat((+line.textContent + line.textContent * rand / 100).toFixed(0));
                line.textContent = lineValUp;
                lineval = lineValUp;
                plusminus.style.color = "green";
                plusminus.textContent = numberWithCommas('+' + +(rand).toFixed(0)) + "%";
            }
        }, 1000)

        setTimeout(() => {
            clearInterval(interval, 0)
            console.log(lineval)
            setTimeout(() => {
                trade_btn_get.style.display = "block";
            }, 1200)

            console.log(lineval, cashvalue)
            trade_btn_get.onclick = () => {
                localStorage.setItem("cash", JSON.stringify(cashvalue + lineval));
                location.reload();
            }
        }, select_time.value * 1000 + 1000)
    }
}