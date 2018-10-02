const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const taskSchema = new Schema({});
const userSchema = new Schema({});

const task= mongoose.model('tasks', taskSchema);
const user = mongoose.model('users',userSchema);

module.exports={
    'Task':task,'User':user
}






