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


 router.route('/employees') 
 .get(() => {employeeController.dashboard});
 


router.route('/employees/:id') 
.get(employeeController.profile)
 .post(employeeController.updateProfile)
 .put(() => {employeeController.updateProfile});
//  .post(employeeController.delete); 




/* ---------------------------- Admin  Routes--------------------------- */

router.route('/admin/login')
.get(() => {loginController.loginPage})
.post(() => {loginController.login});



router.route('/admin/:id?')
.get(() => {adminController.dashboard})
.get(() => {adminController.editEmployee})
.put(() => {adminController.updateEmployee})
.get(() => {adminController.profile})
.post(() => {adminController.profileUpdate});


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