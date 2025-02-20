export const firstLetterUpper = (str: string) =>
  str[0].toUpperCase() + str.slice(1);

export const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
