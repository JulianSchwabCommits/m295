async function req(url) {
    try {
        const response = await fetch(url, { method: "DELETE" })
        if (!response.ok) {
            throw new Error(response.status);
        }
        console.log("Erfolgreich");
        return true;
    }
    catch (error) {
        console.log(error.message);
        return false;
    }
    finally {
        console.log("done");
    }
}

async function fetchWithRetry(url, retry) {
    for (let i = 0; i < retry; i++) {
        console.log("try: " + i.toString() + " of url " + url);
        const success = await req(url);

        if (success) return;

    }
};
await Promise.all([
    fetchWithRetry("https://httpbin.org/delay/1", 3),
    fetchWithRetry("https://httpbin.org/status/403", 3),
    fetchWithRetry("https://httpbin.org/delay/3", 3)
]);

console.log("all done")


