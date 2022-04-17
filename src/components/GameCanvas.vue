
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

  renderHover(ctx) {
    ctx.fillStyle = "green";
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

    this.borderRadius = 5;
    this.headerHeight = 40;
  }
  _renderGroundBorder(ctx) {
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 6;
    ctx.roundRect(this.x, this.y, this.width, this.height, this.borderRadius);
    ctx.stroke();
  }
  _renderGround(ctx) {
    ctx.fillStyle = this.accentColor;
    ctx.roundRect(this.x, this.y, this.width, this.height, this.borderRadius);
    ctx.fill();
  }
  _renderHeader(ctx) {
    ctx.fillStyle = this.primaryColor;
    ctx.roundRect(
      this.x,
      this.y,
      this.width,
      this.headerHeight,
      this.borderRadius
    );
    ctx.fill();
  }
  _renderHeaderBorder(ctx) {
    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.headerHeight);
    ctx.lineTo(this.x + this.width, this.y + this.headerHeight);
    ctx.stroke();
  }
  _renderTitle(ctx) {
    ctx.fillStyle = this.textColor;
    ctx.font = `bold 1.125rem ui-sans-serif, system-ui, Arial`;
    ctx.textBaseline = "middle";
    ctx.fillText(this.title, this.x + 10, this.y + 22);
  }
  _renderBody(ctx) {
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

  render(ctx) {
    ctx.strokeStyle = "#000";
    this._renderGroundBorder(ctx);
    this._renderGround(ctx);
    this._renderHeader(ctx);
    this._renderHeaderBorder(ctx);
    this._renderTitle(ctx);
    this._renderBody(ctx);
  }

  renderHover(ctx) {
    ctx.lineWidth = 6;
    ctx.strokeStyle = "#fff";
    ctx.setLineDash([12, 12]);
    ctx.roundRect(
      this.x - 10,
      this.y - 10,
      this.width + 20,
      this.height + 20,
      this.borderRadius * 2
    );
    ctx.stroke();
    ctx.setLineDash([0, 0]);

    this._renderGroundBorder(ctx);
    this._renderGround(ctx);
    this._renderHeader(ctx);
    this._renderHeaderBorder(ctx);
    this._renderTitle(ctx);
    this._renderBody(ctx);
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

  clearCanvas() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  render() {
    this.ctx.fillStyle = "#AFC5FF";
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    this.elements.forEach((element) => {
      // resets
      this.ctx.fillStyle = "#000";
      this.ctx.strokeStyle = "#000";
      this.ctx.lineWidth = 1;
      this.ctx.font = "";
      this.ctx.setLineDash([0, 0]);

      //
      const el =
        this.hoverElement?._id == element._id
          ? element.renderHover(this.ctx)
          : element.render(this.ctx);
      this.ctx.fill(el);
    });
  }

  addGameObject(element) {
    this.elements.push(element);
    this.render();
  }

  handleMouseMove(event) {
    this.elements.forEach((element) => {
      const matchX =
        event.offsetX >= element.x &&
        event.offsetX <= element.x + element.width;
      const matchY =
        event.offsetY >= element.y &&
        event.offsetY <= element.y + element.height;

      if (matchX && matchY) {
        this.hoverElement = element;
        this.ctx.fill(element.renderHover?.(this.ctx));
        this.render();
        return;
      }
      if (this.hoverElement?._id === element._id) {
        this.hoverElement = null;
        this.clearCanvas();
        this.render();
      }
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
</script>

<template>
  <canvas
    id="myCanvas"
    @mousemove="game.handleMouseMove"
    @click="game.handleClick"
  ></canvas>
</template>