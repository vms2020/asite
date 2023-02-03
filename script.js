(() => {

    const from = document.getElementById('from');
    const to = document.getElementById('to');
    const amount = document.getElementById('amount');
    const calculate = document.getElementById('calculate');
    const result = document.getElementById('result');

    console.log(`from: ${from.value}\nto: ${to.value}\namount: ${amount.value}\n`);

    const baseUrl = 'https://api.exchangerate.host';

    fetch(new URL('symbols', baseUrl))
        .then(response => response.json())
        .then(rjson => {
            if (rjson.success == true) {
                console.log("for loop will be next");
                for (const symb in rjson.symbols) {
                    console.log(`${symb} ${rjson.symbols[symb].description} ${rjson.symbols[symb].code}`);
                    var optfrom = document.createElement("option");
                    var optto = document.createElement("option");
                    optfrom.value = rjson.symbols[symb].code;
                    optto.value = rjson.symbols[symb].code;
                    optfrom.innerHTML =  "(" + symb + ") : " + rjson.symbols[symb].description ;
                    optto.innerHTML =  "(" + symb + ") : " + rjson.symbols[symb].description ;
                    to.appendChild(optfrom);
                    from.appendChild(optto); 
                };
            }
            //console.log("==================================");
            //console.log(JSON.stringify(rjson,null,8));
        });

    calculate.addEventListener('click', () => {
        var u = new URL('convert', baseUrl);
        u.searchParams.append('from', from.value === 'from' ? 'USD' : from.value);
        u.searchParams.append('to', to.value === 'to' ? 'GBP' : to.value);
        u.searchParams.append('amount', amount.value || 1);

        fetch(u, { method: 'GET', redirect: 'follow' })
            .then(response => response.json())
            .then(rejson => {
                if (rejson.success == false) {
                    console.log(JSON.stringify(rejson, null, 8));
                    console.log("FALSE");
                    result.innerHTML = `Result :<br><pre> ${JSON.stringify(rejson, null, 4)} </pre>`;
                } else {
                    console.log(JSON.stringify(rejson, null, 4));
                    console.log("SUCCESS!!!!!!!!");
                    document.getElementById('textresult').innerHTML =  `Result : ${rejson.result} ${from.value === 'from' ? 'USD' : from.value}`;
                    result.innerHTML = `Result : ${rejson.result} ${from.value === 'from' ? 'USD' : from.value} <br><pre> ${JSON.stringify(rejson, null, 4)} </pre>`;

                    //result.innerHTML = `Result : ${rejson.result}`
                }
            })
            .catch(error => console.log('error', error))
    });

    getallpairs.addEventListener('click', () => {
        console.log("getallpairs clicked");
        fetch(new URL('latest', baseUrl))
            .then(b => b.json())
            .then(j => {
                console.log(JSON.stringify(j, null, 8));
                result.innerHTML = `Result :<br><pre> ${JSON.stringify(j, null, 8)}</pre></br>`;
            });
    });

})();

