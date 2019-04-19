const MENU_ITEM = require("../../modules/db/schemas/menu-item");

const {
  allMenuItemsfromDbFailed,
  allMenuItemsfromDbSuccess,
  ctgryQueryFailed,
  ctgryQuerySuccess,
  idsQuerySuccess,
  idsQueryFailed
} = require("./configs/responses");

const getMenuItems = (request, response) => {
  const {
    query: { category, ids }
  } = request;

  const getCleanQuery = query =>
    query.split(",").map(i => i.replace(/["\<>\\\'']/gm, "").trim());

  if (category || ids) {
    if (category) {
      const cleanCategoryQry = getCleanQuery(category);

      MENU_ITEM.find({})
        .populate("category")
        .exec(function(err, allMenuItems) {
          if (err || allMenuItems.length === 0) {
            ctgryQueryFailed(response);
          } else {
            let items = [];

            allMenuItems.map(i =>
              i.category.map(e =>
                cleanCategoryQry.includes(e.name) ? items.push(i) : null
              )
            );
            items.length > 0
              ? ctgryQuerySuccess(response, items)
              : ctgryQueryFailed(response);
          }
        });
    }
    if (ids) {
      const cleanIdsQry = getCleanQuery(ids);
      MENU_ITEM.find({ _id: { $in: cleanIdsQry } }, function(err, menuItems) {
        if (err) {
          idsQueryFailed(response);
        } else {
          idsQuerySuccess(response, menuItems);
        }
      });
    }
  } else {
    const foundtItems = MENU_ITEM.find({});
    foundtItems
      .populate("category")
      .populate("ingredients")
      // .populate("comments")
      .exec(function(err, menuItems) {
        if (err) {
          allMenuItemsfromDbFailed(response, err);
        } else {
          allMenuItemsfromDbSuccess(response, menuItems);
        }
      });
  }
};
module.exports = getMenuItems;
