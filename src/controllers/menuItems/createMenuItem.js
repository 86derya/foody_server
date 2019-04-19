const MENU_ITEM = require("../../modules/db/schemas/menu-item");

const { createdFailed, createdSuccess } = require("./configs/responses");

const createMenuItem = (request, response) => {
  const menuItem = request.body;

  const newMenuItem = new MENU_ITEM(menuItem);

  newMenuItem.save(function(err) {
    if (err) {
      console.log(err), createdFailed(response, err.message);
    } else {
      createdSuccess(response, newMenuItem);
    }
  });
};

module.exports = createMenuItem;
