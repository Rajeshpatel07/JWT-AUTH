require('dotenv').config();
const jwtToken=require('jsonwebtoken');

const saferoute=(req,res,next)=>{
    const{jwt}=req.cookies;
    if(jwt){    

        jwtToken.verify(jwt,process.env.SECRET_KEY,(err,decode)=>{
            if(err){
                res.redirect('home')
            }
            else{
                // console.log(decode);
                next();
            }
        })

    }else{
        res.redirect('home')
    }
}

module.exports={saferoute};