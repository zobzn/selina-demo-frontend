import sizes from '../config/image-sizes';

const linkToSelinaImage = (url: string, width: number = 768) => {
  if (!sizes.includes(width)) {
    throw new Error('Unsupported image size');
  }

  return url.replace(
    /^https:\/\/images.ctfassets.net\//,
    `https://selina-res.cloudinary.com/image/upload/if_iw_gt_${width},c_scale,w_${width}/ar_3:2,c_crop/e_sharpen:80,q_auto:good/f_auto/v1/s-cf-1/`
  );
};

export const generateSelinaSrcSet = (url: string) => {
  return sizes.map(
    (width) => linkToSelinaImage(url, width) + ' ' + width + 'w'
  );
};
