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

export const getPostnumLikes = async (idPost) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/posts/${idPost}`);

  const body = await res.json();

  if (!res.ok) {
    throw new Error(
      "Unexpected error fetching API. Please, try again or contact support"
    );
  }

  return body.data[3].numLikes;
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

export const getUserFavorites = async (token) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/favorites`, {
    headers: { Authorization: token },
  });

  const body = await res.json();

  if (!res.ok) {
    throw new Error(
      "Unexpected error fetching API. Please, try again or contact support"
    );
  }

  return body.data;
};

export const getUserByIdService = async (navigate, idUser) => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/user/${idUser}`);

  const body = await res.json();

  if (!res.ok) {
    if (res.status === 404) {
      navigate("/notfound");
    }

    throw new Error(body.message);
  }
  console.log(body.data);
  return body.data;
};
