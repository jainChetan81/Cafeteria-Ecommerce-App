import React, { Component } from "react";
import { toast } from "react-toastify";

class CartModal extends Component {
    state = { name: "", email: "", address: "" };
    onPurchase = () => {
        toast(
            `${this.state.name} has purchased items worth ${Math.round(
                this.props.totalPrice * 1.1
            )}`
        );
        setTimeout(() => {
            this.props.onClose();
            this.props.removeAllItems();
        }, 3000);
    };
    render() {
        const { name, email, address } = this.state;
        const { onClose } = this.props;
        return (
            <div>
                <div className="form-group">
                    <label>Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        placeholder="Enter email"
                        value={email}
                        onChange={(e) =>
                            this.setState({ email: e.target.value })
                        }
                    />
                    <small className="form-text text-muted">
                        We'll never share your email with anyone else.
                    </small>
                </div>
                <div className="form-group">
                    <label>Name</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Name"
                        value={name}
                        onChange={(e) =>
                            this.setState({ name: e.target.value })
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Address</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Address"
                        value={address}
                        onChange={(e) =>
                            this.setState({ address: e.target.value })
                        }
                    />
                </div>
                <div className="form-group">
                    <label>Delivery Type</label>
                    <select className="form-control form-control-sm mb-3">
                        <option>Fast</option>
                        <option>Normal</option>
                    </select>
                </div>
                <button
                    onClick={this.onPurchase}
                    className="btn btn-primary btn-lg">
                    Purchase
                </button>
                <button
                    type="button"
                    className="btn btn-danger btn-lg mx-1"
                    onClick={onClose}>
                    Close
                </button>
            </div>
        );
    }
}
export default CartModal;
