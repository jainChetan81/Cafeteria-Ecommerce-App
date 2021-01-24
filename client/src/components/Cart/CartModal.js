import React, { Component } from "react";
import { toast } from "react-toastify";
import db from "../../Database/IndexDB";

class CartModal extends Component {
    state = {
        name: "",
        inputError: "",
        imageURI: "",
    };
    componentDidMount() {
        db.token.toArray().then((user) => {
            if (user.length > 0) this.setState({ name: user[0]?.name });
        });
    }

    onPurchase = () => {
        this.props.formFilled();
        toast(
            `${this.state.name} has to pay for items worth  $${Math.round(
                this.props.totalPrice * 1.1
            )} `
        );
        this.props.onClose();
    };

    getFile = (e) => {

        let reader = new FileReader();
        reader.readAsDataURL(e[0]);
        reader.onload = (e) => {
            this.setState({ imageURI: reader.result });
        };
    };

    onSubmit = (e) => {
        e.preventDefault();
        const key = e.target;
        if (
            (key.orgName.value === "",
            key.name.value === "",
            key.email.value === "",
            key.mobile.value === "",
            key.payment.value === "",
            key.empId.value === "",
            this.state.imageURI === "")
        )
            this.setState({ inputError: "Please Fill all the boxes" });
        else {
            this.props.formSubmit(e, this.state.imageURI);
            this.props.onClose();
        }
    };
    render() {
        const { name, inputError } = this.state;
        const { onClose } = this.props;
        return (
            <form onSubmit={this.onSubmit}>
                <div className="form-group">
                    <input
                        type="email"
                        name="email"
                        className="form-control"
                        placeholder="Enter email"
                    />
                    <small className="form-text text-muted">
                        We'll never share your email with anyone else.
                    </small>
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="name"
                        className="form-control"
                        placeholder="Enter Name"
                        readOnly
                        disabled={name}
                        value={name}
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="orgName"
                        placeholder="Organization Name"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        name="empId"
                        className="form-control"
                        placeholder="Employee Id"
                    />
                </div>
                <div className="form-group">
                    <input
                        type="text"
                        className="form-control"
                        name="mobile"
                        placeholder="Mobile Number"
                    />
                </div>
                <div className="form-group">
                    <label>Id Card</label>
                    <input
                        type="file"
                        id="cover"
                        name="file"
                        onChange={(e) => this.getFile(e.target.files)}
                    />
                </div>
                <div className="form-group">
                    <label>Payment Type</label>
                    <select
                        name="payment"
                        className="form-control form-control-sm mb-3">
                        <option>Online</option>
                        <option>COD</option>
                    </select>
                    {inputError && (
                        <small className="form-text text-danger">
                            {inputError}
                        </small>
                    )}
                </div>
                <button
                    type="submit"
                    // onClick={this.onPurchase}
                    className="btn btn-primary btn-lg">
                    Purchase
                </button>
                <button
                    type="button"
                    className="btn btn-danger btn-lg mx-1"
                    onClick={onClose}>
                    Close
                </button>
            </form>
        );
    }
}
export default CartModal;
