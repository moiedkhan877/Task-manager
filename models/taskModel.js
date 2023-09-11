const mongoose = require("mongoose");

const taskmodel = new mongoose.Schema({
    task: String,
    details: String,
    datetask: String,
});

const task = mongoose.model("task",taskmodel);

module.exports = task;