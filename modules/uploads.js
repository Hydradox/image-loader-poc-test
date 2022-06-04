// Import modules
import { join } from 'path';
import imgParser from './image-parser.js';


// Import NPM modules
import { IncomingForm } from "formidable";




export default {
    upload: (req, res) => {
        const form = new IncomingForm({
            keepExtensions: true,
            maxFileSize: 500 * 1024 * 1024, // 500 MB
            multiples: true,
            uploadDir: join(process.cwd(), 'data')
        });




        form.parse(req, (error, fields, files) => {

            // Iterate through all photos
            for(let i = 0; i < files['photos-input'].length; i++) {
                console.log(i + 1, ':', files['photos-input'][i].originalFilename);
                imgParser.createThumbnails(files['photos-input'][i].filepath, files['photos-input'][i].newFilename);
            }
        });
    }
}