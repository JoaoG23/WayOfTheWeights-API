// import 'dotenv/config';


class ServiceSms {

    public enviarMensagem( ) {
        
        const accountSid = process.env.TWILIO_SID;
        const authToken = process.env.TWILIO_TOKEN;
        
        const client = require('twilio')(accountSid, authToken);
        
        client.messages
        .create({
        to: '+55031998684340',
        from: process.env.TWILIO_NUMBER,
        body: 'https://www.luiztools.com.br/post/como-enviar-sms-em-node-js-via-twilio/',
        })
        .then((message:any) => console.log(message))
    }
}

export default new ServiceSms;