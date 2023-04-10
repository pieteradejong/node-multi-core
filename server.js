const cluster = require("cluster");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const numberCPUs = require("os").cpus().length;

console.log(`Process ${process.pid} started`);

if(cluster.isMaster) {
    console.log(`Number of CPUs is ${numberCPUs}`);
    console.log(`Master process ${process.pid} is running`);
} else {
    console.log(`Number of CPUs is ${numberCPUs}`);
    console.log(`Worker process ${process.pid} is running`);
}

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

