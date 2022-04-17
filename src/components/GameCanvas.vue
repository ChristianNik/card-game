
<script setup>
import { onMounted } from "vue";
import { CardRender, VillagerCardRender } from "../logic/canvas";
import { generateId } from "../utils";

class GameObject {
  constructor(x = 0, y = 0) {
    this._id = generateId();
    this.x = x;
    this.y = y;
    this.width = 182;
    this.height = 227;
  }

  render(ctx) {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
}

class CardObject extends GameObject {
  constructor(
    x,
    y,
    title = "Placeholder",
    primaryColor = "#61605B",
    accentColor = "#43423D",
    textColor = "#fff"
  ) {
    super(x, y);
    this.title = title;
    this.primaryColor = primaryColor;
    this.accentColor = accentColor;
    this.textColor = textColor;
  }

  render(ctx) {
    const headerHeight = 40;
    const borderRadius = 5;

    // ground border
    ctx.lineWidth = 6;
    ctx.roundRect(this.x, this.y, this.width, this.height, borderRadius);
    ctx.stroke();

    // ground
    ctx.fillStyle = this.accentColor;
    ctx.roundRect(this.x, this.y, this.width, this.height, borderRadius);
    ctx.fill();

    // ground border
    ctx.fillStyle = this.primaryColor;
    ctx.roundRect(this.x, this.y, this.width, headerHeight, borderRadius);
    ctx.fill();

    // header border
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + headerHeight);
    ctx.lineTo(this.x + this.width, this.y + headerHeight);
    ctx.stroke();

    // title
    ctx.fillStyle = this.textColor;
    ctx.font = `bold 1.125rem ui-sans-serif, system-ui, Arial`;
    ctx.textBaseline = "middle";
    ctx.fillText(this.title, this.x + 10, this.y + 22);

    // body circle
    ctx.fillStyle = this.primaryColor;
    ctx.beginPath();
    ctx.arc(
      this.x + this.width / 2,
      this.y + this.height / 2,
      55,
      0,
      2 * Math.PI
    );
    ctx.fill();
  }
}

class Game {
  constructor() {
    this.elements = [];
    this.hoverElement = null;
  }

  init(id) {
    this.canvas = document.getElementById(id);
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth;
    this.canvas.height = 500;
  }

  render() {
    this.ctx.fillStyle = "#AFC5FF";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.elements.forEach((element) => {
      // this.ctx.fillStyle = "red";
      this.ctx.fill(element.render(this.ctx));
    });
  }

  addGameObject(element) {
    this.elements.push(element);
    this.render();
  }

  handleMouseMove(event) {
    this.elements.forEach((element) => {
      // const el = element.render(this.ctx);
      // if (this.ctx.isPointInPath(el, event.offsetX, event.offsetY)) {
      //   // this.ctx.fillStyle = "green";
      //   this.ctx.fill(el);
      //   this.hoverElement = element;
      // } else {
      //   // this.ctx.fillStyle = "red";
      //   this.ctx.fill(el);
      //   if (this.hoverElement?.id === element.id) {
      //     this.hoverElement = null;
      //   }
      // }
    });
  }

  handleClick(event) {
    console.log(this.hoverElement);
  }
}

const game = new Game();

onMounted(() => {
  game.init("myCanvas");
  game.addGameObject(new GameObject(5, 5));
  game.addGameObject(new CardObject(100, 100));

  game.render();
});

function createCircle(x, y) {
  return {
    id: generateId(),
    render(ctx) {
      const circle = new Path2D();

      ctx.fillStyle = "blue";
      ctx.roundRect(x, y, 100, 300, 5);
      ctx.fill();

      ctx.fillStyle = "blue";
      ctx.rect(x, y, 300, 150);

      return ctx;
    },
  };
}

function add() {
  game.addGameObject(createCircle(300));
}
</script>

<template>
  <button @click="add">Add</button>
  <canvas
    id="myCanvas"
    @mousemove="game.handleMouseMove"
    @click="game.handleClick"
  ></canvas>
</template>