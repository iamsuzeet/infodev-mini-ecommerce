import React, { useEffect, useCallback } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllProduct } from 'store/modules/shopping/get-all-product'
import { RootState } from 'store/root-reducer'
import { addItem } from './../../../store/modules/shopping/cart-action';
import toast from './../../../components/React/ToastNotifier/ToastNotifier';

interface ProductProps extends PropsFromRedux { }

const Product = (props: ProductProps) => {
  const { getAllProduct, getAllProductData, totalProductCount, addItem } = props;

  const fetchAllProductData = useCallback(async () => {
    await getAllProduct();
  }, [getAllProduct])

  useEffect(() => {
    fetchAllProductData()
  }, [fetchAllProductData])

  return (
    <div className="container">
      <h1 className="text-center">Products</h1>
      <div className="row">
        <div className="col-lg-8 offset-md-2">

          <Link to="/cart">

            <div className="d-flex justify-content-end">
              <button className="btn d-flex align-items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-bag" viewBox="0 0 16 16">
                  <path d="M8 1a2.5 2.5 0 0 1 2.5 2.5V4h-5v-.5A2.5 2.5 0 0 1 8 1zm3.5 3v-.5a3.5 3.5 0 1 0-7 0V4H1v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4h-3.5zM2 5h12v9a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V5z" />
                </svg>
                <span className="ml-2" style={{ fontSize: '20px' }}>Cart ({totalProductCount})</span>

              </button>
            </div>
          </Link>
        </div>
      </div>
      <div className="row mt-5">
        <div className="col-lg-8 offset-md-2">
          <div className="row mb-5">
            {
              getAllProductData.data && getAllProductData.data?.data.length > 0 && getAllProductData.data.data.map((product, index) => (
                <div className="col-lg-3 mb-3">
                  <div className="card">
                    <img src={`https://mdbcdn.b-cdn.net/img/Photos/Horizontal/E-commerce/Vertical/12a.jpg`} alt={product.name} className="img-fluid w-100 img-thumbnail h-50" />
                    <div className="card-body">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="card-text">{product.description}</p>
                      <p className="card-text">Rating Average: {product.ratingAverage}</p>
                      <p className="card-text">Price: Rs {product.price}</p>


                      <button type="button" className="btn btn-primary mt-3 d-flex align-items-center" onClick={() => {
                        addItem(product)
                        toast.success("Product added to cart")
                      }}><span className="mr-1">Add To Cart </span>  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-cart" viewBox="0 0 16 16">
                          <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5zM3.102 4l1.313 7h8.17l1.313-7H3.102zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
                        </svg></button>
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>

      </div>
    </div>
  )
}

const mapStateToProps = (state: any) => ({
  getAllProductData: state.shopping.getAllProductData,
  totalProductCount: state.shopping.cartData?.cartItems?.reduce((acc, cartItem) => acc + cartItem.quantity, 0) || 0
})

const mapDispatchToProps = {
  getAllProduct,
  addItem
}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Product)
