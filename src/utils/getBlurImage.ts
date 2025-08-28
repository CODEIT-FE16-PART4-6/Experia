import sharp from 'sharp';

const getBlurImage = async (imageUrl: string): Promise<string> => {
  const res = await fetch(imageUrl);
  if (!res.ok) throw new Error(`이미지 불러오기에 실패했습니다: ${imageUrl}`);

  const buffer = Buffer.from(await res.arrayBuffer());

  const placeholder = await sharp(buffer)
    .resize(10, null, { fit: 'inside' })
    .jpeg({ quality: 70 })
    .toBuffer();

  return `data:image/jpeg;base64,${placeholder.toString('base64')}`;
};

export default getBlurImage;
