// ... other imports
import { useCart } from '../context/CartContext'; 

const ProductDetailPage = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart(); 

  useEffect(() => {
    // Reset state when ID changes
    setProduct(null);
    setLoading(true);

    const getProductDetails = async () => {
      const data = await fetchProductById(productId);
      setProduct(data);
      setLoading(false);
    };
    getProductDetails();
  }, [productId]); // <-- FIX: Added productId to dependency array

  // ... (loading and error checks are the same)

  return (
    <div className="product-detail-container">
      {/* ... (image div is the same) */}
      <div className="product-detail-info">
        <h1>{product.title}</h1>
        <p className="price">${product.price}</p>
        <p>{product.description}</p>
        <button onClick={() => addToCart(product)} className="btn btn-primary">Add to Cart</button>
      </div>
    </div>
  );
};

export default ProductDetailPage;