let ar = [];
function taskfun(){
  const inpEl = document.getElementById('task');
  const raw = inpEl.value;
  const inp = raw.trim(); // remove extra spaces
  const list = document.getElementById('list');

  if (inp==="") {
    alert("Enter your Task");
    inpEl.focus();
    return;
  }

// case-insensitive duplicate words check
  const exists = ar.some(t => t.toLowerCase() === inp.toLowerCase()); // function for duplicate and case-insensitive
  if (exists) {
    alert("Task already exists!");
    inpEl.focus();
    return;
  }

  //creating list items
  const listEle=document.createElement('li');
  listEle.className="mb-2 p-2 rounded-4";
  

  const innerDiv = document.createElement('div');
  innerDiv.className = "d-flex w-50 justify-content-between align-items-center";
  
  // creating span for text
  const span=document.createElement('span');
  span.textContent=inp;

  //Creating buttons
  const buttons=document.createElement('div');
  const btnComplete=document.createElement('button');
  btnComplete.textContent="Complete";
  btnComplete.className="btn btn-success btn-sm me-2"

  const btnDelete=document.createElement('button');
  btnDelete.textContent="Delete";
  btnDelete.className="btn btn-danger btn-sm"

  buttons.appendChild(btnComplete);
  buttons.appendChild(btnDelete);

  innerDiv.appendChild(span);
  innerDiv.appendChild(buttons);

  listEle.appendChild(innerDiv);
  list.appendChild(listEle);


  ar.push(inp);             // it stores the task text
  inpEl.value = "";         // it clears the input
  inpEl.focus();            // put cursor back in the input

  // Complete button functionality
  btnComplete.addEventListener('click',function(){
    span.classList.toggle('text-decoration-line-through'); //strikes it 
  });

  // Deletd button functionality
  btnDelete.addEventListener('click',function(){
    list.removeChild(listEle); //removes from array
    ar=ar.filter(t=>t!==inp); 
  });
}

