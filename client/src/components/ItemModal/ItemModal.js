import React, { Component } from "react";
import StarIcon from "@material-ui/icons/Star";

export default class NewsModal extends Component {
    buyNow(item) {
        if (!item.inCart) this.props.addToCart(item.id);
        this.props.history.push("/checkout");
    }
    averageRatings(num) {
        let v = [];
        for (let i = 1; i < Math.round(num); i++) {
            v.push(<StarIcon key={i} />);
        }
        return v;
    }
    render() {
        const { activeItem, removeFromCart, addToCart } = this.props;
        return (
            <div>
                {activeItem.length !== "" ? (
                    <div className="active-news">
                        <img
                            src={activeItem.img}
                            alt={activeItem.title}
                            style={{
                                objectFit: "contain",
                                width: "100%",
                                height: "100%",
                            }}
                            className="active-news__img"
                        />
                        <h3 className="active-news__title">
                            {activeItem.title}
                        </h3>
                        <p>
                            <b>{activeItem.title}</b>
                        </p>

                        <h5 className="active-news__publisher">
                            Vendor:
                            <span>{activeItem.vendor}</span>
                        </h5>
                        <h5 className="active-news__publisher">
                            Info:
                            <span>
                                <i>{activeItem.info}</i>
                            </span>
                        </h5>
                        <p className="active-news__publisher">
                            Ratings:
                            <span>
                                {this.averageRatings(activeItem.ratings)}
                            </span>
                        </p>
                        <p className="lead active-website">
                            <span>
                                <button
                                    onClick={() => this.buyNow(activeItem)}
                                    className="news_buttons">
                                    Buy Now
                                </button>
                            </span>
                            <span>
                                {activeItem.inCart ? (
                                    <button
                                        onClick={() =>
                                            removeFromCart(activeItem.id)
                                        }
                                        className="btn btn-danger mx-3">
                                        Remove From Cart
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => addToCart(activeItem.id)}
                                        className="btn btn-success mx-3">
                                        Add To Cart
                                    </button>
                                )}
                            </span>
                        </p>
                    </div>
                ) : (
                    <h1>Loading...</h1>
                )}
            </div>
        );
    }
}
