export interface EmailData {
  to: string[];
  from?: string;
  cc?: string[];
  subject: string;
  html: string;
  text?: string;
}
