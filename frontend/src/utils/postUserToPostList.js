export const postUserToPostList = (user, commentposts) => {
  const userInfo = user[0];
  const postList = user[1].map((userPost) => {
    let post = { ...userPost };
    const comments = commentposts.filter((value) => {
      return value.idPost === post.id;
    });
    post = {
      ...post,
      idUser: userInfo.id,
      username: userInfo.username,
      name: userInfo.name,
      lastname: userInfo.lastname,
      avatar: userInfo.avatar,
      privacy: userInfo.privacy,
      idPost: post.id,
      comments: comments.length > 0 ? comments[0].comments : [],
    };

    delete post.id;

    return post;
  });
  return postList;
};
