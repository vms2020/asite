(() => {
    
    var from = document.getElementById('from').value;
    if(from === "from"){
        from = 'USD';
    }
    var to = document.getElementById('to').value;
    console.log(`to === ${to} - this is ${to === "to"}`);
    if(to === "to"){
        to = 'GBP';
    }
    const amount = document.getElementById('amount');
    const calculate = document.getElementById('calculate');
    const result = document.getElementById('result');

    console.log(`from: ${from}\nto: ${to}\namount: ${amount.value}\n`);

    const baseUrl = 'https://api.exchangerate.host';

    calculate.addEventListener('click', () => {
        console.log(to);
        
        var u = new URL('convert',baseUrl);
        u.searchParams.append('from',from);
        u.searchParams.append('to',to);
        u.searchParams.append('amount', amount.value ?? 1 );

        fetch(u, { method: 'GET', redirect: 'follow'} )
            .then(response => response.json())
            .then(rejson => {
                if (rejson.success == false) {
                    console.log(JSON.stringify(rejson, null, 8));
                    console.log("FALSE");
                    result.innerHTML = `Result :<br><pre> ${JSON.stringify(rejson, null, 4)} </pre>`;
                } else {
                    console.log(JSON.stringify(rejson, null, 4));
                    console.log("SUCCESS!!!!!!!!");
                    result.innerHTML = `Result : ${rejson.result} ${from} <br><pre> ${JSON.stringify(rejson, null, 4)} </pre>`;

                    //result.innerHTML = `Result : ${rejson.result}`
                }
            })
            .catch(error => console.log('error', error))
    });

    getallpairs.addEventListener('click', () => {
        console.log("getallpairs clicked");
        fetch(new URL('latest',baseUrl))
        .then(b => b.json())
        .then(j => {
            console.log(JSON.stringify(j,null,8));
            result.innerHTML = `Result :<br><pre> ${JSON.stringify(j,null,8)}</pre></br>`;
        });
    });

})();

