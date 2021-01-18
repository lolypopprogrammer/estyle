import { Injectable } from '@nestjs/common';
import * as sgMail from '@sendgrid/mail';
import { EmailData } from '../models/email.interface';

@Injectable()
export class SendGridService {
  private client;

  constructor() {
    this.client = sgMail;
    this.client.setApiKey(process.env.SENDGRID_API_KEY);
  }

  async send(data: EmailData): Promise<any> {
    try {
      await sgMail.send({
        to: data.to,
        from: data.from || process.env.SENDGRID_SENDER,
        cc: data.cc,
        subject: data.subject,
        html: data.html || data.text,
        text: data.text,
      });
      return data;
    } catch (err) {
      console.log(err);
      throw err;
    }
  }
}
