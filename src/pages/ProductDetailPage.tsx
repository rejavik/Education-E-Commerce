import { useParams } from "react-router-dom";
import ProductDetail from "../containers/home/detail-product/DetailProduct";

const ProductDetailPage = () => {
  const id = useParams();

  return (
    <div>
      <ProductDetail product={id} />
    </div>
  );
};

export default ProductDetailPage;
