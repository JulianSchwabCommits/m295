function double(value, callback) {
    const result = value * 2
    callback(result);
}

double(5, function (result) {
    console.log(result);
});