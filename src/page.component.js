import "./app.scss";
import img from "./images/test1.png";
import img2 from "./images/test2.png";
import { ModalComponent } from "./modal.component";
import { Observer } from "./observer";

export const PageComponent = {
  el: document.getElementById("page_component"),
  modalComponents: [],
  modalOpen: false,
  errors: [],
  init: function() {
    this.createModalComponentInstances();
    this.bootsrapListeners();
  },
  toggleDialog: function() {
    let modalButton = document.getElementById("open_dialog");
    if (!this.modalOpen) {
      this.modalOpen = true;
      modalButton.disabled = true;
    } else {
      this.modalOpen = false;
      modalButton.disabled = false;
    }
  },
  createModalComponentInstances: function() {
    for (let i = 0; i < 2; i++) {
      this.modalComponents.push(Object.create(ModalComponent));
    }
  },
  logSession: function() {
    let session = {
      session_id: new Date().toString()
    };
    return session;
  },
  showDialog: function() {
    this.toggleDialog();
    let random = Math.random();
    if (random < 0.5) {
      this.modalComponents[0].init(img);
    } else {
      this.modalComponents[1].init(img2);
    }
    console.log(this.logSession());
  },
  bootsrapListeners: function() {
    let dialog = document.getElementById("open_dialog");
    dialog.addEventListener("click", this.showDialog.bind(this), false);
    Observer.on("close", evt => {
      this.toggleDialog();
    });
  }
};
