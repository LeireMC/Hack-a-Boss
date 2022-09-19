export const getAllPostsService = async () => {
  const res = await fetch(`${process.env.REACT_APP_API_URL}/posts`);

  const body = await res.json();

  if (!res.ok) {
    throw new Error(
      "Unexpected error fetching API. Please, try again or contact support"
    );
  }

  return body.data;
};
