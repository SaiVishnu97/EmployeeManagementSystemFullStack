const Express=require('express');
const route=Express.Router();
const multer=require('multer')
const controller=require('../controller/controller');

const services=require('../render/services');

//Code for multer storage initialisation
const storage=multer.diskStorage({
    destination: (req,dest,cb)=>
    {
        cb(null,'Assets/img');
    },
    filename: (req, file, cb) => {
        // Combine the Date in milliseconds and original name and pass as filename
        console.log(file)
        cb(null, `${file.originalname}`);
    }
});
const upload=multer({storage:storage});

route.get('/',services.homeRoutes);
route.get('/adduser',services.adduser);
route.get('/updateuser/',services.updateUser);


route.put('/api/updateuser',upload.single('userImage'),controller.updateRecord);

route.get('/api/users',controller.listUsers);


route.post('/api/addusers',upload.single('userImage'),controller.findbyemail,controller.createRecord);
route.delete('/api/delete',controller.deleteRecord);

module.exports=route