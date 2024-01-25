
const empModel=require('../model/model')
const fs=require('fs');
const path=require('path');

const findbyemail=async (req,res,next)=>{
    const EmailId=req.body.emailid;
    console.log("Middleware is called");
    const resultboolean=await empModel.exists({EmailId});
    console.log(EmailId,resultboolean);
    if(resultboolean)
    {
        fs.unlinkSync(req.file.path);
        return res.status(400).send({ message: "This email is already present. Please enter a new email ID." });
       
    }
    next();
}
const createRecord=async (req,res)=>
{
    const {body}=req;
    console.log("File: ", req.file);
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
    const pathdirs=path.dirname(req.file.path);
    const ext=(req.file.originalname).split('.')[1];
    
    try
    {
        const newRecord=new empModel({
            FullName:body.fullname,
            EmailId:body.emailid,
            Status:body.status,
            Gender:body.gender,
            Imagefile:"Sample."+ext,
        })
        await newRecord.save();
        console.log(newRecord);
        let newfilename=path.join(pathdirs,'EmpID'+newRecord.EmpId+'.'+ext);
        console.log(newfilename);
        fs.renameSync(req.file.path,newfilename)
        res.redirect("/");
    }
    catch(err)
    {
        console.log(err)
    }
}
const listUsers=async (req,res)=>
{
    if(req.query.id)
    {
        const resultrecord=await findbyEmpId(req.query.id);
        res.send(resultrecord);
        return;
    }
    const AllRecords=await empModel.find();
    //console.log(AllRecords)
    res.send(AllRecords);
}
const findbyEmpId=async(empid)=>
{
    const resrecord=await empModel.findOne({EmpId:empid})
    return resrecord;
}
const updateRecord= (req,res)=>
{
    const {body}=req;
    const updatedRecord= {
        FullName: body.fullname,
        EmailId: body.emailid,
        Gender: body.gender,
        Status: body.status
    }
   const UpdateStatus= empModel.updateOne({EmpId:body.empId},{$set:updatedRecord}).exec()

   UpdateStatus.then(result => {
    console.log('Document updated successfully:', result);
  })
  .catch(err => {
    console.error('Error updating document:', err);
  });

      res.json(body)
}

const deleteRecord=(req,res)=>
{
    const EmpId=req.query.empId;
    empModel.deleteOne({ EmpId }).then(function(){
       
        console.log("Data deleted"); // Success
    }).catch(function(error){
        console.log(error); // Failure
    });
    fs.unlinkSync('Assets/img/EmpID'+EmpId+'.jpeg');
    res.json({message:"Data deletion successful"})
}
module.exports={
    createRecord,
    listUsers,
    findbyEmpId,
    updateRecord,
    deleteRecord,
    findbyemail
}