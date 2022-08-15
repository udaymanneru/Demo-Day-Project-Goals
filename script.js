window.addEventListener("load", () =>{
    const form = document.querySelector("#new-task-form");
    const input = document.querySelector("#new-task-input");
    const list = document.querySelector("#tasks");
    const calendartext = document.querySelector("#calendartext");
    const calendar = document.querySelector("#calendar");


    const today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    const yyyy = today.getFullYear();

    const currDate = yyyy + "-" + mm + "-" + dd;

    let dueDate = calendar.value;


    function updateText(date){
        if(date == currDate){
            calendartext.innerHTML = "Today"
        }
        else{
            calendartext.innerHTML = date;
        }
    }

    function newDate(){
        // CHECK DATABASE IF CURRENT INFORMATION ALREADY EXISTS FOR THIS DATE
        // IF SO, POPULATE PAGE WITH THE INFORMATION
        // IF NOT, CREATE A NEW ENTRY FOR THAT DATE


        list.innerHTML = "";
    }
    
    calendar.addEventListener("change", () =>{
        console.log("changed");
        dueDate = calendar.value
        updateText(dueDate)
        newDate();
    })



    form.addEventListener("submit", (e) =>{
        e.preventDefault();
        const inputVal = input.value;
        if(!inputVal){
            alert("Please fill out the task");
            return;
        }
        else{
            // ADD GOAL/TASK INTO THE ENTRY PERTAINING TO THE DATE SELECTED
            // DATE SELEECTED IS IN VARIABLE DUE DATE
            console.log("success");
        }

        const task = document.createElement("div");
        task.classList.add("task");

        const task_content = document.createElement("div");
        task_content.classList.add("content");


        task.appendChild(task_content);

        const task_input = document.createElement("input");
        task_input.classList.add("text");
        task_input.type = "text";
        task_input.value = inputVal;
        task_input.setAttribute("readonly", "readonly");
        task_content.appendChild(task_input);

        const task_actions = document.createElement("div");
        task_actions.classList.add("actions");

        const task_edit = document.createElement("button");
        task_edit.classList.add("edit");
        task_edit.innerHTML = '<img src = "images/edit.png">';
        task_edit.name = "edit";

        const task_delete = document.createElement("button");
        task_delete.classList.add("delete");
        task_delete.innerHTML = '<img src = "images/delete.png">';

        const task_completed = document.createElement("input");
        task_completed.classList.add("completed");
        task_completed.type = "checkbox";

        task_actions.appendChild(task_completed);
        task_actions.appendChild(task_edit);
        task_actions.appendChild(task_delete);
        
        task.appendChild(task_actions);
        list.appendChild(task);

        input.value = "";

        task_completed.addEventListener("click", ()=>{
            if(task_completed.checked){
                // UPDATE "IS COMPLETED" BOOLEAN VARIABLE TO BE TRUE
                console.log("changed")
                task_input.style.textDecoration = "line-through";
                task_input.style.opacity = 0.5;
                task_input.style.color = "#1fd655";
                
                
            }
            else{
                // UPDATE "IS COMPLETED" BOOLEAN VARIABLE TO BE FALSE
                console.log("revert")
                task_input.style.textDecoration = "none";
                task_input.style.opacity = 1;
                task_input.style.color = "#EEE";
            }
        })

        task_edit.addEventListener("click", ()=>{
            console.log(task_edit.name)
            if(task_edit.name == "edit"){
                task_input.removeAttribute("readonly");
                task_input.focus();
                task_edit.innerHTML = '<img src = "images/check.png">';
                task_edit.name = "check"
            }
            else{
                // UPDATE TASK WITH THE NEW VALUE OF THE TASK_INPUT
                task_edit.name = "edit"
                task_input.setAttribute("readonly", "readonly");
                task_edit.innerHTML = '<img src = "images/edit.png">';
            }
        })

        task_delete.addEventListener("click", ()=>{
            // REMOVE TASK FROM DATABASE
            list.removeChild(task)
        })
        
    })

})