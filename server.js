const cluster = require("cluster");
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3000;
const numberCPUs = require("os").cpus().length;

console.log(`Process ${process.pid} started`);


const main = async () => {
    // Perform set of tasks async.
    for(i = 1; i < 3; i++) {
        console.log(`output ${i}`);
    }
}

if(cluster.isMaster) {
    console.log(`[${process.pid}] Number of CPUs is ${numberCPUs}`);
    console.log(`[${process.pid}] Master process is running`);

    for(i = 0; i < numberCPUs; i++) {
        cluster.fork();
    }
} else {
    console.log(`[${process.pid}] Worker process is running`);
    main()
        .then(() => process.exit(0))
        .catch((err) => {
            console.log(`[${process.pid}] Caught error: ${err}`);
            process.exit(1);
    });
}

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});

