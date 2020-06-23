'use strict';

var CLOUD_WIDTH = 420;
var CLOUD_HEIGHT = 270;
var CLOUD_X = 100;
var CLOUD_Y = 10;
var CLOUD_GAP = 10;
var FONT_GAP = 16;
var TEXT_GAP = 16;
var BAR_WIDTH = 40;
var BAR_HEIGHT = 150;
var BAR_GAP = 50;

var renderCloud = function (ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CLOUD_WIDTH, CLOUD_HEIGHT);
};

var renderText = function (ctx, x, y, text, color, fontSize, fontFamily) {
  ctx.fillStyle = color;
  ctx.font = fontSize + fontFamily;
  ctx.fillText(text, x, y);
};

var renderBar = function (ctx, x, y, width, height) {
  ctx.fillRect(x, y, width, height);
};

var getMaxElement = function (arr) {
  var maxElement = arr[0];
  for (var i = 1; i < arr.length; i++) {
    if (arr[i] > maxElement) {
      maxElement = arr[i];
    }
  }
  return maxElement;
};

var getRandomPercent = function () {
  var randomPercent = Math.floor(Math.random() * 101) + '%';
  return randomPercent;
};

window.renderStatistics = function (ctx, players, times) {
  renderCloud(ctx, CLOUD_X + CLOUD_GAP, CLOUD_Y + CLOUD_GAP, 'rgba(0, 0, 0, 0.7)'); // Рендерим тень облака
  renderCloud(ctx, CLOUD_X, CLOUD_Y, '#fff'); // Рендерим облако
  renderText(ctx, CLOUD_X + TEXT_GAP, CLOUD_Y + TEXT_GAP * 2, 'Ура вы победили!', '#000', '16px', 'PT Mono'); // Рендерим подпись для статистики
  renderText(ctx, CLOUD_X + TEXT_GAP, CLOUD_Y + TEXT_GAP * 3, 'Список результатов:', '#000', '16px', 'PT Mono'); // Рендерим подпись для статистики

  var maxTime = getMaxElement(times); // Находим максимальный элемент в массиве times

  for (var i = 0; i < players.length; i++) {
    renderText(ctx, CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - TEXT_GAP, players[i], '#000'); // Рендерим текст с именами игроков из массива players
    if (players[i] === 'Вы') {
      ctx.fillStyle = 'rgba(255, 0, 0, 1)';
    } else {
      ctx.fillStyle = 'hsl(240, ' + getRandomPercent() + ', 50%)';
    }
    renderBar(ctx, CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - TEXT_GAP - FONT_GAP - (TEXT_GAP / 2) - (BAR_HEIGHT * times[i]) / maxTime, BAR_WIDTH, (BAR_HEIGHT * times[i]) / maxTime); // Рендерим столбики статистики
    renderText(ctx, CLOUD_X + BAR_GAP + (BAR_WIDTH + BAR_GAP) * i, CLOUD_Y + CLOUD_HEIGHT - TEXT_GAP - FONT_GAP - (TEXT_GAP / 2) - (BAR_HEIGHT * times[i]) / maxTime - (TEXT_GAP / 2), Math.round(times[i]), '#000'); // Рендерим текст со значением времени прохождения каждого игрока
  }
};
