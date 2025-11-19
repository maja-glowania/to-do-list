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

  const getOriginalTaskIndex = (domIndex) => {
    const visibleTasks = tasks
      .map((task, originalIndex) => ({ ...task, originalIndex }))
      .filter((task) => !(hideDoneTasks && task.done));

    return visibleTasks[domIndex]?.originalIndex;
  };

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

    removeButtons.forEach((removeButton, domIndex) => {
      removeButton.addEventListener("click", () => {
        const originalIndex = getOriginalTaskIndex(domIndex);
        if (originalIndex !== undefined) {
          removeTask(originalIndex);
        }
      });
    });
  };

  const bindToggleDoneEvents = () => {
    const toggleDoneButtons = document.querySelectorAll(".js-done");

    toggleDoneButtons.forEach((toggleDoneButton, domIndex) => {
      toggleDoneButton.addEventListener("click", () => {
        const originalIndex = getOriginalTaskIndex(domIndex);
        if (originalIndex !== undefined) {
          toggleTaskDone(originalIndex);
        }
      });
    });
  };

  const bindButtonsEvents = () => {
    const toggleHideDoneTasksButton = document.querySelector(
      ".js-toggleHideDoneTasks"
    );
    const markAllDoneButton = document.querySelector(".js-markAllDone");

    if (toggleHideDoneTasksButton) {
      toggleHideDoneTasksButton.addEventListener("click", toggleHideDoneTasks);
    }
    if (markAllDoneButton) {
      markAllDoneButton.addEventListener("click", markAllTasksDone);
    }
  };

  const renderTasks = () => {
    const taskListElement = document.querySelector(".js-tasks");

    if (!taskListElement) return;
    taskListElement.innerHTML = tasks
      .map((task) => ({
        ...task,
        hidden: hideDoneTasks && task.done,
      }))
      .filter((task) => !task.hidden)
      .map(
        (task) => `
          <li class="tasks__listItem">
            <button class="tasks__button tasks__button--toggleDone js-done">
              ${task.done ? "&#x2713;" : "&nbsp;"}
            </button>
            <span class="tasks__content ${
              task.done ? "tasks__content--done" : ""
            }">
              ${task.content}
            </span>
            <button class="tasks__button tasks__button--remove js-remove">
              &#128465;
            </button>
          </li>
        `
      )
      .join("");
  };

  const renderButtons = () => {
    const buttonsContainer = document.querySelector(".js-buttons");

    if (!buttonsContainer) return;

    if (tasks.length === 0) {
      buttonsContainer.innerHTML = "";
      return;
    }

    const areAllTasksDone = tasks.every(({ done }) => done);

    buttonsContainer.innerHTML = `
      <button class="section__button js-toggleHideDoneTasks">
        ${hideDoneTasks ? "Pokaż ukończone" : "Ukryj ukończone"}
      </button>
      <button class="section__button js-markAllDone" ${
        areAllTasksDone ? "disabled" : ""
      }>
        Ukończ wszystkie
      </button>
    `;
  };

  const render = () => {
    renderButtons();
    renderTasks();
    bindButtonsEvents();
    bindRemoveEvents();
    bindToggleDoneEvents();
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
    if (form) {
      form.addEventListener("submit", onFormSubmit);
    }
  };

  init();
}
