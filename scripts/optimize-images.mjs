import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const SOURCE_DIR = path.join(process.cwd(), 'material');
const TARGET_DIR = path.join(process.cwd(), 'public', 'images');
const MAX_WIDTH = 1920;
const QUALITY = 80;

async function optimizeImages() {
    if (!fs.existsSync(SOURCE_DIR)) {
        console.error(`Source directory not found: ${SOURCE_DIR}`);
        process.exit(1);
    }

    if (!fs.existsSync(TARGET_DIR)) {
        fs.mkdirSync(TARGET_DIR, { recursive: true });
    }

    const files = fs.readdirSync(SOURCE_DIR);
    const imageFiles = files.filter(file => /\.(jpg|jpeg|png)$/i.test(file));

    console.log(`Found ${imageFiles.length} images to process...`);

    for (const file of imageFiles) {
        const sourcePath = path.join(SOURCE_DIR, file);
        const fileName = path.parse(file).name;
        const targetPath = path.join(TARGET_DIR, `${fileName}.webp`);

        // Skip if already exists (optional, but good for speed if re-running)
        // But user might want to overwrite if parameters changed. Let's overwrite for now to be safe.

        try {
            await sharp(sourcePath)
                .rotate() // Auto-rotate based on Exif data
                .resize({ width: MAX_WIDTH, withoutEnlargement: true })
                .webp({ quality: QUALITY })
                .toFile(targetPath);

            console.log(`Optimized: ${file} -> ${fileName}.webp`);
        } catch (error) {
            console.error(`Error processing ${file}:`, error);
        }
    }

    console.log('Image optimization complete!');
}

optimizeImages();
