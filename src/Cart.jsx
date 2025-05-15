// Import necessary modules and hooks from React, Redux, Router, and external libraries
import React, { useRef, useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ClearCart, DecCart, IncCart, OrderDetails, RemoveFromCart } from './store';
import { useNavigate } from 'react-router-dom';
import QRCode from 'react-qr-code'; // For generating UPI QR code
import emailjs from '@emailjs/browser'; // For sending order confirmation email
import './Cart.css'; // Styling for the cart page
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import confetti from 'canvas-confetti';

function Cart() {
    const dispatch = useDispatch(); // To dispatch Redux actions
    const navigate = useNavigate(); // To programmatically navigate to another route
    const cartObjects = useSelector(globalState => globalState.cart); // Fetch current cart from Redux store

    // Local state declarations
    const [discount, setDiscount] = useState(0); // General discount (10%, 20%, 30%)
    const [couponCode, setCouponCode] = useState(''); // Applied coupon code
    const [couponDiscountPercentage, setCouponDiscountPercentage] = useState(0); // Coupon specific discount
    const [paymentMethod, setPaymentMethod] = useState('upi'); // Payment method ('upi' or 'card')
    const [customerEmail, setCustomerEmail] = useState(''); // User's email address
    const couponCodeRef = useRef(); // Ref to access coupon input field
    const [countdown, setCountdown] = useState(10); // Countdown before redirecting on empty cart
    const [shouldRedirect, setShouldRedirect] = useState(false);


    // Redirect to Orders page after 5 seconds if cart is empty
    useEffect(() => {
        let confettiInterval;
        let countdownTimer;

        if (shouldRedirect && countdown > 0) {
            // 🎉 Start confetti every second
            confettiInterval = setInterval(() => {
                const canvas = document.getElementById('confetti-canvas');
                if (canvas) {
                    const confettiInstance = confetti.create(canvas, { resize: true, useWorker: true });
                    confettiInstance({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 },
                        angle: 90,
                    });
                }
            }, 1000);

            // ⏱ Start countdown
            countdownTimer = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(confettiInterval);
                        clearInterval(countdownTimer);
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }

        return () => {
            clearInterval(confettiInterval);
            clearInterval(countdownTimer);
        };
    }, [shouldRedirect]);

    // Function to calculate all bill-related amounts
    const calculatingAmount = () => {
        const totalPrice = cartObjects.reduce((total, item) => total + item.price * item.quantity, 0);
        const calDiscount = (totalPrice * discount) / 100;
        const priceAfterDiscount = totalPrice - calDiscount;
        const couponDiscount = (couponDiscountPercentage / 100) * priceAfterDiscount;
        const afterDiscount = priceAfterDiscount - couponDiscount;
        const shipping = 18; // Flat shipping charge
        const taxPrice = (afterDiscount * 17) / 100; // 17% tax
        const finalPrice = afterDiscount + taxPrice + shipping;

        return { totalPrice, priceAfterDiscount, taxPrice, afterDiscount, finalPrice, shipping };
    };

    // Destructure values returned by calculatingAmount
    const { totalPrice, priceAfterDiscount, afterDiscount, taxPrice, finalPrice, shipping } = calculatingAmount();

    // Handle coupon code logic
    const handleCouponApply = () => {
        const usrCoupon = couponCodeRef.current.value.trim().toUpperCase();
        setCouponCode(usrCoupon);


        toast.success('Coupon applied successfully!');

        // Set discount based on coupon
        switch (usrCoupon) {
            case 'vijju10':
                setCouponDiscountPercentage(10);
                break;
            case 'vijju20':
                setCouponDiscountPercentage(20);
                break;
            case 'vijju30':
                setCouponDiscountPercentage(30);
                break;
            default:
                alert('❌ Invalid Coupon Code');
                setCouponDiscountPercentage(0);
        }

        couponCodeRef.current.value = ''; // Clear input
    };

    // Handle complete purchase
    const handleCompletePurchase = () => {
        const purchaseDate = new Date().toLocaleString();
        const purchaseDetails = {
            orderId: 'ORD-' + new Date().getTime(), // Unique order ID
            date: purchaseDate,
            items: [...cartObjects],
            finalPrice: finalPrice
        };

        // Email template parameters for sending order details
        const templateParams = {
            order_id: purchaseDetails.orderId,
            orders: cartObjects.map(item => ({
                name: item.name,
                price: (item.price * item.quantity).toFixed(2),
                units: item.quantity,
                imageUrl: item.image
            })),
            cost: {
                shipping: shipping.toFixed(2),
                tax: taxPrice.toFixed(2),
                total: finalPrice.toFixed(2)
            },
            email: customerEmail
        };

        // Send email using EmailJS
        emailjs.send(
            'service_oblre07', // Service ID
            'template_48dbrrn', // Template ID
            templateParams,
            '0p32lNBIjJvR3sOsj' // Public key
        ).then(response => {
            console.log('✅ Email successfully sent!', response.status, response.text);
        }).catch(error => {
            console.error('❌ Failed to send email:', error);
        });

        // Clear cart and save order details
        dispatch(ClearCart());
        dispatch(OrderDetails(purchaseDetails));
        setShouldRedirect(true); // 🔁 Start redirect countdown

        // Redirect after 5 seconds
        setTimeout(() => {
            navigate("/Orders");
        }, 10000);

        toast.success('ORDER Placed successfully!');
    };

    // Create list items from cart objects
    const listItems = cartObjects.map((product, index) => (
        <li key={index}>
            <img src={product.image} alt={product.name} />
            <div className="cart-details">
                <h3>{product.name}</h3>
                <p>${product.price.toFixed(2)}</p>
            </div>
            <div className="cart-actions">
                <button onClick={() => { dispatch(IncCart(product)); toast.success(`Increased quantity for ${product.name}`); }}>+</button>
                <p>{product.quantity}</p>
                <button onClick={() => { dispatch(DecCart(product)); toast.info(`Decreased quantity for ${product.name}`); }}>-</button>
                <button onClick={() => { dispatch(RemoveFromCart(product)); toast.error(`${product.name} removed from cart!`) }}>Remove</button>
            </div>
        </li>
    ));

    // Final JSX
    return (
        <div className="cart-container">

            <ToastContainer position="top-right" autoClose={2000} />
            <h1>🛒 Your Shopping Cart</h1>
            {cartObjects.length === 0 ? (
                <div className="empty-cart-message">
                    <p>Your cart is empty.</p>

                    {shouldRedirect && (
                        <>
                            <div className="celebration-container">
                                <p>✅ Thank you for shopping!</p>

                                <p>➡️ Redirecting to your Orders page in {countdown} seconds...</p>
                                <div className="balloons"></div>
                                <canvas id="confetti-canvas"></canvas>
                            </div>
                        </>
                    )}


                </div>
            ) : (
                <>
                    <ol className="cart-items">{listItems}</ol>

                    <strong><p>Total Bill: ${totalPrice.toFixed(2)}</p></strong>

                    {/* General discount buttons */}
                    <div className="discount-buttons">
                        <button onClick={() => { setDiscount(10); toast.success('10% discount applied!'); }}>Apply 10% Discount</button>
                        <button onClick={() => { setDiscount(20); toast.success('20% discount applied!'); }}>Apply 20% Discount</button>
                        <button onClick={() => { setDiscount(30); toast.success('30% discount applied!'); }}>Apply 30% Discount</button>
                    </div>

                    <p>After Discount: ${priceAfterDiscount.toFixed(2)}</p>

                    {/* Coupon input section */}
                    <div className="coupon-section">
                        <input type="text" ref={couponCodeRef} placeholder="Enter Coupon Code" />
                        <button onClick={handleCouponApply}>Apply Coupon</button>
                    </div>

                    <p>Coupon Discount: ${afterDiscount.toFixed(2)}</p>

                    {/* Price summary */}
                    <div className="summary">
                        <p>Tax (17%): ${taxPrice.toFixed(2)}</p>
                        <p><strong>Final Price: ${finalPrice.toFixed(2)}</strong></p>
                    </div>

                    {/* Payment method selection */}
                    <div className="payment-method">
                        <h3>💳 Select Payment Method:</h3>
                        <div className="payment-method-buttons">
                            <button onClick={() => setPaymentMethod('upi')}>📱 UPI</button>
                            <button onClick={() => setPaymentMethod('card')}>💳 Card</button>
                        </div>
                    </div>

                    {/* UPI QR code section */}
                    {paymentMethod === 'upi' && (
                        <div className="scanner-wrapper">
                            <div className="upi-section">
                                <h4>Scan UPI QR to Pay ₹{finalPrice.toFixed(2)}</h4>
                               <QRCode value={`upi://pay?pa=8317507038@ybl&pn=vidyastore&am=${finalPrice.toFixed(2)}&cu=INR`} />
                               <p>UPI ID: 8317507038@ybl</p>
                            </div>
                        </div>
                    )}

                    {/* Card input section */}
                    {paymentMethod === 'card' && (
                        <div className="card-section">
                            <h4>Enter Card Details</h4>
                            <input type="text" placeholder="Card Number" />
                            <input type="text" placeholder="Cardholder Name" />
                            <input type="text" placeholder="Expiry Date (MM/YY)" />
                            <input type="text" placeholder="CVV" />
                        </div>
                    )}

                    {/* Email section */}
                    <div className="email-section">
                        <h4>📧 Enter your email to receive the order details:</h4>
                        <input
                            type="email"
                            placeholder="Enter your email"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                        />
                    </div>

                    {/* Final action button */}
                    <div className="centered-btn">
                        <button className="complete-purchase-btn" onClick={handleCompletePurchase}>
                            ✅ Complete Purchase
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Cart;
