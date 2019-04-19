const MENU_ITEM = require("../../modules/db/schemas/menu-item");
const {
  productUpdateSuccess,
  productUpdateFailed
} = require("./configs/responses");

const createComment = (request, response) => {
  const id = request.params.id;
  const comment = request.body;

  let now = new Date();

  let options = {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false
  };

  // let now = new Date();
  // dateformat(now, "dddd, mmmm dS, yyyy, h:MM:ss TT");

  // const today = new Date();
  // const date =
  //   today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();
  // const time =
  //   today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
  // const dateTime = date + " " + time;
  const newComment = {
    ...comment,
    createdAt: now.toLocaleString("en-us", options)
  };

  MENU_ITEM.findOneAndUpdate(
    { _id: id },
    { $push: { comments: newComment } },
    { new: true },
    function(error, product) {
      if (error) {
        console.log(error), productUpdateFailed(response);
      } else {
        productUpdateSuccess(response, product);
      }
    }
  );
};

module.exports = createComment;
