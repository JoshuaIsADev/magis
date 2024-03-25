export async function getImageName(image) {
  // -${Math.floor(Math.random() * 10000)}
  return `${image.name}-${Math.floor(Math.random() * 10000)}`.replaceAll(
    '/',
    ''
  );
}
