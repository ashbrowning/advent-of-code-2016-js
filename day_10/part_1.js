'use strict';

class Bot {
  constructor(id) {
    this.id = id;
    this.microchips = [];
    this.highFn = null;
    this.lowFn = null;
    this.history = [];
  }

  receiveChip(microchip) {
    this.microchips.push(microchip);
    if (this.microchips.length === 2) {
      this.handoffChips();
    }
  }

  handoffChips() {
    this.history.push(this.microchips);
    if (this.microchips[0] > this.microchips[1]) {
      this.highFn(this.microchips[0]);
      this.lowFn(this.microchips[1]);
    } else {
      this.highFn(this.microchips[1]);
      this.lowFn(this.microchips[0]);
    }
    this.microchips = [];
  }

  setHighFn(fn) {
    this.highFn = fn;
  }

  setLowFn(fn) {
    this.lowFn = fn;
  }
}

module.exports = (inputArray) => {
  const botsMap = {};
  const outputsMap = {};
  const valueInstructions = [];

  const getHandoffToBotFn = (bot) => (microchip) => bot.receiveChip(microchip);

  const getHandoffToOutputFn = (outputArr) => (microchip) => outputArr.push(microchip);

  const createBot = (id) => {
    const bot = botsMap[id] = new Bot(id);
    return bot;
  };
  
  const createOutput = (id) => {
    const output = outputsMap[id] = [];
    return output;
  };

  const getBotInstruction = (type, id) => {
    if (type === 'output') {
      const outputArr = outputsMap[id] || createOutput(id);
      return getHandoffToOutputFn(outputArr);
    }

    // else assume it's a bot
    const bot = botsMap[id] || createBot(id);
    return getHandoffToBotFn(bot);
  };

  const handleBotInstruction = ([, giveId, , , , lowType, lowId, , , , highType, highId]) => {
    const givingBot = botsMap[giveId] || createBot(giveId);
    givingBot.setLowFn(getBotInstruction(lowType, lowId));
    givingBot.setHighFn(getBotInstruction(highType, highId));
  };

  const handleValueInstruction = ([, val, , , , id]) => {
    const bot = botsMap[id] || createBot(id);
    bot.receiveChip(parseInt(val, 10));
  };

  inputArray.forEach((inputStr) => {
    const inputSplit = inputStr.split(' ');
    if (inputSplit[0] === 'bot') {
      handleBotInstruction(inputSplit);
    } else if (inputSplit[0] === 'value') {
      valueInstructions.push(inputSplit);
    }
  });

  valueInstructions.forEach(handleValueInstruction);

  return Object.keys(botsMap).find((id) => {
    const bot = botsMap[id];
    return (bot.history.find((arr) => arr.includes(61) && arr.includes(17))) !== undefined;
  });
};
