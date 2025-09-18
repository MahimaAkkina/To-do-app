let ar=[]
function taskfun(){
    let inp=document.getElementById('task').value; //grtting input
    let list = document.getElementById("list");
    if (inp === ""){
        alert("Enter your Task");
    } 
    else if (array.includes(inp)){
        alert("Task already exists!");
    } 
    else{
        let ele = document.createElement('li');
        ele.textContent = inp;     // directly set text
        list.appendChild(ele);
        array.push(inp);           // stores input
        document.getElementById('task').value = ""; //clear the date in input field
  }
}