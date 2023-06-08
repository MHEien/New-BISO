import axios from 'axios';
import { Attachment } from '../types';

async function generatePurpose(attachmentsArray: Attachment[], eventName?: string) {
  try {
    const url = 'https://api.web.biso.no/generatePurpose';

    const headers = {
      'Content-Type': 'application/json',
    };

    // Map the attachment.description into an array
    const expenses = attachmentsArray.map((attachment) => {
      return attachment.description;
    });

    const payload = {
      attachments: expenses,
      purpose: eventName,
    };

    const response = await axios.post(url, payload, { headers });
    return response.data.purpose;
  } catch (error) {
    console.error(error);
  }
}


export default generatePurpose;
