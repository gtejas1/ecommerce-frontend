import React, { useState, useEffect } from "react";
import { loadCart, cartEmpty } from "./helper/cartHelper";
import { Link } from "react-router-dom";
import { getmeToken, processPayment } from "./helper/paymentBHelper";
import { createOrder } from "./helper/orderHelper";
import { isAuthenticated } from "../auth/helper";
import { DropIn } from "braintree-web-drop-in-react";

class Paymentb extends React.Component {
  state = {
    info: {
      loading: false,
      success: false,
      clientToken: null,
      error: "",
    },
  };

  getToken = async (userId, token) => {
    const info = await getmeToken(userId, token);
    if (info.error) {
      this.setState({ info: { ...this.state.info, error: info.error } });
    } else {
      this.setState({
        info: { ...this.state.info, clientToken: info.clientToken },
      });
    }
  };

  showbtDropIn = () => {
    return (
      <div>
        {this.state.info.clientToken && this.props.products.length > 0 ? (
          <div>
            <DropIn
              options={{ authorization: this.state.info.clientToken }}
              onInstance={(instance) => (this.instance = instance)}
            />
            <button
              className="btn btn-block btn-success"
              onClick={this.onPurchase}
            >
              Buy
            </button>
          </div>
        ) : (
          <h3>Please login or add something to cart</h3>
        )}
      </div>
    );
  };

  componentDidMount() {
    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;
    this.getToken(userId, token);
  }

  onPurchase = () => {
    const userId = isAuthenticated() && isAuthenticated().user._id;
    const token = isAuthenticated() && isAuthenticated().token;
    this.setState({ loading: true });
    let nonce;
    let getNonce = this.instance.requestPaymentMethod().then((data) => {
      nonce = data.nonce;
      const paymentData = {
        paymentMethodNonce: nonce,
        amount: this.getAmount(),
      };
      processPayment(userId, token, paymentData)
        .then((response) => {
          this.setState({
            info: {
              ...this.state.info,
              success: response.success,
              loading: false,
            },
          });

          console.log("PAYMENT SUCCESS");
          const orderData = {
            products: this.state.products,
            transaction_id: response.transaction.id,
            amount: response.transaction.amount,
          };
          createOrder(userId, token, orderData);
          cartEmpty(() => {
            console.log("Did we get a crash?");
          });

          this.props.setReload(!this.props.reload);
        })
        .catch((error) => {
          this.setState({ info: { loading: false, success: false } });

          console.log("PAYMENT FAILED");
        });
    });
  };

  getAmount = () => {
    let amount = 0;
    this.props.products.map((p) => {
      amount = amount + p.price;
    });
    return amount;
  };

  render() {
    return (
      <div>
        <h3>Your bill is ${this.getAmount()}</h3>
        {this.showbtDropIn()}
      </div>
    );
  }
}
export default Paymentb;
