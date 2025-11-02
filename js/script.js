{
  let tasks = [];
  let hideDoneTasks = false;

  const toggleHideDoneTasks = () => {
    hideDoneTasks = !hideDoneTasks;
    render();
  };

  const markAllTasksDone = () => {
    tasks = tasks.map((task) => ({
      ...task,
      done: true,
    }));
    render();
  };

  const toggleHideDoneTasksButton = document.querySelector(
    ".js-toggleHideDoneTasks"
  );
  const markAllDoneButton = document.querySelector(".js-markAllDone");

  if (toggleHideDoneTasksButton) {
    toggleHideDoneTasksButton.innerText = hideDoneTasks
      ? "Pokaż ukończone"
      : "Ukryj ukończone";
  }

  if (markAllDoneButton) {
    markAllDoneButton.disabled = tasks.every(({ done }) => done);
  }

  const removeTask = (taskIndex) => {
    tasks = tasks.filter((_, index) => index !== taskIndex);
    render();
  };

  const toggleTaskDone = (taskIndex) => {
    tasks = tasks.map((task, index) =>
      index === taskIndex ? { ...task, done: !task.done } : task
    );
    render();
  };

  const addNewTask = (newTaskContent) => {
    tasks = [
      ...tasks,
      {
        content: newTaskContent,
        done: false,
      },
    ];
    render();
  };

  const bindRemoveEvents = () => {
    const removeButtons = document.querySelectorAll(".js-remove");

    removeButtons.forEach((removeButton, taskIndex) => {
      removeButton.addEventListener("click", () => {
        removeTask(taskIndex);
      });
    });
  };

  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, taskIndex) => {
      toggleDoneButton.addEventListener("click", () => {
        toggleTaskDone(taskIndex);
      });
    });
  };

  const renderTasks = () => {
    const taskListElement = document.querySelector(".js-tasks");

    if (!taskListElement) return;
    taskListElement.innerHTML = tasks
      .map((task) => ({
        ...task,
        hidden: hideDoneTasks && task.done,
      }))
      .map((task) =>
        task.hidden
          ? ""
          : `
                <li class="tasks__listItem">
                    <button class="tasks__button tasks__button--toggleDone js-done ${
                      task.done
                    }">
                        ${task.done ? "&#x2713;" : "&nbsp;"}
                    </button>
                    <span class="tasks__content ${
                      task.done ? "tasks__content--done" : ""
                    }">
                        ${task.content}
                    </span>
                    <button class="tasks__button--remove js-remove">
                        &#128465;
                    </button>
                </li>
            `
      )
      .join("");
  };

  const renderButtons = () => {};

  const bindButtonsEvents = () => {};

  const render = () => {
    renderTasks();
    renderButtons();
    const markAllDoneButton = document.querySelector(".js-markAllDone");

    if (markAllDoneButton) {
      markAllDoneButton.disabled =
        tasks.length === 0 || tasks.every(({ done }) => done);
    }
    bindRemoveEvents();
    bindToggleDoneEvents();
    bindButtonsEvents();
  };

  const onFormSubmit = (event) => {
    event.preventDefault();

    const newTaskElement = document.querySelector(".js-newTask");
    const newTaskContent = newTaskElement.value.trim();

    if (newTaskContent !== "") {
      addNewTask(newTaskContent);
      newTaskElement.value = "";
    }
    newTaskElement.focus();
  };

  const init = () => {
    render();

    const form = document.querySelector(".js-form");

    form.addEventListener("submit", onFormSubmit);
    const toggleHideDoneTasksButton = document.querySelector(
      ".js-toggleHideDoneTasks"
    );
    const markAllDoneButton = document.querySelector(".js-markAllDone");

    toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
    markAllDoneButton.addEventListener("click", markAllTasksDone);
  };

  init();
}
