import nodemailer from "nodemailer";
import bcrypt from "bcrypt";
import User from "@/Models/usermodel";

export const sendEmail = async ({ email, userId, emailtype }: any) => {
  try {
    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailtype == "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verificationToken: hashedToken,
        verificationExpires: Date.now() + 3600000,
      });
    } else if(emailtype == "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotpasswordToken: hashedToken,
        forgotpasswordTokenExpires: Date.now() + 3600000,
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    var transporter = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "0eb4b399b08687",
        pass: "22a9f2ccd19499",
      },
    });

    const info = await transporter.sendMail({
      from: "nandishbt2001@gmail.com",
      to: email,
      subject:
        emailtype === "VERIFY" ? "verify the email" : "reset forgot password",
      html: `<p> Click  <a href="${process.env.DOMAIN_NAME}/verify?token=${hashedToken}">Here </a> to ${
        emailtype == "VERIFY" ? "To verify your email" : "to reset your  password"
      }
       </p>`,
    });

    return info;
  } catch (error) {
    console.log(error);
  }
};
