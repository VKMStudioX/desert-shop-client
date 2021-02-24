import React, { useState, useEffect } from "react";
import UserNav from "../../components/nav/UserNav";
import { getUserOrders } from "../../functions/user";
import { useSelector } from "react-redux";
import ShowPaymentInfo from "../../components/cards/ShowPaymentInfo";
import HeadingFull from "../../components/HeadingFull";
import FlexGridCenter from "../../components/FlexGridCenter";
import { Link } from "react-router-dom"

const History = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadUserOrders();
  }, []);

  const loadUserOrders = () =>
    getUserOrders(user.token).then((res) => {
      setOrders(res.data);
    });

  const showOrderInTable = (order) => (
    <table className="table table-bordered">
      <thead className="thead-light">
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
            <td><b>{p.product.artist}</b></td>
            <td><Link to={`/product/${p.product.slug}`} className="table-link"><b>{p.product.title}</b></Link></td>
            <td>{p.product.release}</td>
            <td>{p.product.price}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );

  const showEachOrders = () =>
    orders.map((order, i) => (
      <div key={i} className="m-5 p-3 card">
        <ShowPaymentInfo order={order} />
        {showOrderInTable(order)}
      </div>
    ));

  return (
    <>
      <HeadingFull headingMarginTop={true}>User dashboard (orders history)</HeadingFull>
  
      <div className="center-cards grid__shop">
          <UserNav />
        
          <FlexGridCenter direction="col" flexOnly="true">
          <p><b>User credits: {user.credits}</b></p>
          {orders.length > 0 ? showEachOrders() : "No purchase orders"}
        </FlexGridCenter>
      </div>
    </>
  );
};

export default History;
