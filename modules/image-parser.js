// Import NPM modules
import sharp from 'sharp';

// Import modules
import { join, sep } from 'path';
import { mkdirSync, writeFile } from 'fs';




export default {
    createThumbnails: (route, name) => {

        // Get directory of file
        let dir = route.substring(0, join(route).lastIndexOf(sep));
        name = name.substring(0, name.lastIndexOf('.'));
        console.log('DIR::', dir);
        console.log('Name::', name);


        // Create thumbnails folder if it doesn't exist
        mkdirSync(join(dir, '.thumbnails'), { recursive: true });

        mkdirSync(join(dir, '.thumbnails', '.grid'), { recursive: true });
        mkdirSync(join(dir, '.thumbnails', '.fullscreen'), { recursive: true });


        sharp(route)
        .metadata()
        .then(metadata => {
            console.log('Metadata::', metadata);


            // Create grid
            sharp(route)
                .resize({
                    width: 300,
                    height: 300,
                    fit: 'cover',
                })
                .webp({
                    quality: 20,
                    alphaQuality: 20,
                    effort: 3
                })
                .toFile(join(dir, '.thumbnails', '.grid', name + '.jpg'));

            
            // Create fullscreen
            if(metadata.hasAlpha) {
                // PNG
                sharp(route)
                    .resize({
                        width: (metadata.width < 1500 ? metadata.width : 1500),
                        height: (metadata.height < 1500 ? metadata.height : 1500),
                        fit: 'inside',
                    })
                    .png({
                        quality: 60
                    })
                    .toBuffer()
                    .then(data => {
                        writeFile(join(dir, '.thumbnails', '.fullscreen', '.' + name + '.png'), data, (err) => {
                            if(err) {
                                console.log('Error::', err);
                            }
                        })
                    })

            } else {
                // JPG
                sharp(route)
                    .resize({
                        width: (metadata.width < 1700 ? metadata.width : 1700),
                        height: (metadata.height < 1700 ? metadata.height : 1700),
                        fit: 'inside',
                    })
                    .jpeg({
                        quality: 80,
                        progressive: true,
                        mozjpeg: true,
                    })
                    .toBuffer()
                    .then(data => {
                        writeFile(join(dir, '.thumbnails', '.fullscreen', name + '.jpg'), data, (err) => {
                            if(err) {
                                console.log('Error::', err);
                            }
                        })
                    })
            }
        })
    }
}