const handleBurgerMenu = function() {
  const hamburger = document.querySelector(".hamburger");
  const navigation = document.querySelector(".navigation");

  const triggerItems = document.querySelectorAll(
    ".hamburger, .navigation__item"
  );

  const handleClick = () => {
    hamburger.classList.toggle("hamburger--active");
    navigation.classList.toggle("navigation--active");
  };

  triggerItems.forEach(item => {
    item.addEventListener("click", handleClick);
  });
};

export default handleBurgerMenu;
