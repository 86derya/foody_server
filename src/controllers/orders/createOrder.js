const Order = require("../../modules/db/schemas/order");

const {
  orderCreatedFail,
  orderCreatedSuccess
} = require("../auth/configs/responses.js");

const createOrder = (request, response) => {
  const order = request.body;
  console.log(order);

  // const hashedPassword = bcrypt.hashSync(user.password, 10);
  // const userData = { ...user, password: hashedPassword };

  const newOrder = new Order(order);

  newOrder.save(function(err) {
    if (err) {
      console.log(err), orderCreatedFail(response);
    } else {
      orderCreatedSuccess(response, newOrder);
    }
  });
};

// const createOrder = (request, response) => {
//   const order = request.body;
//   const userId = order.user;
//   const productsIds = order.products;
//   const userName = getUserNameById(userId);
//   const availableProducts = getAllProductsfromDb();

//   const isProductsAvailable = checkProductsForAvailability(
//     productsIds,
//     availableProducts
//   );
//   if (isProductsAvailable) {
//     createOrderJson(userName, order);
//     orderCreatedSuccess(response, order);
//   } else {
//     orderCreatedFail(response);
//   }
// };

module.exports = createOrder;
