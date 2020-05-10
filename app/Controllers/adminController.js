let employee = require('./../Models/employeeModel');


/* ----------------------------- View Dashboard ----------------------------- */

exports.dashboard = async (req, res, next) => {
    
    employee.find({},(err,data) => {
          if(!data)
          {
              res.redirect('/admin/dashboard');
          }
          else{
              return res.render('admin/dashboard',{'data' : data});
          }
    });
   
}


/* ------------------------------ View Profile ------------------------------ */

exports.profile = async (req, res, next) => {
    try {
        employee.findOne({ unique_id: req.session.uniqueId }, (err, data) => {
            if (data) {
                return res.render('employees/dashboard.ejs', { "data": data });
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
    try{
        const { profileData } = req.body;
        
        if(profileData.phone != '' || profileData.salary != '')
        {
            employee.findOne({unique_id : req.session.uniqueId}, (err,data) => {
                if(!data)
                {
                    res.redirect('/');
                }
                else
                {
                    data.phone = profileData.phone;
                    data.salary = profileData.salary;
                }

            })
        }
        else
        {    err = new Error('Please provide input data');
             res.send(err);
        }
    }
    catch(err)
    {
        res.send(err);
    }
}

/* ------------------------------ Edit Employee ----------------------------- */
exports.editEmployee = async (req,res,next) => {
    let employeeId = req.params.id;
    if(!id)
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


/* ----------------------------- Updae Employee ----------------------------- */

exports.updateEmployee = async (req,res,next) => {
    try{
       const { employeeData } = req.body;
        
        if(employeeData.phone != '' || employeeData.salary != '')
        {
            employee.findOne({_id : req.body.id}, (err,data) => {
                if(!data)
                {
                    res.redirect('/');
                }
                else
                {
                    data.phone = employeeData.phone;
                    data.salary = employeeData.salary;
                }

            })
        }
        else
        {    err = new Error('Please provide input data');
             res.send(err);
        }
    }
    catch(err)
    {
        res.send(err);
    }
}