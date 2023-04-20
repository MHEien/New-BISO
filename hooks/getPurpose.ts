import axios from 'axios';

async function generatePurpose(attachments: string) {
    try {
    const url = 'https://api.web.biso.no/generatePurpose';

    const headers = {
        'Content-Type': 'application/json',
    };
  
    const response = await axios.post(url, { attachments }, { headers });

    return response.data.purpose;
    } catch (error) {
        console.error(error);
    }
}


export default generatePurpose;
