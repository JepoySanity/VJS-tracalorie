//item controller
const itemController = (() => {
  //constructor
  const item = (id, name, calories) => {
    this.id = id;
    this.name = name;
    this.calories = calories;
  };
  //state
  const state = {
    items: [
      { id: 0, name: "adobo", calories: 1200 },
      { id: 1, name: "pandesal", calories: 400 },
      { id: 2, name: "kamote", calories: 600 },
    ],
    currentItem: null,
    totalCalories: 0,
  };

  return {
    logData: () => {
      return state;
    },
  };
})();

//ui controller
const uiController = (() => {
  return {};
})();

//app controller
const app = ((itemController, uiController) => {
  return {
    init: () => {
      console.log("initializing app brt brt brt. . . . ");
    },
  };
})(itemController, uiController);

app.init();
