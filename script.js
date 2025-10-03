// let ar=[]
// function taskfun(){
//     let inp=document.getElementById('task').value; //grtting input
//     let list = document.getElementById("list");
//     if (inp === ""){
//         alert("Enter your Task");
//     } 
//     else if (ar.includes(inp)){
//         alert("Task already exists!");
//     } 
//     else{
//         let ele = document.createElement('li');
//         ele.textContent = inp;     // directly set text
//         list.appendChild(ele);
//         ar.push(inp);           // stores input
//         document.getElementById('task').value = ""; //clear the date in input field
//   }
// }

let ar = [];

function taskfun() {
  let inp = document.getElementById('task').value; 
  let list = document.getElementById("list");

  if (inp === "") {
    alert("Enter your Task");     // BOM
  } else if (ar.includes(inp)) {
    alert("Task already exists!"); // BOM
  } else {
    // Create <li>
    let ele = document.createElement('li');

    // Create checkbox
    let checkbox = document.createElement('input');
    checkbox.type = "checkbox";

    // Create span for text
    let span = document.createElement('span');
    span.textContent = inp;

    // Toggle complete when checkbox changes
    checkbox.addEventListener("change", function() {
      span.classList.toggle("completed");
    });

    // Build the <li>
    ele.appendChild(checkbox);
    ele.appendChild(span);

    // Append li into ul
    list.appendChild(ele);

    // Save task into array
    ar.push(inp);

    // Clear input
    document.getElementById('task').value = "";
  }
}
