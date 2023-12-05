require('dotenv').config();
const mongoose=require('mongoose');

//validator validate the email..
const {isEmail}=require('validator');
const bcrypt=require('bcrypt');

mongoose.connect(process.env.URL);


const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:[true,'Please Enter email'],
        unique:true,
        lowercase:true,
        validate:[isEmail,'Please Enter a valid email.']
    },
    password:{
        type:String,
        required:[true,'Please enter password'],
        minlength:[6,'Please enter more than 6 letters']
    }
})


//using function keyword is for accessing this -->referes to the user info object
//It will run before the user is saved.
userSchema.pre('save',async function(next){
    this.password=await bcrypt.hash(this.password,10);
    next();
})

//It will run After the user is saved.
userSchema.statics.login = async function(email, password) {
    const userdata = await this.findOne({ email });
    if (userdata) {
      const userpass = await bcrypt.compare(password, userdata.password);
      if (userpass) {
        return userdata;
      }
      throw Error('Incorrect Password');
    //   console.log(userdata);

    }
    throw Error('The Email is not Registered');
  };




module.exports=new mongoose.model('user',userSchema);