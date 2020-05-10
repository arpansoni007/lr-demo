const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* ----------------------- Schema for employees table ----------------------- */

const employeeSchema = Schema({
    name : 
    {
        type:String,
        require : true
    },
    email : String,
    city : String,
    phone : Number,
    salary : Number,
    role : Number
});

let employees = mongoose.model('employees',employeeSchema);

module.exports.get = (callback,limit) => {
    employees.find(callback).limit(limit);
}
