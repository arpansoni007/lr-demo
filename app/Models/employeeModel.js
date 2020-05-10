const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/* ----------------------- Schema for employees table ----------------------- */

const employeeSchema = Schema({
    unique_id : Number,
    name : 
    {
        type:String,
        require : true
    },
    email : String,
    city : String,
    phone : Number,
    salary : Number,
    role : Number,
    password : String,
    confirm_password :String

});

let employees = mongoose.model('employees',employeeSchema);

module.exports = employees;
