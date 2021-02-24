import React from "react";

const ShowPaymentInfo = ({ order, showStatus = true, showUserId = false }) => (
  <div>
    <strong>Order Id:</strong> {order._id}
    <br/>
    {showUserId && (
      <>
      <strong>User Id:</strong> {order.orderdBy}
      <br/>
      </>
    )}
    <strong>Amount:</strong> {(order.paymentIntent.amount).toLocaleString("en-US", {
          style: "currency",
          currency: "USD",
    })}
    <br/>      
    <strong>Ordered on:</strong> {new Date(order.paymentIntent.created).toLocaleString("pl-PL")}
    <br />
    {showStatus && (
      <span className="badge bg-primary text-white">
        STATUS: {order.orderStatus}
      </span>
    )}
  </div>
);

export default ShowPaymentInfo;
