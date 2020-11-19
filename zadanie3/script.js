let form1 = document.querySelector('#uroven');
let form2 = document.querySelector('#typ');
let form3 = document.querySelector('#pocet');

let formOptions2 = form2.querySelectorAll('option');
let formOptions3 = form3.querySelectorAll('option');

function UrovenSelect(formVal)
{
    form2.innerHTML = '';
    for(let index = 0; index < formOptions2.length; index++)
    {
        if(formOptions2[index].dataset.option === formVal)
        {
            form2.appendChild(formOptions2[index]);
        }
    }
    TypSelect(form2.value);
}

function TypSelect(formVal)
{
    form3.innerHTML = '';
    for(let index = 0; index < formOptions3.length; index++)
    {
        if(formOptions3[index].dataset.option === formVal)
        {
            form3.appendChild(formOptions3[index]);
        }
    }
}
UrovenSelect(form1.value);

function EmailValidation(value)
{
    let input = document.getElementById('email');
    let regex = /^(([a-z0-9]|[A-Z0-9]|[0-9])*([a-z]|[A-Z]|[0-9]){3,})+@*(([a-z0-9.-]|[A-Z0-9.-])+\.)+([a-z]|[A-Z]){2,4}$/;

    if(!value)
    {
        input.classList.add("red");
        input.parentNode.querySelector('.message-required').style.display = 'block';
        input.parentNode.querySelector('.message-email').style.display = 'none';
        return false;
    }
    else if(regex.test(value))
    {
        input.classList.add("red");
        input.parentNode.querySelector('.message-email').style.display = 'none';
        input.parentNode.querySelector('.message-required').style.display = 'none';
        return true;
    }
    else
    {
        input.classList.add("red");
        input.parentNode.querySelector('.message-email').style.display = 'block';
        input.parentNode.querySelector('.message-required').style.display = 'none';
        return false;
    }

}

function Age_Birth()
{
    let ageInput = document.getElementById('vek');
    let dateOfBirtInput = document.getElementById('datum');
    let dateOfBirth = document.getElementById('datum').value;

    if(dateOfBirtInput.value === '')
    {
        dateOfBirtInput.parentNode.querySelector('.message-required').style.display = 'block';
    }
    else
    {
        dateOfBirtInput.parentNode.querySelector('.message-required').style.display = 'none';
    }

    if(ageInput.value !== '')
    {
        let day = +new Date(dateOfBirth);
        let age = Math.floor((Date.now() - day) / (31557600000));
        if(age === parseInt(ageInput.value))
        {
            ageInput.parentNode.querySelector('.message-required').style.display = 'none';
            ageInput.parentNode.querySelector('.message-wrongInput').style.display = 'none';
            return true;
        }
        else {
            ageInput.parentNode.querySelector('.message-wrongInput').style.display = 'block';
            ageInput.parentNode.querySelector('.message-required').style.display = 'none';
            return false;
        }
    }
    else
    {
        ageInput.parentNode.querySelector('.message-required').style.display = 'block';
        ageInput.parentNode.querySelector('.message-wrongInput').style.display = 'none';
        return false;
    }
}


function FullNameValidation(value, id)
{
    let input = document.querySelector('#'+id);
    let regex = /[^0-9]$/;

    if(value === '')
    {
        input.classList.add("red");
        input.parentNode.querySelector('.message-required').style.display = 'block';
        input.parentNode.querySelector('.message-wodigits').style.display = 'none';
        return false
    }
    else if(!regex.test(value)) {
        input.classList.add("red");
        input.parentNode.querySelector('.message-wodigits').style.display = 'block';
        input.parentNode.querySelector('.message-required').style.display = 'none';
        return false;
    }
    else {
        input.classList.remove("red");
        input.parentNode.querySelector('.message-wodigits').style.display = 'none';
        input.parentNode.querySelector('.message-required').style.display = 'none';
        return true;
    }
}

function ExtraParams(id)
{
    let suhlas = document.getElementById('suhlas');
    let nesuhlas = document.getElementById('nesuhlas');
    let paramsForm = document.querySelector('.extra-parametre');

    if(suhlas.checked === true)
    {
        paramsForm.style.display = 'block';

    }
    else if(nesuhlas.checked === true)
    {
        paramsForm.style.display = 'none';
    }
}


let acc = document.getElementsByClassName("accordion");
let i;

for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function() {
        this.classList.toggle("active");

        let panel = this.nextElementSibling;
        if (panel.style.display === "block") {
            panel.style.display = "none";
        } else {
            panel.style.display = "block";
        }
    });
}

function chooseOtherOption()
{
    let otherObj = document.querySelector('#objednavka3');
    let extraInput = document.querySelector('.extra-input');

    if(otherObj.checked === true)
    {
        extraInput.style.display = 'block';
    }
    else
    {
        extraInput.style.display = 'none';
    }
}

function submitForm(valueName, valueLastName, valueEmail)
{
    let val1 = FullNameValidation(valueName, 'meno');
    let val2 = FullNameValidation(valueLastName, 'priezvisko');
    let val3 = EmailValidation(valueEmail);
    let val4 = Age_Birth();

    if(val1 && val2 && val3 && val4)
        return true;
    else
        return false;

}




