function turnonLed(color){
    fetch(`http://localhost:8080/turnon/${color}`).then(
        async (data) => {
            const response = await data.json();
            console.log(response);
        }
    );
}

function turnonSinal(seconds){
    fetch(`http://localhost:8080/turnon-sinal/${seconds}`).then(
        async (data) => {
            const response = await data.json();
            console.log(response);
        }
    );
}

