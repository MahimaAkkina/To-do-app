// Fetch and render tasks from backend
async function fetchTasks(){
  const res=await fetch("http://localhost:4000/items");
  const tasks=await res.json();
  tasks.forEach(renderTask);
}

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
  const btnComplete=document.createElement('button');
  btnComplete.textContent="Complete";
  btnComplete.className="btn btn-success btn-sm me-2";
  btnComplete.addEventListener("click",async()=>{
    const res=await fetch(`http://localhost:4000/items/${task._id}`,{
      method:"PUT",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({status:!task.status}),
    });

    const updated=await res.json();
    task.status=updated.status;
    span.classList.toggle("text-decoration-line-through");
  });
  const btnDelete=document.createElement('button');
  btnDelete.textContent="Delete";
  btnDelete.className="btn btn-danger btn-sm";
  btnDelete.addEventListener("click",async()=>{
    await fetch(`http://localhost:4000/items/${task._id}`,{method:"DELETE"});
    list.removeChild(listEle);
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
  if(!text){
    alert("Enter your Task");
    inpEl.focus();
    return;
  }
  const res = await fetch("http://localhost:4000/items", {
    method:"POST",
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