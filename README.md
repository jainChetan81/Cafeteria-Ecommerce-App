##Welcome to Chetan Cafeteria Food!##

-   This is a Ecommerce App for Cafeteria made by using MERN stack
-   Here You Can Browse through or and buy food items for yourself through Online or Cash on Delivery
-   You can Login or Signup and your password is **encrypted**
-   All the orders will be stored and can be seen on your screen
-   For Local Deployment go to CLI and type **npm install** to install libraries and then **npm start**
-   In this App you can select and buy using built in checkout function
-   You can browse through a variety of items using visually appealing UI. You can also search through these items by name
-   You can also get a detailed view of any book
-   **Checkout** Functionality with **Payment** option has been implemented
-   Deployment Link: https://chetan-cafeteria-app.herokuapp.com/
-   GitHub Link: https://github.com/jainChetan81/Cafeteria-Ecommerce-App

---

## Tech Stacks##

-   **Frontend :** HTML5, CSS, JAVASCRIPT, REACTJS, Index DB
-   **Backend :** Node.js, express mongo DB,

## Third Party Libraries##

-   **Index DB** has been Used to store list of All Items and Items in Cart
-   **JavaScript Web Token** for User Authentication
-   **Axios** for Using REST APIs
-   **Bootstrap** for predefined CSS
-   **Stripe** for online Payments
-   **Bcrypt** for encrypting User Password
-   **nodemon** for running continuous Server
-   **moment** for parsing Date and Time
-   **Body Parser** for parsing Rest APi receiving in Backend

---

## Functionality

-   You can Create an Account or Login through Existing Account
    ![Signup Screen][1]
-   Browse through the 8 available Food Items
    ![Dashboard Browsing Screen][2]
-   This App has **Search Functionality**.
    ![Search Results for "momo"][3]
-   You can also **Sort** through the list by ratings in descending order which are shown in **Star** Format
    ![Results for sorting by reviews in Descending Order][4]
-   **Detailed** view of every Item
    ![Detailed view for "Tea"][5]
-   **Cart** Feature has been Implemented where user can **increase** or **decrease** amount of any item or **remove** one or all Items
-   You also have the option to press remove all to clear cart and move back to Browsing Page
    ![Cart Page][6]
-   If want to buy User will be shown a **Form** where User is required to provide **Full Name**, **Organization name**, **Employee ID no.**, **Mobile No.**, **E-Mail**, **ID Card**
-   Here You can also choose to pay **Online** or **Cash On Delivery**
    ![User Info Form][7]
-   A **Registration ID** is generated along with the option to see all the inputs user gave
    ![Showing  User Inputs][8]
-   If Chosen COD option then you will be shown a **Finish** button but if chosen **Online Payment** you can pay through your Credit Card
    ![Stripe Payment Screen][9]
-   Now Order has been Confirmed you can see your Current and previous orders in **Order History** Screen
-   Here a timer has been started where 20 minutes are given to pick up you order
    ![order history page][10]

---

## Database Stores

**INDEX DB**

-   This Application is Storing all the items and Cart info on browser Index DB
    ![Index Db][11]

**MONGO DB**

-   Storing **User** information with password encryption
    ![User Schema][12]

-   Storing **Order** history of all current and previous Orders
    ![Order Schema][13]

-   Storing all the **Payments** _Online_ or _COD_
    ![Payment Schema][14]

[1]: https://he-s3.s3.amazonaws.com/media/uploads/1d8d887.png
[2]: https://he-s3.s3.amazonaws.com/media/uploads/58c66c8.png
[3]: https://he-s3.s3.amazonaws.com/media/uploads/6b1602a.png
[4]: https://he-s3.s3.amazonaws.com/media/uploads/8947fc7.png
[5]: https://he-s3.s3.amazonaws.com/media/uploads/a8f9e08.png
[6]: https://he-s3.s3.amazonaws.com/media/uploads/5082ac2.png
[7]: https://he-s3.s3.amazonaws.com/media/uploads/a99c2d2.png
[8]: https://he-s3.s3.amazonaws.com/media/uploads/183da4d.png
[9]: https://he-s3.s3.amazonaws.com/media/uploads/3c3c372.png
[10]: https://he-s3.s3.amazonaws.com/media/uploads/95139ee.png
[11]: https://he-s3.s3.amazonaws.com/media/uploads/2a75365.png
[12]: https://he-s3.s3.amazonaws.com/media/uploads/5641567.png
[13]: https://he-s3.s3.amazonaws.com/media/uploads/e18c767.png
[14]: https://he-s3.s3.amazonaws.com/media/uploads/eda97ba.png
