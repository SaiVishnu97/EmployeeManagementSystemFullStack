const mongoose=require('mongoose')


const empSchema=new mongoose.Schema(
    {
        EmpId: {
            type: Number,
            unique: true
        },
        FullName:{
            type: String,
            required: true
        },
        EmailId:
        {
            type: String,
            required: true,
            unique: true
        },
        Gender: 
        {
            type: String,
            default: 'Unspecified',
            enum: ['male', 'female','Unspecified']
        },
        Imagefile: String,
        Status:
        {
            type: String,
            required: true,
            enum: ['active', 'inactive']
        }
    }
)
empSchema.pre('save', async function (next) {
    if (!this.EmpId) {
        const lastEmployee = await this.constructor.findOne({}, {}, { sort: { EmpId: -1 } });
        this.EmpId = lastEmployee ? lastEmployee.EmpId + 100 : 100;
        console.log(this.Imagefile.split('.').at(-1));
        this.Imagefile='EmpID'+this.EmpId+'.'+this.Imagefile.split('.').at(-1);
    }
    next();
});
module.exports=mongoose.model('EmployeeDetails',empSchema,'EmployeeDetails')