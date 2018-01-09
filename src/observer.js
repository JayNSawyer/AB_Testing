export const Observer = {
  listenersObj: {},
  on: function(type, callback) {
    if (!this.listenersObj[type]) {
      this.listenersObj[type] = [];
    }

    if (this.listenersObj[type].indexOf(callback) === -1) {
      this.listenersObj[type].push(callback);
    }
  },
  off: function(type, callback) {
    if (!this.listenersObj[type]) {
      return;
    } else {
      let listenersArray = this.listenersObj[type];
    }

    if (this.listenersArray.indexOf(callback) > -1) {
      this.listenersArray.splice(index, 1);
    }
  },
  broadcast: function(type, event) {
    if (!this.listenersObj[type]) {
      return;
    }

    if (!event.type) {
      event.type = type;
    }

    let listenersArray = this.listenersObj[type];

    listenersArray.forEach(listenerFn => {
      listenerFn(event);
    });
  }
};
