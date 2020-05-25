let employee = require('./../Models/employeeModel');


/* ----------------------------- View Dashboard ----------------------------- */

exports.dashboard = (req, res, next) => {
    
    employee.find({},(err,data) => {
          if(!data)
          { console.log('dwa');
              res.redirect('/admin/dashboard');
          }
          else{   console.log('dwad');
              return res.render('admin/dashboard',{'data' : data});
          }
    });
   
}


/* ------------------------------ View Profile ------------------------------ */

exports.profile = async (req, res, next) => {
    try {
        console.log('dwaddd');
        employee.findOne({ _id: req.params.id }, (err, data) => {
            if (data) {
                return res.render('admin/index.ejs', { "data": data });
            }
            else {
                err = new Error('No user Found');
                res.redirect('/');
            }
        })
       
    }
    catch (err) {
        res.send(err);
    }
}

/* ----------------------------- Update Profile ----------------------------- */

exports.updateProfile = async (req,res,next) => {
    console.log("kjj");
    if(req.body.phone != '' || req.body.salary != '')
    {   console.log('dwa',req.params.id);
        employee.findOne({_id : req.params.id}, (err,data) => {
            if(data == null)
            {  console.log('fwfa');
                res.send();
            }
            else
            {    console.log('dddaw');
                data.name = req.body.name;
                data.phone = req.body.phone;
                data.salary = req.body.salary;
                data.city = req.body.city;
                data.save();
                res.render('admin/dashboard.ejs');
            }

        })
    }
    else
    {    console.log('dwad'); 
        err = new Error('Please provide input data');
         res.send(err);
    }

}

/* ------------------------------ Edit Employee ----------------------------- */
exports.editEmployee = (req,res,next) => {
    let employeeId = req.params.id;
   
    if(employeeId)
    { 
        employee.findOne({_id : employeeId}, (err,data) => {
            if(data)
            {
                res.render('admin/editEmployee.ejs',{'data' : data});
            }
            else
            {
                res.send('/admin/dashboard');
            }
        })

    }
    else
    {
        res.send('/admin/dashboard');
    }
}


/* ----------------------------- Update Employee ----------------------------- */

exports.updateEmployee = (req,res,next) => {
  
        if(req.body.phone != '' || req.body.salary != '')
        {   console.log('dwa',req.params.id);
            employee.findOne({_id : req.params.id}, (err,data) => {
                if(data == null)
                {  console.log('fwfa');
                    res.send();
                }
                else
                {    console.log('dddaw');
                    data.name = req.body.name;
                    data.phone = req.body.phone;
                    data.salary = req.body.salary;
                    data.city = req.body.city;
                    data.save();
                    res.render('admin/dashboard.ejs');
                }

            })
        }
        else
        {    console.log('dwad'); 
            err = new Error('Please provide input data');
             res.send(err);
        }
}



