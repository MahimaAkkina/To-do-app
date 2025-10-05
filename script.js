let ar = [];
function taskfun() {
  const inpEl = document.getElementById('task');
  const raw = inpEl.value;
  const inp = raw.trim(); // remove extra spaces
  const list = document.getElementById('list');

  if (inp === "") {
    alert("Enter your Task");
    inpEl.focus();
    return;
  }

  // case-insensitive duplicate words check
  const exists = ar.some(t => t.toLowerCase() === inp.toLowerCase());
  if (exists) {
    alert("Task already exists!");
    inpEl.focus();
    return;
  }

  const ele = document.createElement('li');
  ele.textContent = inp;
  list.appendChild(ele);

  ar.push(inp);             // store the task text
  inpEl.value = "";         // clear input
  inpEl.focus();            // put cursor back in the input
}
