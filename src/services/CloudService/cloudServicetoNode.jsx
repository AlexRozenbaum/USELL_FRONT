import { API_URL, TOKEN_KEY } from '../../utils/constants/url.constants';


export const upload=async(base64EncodedImage,preset,_id)=> {
        try {
              await fetch(API_URL+'/cloud/api/upload', {
                method: 'POST',
                body: JSON.stringify({ data: base64EncodedImage,preset,_id}),
                headers: {
                     'Content-Type': 'application/json' ,
                     'x-api-key': localStorage[TOKEN_KEY]}
            });
            alert('Image uploaded successfully');
        } catch (err) {
            console.error(err);
            alert('Something went wrong!');
        }
}