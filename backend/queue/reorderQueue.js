const { Queue } = require("bullmq");


const connection = {
    host: "localhost",
    port: 6379
};


const reorderQueue = new Queue(
    "reorder-processing",
    {
        connection
    }
);


module.exports = reorderQueue;