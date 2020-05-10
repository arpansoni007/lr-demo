let employee = require('./../Models/employeeModel');

/* ------------------------------- Login Page ------------------------------- */

exports.loginPage = async (req,res,next) => {
    return res.render('auth/login.ejs');
}


/* ------------------------------ Login Method ------------------------------ */

exports.login = async (req,res,next) => {
   
    try
    {  

        employee.findOne({email : req.body.email}, (err,data) => {
         
                if(!data)
                { 
                     res.send('No user Found');
                    
                }
                else
                {   
                    if(data.password == req.body.password){
                       
                        req.session.uniqueId = data.uniqueId;
                        res.status(200).render('dashboard.ejs',{'name': data['_doc'].name,'email' : data['_doc'].email,'role': data['_doc'].role,
                        'phone': data['_doc'].phone,'salary' : data['_doc'].salary,'id' : data['_doc']._id});
                       
                    }
                    else
                    {   
                        err = 'Password does not match';
                        res.send('Password does not matchgg');
                    }
                }
        });
        
    }
    catch(err)
    {  res.send('Error');
    }
}



/* --------------------------------- Logout --------------------------------- */

exports.logout = (req,res,next) => {
    console.log('dw',req.session.uniqueId);
  
         if(req.session.uniqueId != undefined)
         {  try
            {
             req.session.destroy(err,response)
               if(response)
                {   console.log('dawd');
                    res.redirect('/');
                }
                else{ console.log('dd');
                    return 'failed';
                };
            }
            catch(err)
            {   console.log('ffffw');
                res.send('Error2');
            }
         } 
         {   console.log('fwwf');
             res.redirect('/');
         }
    }

