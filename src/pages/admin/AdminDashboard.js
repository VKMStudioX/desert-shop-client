import React, { useState, useEffect } from "react";
import AdminNav from "../../components/nav/AdminNav";
import { getOrders, changeStatus } from "../../functions/admin";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import Orders from "../../components/order/Orders";
import HeadingFull from "../../components/HeadingFull";
import FlexGridCenter from "../../components/FlexGridCenter";

const AdminDashboard = () => {
  const [orders, setOrders] = useState([]);
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = () =>
    getOrders(user.token).then((res) => {
      // console.log(JSON.stringify(res.data, null, 4));
      setOrders(res.data);
    });

  const handleStatusChange = (orderId, orderStatus) => {
    changeStatus(orderId, orderStatus, user.token).then((res) => {
      toast.success("Status updated");
      loadOrders();
    });
  };

  return (
    <>
    <HeadingFull headingMarginTop={true}>Admin Dashboard</HeadingFull>
    <div className="center-cards grid__shop">
      <AdminNav />
      <FlexGridCenter direction="col" flexOnly="true">
          <p><b>User credits: ${user.credits}</b></p>
        <Orders orders={orders} handleStatusChange={handleStatusChange} />
      </FlexGridCenter>
    </div>
    </>
  );
};

export default AdminDashboard;
