const collisionDetection = dispatch => {
  return setInterval(() => {
    const playerAndCollidableEntities = document.querySelector(".Level")
      .children;
    const player = Array.prototype.find.call(
      playerAndCollidableEntities,
      thing => thing.id === "Player"
    );
    const enemies = Array.prototype.filter.call(
      playerAndCollidableEntities,
      node => node.className === "Enemy"
    );
    const playerRect = player.getBoundingClientRect();
    const enemiesRectArr = enemies.map(enemy => enemy.getBoundingClientRect());
    const playerPos = {
      left: playerRect.left,
      right: playerRect.right,
      top: playerRect.top,
      bottom: playerRect.bottom
    };
    const enemiesPosArray = enemiesRectArr.map((enemy, i) => {
      return {
        left: enemiesRectArr[i].left,
        right: enemiesRectArr[i].right,
        top: enemiesRectArr[i].top,
        bottom: enemiesRectArr[i].bottom
      };
    });

    if (
      enemiesPosArray.find(enemyPos => {
        const playerWithinEnemyXRange =
          (playerPos.left >= enemyPos.left &&
            playerPos.left <= enemyPos.right) ||
          (playerPos.right >= enemyPos.left &&
            playerPos.right <= enemyPos.right);
        //backwards because the y axis is distance from top of screen
        const playerWithinEnemyYRange =
          (playerPos.top >= enemyPos.top && playerPos.top <= enemyPos.bottom) ||
          (playerPos.bottom >= enemyPos.top &&
            playerPos.bottom <= enemyPos.bottom);

        return playerWithinEnemyXRange && playerWithinEnemyYRange;
      })
    ) {
      dispatch({ type: "COLLISION_DEATH" });
    }
  }, 1000 / 16);
};

export default collisionDetection;
