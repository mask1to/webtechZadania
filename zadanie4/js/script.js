let myTab = document.createElement("table");

function show(layer)
{
    document.getElementById("myModalBg").style.display=layer? "none": "block";
    document.getElementsByClassName("myModalPopUp")[0].style.display=layer?"none":"flex";
}

function createTable(var1, var2)
{
    myTab.innerHTML = '';
    myTab.setAttribute("id", "myTab");

    let head = document.createElement("thead");
    let body = document.createElement("tbody");

    let tableIndex = document.createElement("tr");
    let tableCell = document.createElement("th");
    let newNode = document.createTextNode(" ");

    tableCell.appendChild(newNode);
    tableIndex.appendChild(tableCell);

    for(let index = 1; index <= var1; index++)
    {
        tableCell = document.createElement("th");
        newNode = document.createTextNode("x = "+index);
        tableCell.appendChild(newNode);
        tableIndex.appendChild(tableCell);
    }
    head.appendChild(tableIndex);

    for(let index2 = 1; index2 <= var2; index2++)
    {
        tableIndex = document.createElement("tr");
        tableCell = document.createElement("th");
        newNode = document.createTextNode("y = "+index2);
        tableCell.appendChild(newNode);
        tableIndex.appendChild(tableCell);
        for(let index = 1; index <= var1; index++)
        {
            tableCell = document.createElement("td");
            newNode = document.createTextNode(""+(index + index2)*(index + (2*index2)));
            tableCell.appendChild(newNode);
            tableIndex.appendChild(tableCell);
        }
        body.appendChild(tableIndex);
    }
    myTab.appendChild(head);
    myTab.appendChild(body);
    document.getElementById('tabWrapper').appendChild(myTab);
    show(false);
}

function verify(val, id)
{
    let input = document.getElementById(id);
    let regex = /^[0-9]+$/;

    if(!val)
    {
        input.classList.add("red");
        input.parentNode.querySelector('.message-required').style.display='block';
        input.parentNode.querySelector('.message-wrong-input').style.display='none';
        return false;
    }
    else if((val <=0 || val > 9) || (!val.match(regex)))
    {
        input.classList.add("red");
        input.parentNode.querySelector('.message-required').style.display='none';
        input.parentNode.querySelector('.message-wrong-input').style.display='block';
        return false;
    }
    else
    {
        input.parentNode.querySelector('.message-required').style.display='none';
        input.parentNode.querySelector('.message-wrong-input').style.display='none';
        return true;
    }
}


function onSubmitGenerate(var1, var2)
{
    let firstInput = verify(var1, 'first');
    let secondInput = verify(var2, 'second');
    console.log("1.input: ", firstInput);
    console.log("2.input: ", secondInput);
    if(firstInput && secondInput)
    {
        createTable(var1, var2);
    }
    else
    {
        return firstInput && secondInput;
    }
}