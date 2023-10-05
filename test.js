// const myForm = document.getElementById("my-form");
const name = document.myForm.name;

const regExName = /^[a-zA-Z]+(([',. -][a-zA-Z ])?[a-zA-Z]*)*$/;
const regExEmail = /([\w.]+)@([\w.]+)\.(\w+)/;
const regExPhone = /\d{3}-?\d{3}-\d{4}$/;

// variable to log if the input is valid
let isFirstNameValid = false, isLastNameValid = false, isEmailValid = false, isPhoneNumberValid = false;
let isAddressValid1 = false, isAddressValid2 = false, isCityValid = false, isStateValid = false, isZipcodeValid = false;
let isCommentsValid = false;

const display = (elementName, isValid) => {
    if(isValid) {
        document.getElementById(`error_${elementName}`).style.display = "none";
        document.myForm[elementName].style.border = "";
    } else {
        // You cant access non form element like below error field using name
        // Hence use the rudimentary way - getElementById or other
        document.getElementById(`error_${elementName}`).style.display = "block";
        document.myForm[elementName].style.border = "2px solid red";
    }
}

const validate = (e) => {
    let {id, name, value} = e.target;
    alert("waht")

    switch(id) {
        case "firstName":
            if(!value.trim().toLowerCase().match(regExName)) {
                display(name, true);
                isFirstNameValid = true;
            } else {
                display(name, false);
                isFirstNameValid = false;
            }
            break;
        case "lastName":
            if(!value.trim().toLowerCase().match(regExName)) {
                display(name, true);
                isLastNameValid = true;
            } else {
                display(name, false);
                isLastNameValid = false;
            }
            break;
        case "emailId":
            if(!value.trim().toLowerCase().match(regExEmail)) {
                display(name, true);
                isEmailValid = true;
            } else {
                display(name, false);
                isEmailValid = false;
            }
            break;
        case "phoneNumber":
            if(!value.trim().toLowerCase().match(regExPhone)) {
                display(name, true);
                isPhoneNumberValid = true;
            } else {
                display(name, false);
                isPhoneNumberValid = false;
            }
            break;
        case "address1":
            if(!value.trim().toLowerCase().match(regExAddress)) {
                display(name, true);
                isAddressValid1 = true;
            } else {
                display(name, false);
                isAddressValid1 = false;
            }
            break;
        case "address2":
            if(!value.trim().toLowerCase().match(regExAddress)) {
                display(name, true);
                isAddressValid2 = true;
            } else {
                display(name, false);
                isAddressValid2 = false;
            }
            break;
        case "city":
            if(!value.trim().toLowerCase().match(regExCity)) {
                display(name, true);
                isCityValid = true;
            } else {
                display(name, false);
                isCityValid = false;
            }
            break;
        case "state":
            if(!value.trim().toLowerCase().match(regExState)) {
                display(name, true);
                isStateValid = true;
            } else {
                display(name, false);
                isStateValid = false;
            }
            break;
        case "zipcode":
            if(!value.trim().toLowerCase().match(regExZipcode)) {
                display(name, true);
                isZipcodeValid = true;
            } else {
                display(name, false);
                isZipcodeValid = false;
            }
            break;
        case "comments":
            if(!value.trim().toLowerCase().match(regExComment)) {
                display(name, true);
                isCommentsValid = true;
            } else {
                display(name, false);
                isCommentsValid = false;
            }
            break;

    }

    if(isFirstNameValid && isLastNameValid && isEmailValid && isPhoneNumberValid && isAddressValid1 && isAddressValid2 && isCityValid && isStateValid|| isZipcodeValid && isCommentsValid) {
        document.myForm.submit.setAttribute('disabled', true);
    } else {
        document.myForm.submit.removeAttribute('disabled');
    }

}

name.addEventListener("input", validate)