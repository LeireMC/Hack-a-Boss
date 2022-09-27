const decodedTokenInfo = (token) => {
  if (!token) {
    return null;
  }
  const decodedToken = JSON.parse(atob(token.split(".")[1]));

  return decodedToken.id;
};

export default decodedTokenInfo;
