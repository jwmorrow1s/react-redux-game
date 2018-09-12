const parseCoordinatesFromDomElements = htmlCollection => {
  return Array.prototype.map.call(htmlCollection, node => {
    return {
      type: node.id,
      top: node.getBoundingClientRect().top,
      bottom: node.getBoundingClientRect().bottom
    };
  });
};

const detectCollision = (objectPositionDataArray, tolerance) => {
  const player = objectPositionDataArray.find(obj => obj.type === "Player");
  const isCollision = objectPositionDataArray.find(
    obj =>
      obj.type !== "Player" && Math.abs(player.bottom - obj.top) <= tolerance
  );
  return isCollision ? true : false;
};

export const gravity = (dispatch, htmlCollection) => {
  const isCollision = detectCollision(
    parseCoordinatesFromDomElements(htmlCollection),
    2
  );

  if (!isCollision) {
    dispatch({ type: "MOV_FALL" });
  } else {
    dispatch({ type: "MOV_LAND" });
  }
};

export const handleMovement = keysDown => {
  return {
    ArrowLeft: keysDown["ArrowLeft"],
    ArrowRight: keysDown["ArrowRight"],
    " ": keysDown[" "],
    ArrowDown: keysDown["ArrowDown"]
  };
};

/*
:: function updateKeysDown ::
Takes oldKeysDown and newKeysDown and will
ensure that left/right or up/down are not pressed simultaneously.
Will return oldKeys values if there's no conflict.
*/
export const updateKeysDown = (oldKeysDown, newKeysDown) => {
  return {
    ArrowLeft: newKeysDown["ArrowRight"]
      ? false
      : newKeysDown["ArrowLeft"]
        ? true
        : oldKeysDown["ArrowLeft"],
    ArrowRight: newKeysDown["ArrowLeft"]
      ? false
      : newKeysDown["ArrowRight"]
        ? true
        : oldKeysDown["ArrowRight"],
    " ": newKeysDown["ArrowDown"]
      ? false
      : newKeysDown[" "]
        ? true
        : oldKeysDown[" "],
    ArrowDown: newKeysDown[" "]
      ? false
      : newKeysDown["ArrowDown"]
        ? true
        : oldKeysDown["ArrowDown"]
  };
};

export default gravity;
