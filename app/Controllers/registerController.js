let employees = require('./../Models/employeeModel');

/* ------------------------------ Register Page ----------------------------- */
exports.registerPage = async (req, res, next) => {

    return res.render('auth/registration.ejs');
}

/* ----------------------------- Register Method ---------------------------- */

exports.register = async (req, res, next) => {

    if (req.body.name == '' || req.body.email == '' || req.body.city == '' || req.body.phone == '' || req.body.salary == '') {
     
        msg = 'Please Provide Neccessary Inputs';
        let err = new Error(msg);
        err.status = 422;
        res.send({
            message: err,
            status: err.status
        });
    }
    else {
       
        if (req.body.password == req.body.passwordConf) {


            employees.findOne({ email: req.body.email }, (err, data) => {
               
                if (!data) {
                    let uId = '';
                    try {
                        employees.findOne({}, (err, data) => {
                           
                            if (data == []) {
                                uId = 1 + 1;
                            }
                            else {
                             
                                uId = 1;
                            }
                         
                            let newUser = new employees({
                                unique_id: uId,
                                name: req.body.name,
                                email: req.body.email,
                                phone: req.body.phone,
                                salary: req.body.salary,
                                role: 2,
                                password: req.body.password,
                                confirm_password: req.body.passwordConf
                            });

                            newUser.save((err, data) => {
                                if (err) {
                                    msg = 'User info save error';
                                    err = new Error(msg);
                                    console.log(err);
                                }
                                else
                                {
                                    console.log('dataee');
                                }
                            })


                        }).sort({ _id: -1 }).limit(1);
                        res.send({ 
                            message: "You are regestered,You can login now.",
                            status: 200
                             });
                    }
                    catch (err) {
                       
                        let msg = 'An Error Occurred';
                        err = new Error(msg);
                        err.status = 400;
                        res.send({
                            message: msg,
                            status: err.status
                        });
                    }

                }
                else {
                  
                    let msg = 'Email Already Exists';
                    let err = new Error(msg);
                    err.status = 409;
                    res.send({
                        message: msg,
                        status: err.status
                    });
                }




            })

        }
        else {
           
            let msg = 'Passwords do not match';
            let err = new Error(msg);
            err.status = 422;
            res.send({
                message: msg,
                status: err.status
            });
        }

    }


}
