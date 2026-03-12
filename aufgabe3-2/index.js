import fs from "fs"
import express from "express"
const app = express();
const port = 3005;


async function getWeather(zip) {
    const url = `https://app-prod-ws.meteoswiss-app.ch/v1/plzDetail?plz=${zip}00`;
    try {
        const response = await fetch(url);
        if (response.status !== 200) {
            console.error(response.status);
        }
        else {
            const data = await response.json();
            console.log(data);
            return data;
        }
    } catch (error) {
        console.error(error);
    }
}



function locationToZip(location) {
    const filePath = "/home/taascjun/m295/location-plz.csv";
    const data = fs.readFileSync(filePath, "utf8");
    const lines = data.split("\n");
    for (let i = 1; i < lines.length; i++) {
        const cols = lines[i].split(";");
        const ort = cols[0];
        const zip = cols[1];

        if (ort === location) {
            return zip;
        }
    }

    throw new Error(`Location "${location}" not found`);
}

app.get('/weather/:location', async (req, response) => {
    try {
        const zip = locationToZip(req.params.location);
        let output = await getWeather(zip);
        response.send(output);
    }
    catch {
        response.send("Error")
    }


});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

