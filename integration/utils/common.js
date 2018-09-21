const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

export const randomString = length => {
  let res = "";

  for (let i = 0; i < length; i++)
    res += letters.charAt(Math.floor(Math.random() * letters.length));

  return res;
};
