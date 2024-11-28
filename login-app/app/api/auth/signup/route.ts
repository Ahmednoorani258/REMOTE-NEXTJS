import { connect } from "@/app/dbConfig/dbConfig";
import User from "@/app/models/userModel";
import bcryptjs from "bcryptjs"
import{NextRequest,NextResponse} from "next/server"
import { sendEmail } from "@/app/utils/mailer";

connect()

export async function POST (req:NextRequest){
    try {
        const reqBody =await req.json()
        const {username,email,password}= reqBody
        console.log(reqBody);

        const user = await User.findOne({email})
        if (user){
            return NextResponse.json({error:'user already exists'},{status:400})
        } 
        
        const salt = await bcryptjs.genSaltSync(10)
        const hashedpass = await bcryptjs.hash(password,salt)
        
        const newuser = new User({
            username,
            email,
            password: hashedpass
        }) 
        const savedUser = await newuser.save()
        console.log(savedUser)

        //send verification email
        await sendEmail({email,emailType:"VERIFY",userId:savedUser._id})

        return NextResponse.json({
            message:'user register Succesfully',
            success:true,
            savedUser 
        })

    } catch (error:any) {
        return NextResponse.json({error:error.message},{status:500})
    }
}