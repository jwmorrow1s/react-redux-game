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

const enemySize = 20;

const initialState = {
  enemies: [{ id: 0, x: null, y: null, color: "hsla(0, 0%, 0%, 1)" }],
  xMin: 5,
  xMax: 0,
  yMin: 0,
  yMax: 0,
  playerColor: "hsla(0, 0%, 0%, 1)",
  player: { x: null, y: null, color: "hsla(0, 0%, 0%, 1)" },
  enemyInitialized: false,
  frame20: 0,
  gameOver: false,
  additionalEnemies: genRandom(3, 1),
  upgradeAccepted: false
};

const enemyReducer = (state = initialState, action) => {
  switch (action.type) {
    case "INIT_PLAYER": {
      const { xMax, yMin } = action.payload;
      return {
        ...state,
        enemies: [
          {
            id: 0,
            x: 300,
            y: yMin - enemySize,
            color: genRandomColor()
          }
        ],
        xMax,
        yMin: yMin - enemySize,
        yMax: yMin - 100
      };
    }

    case "MOVEMENT_UPDATE": {
      const {
        enemies,
        xMin,
        xMax,
        yMin,
        yMax,
        frame20,
        gameOver,
        upgradeAccepted
      } = state;

      if (gameOver || !upgradeAccepted) return state;

      if (frame20 < 20) {
        return { ...state, frame20: frame20 + 1 };
      }

      return {
        ...state,
        enemies: enemies.map(enem => {
          const xVector = genRandomVect(1);
          const yVector = genRandomVect(1);
          const updateX = xVector * genRandom(30);
          const updateY = yVector * genRandom(50);
          const xGtThanMin = enem.x + updateX >= xMin;
          const xLsThanMax = enem.x + updateX <= xMax;
          const yLsThanMin = enem.y + updateY <= yMin;
          const yGtThanMax = enem.y + updateY >= yMax;

          const conditionX =
            enem.x + updateX >= xMin && enem.x + updateX <= xMax ? true : false;
          const conditionY =
            enem.y + updateY <= yMin && enem.y + updateY >= yMax ? true : false;

          return {
            id: enem.id,
            color: enem.color,
            x: conditionX
              ? enem.x + updateX
              : xGtThanMin
                ? xLsThanMax
                  ? enem.x + updateX
                  : enem.x - (xMax - enem.x)
                : enem.x + (enem.x - xMin),
            y: conditionY
              ? enem.y + updateY
              : yLsThanMin
                ? yGtThanMax
                  ? enem.y + updateY
                  : enem.y - (enem.y - yMax)
                : enem.y + (yMin - enem.y)
          };
        }),
        frame20: 0
      };
    }

    case "ADD_ENEMIES": {
      const { numEnemiesToAdd } = action.payload;
      const { enemies, yMin } = state;
      let xOffset = 200;
      for (let i = 1; i <= numEnemiesToAdd; i++) {
        enemies.push({
          id: i,
          x: enemies[0].x + xOffset * i,
          y: yMin - enemySize,
          color: genRandomColor()
        });
        console.log(enemies);
      }
      return { ...state, enemies };
    }

    case "POWER_UP_JUMP":
    case "POWER_UP_SPEED": {
      return { ...state, upgradeAccepted: true };
    }

    case "COLLISION_DEATH": {
      return { ...state, gameOver: true };
    }

    default: {
      return state;
    }
  }
};

export default enemyReducer;
