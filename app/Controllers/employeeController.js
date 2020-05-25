let employee = require('./../Models/employeeModel');


/* ----------------------------- View Dashboard ----------------------------- */

exports.dashboard = async (req, res, next) => {
    return res.render('employees/index.ejs');
}


/* ------------------------------ View Profile ------------------------------ */

exports.profile = async (req, res, next) => {
    
        employee.findOne({ _id: req.params.id }, (err, data) => {
            if (data) {
               
                return res.render('employees/index.ejs', { "data": data });
            }
            else {
            
                let err = new Error('No user Found');
                res.redirect('/');
            }
        })
    
}

/* ----------------------------- Update Profile ----------------------------- */

exports.updateProfile = async (req,res,next) => {
    try{ 
        
        let {newData} =  req.body;
        if(req.body)
        {  console.log('fefeef');
            employee.findOne({  _id: req.params.id},(err,data) => {
                if(!data)
                { console.log('kjk');
                    res.redirect('/');
                }
                else
                {  console.log('jhjh');
                    let update = employee.findById({_id: req.params.id},(err,data)=>{ 
                         data.name = req.body.name;
                         data.phone = req.body.phone;
                         data.salary = req.body.salary;
                         data.city = req.body.city;
                         data.save();
                    res.render('dashboard.ejs',{'name': req.body.name,'email' : req.body.email,'role': req.body.role,
                    'phone': req.body.phone,'salary' : req.body.salary,'id' : req.params.id});
                    });

            }
            });
        }
        else
        {    let err = new Error('Please provide input data');
             res.send(err);
        }
    }
    catch(err)
    {
        res.send(err);
    }
}