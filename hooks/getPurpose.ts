import axios from 'axios';
import Expenses from '../app/expenses';
import { Attachment } from '../types';

async function generatePurpose(attachmentsArray: Attachment[]) {
    try {
    const url = 'https://api.web.biso.no/generatePurpose';

    const headers = {
        'Content-Type': 'application/json',
    };

    //Map the attachment.description into an array, then JSON
    const expenses = attachmentsArray.map((attachment) => {
        const expense = new Array(attachment.description);
        return expense;
    });

    //Convert expenses to JSON
    const attachments = JSON.stringify(expenses);
    
  
    const response = await axios.post(url, { attachments }, { headers });
    return response.data.purpose;
    } catch (error) {
        console.error(error);
    }
}


export default generatePurpose;
