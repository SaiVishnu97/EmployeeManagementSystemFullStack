
const axios=require('axios');
const MAIN_URL=process.env.MAIN_URL;

const homeRoutes=async(req,res)=>
{

    const AllRecords=await axios.get('http://localhost:3000/api/users')
   // console.log(AllRecords)
    res.render('index',{AllRecords:AllRecords.data,MAIN_URL: MAIN_URL });
    return;
}
const adduser=async(req,res)=>
{
    res.render('adduser',{MAIN_URL: MAIN_URL })
}
const updateUser=async(req,res)=>
{
    const returnRecord=await axios.get('http://localhost:3000/api/users',{params:{id:req.query.id}});
    //console.log(returnRecord);
    res.render('updateuser',{user:returnRecord.data,MAIN_URL: MAIN_URL });
}
module.exports={
    homeRoutes,
    updateUser,
    adduser
}