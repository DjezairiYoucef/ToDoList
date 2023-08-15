// call all elements from HTML
let mession = document.querySelector(".prompt");
let add = document.querySelector(".add");
let edit = document.querySelector(".edit");
let check = document.querySelector(".check");
let del = document.querySelector(".delete");
let content = document.querySelector(".content");

let tasks = [
  // {
  //   title: "reading books",
  //   date: "12/25/1999",
  //   done: true,
  // },
  // {
  //   title: "reaks",
  //   date: "12/25/1999",
  //   done: false,
  // },
  // {
  //   title: "reading ",
  //   date: "12/25/1999",
  //   done: true,
  // },
  // {
  //   title: " books",
  //   date: "12/25/1999",
  //   done: false,
  // },
  // {
  //   title: "youcef",
  //   date: "12/25/1999",
  //   done: false,
  // },
];

function getItemsfromLS() {
  let test = JSON.parse(localStorage.getItem("LocalTaskes"));
  // if (test == null) {
  //   tasks = [];
  // } else {
  //   tasks = test;
  // }
  tasks = test ?? [];
}

getItemsfromLS();

function addToHTML() {
  content.innerHTML = "";
  let index = 0;
  for (task of tasks) {
    let list = `
          <div class="list ${task.done ? "done" : ""}">
          <div class="txt-date">
            <h2 class="prompt">${task.title}</h2>
            <p>
            ${date()}
              <span class="material-symbols-outlined"> calendar_month </span>
            </p>
          </div>
          <div class="icons">
            <span class="material-symbols-outlined edit" onclick=editting(${index})> edit </span>
            <div onclick= ISDone(${index})>${
      task.done
        ? "<span class='material-symbols-outlined close'>close</span>"
        : "<span class='material-symbols-outlined check' > check </span>"
    }
            </div>
            <span class="material-symbols-outlined delete" onclick=deleteTask(${index}) > delete </span>
          </div>
        </div>
    `;
    content.innerHTML += list;
    index++;
  }
}
addToHTML();

add.addEventListener("click", () => {
  let titleTask = prompt("المرجو ادخال عنوان المهمة");
  let taskobject = {
    title: titleTask,
    date: date(),
    done: false,
  };
  tasks.push(taskobject);
  editLS();
  addToHTML();
});

function date() {
  const date = new Date();
  const formattedDate = `${date.getFullYear()}/${
    date.getMonth() + 1
  }/${date.getDate()} | ${date.getHours()} : ${date.getMinutes()} `;
  return formattedDate;
}

// function delete taskes

function deleteTask(index) {
  let tasksCheck = tasks[index];
  let confurmation = confirm(tasksCheck.title + "  هل حقا تريد خذف المهمة");
  if (confurmation) {
    tasks.splice(index, 1);
    editLS();
  }

  addToHTML();
}

function editting(index) {
  let old = tasks[index].title;
  let New = prompt("التعدبل", old);
  tasks[index].title = New;
  editLS();
  addToHTML();
}

function ISDone(index) {
  // if (tasks[index].done == true) {
  //   tasks[index].done = false;
  // } else {
  //   tasks[index].done = true;
  // }
  tasks[index].done = !tasks[index].done;
  editLS();
  addToHTML();
}

// ================ Local Storage Functions ===============
function editLS() {
  localStorage.setItem("LocalTaskes", JSON.stringify(tasks));
}
