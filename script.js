//to check duplicates

let allTasks = []; // stores all tasks from backend

const BASE_URL = "https://to-do-app-vk8c.onrender.com"; 




// Fetch and render tasks from backend
//forEach is a array method - running a function for every item in the array.
//aync/await let us write asynchronous code like synchronous code

async function fetchTasks(){ 
  const res=await fetch("http://localhost:4000/items");
  const tasks=await res.json();
  allTasks = tasks; //storing tasks in array
  tasks.forEach(renderTask);
}

//Render task function created to display the tasks on front end
function renderTask(task){ 
  const list=document.getElementById("list");
  const listEle=document.createElement('li');
  listEle.className="mb-2 p-2 rounded-4";
  const innerDiv = document.createElement('div');
  innerDiv.className = "d-flex w-50 justify-content-between align-items-center";

  // creating span for text

  const span=document.createElement('span');
  span.textContent=task.text;
  if(task.status) span.classList.add("text-decoration-line-through");

  //Creating buttons

  const buttons=document.createElement('div');

  //complete button

  const btnComplete=document.createElement('button');
  btnComplete.textContent="Complete";
  btnComplete.className="btn btn-success btn-sm me-2";
  btnComplete.addEventListener("click",async()=>{ //clicking on complete button it fetches the value

    //await waits untils it updates the server
    //stringfy: chnages object to string (bcoz the server only accepts string format not objects)

    const res=await fetch(`http://localhost:4000/items/${task._id}`,{ 
      method:"PUT", //put updates our request, so updates status
      headers:{"Content-Type":"application/json"}, //telling to backend: I am sending JSON data
      body:JSON.stringify({status:!task.status}), //toggle status, so clicking completed swiches the task's status
    });

    const updated=await res.json();
    task.status=updated.status;
    span.classList.toggle("text-decoration-line-through");
  });

  //Delete button

  const btnDelete=document.createElement('button');
  btnDelete.textContent="Delete";
  btnDelete.className="btn btn-danger btn-sm";
  btnDelete.addEventListener("click",async()=>{ 

    //await waits until the server deletes the item
    await fetch(`http://localhost:4000/items/${task._id}`,{method:"DELETE"}); //asking server to delete that specific item from db
    list.removeChild(listEle); //after deletion at backend then this runs
  });

  buttons.appendChild(btnComplete);
  buttons.appendChild(btnDelete);

  innerDiv.appendChild(span);
  innerDiv.appendChild(buttons);

  listEle.appendChild(innerDiv);
  list.appendChild(listEle);
}

// Add new task

async function taskfun() {
  const inpEl = document.getElementById("task");
  const text=inpEl.value.trim();
  if(!text){ //if no text in input field
    alert("Enter your Task");
    inpEl.focus(); //cursor on input field
    return;
  }

   //Duplicates Check
  const isDup=allTasks.some(t => t.text.toLowerCase() === text.toLowerCase());
  if (isDup) {
    alert("Task already exists! Enter a new task.");
    return;
  }

  const res = await fetch("http://localhost:4000/items", {
    //await wait until backend creates the item

    method:"POST", //creating new item on server
    headers:{"Content-Type": "application/json"},
    body:JSON.stringify({text:text}),
  });

  const newTask = await res.json();
  renderTask(newTask);
  inpEl.value = "";
  inpEl.focus();
}
  
//Allowing Enter key to add task
  function checkEnter(event){
    if(event.key==="Enter"){
      taskfun();
    }
  }

//Filtering Tasks

function filterTasks(type){
  const listItems=document.querySelectorAll('#list li'); //select the items in list
  listItems.forEach(li => {
    const span = li.querySelector('span');
    const isCompleted = span.classList.contains('text-decoration-line-through'); //iscompleted like boolean value.. checks cond true or false
    //showing tasks in 3 different categories All, Active and Completed
    if(type==='all'){
      li.style.display='flex';
    }else if(type==='active'){
      li.style.display=isCompleted ? 'none' : 'flex';
    } else if(type==='completed'){
      li.style.display=isCompleted ? 'flex' : 'none';
    }
  });
}

fetchTasks(); //func used to load all tasks from backend