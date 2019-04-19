const MENU_ITEM = require("../../modules/db/schemas/menu-item");
const { idSerchSuccess, idSearchFailed } = require("./configs/responses");

const getMenuItemById = (request, response) => {
  const id = request.params.id;

  const findMenuItem = MENU_ITEM.findById(id);

  findMenuItem.populate("ingredients").exec((err, populatedMenuItem) => {
    if (err) {
      console.error("ERROR: ", err.message), idSearchFailed(response);
    } else {
      idSerchSuccess(response, populatedMenuItem);
    }
  });
};

module.exports = getMenuItemById;
