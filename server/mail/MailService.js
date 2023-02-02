import nodemailer from 'nodemailer'

class MailService {
	constructor() {
		this.transporter = nodemailer.createTransport({
			host: process.env.SMTP_HOST,
			port: process.env.SMTP_PORT,
			secure: false,
			auth: {
				user: process.env.SMTP_USER,
				pass: process.env.SMTP_PASSWORD,
			}
		})
	}

	async sendActivationMail(to, link) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject: 'Активация' + ' ' + process.env.API_URL,
			text: '',
			html: `
			<div>
			<h1>Подтвердите регистрацию</h1>
			<h5>перейдите по ссылке</h5>
			<a href="${link}">${link}</a>
			</div>
			`
		})
	}

	async sendActivationLogin(to, link) {
		await this.transporter.sendMail({
			from: process.env.SMTP_USER,
			to,
			subject: 'Активация' + ' ' + process.env.API_URL,
			text: '',
			html: `
			<div>
			<h1>Подтвердите смену пароля</h1>
			<h5>перейдите по ссылке</h5>
			<a href="${link}">${link}</a>
			</div>
			`
		})
	}
}
export const mailService = new MailService()