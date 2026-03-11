async function req() {
    fetch("https://httpbin.org/status/500", { method: "DELETE" })
        .then(response => {
            if (!response.ok) {
                throw new Error(response.status);
            }
            return response.text();
        })
        .catch(error => {
            console.log(error.message);
        })
        .finally(() => {
            console.log("Anfrage abgeschlossen");
        });
}

req();