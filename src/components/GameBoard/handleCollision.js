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

export default gravity;
