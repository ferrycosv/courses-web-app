export const init = async () => {
  try {
    const res = await fetch("/api/courses", {
      method: "GET",
    });
    const courses = await res.json();
    if (courses) {
      const list = document.getElementById("courses-list");
      list.innerHTML = courses.reduce((accumulator, currentValue) => {
        return accumulator += `<li> ${JSON.stringify(currentValue)} </li>`;
      }, "");
    }
  } catch (err) {
    console.error(err);
    alert("There's an error check log for details...");
  }
  document.getElementById("save").addEventListener("click", async (event) => {
    event.preventDefault();
    const name = document.getElementById("course_name").value;
    try {
      const res = await fetch("/api/courses/", {
        method: "POST",
        body: JSON.stringify({ name: name }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (res.status === 404) throw err;
      alert("Course saved successfully!");
      location.reload();
    } catch (err) {
      console.error(err);
      alert("There's an error check log for details...");
    }
  });
  document.getElementById("update").addEventListener("click", async (event) => {
    event.preventDefault();
    const name = document.getElementById("course_name").value;
    const course_id = document.getElementById("course_id").value;
    try {
      const res = await fetch(`/api/courses/${course_id}`, {
        method: "PUT",
        body: JSON.stringify({ name: name }),
        headers: {
          "Content-type": "application/json; charset=UTF-8",
        },
      });
      if (res.status === 404) throw err;
      alert("Course updated successfully!");
      location.reload();
    } catch (err) {
      console.error(err);
      alert("There's an error check log for details...");
    }
  });
  document.getElementById("delete").addEventListener("click", async (event) => {
    event.preventDefault();
    const course_id = document.getElementById("course_id").value;
    try {
      const res = await fetch(`/api/courses/${course_id}`, {
        method: "DELETE",
      });
      if (res.status === 404) throw err;
      alert("Course deleted successfully!");
      location.reload();
    } catch (err) {
      console.error(err);
      alert("There's an error check log for details...");
    }
  });
};
