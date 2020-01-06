import SmScrollFunct from "../StaticItemSmoothScroll/StaticItemSmoothScroll";

// Main variables:
const menuQuery = ".c-menu a";

//Higher order functions
function curry(fn) {
  return function(query) {
    return fn(query);
  };
}

//Auxiliary function
function selectItems(query) {
  return document.querySelectorAll(query);
}

function getId({ href }) {
  return href.split("/#").pop();
}

function AddSmScrollToArray(array) {
  for (const item of array) {
    const targetId = getId(item);
    item.addEventListener("click", () => SmScrollFunct(targetId, 1000));
  }
}

//Functions calls
const menuItems = curry(selectItems)(menuQuery);

//Ready to export function component

const AddSmScrollToMainMenu = function() {
  AddSmScrollToArray(menuItems);
};

export default AddSmScrollToMainMenu;
