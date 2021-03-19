export function detectCollision(ball, gameObject) {
  // collision with gameObject
  let ballTop = ball.position.y - ball.radius;
  let ballBottom = ball.position.y + ball.radius;
  let ballLeft = ball.position.x + ball.radius;
  let ballRight = ball.position.x - ball.radius;

  let gameObjectTop = gameObject.position.y;
  let gameObjectBottom = gameObjectTop + gameObject.height;
  let gameObjectLeft = gameObject.position.x;
  let gameObjectRight = gameObjectLeft + gameObject.width;

  if (
    ballBottom >= gameObjectTop &&
    ballTop <= gameObjectBottom &&
    ballLeft >= gameObjectLeft &&
    ballRight <= gameObjectRight
  ) {
    let hitPositions = {
      top: ballBottom - gameObjectTop,
      bottom: ballTop - gameObjectBottom,
      left: ballLeft - gameObjectLeft,
      right: ballRight - gameObjectRight,
    };
    return detectHitPosition(hitPositions);
  }
  return false;
}

function detectHitPosition(hitPositions) {
  const goal = 0;
  return Object.keys(hitPositions).reduce((prev, curr, index, array) =>
    Math.abs(hitPositions[curr] - goal) < Math.abs(hitPositions[prev] - goal)
      ? curr
      : prev
  );
}
