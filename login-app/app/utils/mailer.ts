import { Verify } from "crypto";
import nodemailer from "nodemailer"
import User from "../models/userModel";
import bcryptjs from "bcryptjs"


export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    const hashtoken = await bcryptjs.hash(userId.toString(), 10)
    if (emailType === 'VERIFY') {
      await User.findByIdAndUpdate(userId
        , { VerifyToken: hashtoken, VerifyTokenExpiry: Date.now() + 3600000 })
    }else if(emailType === "RESET"){
      await User.findByIdAndUpdate(userId
        , { forgotPasswordToken: hashtoken, forgotPasswordTokenExpiry: Date.now() + 3600000 }) 
    }

    var transport = nodemailer.createTransport({
      host: "live.smtp.mailtrap.io",
      port: 587,
      auth: {
        user: "api",
        pass: "159d7262ecd99a55b5fda49c244a21b2"
      }
    });

    const mailOptions = {
      from: 'abc@gmail.com', // sender address
      to: email, // list of receivers
      subject: emailType === 'VERIFY' ? 'Verify your Email' : 'Reset Password', // Subject line
      html: `<p>Click <a href="${process.env.DOMAIN}/verifyemail?token=${hashtoken}">here</a> to ${emailType === "VERIFY" ? "Verify Your Email":"Reset Your Password"} or copy and paste the link below in your browser
      <br>${process.env.DOMAIN}/verifyemail?=${hashtoken}
      </p>`, // html body
    }

    const mailResponse = await transport.sendMail(mailOptions)

    return mailResponse
  } catch (error: any) {
    throw new Error(error.message)
  }
}