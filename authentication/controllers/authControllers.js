import { checkPassword, encryptPassword } from "../utils/passwordEncryption.js";
import { User } from "../models/User.js";
import { generateToken } from "../utils/jwtUtil.js";


export const loginUser = async(req,res)=>{

    const email = req.body.email;
    //const encryptedPassword = encryptPassword(req.body.password);

   // console.log(encryptedPassword);

    const data = await User.findOne({where: {email:email}});

    if(!checkPassword(req.body.password, data.dataValues.password)){
        res.status(401).send({'message':'Unauthorized Access'});
    }

    const token = generateToken(data.dataValues.id);

    console.log(token);

    const headers = new Headers({
        'Authorization':`Bearer: ${token}`,
        'Access-Control-Expose-Headers':'Authorization'
    });

    res.setHeaders(headers);

    res.status(200).send({'token':'true'});




}

export const registerUser = async(req,res)=>{

    const registerInfo = req.body;

    delete registerInfo.confirm_password;

    //Encrypting the password
    registerInfo.password = encryptPassword(registerInfo.password);

    //Writing to DB
    let user;
    try{
        user = await User.create(registerInfo);
    }catch(err){
        console.log(err);
    }

    //JWT Authentication
    const token = generateToken(user.dataValues.id);

    const headers = new Headers({
        'Authorization':`Bearer: ${token}`,
        'Access-Control-Expose-Headers':'Authorization'
    })

    res.setHeaders(headers);

    res.status(200).send({'token':'true'});

}