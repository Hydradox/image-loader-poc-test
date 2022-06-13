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
                let newName = files['photos-input'][i].newFilename;

                renameSync(join(process.cwd(), 'data', files['photos-input'][i].newFilename),
                    join(process.cwd(), 'data', newName.toLowerCase()));
                
                imgParser.createThumbnails(files['photos-input'][i].filepath.replace(files['photos-input'][i].newFilename, newName), newName);
            }
        });
    }
}