export default function parseImageUrl(imageUrl: string) {
    if (imageUrl.startsWith("http") || imageUrl.startsWith("https")) {
      return imageUrl;
    } else {
      return `${process.env.NEXT_PUBLIC_BACKEND_URI_IMAGE}${imageUrl}`;
    }
}
  