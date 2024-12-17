export default function parseImageUrl(imageUrl: string) {
  try {
    if (!imageUrl) {
      throw new Error('imageUrl is not defined');
    }
    if (imageUrl.startsWith('http') || imageUrl.startsWith('https')) {
      return imageUrl;
    } else {
      return `${process.env.NEXT_PUBLIC_BACKEND_URI_IMAGE}${imageUrl}`;
    }
  } catch (error) {
    return error;
  }
}
