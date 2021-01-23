import Dexie from "dexie";
const db = new Dexie("ChetanEcommerceStore"); //set the database

db.version(1).stores({
    items: "id, title, company, ratings, isbn, info, price, inCart, count",
    cart: "id, title, company, ratings, img, info, price, inCart, count",
    token: "token, name, userID",
});

db.open().catch((err) => {
    console.log(err.stack || err);
});
export default db;
