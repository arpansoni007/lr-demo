let employee = require('./../Models/employeeModel');


/* ----------------------------- View Dashboard ----------------------------- */

exports.dashboard = async (req, res, next) => {
    return res.render('employees/index.ejs');
}


/* ------------------------------ View Profile ------------------------------ */

exports.profile = async (req, res, next) => {
    try { 
        employee.findOne({ _id: req.params.id }, (err, data) => {
            if (data) {
               
                return res.render('employees/index.ejs', { "data": data });
            }
            else {
            
                let err = new Error('No user Found');
                res.redirect('/');
            }
        })
        // return res.render('employees/index.ejs');
    }
    catch (err) {
        res.send('Error occured');
    }
}

/* ----------------------------- Update Profile ----------------------------- */

exports.updateProfile = async (req,res,next) => {
    try{ 
        console.log('dwa');
        let {newData} =  req.body;
        if(req.body)
        {  console.log('fefeef');
            employee.findOne({  _id: req.params.id},(err,data) => {
                if(!data)
                {  console.log('ff');
                    res.redirect('/');
                }
                else
                {  
                    let update = employee.update({_id: req.params.id}, req.body);
                    res.status(200).render('dashboard.ejs',{'name': req.body.name,'email' : req.body.email,'role': req.body.role,
                    'phone': req.body.phone,'salary' : req.body.salary,'id' : req.params.id});
                }

            })
        }
        else
        {    let err = new Error('Please provide input data');
             res.send('dwad');
        }
    }
    catch(err)
    {
        res.send('dwadff');
    }
}