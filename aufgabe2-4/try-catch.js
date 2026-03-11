async function req() {
    try {
        const response = await fetch("https://httpbin.org/status/403", { method: "DELETE" })
        if (!response.ok) {
            throw new Error(response.status);
        }

    }
    catch (error) {
        console.log(error.message);

    }
    finally {
        console.log("Anfrage abgeschlossen");
    }
}
req();

