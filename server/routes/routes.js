const Express=require('express');
const route=Express.Router();
const controller=require('../controller/controller');

const services=require('../render/services');

route.get('/',services.homeRoutes);
route.get('/adduser',services.adduser);
route.get('/updateuser/',services.updateUser);


route.put('/api/updateuser',controller.updateRecord);

route.get('/api/users',controller.listUsers);


route.post('/api/addusers',controller.createRecord);
route.delete('/api/delete',controller.deleteRecord);

module.exports=route