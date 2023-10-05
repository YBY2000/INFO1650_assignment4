const regExName = /^[a-zA-Z]+(([\s]?[a-zA-Z])?[a-zA-Z]*)*$/;
const regExEmail = /^(\w+\.)*\w+(@northeastern.edu)$/;         // start with character, no consecutive ., no . before @
const regExPhone = /^(\(\+?\d{1}\))?\d{3}-?\d{3}-?\d{4}$/;      // (+1)8575401491 (1)8575401491  8575401491 857540-1491
const regExLocation = /^([a-zA-Z\d]+([,'\s\.])?\w*)*$/;
const regExZipcode = /\d{5}/;

let isGenderSelected = false, isSourceSelected = false, isRateSelected = false;
let isFirstNameValid = false, isLastNameValid = false, isEmailValid = false, isPhoneNumberValid = false;
let isAddressValid1 = false, isAddressValid2 = true, isCityValid = false, isStateValid = false, isZipcodeValid = false;
let isCommentsValid = false, isRateCommentValid = true;

const showErrorMsg = (elementName, isValid) => {
    if(isValid) {
        document.getElementById(`error_${elementName}`).style.display = "none";
    } else {
        document.getElementById(`error_${elementName}`).style.display = "block";
    }
}

const validate = (e) => {
    let {id, name, value} = e.target;

    switch(id) {
        case "firstName":
            if(value.trim().toLowerCase().match(regExName)) {
                showErrorMsg(name, true);
                isFirstNameValid = true;
            } else {
                showErrorMsg(name, false);
                isFirstNameValid = false;
            }
            break;
        case "lastName":
            if(value.trim().toLowerCase().match(regExName)) {
                showErrorMsg(name, true);
                isLastNameValid = true;
            } else {
                showErrorMsg(name, false);
                isLastNameValid = false;
            }
            break;
        case "emailId":
            if(value.trim().toLowerCase().match(regExEmail)) {
                showErrorMsg(name, true);
                isEmailValid = true;
            } else {
                showErrorMsg(name, false);
                isEmailValid = false;
            }
            break;
        case "phoneNumber":
            if(value.trim().toLowerCase().match(regExPhone)) {
                showErrorMsg(name, true);
                isPhoneNumberValid = true;
            } else {
                showErrorMsg(name, false);
                isPhoneNumberValid = false;
            }
            break;
        case "address1":
            if(value.trim().toLowerCase().match(regExLocation)) {
                showErrorMsg(name, true);
                isAddressValid1 = true;
            } else {
                showErrorMsg(name, false);
                isAddressValid1 = false;
            }
            break;
        case "address2":
            if(value.trim().toLowerCase().match(regExLocation) || value == "") {
                showErrorMsg(name, true);
                isAddressValid2 = true;
            } else {
                showErrorMsg(name, false);
                isAddressValid2 = false;
            }
            break;
        case "city":
            if(value.trim().toLowerCase().match(regExLocation)) {
                showErrorMsg(name, true);
                isCityValid = true;
            } else {
                showErrorMsg(name, false);
                isCityValid = false;
            }
            break;
        case "state":
            if(value.trim().toLowerCase().match(regExLocation)) {
                showErrorMsg(name, true);
                isStateValid = true;
            } else {
                showErrorMsg(name, false);
                isStateValid = false;
            }
            break;
        case "zipcode":
            if(value.trim().toLowerCase().match(regExZipcode)) {
                showErrorMsg(name, true);
                isZipcodeValid = true;
            } else {
                showErrorMsg(name, false);
                isZipcodeValid = false;
            }
            break;
        case "comments":
            if(value!='') {
                showErrorMsg(name, true);
                isCommentsValid = true;
            } else {
                showErrorMsg(name, false);
                isCommentsValid = false;
            }
            break;
        case "rateComment":
            if(value!='') {
                showErrorMsg(name, true);
                isRateCommentValid = true;
            } else {
                showErrorMsg(name, false);
                isRateCommentValid = false;
            }
            break;
        
    }

    if(isFirstNameValid && isLastNameValid && isEmailValid && isPhoneNumberValid && isAddressValid1 && isAddressValid2 && isCityValid && isStateValid && isZipcodeValid && isCommentsValid && isRateCommentValid) {
        document.myForm.submit.removeAttribute('disabled');
    } else {
        document.myForm.submit.setAttribute('disabled', true);
    }

}

function checkRadio(elementName){
    let element = document.getElementsByName(elementName);
    for (let i = 0; i < element.length; i++) {
        if(element[i].checked) {
            showErrorMsg(elementName, true);
            if (elementName == "gender") {
                isGenderSelected = true;
            } else {
                isSourceSelected = true;
            }
            break;
        } else {
            showErrorMsg(elementName, false);
            if (elementName == "gender") {
                isGenderSelected = false;
            } else {
                isSourceSelected = false;
            }
        }
    }
}

function checkRateSelected(){
    let rate = document.getElementById("rating"); 
    if (rate.value != ""){
        showErrorMsg("rate", true);
        isRateSelected = true;
    } else {
        showErrorMsg("rate", false);
        isRateSelected = false;
    }

}

// write a function submitted
function submitted(e){
    // To avoid page refresh
    e.preventDefault();
    // checkSelected();
    checkRadio("gender");
    checkRadio("source");
    checkRateSelected();

    if(isFirstNameValid && isLastNameValid && isEmailValid && isPhoneNumberValid && isAddressValid1 && isAddressValid2 && isCityValid && isStateValid && isZipcodeValid && isCommentsValid && isRateCommentValid && isRateSelected) {
        addRecord();
        clearField();
        initFlag();
        alert("Data entered successfully");
    }
    else{
        alert("Please enter valid data in all fields")
    }
}

function clearField(e) {
    document.getElementById("my-form").reset();
}

function addRecord(e) {
    let table = document.getElementById("my-table");
    let radio = document.getElementsByName("gender");
    let gender = ""
    for (let index = 0; index < radio.length; index++) {
        if (radio[index].checked) {
            gender = radio[index].value;
        }
        
    }
    if (table == null) {
        alert("Table not exist!");
        return;
    }
    let trNode = document.createElement("tr");
    let tdName = document.createElement("td");
    let tdEmail = document.createElement("td");
    let tdPhone = document.createElement("td");
    let tdAdd1 = document.createElement("td");
    let tdAdd2 = document.createElement("td");
    let tdCity = document.createElement("td");
    let tdState = document.createElement("td");
    let tdZipcode = document.createElement("td");
    let tdComments = document.createElement("td");
    let tdRating = document.createElement("td");
    let tdRatingComment = document.createElement("td");


    // insert name
    tdName.innerHTML = gender + " " + document.getElementById("firstName").value + " " + document.getElementById("lastName").value;
    trNode.appendChild(tdName);
    // insert email
    tdEmail.innerHTML = document.getElementById("emailId").value;
    trNode.appendChild(tdEmail);
    // insert tel
    tdPhone.innerHTML = document.getElementById("phoneNumber").value;
    trNode.appendChild(tdPhone);
    // insert address 1
    tdAdd1.innerHTML = document.getElementById("address1").value;
    trNode.appendChild(tdAdd1);
    // insert address 2
    tdAdd2.innerHTML = document.getElementById("address2").value;
    trNode.appendChild(tdAdd2);
    // insert city
    tdCity.innerHTML = document.getElementById("city").value;
    trNode.appendChild(tdCity);
    // insert state
    tdState.innerHTML = document.getElementById("state").value;
    trNode.appendChild(tdState);
    // insert zip code
    tdZipcode.innerHTML = document.getElementById("zipcode").value;
    trNode.appendChild(tdZipcode);
    // insert comments
    tdComments.innerHTML = document.getElementById("comments").value;
    trNode.appendChild(tdComments);
    // insert comments
    tdRating.innerHTML = document.getElementById("rating").value;
    trNode.appendChild(tdRating);
    // insert comments
    tdRatingComment.innerHTML = document.getElementById("rateComment").value;
    trNode.appendChild(tdRatingComment);
    // put the tr into table
    table.appendChild(trNode);

}

function showRateComment(){
    let rate = document.getElementById("rating");
    let rateDetail = document.getElementById("rate_detail");
    let checkboxContent = document.getElementById("checkboxContent");
    if (rate.value != "") {
        rateDetail.style.display = "block";
        showErrorMsg("rate", true);
        isRateSelected = true;
    } else {
        rateDetail.style.display = "none";
        showErrorMsg("rate", false);
        isRateSelected = false;
    }
    switch (rate.value) {
        case "1":
            checkboxContent.innerHTML="Comment for why you rate us 1:"
            break;
        
        case "2":
            checkboxContent.innerHTML="Comment for why you rate us 2:"
            break;
    
        case "3":
            checkboxContent.innerHTML="Comment for why you rate us 3:"
            break;

        case "4":
            checkboxContent.innerHTML="Comment for why you rate us 4:"
            break;

        case "5":
            checkboxContent.innerHTML="Comment for why you rate us 5:"
            break;
    
        default:
            break;
    }
    
}

function showComment(checkbox) {
    let commentArea = document.getElementById("rateComment");
    if (checkbox.checked) {
        isRateCommentValid = false;
        commentArea.style.display = "block";
    } else {
        commentArea.style.display = "none";
        showErrorMsg("rateComment", true);
        isRateCommentValid = true;
    }
    
}

function initFlag(){
    isGenderSelected = false;
    isSourceSelected = false;
    isRateSelected = false;
    isFirstNameValid = false;
    isLastNameValid = false;
    isEmailValid = false;
    isPhoneNumberValid = false;
    isAddressValid1 = false;
    isAddressValid2 = true;
    isCityValid = false;
    isStateValid = false;
    isZipcodeValid = false;
    isCommentsValid = false;
    isRateCommentValid = true;
    document.myForm.submit.setAttribute('disabled', true);
}

document.myForm.addEventListener('input', validate);
document.myForm.addEventListener('submit', submitted);
document.myForm.addEventListener('reset', clearField);
