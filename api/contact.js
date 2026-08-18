const nodemailer = require("nodemailer");

export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({
            message: "Methode nicht erlaubt"
        });
    }

    try {
        const { name, company, email, phone, message } = req.body;

        if (!name || !email || !message) {
            return res.status(400).json({
                message: "Bitte Name, E-Mail und Nachricht ausfüllen."
            });
        }

        const transporter = nodemailer.createTransport({
            host: process.env.SMTP_HOST,
            port: Number(process.env.SMTP_PORT),
            secure: true,
            auth: {
                user: process.env.SMTP_USER,
                pass: process.env.SMTP_PASSWORD
            }
        });

        await transporter.sendMail({
            from: process.env.SMTP_USER,
            to: "ahoi@spielhafen.ch",
            replyTo: email,
            subject: `Neue Kontaktanfrage von ${name}`,
            text: `
Neue Kontaktanfrage über spielhafen.ch

Name: ${name}
Unternehmen: ${company || "-"}
E-Mail: ${email}
Telefon: ${phone || "-"}

Nachricht:
${message}
            `
        });

        return res.status(200).json({
            message: "Nachricht erfolgreich gesendet."
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Die Nachricht konnte nicht gesendet werden."
        });
    }
}