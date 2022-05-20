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
    getTotalCalories: () => {
      let total = 0;
      state.items.forEach((item) => {
        total += item.calories;
      });

      state.totalCalories = total;
      return state.totalCalories;
    },
    getItemByID: (id) => {
      let found;
      state.items.forEach((item) => {
        if (item.id === id) {
          found = item;
        }
      });
      return found;
    },
    updateItem: (name, calorie) => {
      calorie = parseInt(calorie);

      let found = null;
      state.items.forEach((item) => {
        if (item.id === state.currentItem.id) {
          item.name = name;
          item.calories = calorie;
          found = item;
        }
      });
      return found;
    },
    deleteItem: (id) => {
      ids = state.items.map((item) => {
        return item.id;
      });

      const index = ids.indexOf(id);
      state.items.splice(index, 1);
    },

    clearAllItems: () => {
      state.items = [];
    },

    setCurrentItem: (item) => {
      state.currentItem = item;
    },
    getCurrentItem: () => {
      return state.currentItem;
    },
  };
})();

//ui controller
const uiController = (() => {
  const uiSelectors = {
    itemList: "#item-list",
    listItems: "#item-list li",
    addBtn: ".add-btn",
    updateBtn: ".update-btn",
    deleteBtn: ".delete-btn",
    backBtn: ".back-btn",
    clearBtn: ".clear-btn",
    itemNameInput: "#item-name",
    itemCaloriesInput: "#item-calories",
    totalCalories: ".total-calories",
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

    updateListItem: (item) => {
      let listItems = document.querySelectorAll(uiSelectors.listItems);
      listItems = Array.from(listItems);

      listItems.forEach((listItem) => {
        let itemId = listItem.getAttribute("id");
        if (itemId === `item-${item.id}`) {
          document.querySelector(`#${itemId}`).innerHTML = `
          <strong>${item.name}: </strong> <em>${item.calories} Calories</em>
          <a href="#" class="secondary-content">
            <i class="edit-item fa fa-pencil"></i>
          </a>`;
        }
      });
    },

    deleteListItem: (id) => {
      const itemID = `#item-${id}`;
      const item = document.querySelector(itemID);
      item.remove();
    },

    hideList: () => {
      document.querySelector(uiSelectors.itemList).style.display = "none";
    },

    clearInput: () => {
      document.querySelector(uiSelectors.itemNameInput).value = "";
      document.querySelector(uiSelectors.itemCaloriesInput).value = "";
    },

    addItemToForm: () => {
      document.querySelector(uiSelectors.itemNameInput).value =
        itemController.getCurrentItem().name;
      document.querySelector(uiSelectors.itemCaloriesInput).value =
        itemController.getCurrentItem().calories;
      uiController.showEditState();
    },

    removeItems: () => {
      let listItems = document.querySelectorAll(uiSelectors.listItems);

      listItems = Array.from(listItems);
      listItems.forEach((item) => {
        item.remove();
      });
    },

    showTotalCalories: (totalCalories) => {
      document.querySelector(uiSelectors.totalCalories).textContent =
        totalCalories;
    },

    clearEditState: () => {
      uiController.clearInput();
      document.querySelector(uiSelectors.updateBtn).style.display = "none";
      document.querySelector(uiSelectors.deleteBtn).style.display = "none";
      document.querySelector(uiSelectors.backBtn).style.display = "none";
      document.querySelector(uiSelectors.addBtn).style.display = "inline";
    },

    showEditState: () => {
      document.querySelector(uiSelectors.updateBtn).style.display = "inline";
      document.querySelector(uiSelectors.deleteBtn).style.display = "inline";
      document.querySelector(uiSelectors.backBtn).style.display = "inline";
      document.querySelector(uiSelectors.addBtn).style.display = "none";
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

    document.addEventListener("keypress", (e) => {
      if (e.keyCode === 13 || e.which === 13) {
        e.preventDefault();
        return false;
      }
    });

    document
      .querySelector(uiSelector.itemList)
      .addEventListener("click", itemEditClick);

    document
      .querySelector(uiSelector.updateBtn)
      .addEventListener("click", itemUpdateSubmit);

    document
      .querySelector(uiSelector.deleteBtn)
      .addEventListener("click", itemDeleteSubmit);

    document
      .querySelector(uiSelector.backBtn)
      .addEventListener("click", uiController.clearEditState);

    document
      .querySelector(uiSelector.clearBtn)
      .addEventListener("click", clearItems);
  };

  const itemAddSubmit = (e) => {
    e.preventDefault();
    const input = uiController.getItemInput();
    if (input.name !== "" && input.calories !== "") {
      const newItem = itemController.addItem(input.name, input.calories);
      uiController.addListItem(newItem);
      const totalCalories = itemController.getTotalCalories();
      uiController.showTotalCalories(totalCalories);
      uiController.clearInput();
    }
  };

  const itemEditClick = (e) => {
    e.preventDefault();
    if (e.target.classList.contains("edit-item")) {
      const listId = e.target.parentNode.parentNode.id;
      const listArr = listId.split("-");
      const id = parseInt(listArr[1]);
      const itemToEdit = itemController.getItemByID(id);
      itemController.setCurrentItem(itemToEdit);
      uiController.addItemToForm();
    }
  };

  const itemUpdateSubmit = (e) => {
    e.preventDefault();
    const input = uiController.getItemInput();
    const updatedItem = itemController.updateItem(input.name, input.calories);
    uiController.updateListItem(updatedItem);
    const totalCalories = itemController.getTotalCalories();
    uiController.showTotalCalories(totalCalories);
    uiController.clearEditState();
  };

  const clearItems = () => {
    itemController.clearAllItems();
    const totalCalories = itemController.getTotalCalories();
    uiController.showTotalCalories(totalCalories);
    uiController.removeItems();
    uiController.hideList();
  };

  const itemDeleteSubmit = (e) => {
    const currentItem = itemController.getCurrentItem();
    itemController.deleteItem(currentItem.id);
    uiController.deleteListItem(currentItem.id);
    const totalCalories = itemController.getTotalCalories();
    uiController.showTotalCalories(totalCalories);
    uiController.clearEditState();
    e.preventDefault();
  };

  return {
    init: () => {
      uiController.clearEditState();
      console.log("initializing app brt brt brt. . . . ");
      const items = itemController.getItems();
      if (items.length === 0) {
        uiController.hideList;
      } else {
        uiController.populateItemList(items);
      }
      const totalCalories = itemController.getTotalCalories();
      uiController.showTotalCalories(totalCalories);
      loadEventListeners();
    },
  };
})(itemController, uiController);

//initialize app
app.init();
