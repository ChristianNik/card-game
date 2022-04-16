
<script setup>
import { onMounted } from "vue";
import { CardRender, VillagerCardRender } from "../logic/canvas";

let ctx;
let canvas;

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
      this.ctx.fillStyle = "red";
      this.ctx.fill(element.path);
    });
  }

  addElement(element) {
    this.elements.push(element);
    this.render();
  }

  handleMouseMove(event) {
    this.elements.forEach((element) => {
      if (this.ctx.isPointInPath(element.path, event.offsetX, event.offsetY)) {
        this.ctx.fillStyle = "green";
        this.ctx.fill(element.path);
        this.hoverElement = element;
      } else {
        this.ctx.fillStyle = "red";
        this.ctx.fill(element.path);
        if (this.hoverElement?.id === element.id) {
          this.hoverElement = null;
        }
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
  game.addElement(createCircle(150));
  game.addElement(createCircle(270));

  game.render();
});

function createCircle(x) {
  const circle = new Path2D();
  circle.arc(x, 75, 50, 0, 2 * Math.PI);

  return {
    id: Math.random(),
    path: circle,
  };
}

function add() {
  game.addElement(createCircle(300));
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