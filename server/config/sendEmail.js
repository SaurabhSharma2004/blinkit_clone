const {Resend} = require('resend');
const dotenv = require('dotenv');
dotenv.config();

if(!process.env.RESEND_API_KEY) {
    throw new Error('Missing RESEND_API_KEY in environment variables');
}

const resend = new Resend(process.env.RESEND_API_KEY);

const sendEmail = async ({to, subject, html}) => {
    try {
        const { data, error } = await resend.emails.send({
            from: 'Blinkit <onboarding@resend.dev>',
            to: to,
            subject: subject,
            html: html,
        });

        if (error) {
            return console.error({ error });
        }

        return data;

    } catch (error) {
        console.error('Error sending email:', error);
        return error;
    }
}

module.exports = sendEmail;