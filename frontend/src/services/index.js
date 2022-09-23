export const getAllPostsService = async (searchParams, token) => {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/posts?${searchParams.toString()}`,
    {
      headers: { Authorization: token },
    }
  );

  const body = await res.json();

  if (!res.ok) {
    throw new Error(
      "Unexpected error fetching API. Please, try again or contact support"
    );
  }

  return body.data;
};

export const getLikeStatus = async (idPost, token) => {
  const res = await fetch(
    `${process.env.REACT_APP_API_URL}/post/${idPost}}/isLiked`,
    {
      headers: { Authorization: token },
    }
  );

  const body = await res.json();

  if (!res.ok) {
    throw new Error(
      "Unexpected error fetching API. Please, try again or contact support"
    );
  }

  return body.data;
};
