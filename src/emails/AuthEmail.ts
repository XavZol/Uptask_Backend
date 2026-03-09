import { transporter } from "../config/nodemailer";
import path from "path";

interface IEmail {
    email: string;
    name: string;
    token: string;
}

export class AuthEmail {
    // Definimos los colores base para mantener consistencia
    private static brandColors = {
        bgDark: '#1e293b',    // Fondo oscuro
        primary: '#c026d3',   // Color fucsia del botón
        white: '#ffffff',
        text: '#334155',
        textLight: '#94a3b8'
    };

    // Plantilla base para evitar repetir el HTML del diseño
    private static createEmailTemplate(title: string, content: string) {
        return `
            <div style="background-color: ${this.brandColors.bgDark}; padding: 40px 20px; font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;">
                <div style="max-width: 600px; margin: 0 auto; text-align: center;">
                    
                    <h1 style="color: ${this.brandColors.white}; font-size: 32px; letter-spacing: 1px; margin-bottom: 30px;">
                        up<span style="color: ${this.brandColors.primary};">task</span>
                    </h1>

                    <div style="background-color: ${this.brandColors.white}; padding: 40px; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); text-align: left;">
                        ${content}
                    </div>

                    <div style="margin-top: 20px; color: ${this.brandColors.textLight}; font-size: 12px; text-align: center;">
                        <p>© ${new Date().getFullYear()} UpTask. Todos los derechos reservados.</p>
                        <p>Si no solicitaste este correo, puedes ignorarlo de forma segura.</p>
                    </div>

                </div>
            </div>
        `;
    }

    static sendConfirmationEmail = async (user: IEmail) => {
        const content = `
            <h2 style="color: ${this.brandColors.text}; margin-top: 0;">¡Hola ${user.name}!</h2>
            <p style="color: ${this.brandColors.text}; font-size: 16px; line-height: 1.5;">
                Has creado tu cuenta en <strong>UpTask</strong>. Ya casi está todo listo, solo debes confirmar tu cuenta haciendo clic en el siguiente botón:
            </p>
            
            <div style="text-align: center; margin: 35px 0;">
                <a href="${process.env.FRONTEND_URL}/auth/confirm-account" 
                    style="background-color: ${this.brandColors.primary}; color: ${this.brandColors.white}; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; display: inline-block;">
                    Confirmar mi cuenta
                </a>
            </div>

            <p style="color: ${this.brandColors.text}; font-size: 16px;">
                O si lo prefieres, ingresa el siguiente código de confirmación:
            </p>
            <div style="background-color: #f1f5f9; padding: 15px; text-align: center; border-radius: 6px; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: ${this.brandColors.text}; margin: 20px 0;">
                ${user.token}
            </div>
            
            <p style="color: #ef4444; font-size: 14px;"><em>⚠️ Este token expira en 10 minutos.</em></p>
        `;

        // Ruta absoluta y segura usando process.cwd()
        const pdfPath = path.join(process.cwd(), 'public', 'Prueba.pdf');
        console.log("Intentando adjuntar el PDF de confirmación desde:", pdfPath);

        const info = await transporter.sendMail({
            from: 'UpTask <admin@uptask.com>',
            to: user.email,
            subject: 'UpTask - Confirma tu cuenta',
            text: `Hola ${user.name}, confirma tu cuenta en UpTask. Tu código es: ${user.token}`,
            html: this.createEmailTemplate('Confirma tu cuenta', content),
            attachments: [
                {
                    filename: 'Prueba.pdf',
                    path: pdfPath,
                    contentType: 'application/pdf'
                }
            ]
        });

        console.log(`Mensaje enviado: ${info.messageId}`);
    }

    static sendPasswordResetToken = async (user: IEmail) => {
        const content = `
            <h2 style="color: ${this.brandColors.text}; margin-top: 0;">Hola ${user.name}</h2>
            <p style="color: ${this.brandColors.text}; font-size: 16px; line-height: 1.5;">
                Has solicitado reestablecer tu password en <strong>UpTask</strong>. Haz clic en el siguiente botón para crear uno nuevo:
            </p>
            
            <div style="text-align: center; margin: 35px 0;">
                <a href="${process.env.FRONTEND_URL}/auth/new-password" 
                    style="background-color: ${this.brandColors.primary}; color: ${this.brandColors.white}; padding: 14px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; display: inline-block;">
                    Reestablecer Password
                </a>
            </div>

            <p style="color: ${this.brandColors.text}; font-size: 16px;">
                O ingresa el siguiente código en la aplicación:
            </p>
            <div style="background-color: #f1f5f9; padding: 15px; text-align: center; border-radius: 6px; font-size: 24px; font-weight: bold; letter-spacing: 5px; color: ${this.brandColors.text}; margin: 20px 0;">
                ${user.token}
            </div>
            
            <p style="color: #ef4444; font-size: 14px;"><em>⚠️ Este token expira en 10 minutos.</em></p>
        `;

        // Ruta absoluta y segura usando process.cwd()
        const pdfPath = path.join(process.cwd(), 'public', 'Prueba.pdf');
        console.log("Intentando adjuntar el PDF de reset de password desde:", pdfPath);

        const info = await transporter.sendMail({
            from: 'UpTask <admin@uptask.com>',
            to: user.email,
            subject: 'UpTask - Reestablece tu Password',
            text: `Hola ${user.name}, reestablece tu password en UpTask. Tu código es: ${user.token}`,
            html: this.createEmailTemplate('Reestablece tu Password', content),
            attachments: [
                {
                    filename: 'Prueba.pdf',
                    path: pdfPath,
                    contentType: 'application/pdf'
                }
            ]
        });

        console.log(`Mensaje enviado: ${info.messageId}`);
    }
}