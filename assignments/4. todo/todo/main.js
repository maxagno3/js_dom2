let ul = document.querySelector("ul");
let input = document.querySelector(".input");
let arr = JSON.parse(localStorage.getItem('todoArr')) || [];
let footer = document.querySelector(".footer");
let listItems = document.querySelector("span");
let activeBtn = document.querySelector(".active");
let completeBtn = document.querySelector(".completed");
let allbtn = document.querySelector(".all");
let clearbtn = document.querySelector(".clear");
let arrow = document.querySelector('.fas');

// Main function where the object is being pushed into array.
function mainFunction(event) {
    if (input.value === '') {
        // alert('Input cannot be empty!')
    } else if (event.keyCode === 13) {
        let todo = {
            text: event.target.value,
            isDone: false,
            id: Date.now()
        }
        arr.push(todo);
        loopArray(arr);
    }
    localStorage.setItem('todoArr', JSON.stringify(arr));
}

//Function where loop over array is being run.
function loopArray(arr) {
    ul.innerHTML = "";
    arr.forEach(looping => {
        let li = document.createElement("li");
        li.setAttribute("data-id", looping.id);

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.setAttribute("data-id", looping.id);

        let p = document.createElement("p");
        p.innerHTML = looping.text;

        let span = document.createElement("span");
        span.innerHTML = "X";
        span.setAttribute("data-id", looping.id)

        li.append(checkbox, p, span);

        ul.append(li);

        console.log(ul);

        checkbox.addEventListener("click", () => strkeItem(looping.id));

        itemsLeft();

    })
    input.value = "";

}

// Deleting Items.
function removeItems(event) {
    if (event.target.tagName === "SPAN") {
        console.log(event.target.dataset.id);
        arr = arr.filter(element => !(element.id == event.target.dataset.id));
        console.log(arr);
        loopArray(arr);
    }

    localStorage.setItem('todoArr', JSON.stringify(arr));
}

// True/False.
function strkeItem(id) {
    arr = arr.filter(ticked => {
        if (ticked.id == id) {
            ticked.isDone = !ticked.isDone;
            return ticked;
        } else {
            return ticked;
        }
        loopArray(arr);
        console.log(arr);
    })

    localStorage.setItem('todoArr', JSON.stringify(arr));
}

// Items left.
function itemsLeft(loopArray, event) {
    let items = arr.filter(value => (value.isDone === false)).length;
    listItems.innerText = `${items} items left`;
    localStorage.setItem('todoArr', JSON.stringify(arr));
}

// Active.
function activeItems(arr, event) {
    ul.innerText = '';
    arr = arr.filter(selected => selected.isDone === false);
    console.log(arr);
    loopArray(arr);
    localStorage.setItem('todoArr', JSON.stringify(arr));
}

// Completed.
function completeItems(arr, event) {
    ul.innerHTML = "";
    let completeArray = [];
    completeArray = arr.filter(comp => comp.isDone === true);
    loopArray(completeArray);
    console.log(completeArray);
    localStorage.setItem('todoArr', JSON.stringify(arr));
}

//All.
function allItems(arr, event) {
    ul.innerHTML = '';
    loopArray(arr);
    console.log(arr);
}

//Clear.
function clearItems(arr, event) {
    ul.innerHTML = '';
    let temp = arr.filter(el => el.isDone);
    for (let i = 0; i < temp.length; i++) {
        arr.splice(arr.indexOf(temp[i]), 1);
    }
    loopArray(arr);
    console.log(arr);
    localStorage.setItem('todoArr', JSON.stringify(arr));
}

function dropDown(){
    var arrowSign = arr.filter(el => el.isDone);
    if(arrowSign.length == arr.length || arrowSign.length == 0){
        arr.forEach(ele => ele.isDone != isDone)
    }else{
        arr.forEach(elm => {
            if(elm.isDone === false){
                elm.isDone = !elm.isDone;
            }
        })
    }
    loopArray(arr);
}

document.addEventListener("keyup", mainFunction);
ul.addEventListener("click", removeItems);
activeBtn.addEventListener("click", () => activeItems(arr, event));
completeBtn.addEventListener("click", () => completeItems(arr, event));
allbtn.addEventListener("click", () => allItems(arr, event));
clearbtn.addEventListener("click", () => clearItems(arr, event));
arrow.addEventListener('click', dropDown);