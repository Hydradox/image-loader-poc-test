// Import modules
import { join } from 'path';
import imgParser from './image-parser.js';
import { renameSync } from 'fs';


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

                let filename = files['photos-input'][i].newFilename.split('.');
                let ext = filename.pop();
                filename = filename.join('.');
                
                // Rename file
                let name = filename + '.' + ext.toLowerCase();

                renameSync(join(process.cwd(), 'data', files['photos-input'][i].newFilename),
                    join(process.cwd(), 'data', files['photos-input'][i].newFilename.toLowerCase()));
                
                imgParser.createThumbnails(files['photos-input'][i].filepath, files['photos-input'][i].newFilename.toLowerCase());
            }
        });
    }
}