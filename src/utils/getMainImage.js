export async function getMainImage(images) {
  let mainImageArray = [];
  // console.log(images);
  for (const image of images) {
    if (image.includes('main')) {
      // console.log(image);
      mainImageArray.push(image);
    }
  }

  return mainImageArray;
}
