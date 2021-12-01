import { Controller } from "stimulus";
import { csrfToken } from "@rails/ujs";


export default class extends Controller {
  static targets = ['items', 'form'];

  // connect() {
  //   console.log(this.element);
  //   console.log(this.itemsTarget);
  // }

  send(event) {
    event.preventDefault();
    console.log('TEST');
    console.log(this.formTarget);
    console.log(this.formTarget.action);

    fetch(this.formTarget.action, {
      method: 'POST',
      headers: { 'Accept': "application/json", 'X-CSRF-Token': csrfToken() },
      body: new FormData(this.formTarget)
    })
    .then(response => response.json())
    .then((data) => {
      console.log(data);
      this.itemsTarget.insertAdjacentHTML("afterend", data.inserted_item);
    });
    document.getElementById("new-we-form").reset();
  }
}
