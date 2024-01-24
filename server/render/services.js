
const axios=require('axios');

const homeRoutes=async(req,res)=>
{

    const AllRecords=await axios.get('http://localhost:3000/api/users')
   // console.log(AllRecords)
    res.render('index',{AllRecords:AllRecords.data});
    return;
}
const adduser=async(req,res)=>
{
    res.render('adduser')
}
const updateUser=async(req,res)=>
{
    const returnRecord=await axios.get('http://localhost:3000/api/users',{params:{id:req.query.id}});
    //console.log(returnRecord);
    res.render('updateuser',{user:returnRecord.data});
}
module.exports={
    homeRoutes,
    updateUser,
    adduser
}