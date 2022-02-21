let actionAllowed = true;

document.addEventListener("keydown", async (e) => {
  if (
    actionAllowed &&
    (e.key === "ArrowLeft" ||
      e.key === "ArrowUp" ||
      e.key === "ArrowDown" ||
      e.key === "ArrowRight")
  ) {
    let moving = false;
    actionAllowed = false;
    if (e.key === "ArrowLeft" && !e.repeat) {
      for (let i = 0; i <= 480; i += 120) {
        let state = ["free", "free", "free", "free", "free"];
        for (let j = 0; j <= 480; j += 120) {
          blocks().forEach((block) => {
            if (y(block) === i && x(block) === j) {
              let index =
                state.indexOf("occupied") == -1
                  ? state.indexOf("free")
                  : state.indexOf("occupied");
              let tempX = x(block);
              if (index == state.indexOf("free")) {
                block.style.marginLeft = `${index * 120}px`;
                state[index] = "occupied";
              } else if (index == state.indexOf("occupied")) {
                let occupiedBox = blocks().find(
                  (block_b) => x(block_b) == index * 120 && y(block_b) == i
                );
                if (occupiedBox.innerHTML == block.innerHTML) {
                  block.style.marginLeft = `${index * 120}px`;
                  state[index] = "blocked";
                } else {
                  block.style.marginLeft = `${(index + 1) * 120}px`;
                  state[index] = "blocked";
                  state[index + 1] = "occupied";
                }
              }
              if (x(block) != tempX) {
                moving = true;
              }
            }
          });
        }
      }
    } else if (e.key === "ArrowUp" && !e.repeat) {
      for (let i = 0; i <= 480; i += 120) {
        let state = ["free", "free", "free", "free", "free"];
        for (let j = 0; j <= 480; j += 120) {
          blocks().forEach((block) => {
            if (x(block) === i && y(block) === j) {
              let index =
                state.indexOf("occupied") == -1
                  ? state.indexOf("free")
                  : state.indexOf("occupied");
              let tempY = y(block);
              if (index == state.indexOf("free")) {
                block.style.marginTop = `${index * 120}px`;
                state[index] = "occupied";
              } else if (index == state.indexOf("occupied")) {
                let occupiedBox = blocks().find(
                  (block_b) => y(block_b) == index * 120 && x(block_b) == i
                );
                if (occupiedBox.innerHTML == block.innerHTML) {
                  block.style.marginTop = `${index * 120}px`;
                  state[index] = "blocked";
                } else {
                  block.style.marginTop = `${(index + 1) * 120}px`;
                  state[index] = "blocked";
                  state[index + 1] = "occupied";
                }
              }
              if (y(block) != tempY) {
                moving = true;
              }
            }
          });
        }
      }
    } else if (e.key === "ArrowRight" && !e.repeat) {
      for (let i = 0; i <= 480; i += 120) {
        let state = ["free", "free", "free", "free", "free"];
        for (let j = 480; j >= 0; j -= 120) {
          blocks().forEach((block) => {
            if (y(block) === i && x(block) === j) {
              let index =
                state.lastIndexOf("occupied") == -1
                  ? state.lastIndexOf("free")
                  : state.lastIndexOf("occupied");
              let tempX = x(block);
              if (index == state.lastIndexOf("free")) {
                block.style.marginLeft = `${index * 120}px`;
                state[index] = "occupied";
              } else if (index == state.lastIndexOf("occupied")) {
                let occupiedBox = blocks().find(
                  (block_b) => x(block_b) == index * 120 && y(block_b) == i
                );
                if (occupiedBox.innerHTML == block.innerHTML) {
                  block.style.marginLeft = `${index * 120}px`;
                  state[index] = "blocked";
                } else {
                  block.style.marginLeft = `${(index - 1) * 120}px`;
                  state[index] = "blocked";
                  state[index - 1] = "occupied";
                }
              }
              if (x(block) != tempX) {
                moving = true;
              }
            }
          });
        }
      }
    } else if (e.key === "ArrowDown" && !e.repeat) {
      for (let i = 0; i <= 480; i += 120) {
        let state = ["free", "free", "free", "free", "free"];
        for (let j = 480; j >= 0; j -= 120) {
          blocks().forEach((block) => {
            if (x(block) === i && y(block) === j) {
              let index =
                state.lastIndexOf("occupied") == -1
                  ? state.lastIndexOf("free")
                  : state.lastIndexOf("occupied");
              let tempY = y(block);
              if (index == state.lastIndexOf("free")) {
                block.style.marginTop = `${index * 120}px`;
                state[index] = "occupied";
              } else if (index == state.lastIndexOf("occupied")) {
                let occupiedBox = blocks().find(
                  (block_b) => y(block_b) == index * 120 && x(block_b) == i
                );
                if (occupiedBox.innerHTML == block.innerHTML) {
                  block.style.marginTop = `${index * 120}px`;
                  state[index] = "blocked";
                } else {
                  block.style.marginTop = `${(index - 1) * 120}px`;
                  state[index] = "blocked";
                  state[index - 1] = "occupied";
                }
              }
              if (y(block) != tempY) {
                moving = true;
              }
            }
          });
        }
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 150));
    let dupilcat = [];
    let beAnimated = [];
    for (let i = 0; i < blocks().length; i++) {
      for (let j = 0; j < blocks().length; j++) {
        if (
          i != j &&
          x(blocks()[i]) == x(blocks()[j]) &&
          y(blocks()[i]) == y(blocks()[j])
        ) {
          if (
            !dupilcat.find(
              (block) =>
                x(block) == x(blocks()[i]) && y(block) == y(blocks()[i])
            )
          ) {
            dupilcat.push(blocks()[i]);
            beAnimated.push(blocks()[j]);
            blocks()[j].innerHTML = Number(blocks()[j].innerHTML) * 2;
          }
        }
      }
    }
    dupilcat.forEach((block) => {
      block.remove();
    });

    let colorsAndSize = [
      { color: "#eee1c9", size: "55px", value: 4 },
      { color: "#f3b27a", size: "55px", value: 8 },
      { color: "#f69664", size: "55px", value: 16 },
      { color: "#f77c5f", size: "55px", value: 32 },
      { color: "#f75f3b", size: "55px", value: 64 },
      { color: "#edd073", size: "45px", value: 128 },
      { color: "#edcc62", size: "45px", value: 256 },
      { color: "#edc950", size: "45px", value: 512 },
      { color: "#edc53f", size: "35px", value: 1024 },
      { color: "#edc55f", size: "35px", value: 2048 },
    ];
    beAnimated.forEach((block) => {
      block.style.background = colorsAndSize.find(
        (obj) => obj.value == block.innerHTML
      ).color;
      block.style.transform = "scale(1.130)";
    });
    beAnimated.forEach((block) => {
      block.style["font-size"] = colorsAndSize.find(
        (obj) => obj.value == block.innerHTML
      ).size;
    });
    await new Promise((resolve) => setTimeout(resolve, 50));
    if (moving) {
      renderBlock();
    }

    beAnimated.forEach((block) => {
      block.style.transform = "scale(1)";
    });
    await new Promise((resolve) => setTimeout(resolve, 50 + (100 - 50)));
    actionAllowed = true;

    if (blocks().length == 25) {
      let gameOver = true;
      blocks().forEach((block_1) => {
        let blockA = blocks().find(
          (block_2) =>
            x(block_1) == x(block_2) && y(block_1) - 120 == y(block_2)
        );
        let blockB = blocks().find(
          (block_2) =>
            x(block_1) + 120 == x(block_2) && y(block_1) == y(block_2)
        );
        let blockC = blocks().find(
          (block_2) =>
            x(block_1) == x(block_2) && y(block_1) + 120 == y(block_2)
        );
        let blockD = blocks().find(
          (block_2) =>
            x(block_1) - 120 == x(block_2) && y(block_1) == y(block_2)
        );

        if (
          (blockA && blockA.innerHTML == block_1.innerHTML) ||
          (blockB && blockB.innerHTML == block_1.innerHTML) ||
          (blockC && blockC.innerHTML == block_1.innerHTML) ||
          (blockD && blockD.innerHTML == block_1.innerHTML)
        ) {
          gameOver = false;
        }
      });

      if (gameOver) {
        actionAllowed = false;
        alert("Game over");
      }
    }
  }
});
//getting all active blocks
const blocks = () => {
  return Array.from(document.querySelectorAll(".block--active"));
};

//getting coordinates
const x = (block) => {
  return Number(block.style.marginLeft.split("px")[0]);
};

const y = (block) => {
  return Number(block.style.marginTop.split("px")[0]);
};

//rendering block
const renderBlock = () => {
  let values = [0, 120, 240, 360, 480];
  let blockValues = blocks().map((block) => `${x(block)} ${y(block)}`);
  let randX;
  let randY;
  do {
    randX = values[Math.floor(Math.random() * values.length)];
    randY = values[Math.floor(Math.random() * values.length)];
  } while (blockValues.includes(`${randX} ${randY}`));
  let style = `margin-left: ${randX}px; margin-top: ${randY}px; background: #eee4da`;
  document
    .querySelector(".field")
    .insertAdjacentHTML(
      "beforeend",
      `<div class="block--active" style='${style}'>2</div>`
    );

  blocks()[blocks().length - 1].animate(
    [{ clipPath: "circle(0%)" }, { clipPath: "circle(100%)" }],
    {
      duration: 100,
      easing: "linear",
    }
  );
};

renderBlock();
renderBlock();
