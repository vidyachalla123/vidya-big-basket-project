import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import confetti from 'canvas-confetti';
import './Orders.css';

function Orders() {
  const orders = useSelector((globalState) => globalState.orders);

  useEffect(() => {
    let intervalId;
    let timeoutId;

    if (orders && orders.length > 0) {
      // Start confetti blast every 1 second
      intervalId = setInterval(() => {
        confetti({
          particleCount: 100,
          spread: 80,
          origin: { y: 0.6 },
          angle: 90,
        });
      }, 1000);

      // Stop after 10 seconds
      timeoutId = setTimeout(() => {
        clearInterval(intervalId);
      }, 10000); // 10 seconds
    }

    // Cleanup function to clear interval and timeout on component unmount
    return () => {
      clearInterval(intervalId);
      clearTimeout(timeoutId);
    };
  }, [orders]);

  const ordersListItems = orders?.map((order, index) => (
    <li key={index} className="order-card">
      <h3 className="order-id">
        <i className="fas fa-box"></i> Order_ID: {order.orderId}
      </h3>
      <h3 className="order-datetime">
        <i className="fas fa-calendar-alt"></i> DateTime: {order.date}
      </h3>
      <h3 className="order-amount">
        <i className="fas fa-dollar-sign"></i> Final Amount: ₹{order.finalPrice}
      </h3>
      <ul className="order-items">
        {order.items.map((item, index1) => (
          <li key={index1} className="order-item">
            <i className="fas fa-check-circle"></i> {item.name} - Qty: {item.quantity} - Price: ₹{item.price}
          </li>
        ))}
      </ul>
    </li>
  ));

  return (
    <div className="orders-container">
      {orders.length === 0 ? (
        <div className="no-orders">
          <h2>No orders found.</h2>
          <p>Please place an order to view it here.</p>
        </div>
      ) : (
        <>
          <h2>Order History</h2>
          <ul className="orders-list">{ordersListItems}</ul>
        </>
      )}
    </div>
  );
}

export default Orders;
