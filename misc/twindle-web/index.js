// Variables for DOM events
const emailEntry = document.querySelector("#email_entry");
const form = document.forms["email_sub_form"];

/** Bypass CORS Policy */
const proxyUrl = "https://cors-anywhere.herokuapp.com/"; // localhost CORS bypass
const scriptUrl = `https://script.google.com/macros/s/AKfycbxSk46xwxe9nTlEdr7L3zabI7Au1puj7BTMk9d_WibZkS0m5Gs/exec`; // Script of google form - Twindle needs to create it later. Currently my email is set.

// Event Listeners
form.addEventListener("submit", addEmailToGoogleSheet);

// Functions
function addEmailToGoogleSheet(event) {
  event.preventDefault();
  const email = emailEntry.value;
  const isEmail = validateEmail(email);

  if (!isEmail) {
    alert(`Enter valid email here`); // this can be enhanced using flash messages
    return false;
  }

  fetch(proxyUrl + scriptUrl, { method: "POST", body: new FormData(form) })
    .then(
      (response) => alert(`Thanks for subscribing to our service! We will contact you soon...`) // again, this can be enhanced using flash messages
    )
    .catch((error) => console.error("Error!", error.message));
}

function validateEmail(email) {
  const re = new RegExp("[^@ \t\r\n]+@[^@ \t\r\n]+.[^@ \t\r\n]+");
  return re.test(email);
}
