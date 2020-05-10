const router = require('express').Router();
const employees = require('../app/Models/employeeModel');

router.get('/',(req,res,next) => {
    return res.render('employees/index.ejs');
});


let employeeController = require('../app/Controllers/employeeController');
let adminController = require('../app/Controllers/adminController');

/* ------------------------ Controller-route binding ------------------------ */

/* ---------------------------- employees routes ---------------------------- */

/* ----------------------------- Register Routes ---------------------------- */

router.route('/register')
.get(employeeController.registerPage)
.post(employeeController.register);

/* ------------------------------Employee Login Routes ------------------------------ */
router.route('/login')
 .get(employeeController.loginPage)
 .post(employeeController.login);


 router.route('/employees') 
 .get(employeeController.index);


router.route('/employees/:id?') 
 .get(employeeController.dashboard)
 .get(employeeController.profile)
 .put(employeeController.profileUpdate)
 .patch(employeeController.profileUpdate)
//  .post(employeeController.delete); 




/* ---------------------------- Admin Login Route --------------------------- */

router.route('/admin/login')
.get(adminController.loginPage)
.post(adminController.login)
.get(adminController.dashboard)
.get(adminController.listEmployee)
.get(adminController.editEmployee)

/* ------------------------------ Admin routes ------------------------------ */

router.route('/admin/:id?')
.get(adminController.profile)
.post(adminController.profileUpdate)
.put(adminController.updateEmployee);

/* ------------------------------ Logout Routes ------------------------------ */
router.route('/logout')
.get(adminController.logout)


exports.router = router;