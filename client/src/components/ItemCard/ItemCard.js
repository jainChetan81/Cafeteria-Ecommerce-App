import React from "react";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import StarIcon from "@material-ui/icons/Star";

export default function NewsCard({
    item,
    showModalInfo,
    removeFromCart,
    addToCart,
    history,
}) {
    const buyNow = (item) => {
        if (!item.inCart) addToCart(item.id);
        history.push("/checkout");
    };

    const averageRatings = (num) => {
        let v = [];
        for (let i = 1; i < Math.round(num); i++) {
            v.push(<StarIcon key={i} />);
        }
        return v;
    };

    const image = `https://source.unsplash.com/300x2${item.id + 10}`;
    return (
        <div className="col-md-3" style={{ marginBottom: "2rem" }}>
            <div className="newss__box">
                <img
                    style={{
                        objectFit: "contain",
                        width: "100%",
                        height: "100%",
                    }}
                    src={image}
                    alt={`300x2${item.id + 10}`}
                />
                <div className="news__text">
                    <h5 className="newss__title">{item.title}</h5>
                    <p className="newss__subtitle">
                        Company : <span>{item.company}</span>
                    </p>
                </div>
                <button
                    onClick={() => showModalInfo(item)}
                    className="news_buttons">
                    View Item Details
                </button>
                <span className="videoSidebar__button">
                    {item.inCart ? (
                        <ShoppingCartIcon
                            style={{ color: "green" }}
                            fontSize="large"
                            onClick={(e) => removeFromCart(item.id)}
                        />
                    ) : (
                        <AddShoppingCartIcon
                            fontSize="large"
                            onClick={(e) => addToCart(item.id)}
                        />
                    )}
                </span>
                <br /> <br />
                <button onClick={() => buyNow(item)} className="news_buttons">
                    Buy Now{" "}
                    <b>
                        <i>${item.price}</i>
                    </b>
                </button>
                <span className="videoSidebar__button">
                    {averageRatings(item.ratings)}
                </span>
            </div>
        </div>
    );
}
