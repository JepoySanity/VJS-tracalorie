//item controller
const itemController = (() => {
  //constructor
  const Item = function (id, name, calories) {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };
  //state
  const state = {
    items: [
      // { id: 0, name: "adobo", calories: 1200 },
      // { id: 1, name: "pandesal", calories: 400 },
      // { id: 2, name: "kamote", calories: 600 },
    ],
    currentItem: null,
    totalCalories: 0,
  };

  return {
    getItems: () => {
      return state.items;
    },
    addItem: (name, calories) => {
      let id;
      if (state.items.length > 0) {
        id = state.items[state.items.length - 1].id + 1;
      } else {
        id = 0;
      }

      const parseCal = parseInt(calories);

      newItem = new Item(id, name, parseCal);

      state.items.push(newItem);

      return newItem;
    },
    logData: () => {
      return state;
    },
  };
})();

//ui controller
const uiController = (() => {
  const uiSelectors = {
    itemList: "#item-list",
    addBtn: ".add-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
  };
  return {
    populateItemList: (items) => {
      let html = "";
      items.forEach((item) => {
        html += `
        <li class="collection-item" id="item-${item.id}">
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>
        </li>
        `;
      });
      document.querySelector(uiSelectors.itemList).innerHTML = html;
    },
    getSelectors: () => {
      return uiSelectors;
    },
    getItemInput: () => {
      return {
        name: document.querySelector(uiSelectors.itemNameInput).value,
        calories: document.querySelector(uiSelectors.itemCaloriesInput).value,
      };
    },
    addListItem: (item) => {
      document.querySelector(uiSelectors.itemList).style.display = "block";
      const li = document.createElement("li");
      li.className = "collection-item";
      li.id = `item-${item.id}`;
      li.innerHTML = `
      <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;
      document
        .querySelector(uiSelectors.itemList)
        .insertAdjacentElement("beforeend", li);
    },
    hideList: () => {
      document.querySelector(uiSelectors.itemList).style.display = "none";
    },
    clearInput: () => {
      document.querySelector(uiSelectors.itemNameInput).value = "";
      document.querySelector(uiSelectors.itemCaloriesInput).value = "";
    },
  };
})();

//app controller
const app = ((itemController, uiController) => {
  const loadEventListeners = () => {
    const uiSelector = uiController.getSelectors();
    document
      .querySelector(uiSelector.addBtn)
      .addEventListener("click", itemAddSubmit);
  };
  const itemAddSubmit = (e) => {
    e.preventDefault();
    const input = uiController.getItemInput();
    if (input.name !== "" && input.calories !== "") {
      const newItem = itemController.addItem(input.name, input.calories);
      uiController.addListItem(newItem);
      uiController.clearInput();
    }
  };

  return {
    init: () => {
      console.log("initializing app brt brt brt. . . . ");
      const items = itemController.getItems();
      if (items.length === 0) {
        uiController.hideList;
      } else {
        uiController.populateItemList(items);
      }
      loadEventListeners();
    },
  };
})(itemController, uiController);

//initialize app
app.init();
