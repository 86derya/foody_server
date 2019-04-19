const Comment = require("../../modules/db/schemas/comment");

const { createdFailed, createdSuccess } = require("./configs/responses");

const createComment = (request, response) => {
  const id = request.params.id;
  const comment = request.body;
  console.log(id);
  console.log(comment);

  const newComment = new Comment(comment);

  newComment.save(function(err) {
    if (err) {
      console.log(err), createdFailed(response, err.message);
    } else {
      createdSuccess(response, newComment);
    }
  });
};

module.exports = createComment;
