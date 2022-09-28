import randomNumber from "./randomNumber";

const randomLetter = (): string => {
  const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!#$%^&*()";

  return alphabet.charAt(randomNumber(0, alphabet.length));
};

export default randomLetter;