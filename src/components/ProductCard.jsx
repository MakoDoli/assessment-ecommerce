import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { addCart } from "../redux/action";
import { useState } from "react";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  product.variants = ["new", "used", "like new"];
  const [selectedVariant, setSelectedVariant] = useState(
    product.variants?.[0] || "new"
  );

  const addProduct = () => {
    dispatch(addCart({ ...product, selectedVariant }));
    toast.success("Added to cart");
  };

  const isOutOfStock = product.stock === 0;

  return (
    <div
      id={product.id}
      key={product.id}
      className="col-lg-3 col-md-4 col-sm-6 col-12 mb-4"
    >
      <div className="card h-100 shadow-sm border-0">
        <img
          className="card-img-top p-3"
          src={product.image}
          alt={product.title}
          style={{ objectFit: "contain", height: "250px" }}
        />
        <div className="card-body d-flex flex-column">
          <h5 className="card-title text-truncate" title={product.title}>
            {product.title}
          </h5>
          <p className="text-muted mb-2">${product.price.toFixed(2)}</p>

          {/* Variant Selector */}
          {product.variants && product.variants.length > 0 && (
            <select
              className="form-select mb-3"
              value={selectedVariant}
              onChange={(e) => setSelectedVariant(e.target.value)}
            >
              {product.variants.map((variant, index) => (
                <option key={index} value={variant}>
                  {variant}
                </option>
              ))}
            </select>
          )}

          <div className="mt-auto d-flex flex-column">
            <Link
              to={`/product/${product.id}`}
              className="btn btn-outline-dark mb-2"
            >
              View Details
            </Link>

            <button
              className="btn btn-dark"
              onClick={addProduct}
              disabled={isOutOfStock}
            >
              {isOutOfStock ? "Out of Stock" : "Add to Cart"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
