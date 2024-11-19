import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { decrementQuantity, fetchCartProducts, incrementQuantity } from "../Redux/GetCartSlice";
import { DeleteCartitem } from "../Redux/DeleteCartSlice";
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import DeleteIcon from '@mui/icons-material/Delete';
import { UpdateQuantityCart } from "../Redux/UpdateQuantityCart";


function Cart() {
  const dispatch = useDispatch();
  const { CartsData, totalQuantity, isLoading, error } = useSelector((state) => state.getCart);


  function DeleteProduct(id) {
    dispatch(DeleteCartitem(id))
    dispatch(fetchCartProducts())
  }
  function increment(id, q) {
    console.log('increment');
    console.log(id);
    console.log(q);
    dispatch(UpdateQuantityCart(id,q))
  }
  function decrement(id, q) {
    console.log('decrement');
    console.log(id);
    console.log(q);
  }



  useEffect(() => {
    // Fetch cart items on component load
    dispatch(fetchCartProducts());
  }, [dispatch]);

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="container">
      <div className="">
        <h5>Total Quantity: {totalQuantity}</h5>
      </div>
      {CartsData.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          <div className="row ">
            <h1 className="mt-5 pt-4">My Cart</h1>
            {CartsData.map(({ productId, name, description, price, quantity, imageUrl }, index) => (
              <div key={index} className="col-md-4 mb-4 d-flex align-items-center justify-content-center">
                {console.log(CartsData)
                }
                <div className="w-100 card h-100 shadow d-flex flex-column">
                  <button onClick={() => DeleteProduct(productId)} className=" d-flex align-items-center justify-content-center btn btn-outline-danger rounded-1 p-0 m-0" style={{ width: '10%' }}>x</button>
                  <div className="card-body text-center">
                    <img src={imageUrl} alt={`Product ${name}`} className="img-fluid mb-3" />
                    <h2 className="h5 text-warning"><strong>Product ID:</strong> {productId}</h2>
                    <h5 className="card-title">{name}</h5>
                    <p className="card-text">{description}</p>
                    <p className="card-text fw-bold"><span className="text-success">{price} </span>EGP</p>
                    <p><strong>Quantity:</strong> {quantity}</p>
                    <div className=" d-flex justify-content-center align-items-center gap-4 mb-3">
                      <button className=" btn btn-outline-success ">
                        <AddShoppingCartIcon />
                      </button>
                      <button>
                        <div>
                          <h5>Total Quantity: {totalQuantity}</h5>
                          <h5> Quantity: {quantity}</h5>
                        </div>
                      </button>
                      <button className=" btn btn-outline-danger ">
                        <DeleteIcon />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ul>
      )}

    </div>
  );
}

export default Cart;
