import React, { useMemo, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Datatable from 'components/React/Datatable/Datatable';
import { RootState } from 'store/root-reducer'
import { addItem, removeItem, deleteItem } from '../../../store/modules/shopping/cart-action';
import { Row } from 'react-table';
import toast from './../../../components/React/ToastNotifier/ToastNotifier';


interface ProductProps extends PropsFromRedux { }

const Product = (props: ProductProps) => {
  const { allCartData, totalPriceData, deleteItem, addItem, removeItem } = props;
  const history = useHistory();
  const [searchValue, setSearchValue] = useState("");

  const handleDelete = (id: any) => {
    deleteItem(id)
    toast.success("Product Removed Sucessfully")
  }




  const columns = useMemo(() => [
    { Header: "S.N", Cell: ({ row: { index } }: { row: Row }) => index + 1 },
    { Header: "Product Name", accessor: "name" },

    {
      Header: "Quantity", accessor: "quantity", Cell: ({ row }: { row: Row<{ id: number }> }) => (
        <ul className="list list__inline">
          <li>

            <svg onClick={() => removeItem(row.original)} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-dash" viewBox="0 0 16 16">
              <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z" />
            </svg>

          </li>

          <li>
            {row.original.quantity}
          </li>

          <li>

            <svg onClick={() => addItem(row.original)} style={{ cursor: 'pointer' }} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-plus" viewBox="0 0 16 16">
              <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
            </svg>

          </li>
        </ul>
      )
    },
    { Header: "Amount (In Rs)", id: 'price', accessor: (row) => row.price * row.quantity },
    {
      Header: "Actions", headerClass: 'text-right', accessor: "actions", Cell: ({ row }: { row: Row<{ id: number }> }) => (
        <ul className="list list__inline">
          <li>
            <button title="Remove Item" className="btn btn-icon-only" onClick={() => handleDelete(row.original._id)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z" />
                <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z" />
              </svg>
            </button>
          </li>
        </ul>
      )
    }
  ], [])




  return (
    <div className="container">
      <h1 className="text-center">Your Items</h1>
      <div className="row">
        <div className="col-lg-8 offset-md-2">
          <div className="align-vertical justify-content-between mb-2 border-top pt-3">

            <div className="form-group-icon">
              <input type="text" className="form-control" value={searchValue} onChange={(e) => setSearchValue(e.target.value)} />
              <i className="ic-search"></i>
            </div>

            <div className="align-vertical">
              <button className="btn btn-primary d-flex align-items-center" onClick={() => history.push('/product')}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                  <path fill-rule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                </svg>
                <span className="ml-2" style={{ fontSize: '20px' }}>Back</span>

              </button>
            </div>

          </div>


          <Datatable columns={columns} data={allCartData || []} filter={true} filterText={searchValue.trim()} />
        </div>

        <div className="col-lg-8 offset-md-2">



          <div className="d-flex justify-content-end">

            <span className="ml-2" style={{ fontSize: '20px' }}>Total Amount: Rs {totalPriceData}</span>


          </div>

        </div>

      </div>
    </div>

  )
}

const mapStateToProps = (state: any) => ({
  allCartData: state.shopping.cartData?.cartItems || [],
  totalPriceData: state.shopping.cartData?.cartItems.reduce(
    (acc, cartItem) => acc + cartItem.quantity * cartItem.price,
    0
  ) || 0
})

const mapDispatchToProps = {
  addItem,
  removeItem,
  deleteItem

}

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

export default connector(Product)
