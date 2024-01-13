let line = document.getElementById("line");
let cash = document.getElementById("cash");
let trade_input = document.getElementById("trade_amount");
let trade_btn = document.getElementById("trade_btn");
let trade_form = document.getElementById("trade_form");
let warn = document.getElementById("warn");
let plusminus = document.getElementById("plusminus");
let btn_stop = document.getElementById("trade_btn_stop");
let trade_btn_get = document.getElementById("trade_btn_get");

let getCash = JSON.parse(localStorage.getItem("cash"));
if (!getCash | +getCash <= 0) {
    getCash = 100;
}
let storageCash = localStorage.setItem("cash", getCash);

// console.log(+getCash)
cash.textContent = Number(getCash).toFixed(2);

// line.textContent = randline;
trade_form.onsubmit = (e) => {
    e.preventDefault();
    if (trade_input.value > getCash) {
        warn.textContent = "you don't have enough money";
        setTimeout(() => {
            warn.textContent = null;
        }, 2500)
    } else if (trade_input.value == 0) {
        warn.textContent = "you cannot trade with 0";
        setTimeout(() => {
            warn.textContent = null;
        }, 2500)
    } else {
        line.textContent = trade_input.value;
        localStorage.setItem("cash", JSON.stringify(+getCash - (+trade_input.value)));
        cash.textContent = (+getCash - +trade_input.value).toFixed(2);

        trade_btn.style.display = "none";
        btn_stop.style.display = "block";
        let interval = setInterval(function () {
            // console.log('nimadir');
            let randline = Math.floor(Math.random() * 10000);
            let rand = Number((Math.random() * (40 - 1 + 1)) + 1);
            if (randline % 2 !== 0) {
                let lineValDown = parseFloat((+line.textContent - line.textContent * rand / 100).toFixed(2));
                line.textContent = lineValDown;
                plusminus.style.color = "red";
                plusminus.textContent = '-' + +(rand).toFixed(2) + "%";
            } else {
                let lineValUp = parseFloat((+line.textContent + line.textContent * rand / 100).toFixed(2));
                line.textContent = lineValUp;
                plusminus.style.color = "green";
                plusminus.textContent = '+' + +(rand).toFixed(2) + "%";
            }
        }, 1000)

        btn_stop.onclick = () => {
            btn_stop.style.display = "none";
            clearInterval(interval, 0);
            trade_btn_get.style.display = "block";

            trade_btn_get.onclick = () => {
                // 
                localStorage.setItem("cash", JSON.stringify(+cash.textContent + +line.textContent));
                // console.log(+line.textContent);
                location.reload();
            }
        }
    }
}