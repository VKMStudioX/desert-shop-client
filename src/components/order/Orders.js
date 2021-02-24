import React from "react";
import ShowPaymentInfo from "../cards/ShowPaymentInfo";
import { Link } from "react-router-dom"

const Orders = ({ orders, handleStatusChange }) => {
  const showOrderInTable = (order) => (
    <table>
      <thead>
        <tr>
          <th scope="col">Artist</th>
          <th scope="col">Title</th>
          <th scope="col">Release date</th>
          <th scope="col">Price</th>
        </tr>
      </thead>

      <tbody>
        {order.products.map((p, i) => (
          <tr key={i}>
            <td>{p.product.artist}</td>
            <td><Link to={`/product/${p.product.slug}`} className="table-link">{p.product.title}</Link></td>
            <td>{p.product.release}</td>
            <td>{p.product.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <>
      {orders.map((order) => (
        <div key={order._id} className="m-5 p-3 card">
          <div>
            <ShowPaymentInfo order={order} showStatus={true} showUserId={true}/>

            <div className="row">
              <div className="col-md-4">Delivery Status</div>
              <div className="col-md-8">
                <select
                  onChange={(e) =>
                    handleStatusChange(order._id, e.target.value)
                  }
                  className="input-3"
                  defaultValue={order.orderStatus}
                  name="status"
                >
                  <option value="Not Processed">Not Processed</option>
                  <option value="Cash On Delivery">Cash On Delivery</option>
                  <option value="Processing">Processing</option>
                  <option value="Dispatched">Dispatched</option>
                  <option value="Cancelled">Cancelled</option>
                  <option value="Completed">Completed</option>
                </select>
              </div>
            </div>
          </div>
                  <br/>
          {showOrderInTable(order)}
          <hr/>
        </div>
        
      ))}
    </>
  );
};

export default Orders;
