function simulateDelay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function addAfterDelay(a, b, ms) {
    simulateDelay(ms).then(() => {
        const result = a + b;
        console.log(result);
    });
}

addAfterDelay(3, 7, 2000);
