
const empModel=require('../model/model')

const createRecord=async (req,res)=>
{
    const {body}=req;
    if(!req.body){
        res.status(400).send({ message : "Content can not be emtpy!"});
        return;
    }
    try
    {
        const newRecord=new empModel({
            FullName:body.fullname,
            EmailId:body.emailid,
            Status:body.status,
            Gender:body.gender})
        await newRecord.save();
        res.redirect("/")
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
    res.json({message:"Data deletion successful"})
}
module.exports={
    createRecord,
    listUsers,
    findbyEmpId,
    updateRecord,
    deleteRecord
}