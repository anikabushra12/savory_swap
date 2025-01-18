import Itemcard from "./MinimartItem";
import axios from "axios";
import { apiStart } from "../../api";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import FryingpanSpinner from "./FryingpanSpinner";

const ItemList = ({ cart, deleteitem, setCart, addCart }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams] = useSearchParams();
  // search
  const currentSearchTerm = searchParams.get("query") || "";
  const selectedCategory = searchParams.get("category") || "all";

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        if (selectedCategory === "all") {
          const response = await axios.get(
            `${apiStart}/api/minimart/all-products`
          );
          setProducts(response.data);
          console.log(response.data);
        } else {
          const response = await axios.get(
            `${apiStart}/api/minimart/products/${selectedCategory}`
          );
          setProducts(response.data);
          console.log(response.data);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    console.log(selectedCategory);
  }, [selectedCategory]);

  //search

  useEffect(() => {
    async function getSearchedProducts() {
      try {
        setLoading(true);
        const response = await axios.get(
          `${apiStart}/api/minimart/products/search/${currentSearchTerm}`
        );

        setProducts(response.data);
        console.log(response.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    }

    if (currentSearchTerm !== "") getSearchedProducts();
  }, [currentSearchTerm]);

  if (loading) return <FryingpanSpinner extraClassName="h-16 mt-6" />;

  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {products?.map((product, index) => (
        <Itemcard
          key={index}
          id={product._id}
          imageUrl={product.imageUrl}
          Name={product.name}
          Description={product.description}
          Price={product.price}
          unit={product.unit}
          cart={cart}
          deleteitem={deleteitem}
          setCart={setCart}
          addCart={addCart}
        />
      ))}
    </div>
  );
};

//

//

export default ItemList;
