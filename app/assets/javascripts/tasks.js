$(() => {
  
  let taskHtml = (task) => {
    let taskStatus = task.done ? "checked" : "";
      let liElement = '<li><div class="view"><input class="toggle" type="checkbox"' +
        " data-id='" + task.id + "'" +
        taskStatus + '><label>' +
        task.title +
        '</label></div></li>';
    return liElement;
  }

  let toggleTask = (e) => {
    let itemId = $(e.target).data("id");

    let doneValue = Boolean($(e.target).is(':checked'));

    $.post("/tasks/" + itemId, {
      _method: "PUT",
      task: {
        done: doneValue
      }
    })
  }

  $.get("/tasks").success((data) => {
    let htmlString = "";

    $.each(data, (index, task) => {
      
      htmlString += taskHtml(task);
    });
    let ulTodos = $('.todo-list');
    ulTodos.html(htmlString);

    $('.toggle').change(toggleTask)
  });

  $('#new-form').submit((event) => {
    event.preventDefault();
    const textbox = $('.new-todo');
    const payload = {
      task: {
        title: textbox.val()
      }
    }
    $.post("/tasks", payload).success((data) => {
      let htmlString = taskHtml(data);
      let ulTodos = $('.todo-list');
      ulTodos.append(htmlString);
      $('.toggle').change(toggleTask);
    })
  })
});
