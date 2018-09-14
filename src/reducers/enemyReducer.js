const enemySize = 20;
// const MAGIC_OFFSET = 25; //seriously, WTF?

const initialState = {
  enemies: [{ id: 0, x: null, y: null, color: "hsla(0, 0%, 0%, 1)" }],
  xMin: 5,
  xMax: 0,
  yMin: 0,
  yMax: 0,
  playerColor: "hsla(0, 0%, 0%, 1)",
  player: { x: null, y: null, color: "hsla(0, 0%, 0%, 1)" },
  enemyInitialized: false,
  frame5: 0
};

const genRandom = (high, low = 0) => {
  return Math.floor(Math.random() * (high - low + 1)) + low;
};

const genRandomVect = num => {
  const sign = genRandom(1) > 0 ? 1 : -1;
  return num * sign;
};

const genRandomColor = playerColor => {
  const allColors = [
    { color: "hsla(0, 100%, 50%, 1)" },
    { color: "hsla(30, 100%, 50%, 1)" },
    { color: "hsla(60, 100%, 50%, 1)" },
    { color: "hsla(90, 100%, 50%, 1)" },
    { color: "hsla(240, 100%, 50%, 1)" },
    { color: "hsla(270, 100%, 50%, 1)" },
    { color: "hsla(300, 100%, 50%, 1)" }
  ];
  const possibleColors = allColors.filter(color => color.color !== playerColor);
  return possibleColors[genRandom(possibleColors.length - 1)].color;
};

const enemyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INIT_PLAYER": {
      const { xMax, yMin } = action.payload;
      return {
        ...state,
        enemies: [
          {
            x: 300,
            y: yMin - enemySize,
            color: genRandomColor()
          }
        ],
        xMax,
        yMin: yMin - enemySize,
        yMax: yMin - 40
      };
    }

    case "MOVEMENT_UPDATE": {
      const { enemies, xMin, xMax, yMin, yMax, frame5 } = state;
      if (frame5 < 5) {
        console.log("firing");
        return { ...state, frame5: frame5 + 1 };
      }

      return {
        ...state,
        enemies: enemies.map(enem => {
          const updateX = genRandomVect(genRandom(30));
          const updateY = genRandomVect(genRandom(30));
          const conditionX =
            enem.x + updateX >= xMin && enem.x + updateX <= xMax ? true : false;
          const conditionY =
            enem.y + updateY <= yMin && enem.y + updateY >= yMax ? true : false;
          return {
            id: enem.id,
            color: enem.color,
            x: conditionX ? enem.x + updateX : enem.x,
            y: conditionY ? enem.y + updateY : enem.y
          };
        }),
        frame5: 0
      };
    }

    default: {
      return state;
    }
  }
};

export default enemyReducer;
