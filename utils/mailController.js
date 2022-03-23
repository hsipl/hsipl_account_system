const nodemailer = require('nodemailer')
const mailConfig = require('../config/mail.config')

const transporter = nodemailer.createTransport(mailConfig)

class mailController {
    async sendMail(email, code) {

        try{
            const mail ={
                from: '<HSIPL211@gmail.com>',
                subject: 'Verify acception.',
                to: `${email}`,
                text: `use ${code} to verify.`
            }

            const infor = await transporter.sendMail(mail, (error, info) =>{
                if(error) {
               
                    return console.log(error)
                    
                }
                console.log('123')


            })
     
            console.log("Message sent : %s", infor.messageId)
    
            console.log("Preview URL %s", nodemailer.getTestMessageUrl(infor))
        }

        catch{
            console.log("There is an error.")
        }

    }


}

module.exports = new mailController()