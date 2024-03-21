function ProductCard({ product }) {
  const {
    id,
    name,
    category,
    tags,
    unitPrice,
    soldOut,
    measurements,
    material,
    designer,
    imageUrl,
  } = product;

  return (
    <div>
      {/* <img src={mainImages[0]} alt='Product'></img> */}
      <h4>{name}</h4>
      <p>{designer}</p>
      <p>${unitPrice}</p>
    </div>
  );
}

export default ProductCard;
