const express = require('express');
const viewController = require('./../controller/viewController');

const router = express.Router();

router.get('/',viewController.getAll);
router.get('/details/:slug',viewController.getOne);
router.post('/details/:slug',viewController.addReview);
// router.get('/compare', viewController.compare);
router.get('/admin/all-product', viewController.authRoute, viewController.admin);
router.get('/admin/delete/:slug', viewController.authRoute, viewController.deleteItem);
router.get('/admin/update/:slug', viewController.authRoute, viewController.updateItemView);
router.post('/admin/update', viewController.authRoute, viewController.updateItem);
router.get('/admin/admin-registration',viewController.authRoute, viewController.reg);
router.post('/admin/admin-registration', viewController.signUp);
router.get('/admin/log-in', viewController.logPanel);
router.post('/admin/log-in', viewController.logIn);
router.get('/admin/log-out', viewController.logOut);
router.get('/admin/add-product',viewController.authRoute,viewController.delUpload);
router.post('/admin/add-product',viewController.authRoute,viewController.upload, viewController.addProduct);


module.exports = router;