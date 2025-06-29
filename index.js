// elements
let input = document.querySelector(".input")
let submit = document.querySelector(".add")
let tasksDiv = document.querySelector(".tasks")

// empty array 

let arrayoftasks = [];

// check data in local storage
localStorage.getItem("tasks") ? arrayoftasks = JSON.parse(localStorage.getItem("tasks")) : "";

// logic

submit.onclick = () => {
    if (input.value !== "") {
        addDataToArray(input.value)
        input.value = ""
    }
}

function addDataToArray(tasktext) {
    const task = {
        id: Date.now(),
        title: tasktext,
        completed: false
    }
    arrayoftasks.push(task)
    createEle(arrayoftasks)
    addDataToLocal(arrayoftasks)
}

function addDataToLocal(arrayoftasks) {
    window.localStorage.setItem("tasks", JSON.stringify(arrayoftasks))
}

function createEle(arrayoftasks) {
    // clear div tasks

    tasksDiv.innerHTML = "";

    //add elements
    arrayoftasks.forEach((task) => {
        let div = document.createElement("div")
        div.className = "task"
        let span = document.createElement("span");
        span.className = "del"
        let p = document.createElement("p");



        if (task.completed === true) {
            div.className = "task done"
        }

        div.setAttribute("data-id", task.id)
        p.append(document.createTextNode(task.title))
        p.style.margin = "0"
        div.appendChild(p)
        span.textContent = "Delet"
        div.appendChild(span)
        tasksDiv.appendChild(div)
    })
}

tasksDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        delettask(e.target.parentElement.getAttribute("data-id"))
        e.target.parentElement.remove();
    }
})

getdatafromlocalstorage()
function getdatafromlocalstorage() {
    let data = window.localStorage.getItem("tasks")
    if (data) {
        let tasks = JSON.parse(data)
        createEle(tasks)
    }
}

function delettask(taskid) {

    arrayoftasks = arrayoftasks.filter((task) => task.id != taskid)
    addDataToLocal(arrayoftasks)
}

window.onkeydown = e => { e.key === "Enter" ? submit.click() : "" };