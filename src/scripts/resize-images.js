const path = require('path');
const sharp = require('sharp');

const sizes = require('../config/image-sizes');
const images = ['homepage-image.jpg'];

(async () => {
  for await (let image of images) {
    for await (let width of sizes) {
      const pathSrc = path.resolve(__dirname, '../images-original/' + image);
      const pathResJpg = path.resolve(
        __dirname,
        '../images/' + image.replace(/\.jpg/, '-' + width + '.jpg')
      );
      const pathResWebp = path.resolve(
        __dirname,
        '../images/' + image.replace(/\.jpg/, '-' + width + '.webp')
      );

      const imageObject = sharp(pathSrc).resize(width, null, {
        withoutEnlargement: true,
      });

      await imageObject
        .jpeg({ quality: width > 2560 ? 60 : 80, progressive: true })
        .toFile(pathResJpg);
      // await imageObject.toFile(pathResWebp);
    }
  }
})();
