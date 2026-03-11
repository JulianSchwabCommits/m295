async function req(url) {
    try {
        const response = await fetch(url, { method: "DELETE" })
        if (!response.ok) {
            throw new Error(response.status);
        }
        console.log("Erfolgreich");
    }
    catch (error) {
        console.log(error.message);
    }
    finally {
        console.log("Anfrage abgeschlossen");
    }
}
await Promise.all([
    req("https://httpbin.org/delay/1"),
    req("https://httpbin.org/status/403"),
    req("https://httpbin.org/delay/3")
]);

console.log("all done")

