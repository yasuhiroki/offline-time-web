const model = {
  time: {
    get: function get() {
      return this.time;
    },
    update: function update() {
      this.time = new Date();
      if (this.onUpdatedCallback) { this.onUpdatedCallback(); }
    },
    setOnUpdated: function setOnUpdate(callback) {
      this.onUpdatedCallback = callback;
    }
  }
}

const view = {
  time: {
    init: function init(timeDom, timeModel) {
      this.dom = timeDom;
      this.model = timeModel;
      this.model.setOnUpdated(() => { this.draw(); });
    },
    draw: function draw() {
      let current = this.model.get();
      let date = current.toLocaleDateString()
      let time = current.toLocaleTimeString();
      this.dom.innerHTML = `<div>${date}</div> <div>${time}</div>`;
    }
  }
}

function startTimer(timeModel) {
  let runner = () => {
    timeModel.update();
    setTimeout(() => runner(), 1000);
  }
  runner();
}

(function main() {
  let body = window.document.getElementsByTagName("body").item(0);
  let div = window.document.createElement("div");
  div.className = "time";
  body.appendChild(div);
  view.time.init(div, model.time);
  startTimer(model.time);
})()
