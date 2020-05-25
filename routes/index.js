const router = require('express').Router();
const employees = require('../app/Models/employeeModel');

router.get('/',(req,res,next) => {
    return res.render('auth/login.ejs');
});


let employeeController = require('../app/Controllers/employeeController');
let adminController = require('../app/Controllers/adminController');
let loginController = require('./../app/Controllers/loginController');
let registerController = require('./../app/Controllers/registerController');
let forgetPasswordController = require('./../app/Controllers/forgetPasswordController');

/* ------------------------ Controller-route binding ------------------------ */



/* ----------------------------- Register Routes ---------------------------- */

router.route('/register')
.get(registerController.registerPage)
.post(registerController.register);

/* ------------------------------Employee  Routes ------------------------------ */
router.route('/login')
 .get(() => {loginController.loginPage})
 .post(loginController.login);


 router.route('/employees/dashboard') 
 .get(() => {employeeController.dashboard});
 
 router.route('/admin/dashboard') 
 .get(() => {adminController.dashboard});

router.route('/employees/:id') 
.get(employeeController.profile)
 .post(employeeController.updateProfile)
 .put(() => {employeeController.updateProfile});
//  .post(employeeController.delete); 




/* ---------------------------- Admin  Routes--------------------------- */

router.route('/admin/login')
.get(loginController.loginPage)
.post(() => {loginController.login});



router.route('/admin/:id?')
.get(adminController.profile)


router.route('/admin/update/:id')
.post(() => {adminController.updateProfile});

router.route('/admin/employee/:id?')
.get(adminController.editEmployee)
.post(adminController.updateEmployee);

/* ------------------------- Forget Password Routes ------------------------- */
router.route('/forget-password/:email?')
.get(() => {forgetPasswordController.fpPage})
.post(() => {forgetPasswordController.forgetPass})
.get(() => {forgetPasswordController.changePassPage})
.post(() => {forgetPasswordController.changePassword});


/* ------------------------------ Logout Route ------------------------------ */
router.route('/logout')
.get(loginController.logout);


module.exports = router;