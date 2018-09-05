//currently passed dispatch from Player component. Not ideal
//what is the correct import?
const handleMovement = (dispatch, e) => {
  e.preventDefault();
  switch (e.key) {
    case "ArrowRight": {
      dispatch({ type: "MOV_R" });
      return;
    }
    case "ArrowLeft": {
      dispatch({ type: "MOV_L" });
      return;
    }
    case "ArrowUp": {
      dispatch({ type: "MOV_U" });
      return;
    }
    case "ArrowDown": {
      dispatch({ type: "MOV_D" });
      return;
    }
    default:
      return;
  }
};

export default handleMovement;