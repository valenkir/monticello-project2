export class ContactForm {
  constructor(formElems) {
    for (let key in formElems) {
      if (typeof formElems[key] === "string") {
        this[key] = formElems[key];
      }
    }
  }

  #isValidNameField = (nameValue) =>
    nameValue.length >= 2 && nameValue.trim() !== "";

  #isValidEmailField = (emailValue) =>
    emailValue.trim() !== "" &&
    String(emailValue)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );

  #isContactFormValid = () => {
    const nameValue = $(this.nameField).val();
    const emailValue = $(this.emailField).val();
    return (
      this.#isValidNameField(nameValue) && this.#isValidEmailField(emailValue)
    );
  };

  validateNameOnInput() {
    $(this.nameField).on("input", (event) => {
      console.log("test");
      const inputValue = $(event.target).val();
      if (inputValue.length >= 2 && inputValue.trim() !== "") {
        $(this.nameFieldError).addClass("d-none");
      } else {
        $(this.nameFieldError).removeClass("d-none");
        $(event.target).val().length < 2
          ? $(this.nameFieldError).text("Enter at least 2 characters")
          : $(this.nameFieldError).text("The Full name field cannot be empty");
      }
    });
  }

  validateEmailOnInput() {
    $(this.emailField).on("input", (event) => {
      const inputValue = $(event.target).val();
      if (!this.#isValidEmailField(inputValue)) {
        $(this.emailFieldError).removeClass("d-none");
        $(this.emailFieldError).text("Enter a valid email");
      } else {
        $(this.emailFieldError).addClass("d-none");
      }
    });
  }

  showSuccessMessage() {
    $(this.form).on("submit", (event) => {
      event.preventDefault();
      if (this.#isContactFormValid() && window.screen.width >= 1000) {
        $(this.successMessage).show(1000);
        setTimeout(() => {
          $(this.successMessage).hide(1000);
        }, 3000);
        $(this.nameField).val("");
        $(this.emailField).val("");
      } else if (this.#isContactFormValid() && window.screen.width < 1000) {
        $(this.nameField).val("");
        $(this.emailField).val("");
      }
    });
  }
}
