const weatherForm = document.querySelector("form");
const searchField = document.querySelector("input");
const messages = document.querySelectorAll("p");

weatherForm.addEventListener("click", e => {
  e.preventDefault();
  if (e.target.tagName === "BUTTON") {
    const location = searchField.value;
    messages[1].textContent = "Searching Weather...";
    messages[2].textContent = "";
    messages[3].textContent = "";
    fetch(`/weather?address=${location}`).then(resp => {
      resp.json().then(data => {
        if (data.error) {
          messages[1].textContent = data.error;
          messages[2].textContent = "";
          messages[3].textContent = "";
        } else {
          messages[1].textContent = "Location: " + data.location;
          messages[2].textContent =
            "Temperature: " +
            Math.floor(data.temperature) +
            String.fromCharCode(176);
          messages[3].textContent = "Summary: " + data.forecast;
        }
      });
    });
  }
});
