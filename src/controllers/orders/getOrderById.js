const Order = require("../../modules/db/schemas/order");
const {
  orderSearchByIdSuccess,
  orderSearchByIdFail
} = require("../auth/configs/responses");

const getOrderById = (request, response) => {
  const id = request.params.id;

  const findOrder = Order.findById(id);

  findOrder
    .then(order => {
      orderSearchByIdSuccess(response, order);
    })
    .catch(err => {
      orderSearchByIdFail(response);
    });
};

module.exports = getOrderById;
