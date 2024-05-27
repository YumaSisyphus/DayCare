import React, { useState, useEffect } from "react";
import axios from "axios";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import useCheckAuth from "../../utils/useCheckAuth";
import useLogout from "../../utils/useLogout";
import SessionModal from "../../components/SessionModal";

const PaymentForm = () => {
  const [children, setChildren] = useState([]);
  const [selectedChild, setSelectedChild] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const elements = useElements();
  const [modalOpen, setModalOpen] = useState(false);
  const { authState, loading } = useCheckAuth();
  const handleLogout = useLogout();

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    if (!loading && !authState.isAuthenticated && authState.isRefreshToken) {
      handleOpenModal();
    } else if (!loading && !authState.isRefreshToken) {
      handleLogout();
    }
  }, [loading, authState]);

  useEffect(() => {
    // Fetch children from the server
    axios
      .get("/children/getChildren")
      .then((response) => {
        setChildren(response.data.children);
      })
      .catch((error) => {
        setError(error.message);
      });
  }, []);

  const handlePayment = async (e) => {
    e.preventDefault();
    try {
      const selectedChildInfo = children.find(
        (child) => child.ChildId === selectedChild
      );
      const { paymentMethod, error } = await stripe.createPaymentMethod({
        type: "card",
        card: elements.getElement(CardElement),
      });

      if (error) {
        console.error(error);
        return;
      }

      const paymentData = {
        ChildId: selectedChild,
        Name: name,
        Surname: surname,
        PhoneNumber: phoneNumber,
        Amount: amount,
        PaymentMethodId: paymentMethod.id, // Include payment method ID
      };

      // Make a request to your backend to process the payment
      const response = await axios.post("/payment", paymentData);
      // Redirect or show success message
    } catch (error) {
      console.error(error);
      // Handle error
    }
  };

  return (
    <div>
      <form onSubmit={handlePayment}>
        {error && <p>Error: {error}</p>}
        <div>
          <label htmlFor="child">Select Child:</label>
          <select id="child" onChange={(e) => setSelectedChild(e.target.value)}>
            <option value="">Select Child</option>
            {children.map((child) => (
              <option key={child.ChildId} value={child.ChildId}>
                {child.Name} {child.Surname}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="surname">Surname:</label>
          <input
            type="text"
            id="surname"
            value={surname}
            onChange={(e) => setSurname(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="phone">Phone Number:</label>
          <input
            type="tel"
            id="phone"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="amount">Amount:</label>
          <input
            type="number"
            id="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label>Card Details:</label>
          <CardElement />
        </div>
        <button type="submit">Pay Now</button>
      </form>
      <SessionModal open={modalOpen} />
    </div>
  );
};

export default PaymentForm;
