const Comment = require("../../modules/db/schemas/comment");
const {
  productQuerySuccess,
  productQueryFailed
} = require("./configs/responses");

const getComments = (request, response) => {
  const {
    query: { productId }
  } = request;
  const getCleanQuery = query =>
    query.split(",").map(i => i.replace(/["\<>\s\ \\\'']/gm, ""));

  const cleanId = getCleanQuery(productId);

  const findComment = Comment.find({ product: { $in: cleanId } });

  findComment
    .populate("author", "email")
    .populate("product", "name")
    .exec((err, populatedComment) => {
      if (err) {
        console.error("ERROR: ", err.message), productQueryFailed(response);
      } else {
        productQuerySuccess(response, populatedComment);
      }
    });
};
module.exports = getComments;
