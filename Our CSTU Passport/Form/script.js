const config = {
  backendUrl: "http://localhost:8000/", // Default backend URL
};
const port = 8000;

// Function to validate Firstname and Lastname
function validateName() {
  const fullnameInput = document.getElementById("fullname");
  const names = fullnameInput.value.trim().split(" ");
  const errorElement = document.getElementById("fullnameError");

  if (names.length !== 2) {
    errorElement.textContent = "Please enter both your Firstname and Lastname.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}

// Function to validate Date of Birth
function validateDateofBirth(){
  var dobInput = document.getElementById('doB');
  var dobValue = dobInput.value;
  var errorElement = document.getElementById('doBError');
  if(dobValue === '') {
    alert('Please enter your date of birth.');
    return;
  }
  var dobDate = new Date(dobValue);
  if(isNaN(dobDate.getTime())) {
    alert('Please enter a valid date of birth.');
    return;
  }
  var currentDate = new Date();
  if(dobDate > currentDate) {
    alert('Date of birth cannot be later than the current day.');
    return;
  }
  alert('Date of birth is correct.');
}

// Function to validate Student ID
function validateStudentID() {
  const studentIDInput = document.getElementById("studentID");
  const studentIDPattern = /^\d{10}$/;
  const errorElement = document.getElementById("studentIDError");

  if (!studentIDPattern.test(studentIDInput.value)) {
    errorElement.textContent = "Please enter a 10-digit Student ID.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}

// Function to validate University Email
function validateEmail() {
  const emailInput = document.getElementById("email");
  const emailPattern = /^.+@dome\.tu\.ac\.th$/;
  const errorElement = document.getElementById("emailError");

  if (!emailPattern.test(emailInput.value)) {
    errorElement.textContent =
      "Please provide a valid university email in the format 'xxx.yyy@dome.tu.ac.th'.";
    return false;
  } else {
    errorElement.textContent = ""; // Clear the error message when valid
  }
  return true;
}

// Function to validate form inputs on user input
function validateFormOnInput() {
  validateName();
  validateStudentID();
  validateEmail();
}

// Function to fetch activity types from the backend
async function fetchActivityTypes() {
  try {
    const response = await fetch(`http://${window.location.hostname}:${port}/getActivityType`);
    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      console.error("Failed to fetch activity types.");
      return [];
    }
  } catch (error) {
    console.error("An error occurred while fetching activity types:", error);
    return [];
  }
}

// Function to populate activity types in the select element
function populateActivityTypes(activityTypes) {
  const activityTypeSelect = document.getElementById("activityType");

  for (const type of activityTypes) {
    const option = document.createElement("option");
    option.value = type.id;
    option.textContent = type.value;
    activityTypeSelect.appendChild(option);
  }
}

// Event listener when the page content has finished loading
document.addEventListener("DOMContentLoaded", async () => {
  const activityTypes = await fetchActivityTypes();
  populateActivityTypes(activityTypes);
});

// Function to submit the form
// Function to submit the form
async function submitForm(event) {
  event.preventDefault();

  // Validate form inputs before submission
  if (!validateName() || !validateStudentID() || !validateEmail()) {
    return;
  }

  const startDateInput = document.getElementById("startDate").value;
  const endDateInput = document.getElementById("endDate").value;
  const startDate = new Date(startDateInput);
  const endDate = new Date(endDateInput);

  if (endDate <= startDate) {
    alert("End datetime should be after the start datetime.");
    return;
  }

  // Create the data object to send to the backend
  const formData = new FormData(event.target);
  const data = {
    first_name: formData.get("fullname").split(" ")[0],
    last_name: formData.get("fullname").split(" ")[1],
    student_id: parseInt(formData.get("studentID")),
    email: formData.get("email"),
    title: formData.get("workTitle"),
    type_of_work_id: parseInt(formData.get("activityType")),
    academic_year: parseInt(formData.get("academicYear")) - 543,
    semester: parseInt(formData.get("semester")),
    start_date: formData.get("startDate"),
    end_date: formData.get("endDate"),
    location: formData.get("location"),
    description: formData.get("description")
  };

  console.log(data);

  try {
    // Send data to the backend using POST request
    const response = await fetch(`http://${window.location.hostname}:${port}/record`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Form data submitted successfully!");

      // Format JSON data for display
      const formattedData = Object.entries(responseData.data)
        .map(([key, value]) => `"${key}": "${value}"`)
        .join("\n");

      // Display success message with formatted data
      alert(responseData.message + "\n" + formattedData);

      document.getElementById("myForm").reset();
    } else {
      console.error("Failed to submit form data.");

      // Display error message
      alert("Failed to submit form data. Please try again.");
    }
  } catch (error) {
    console.error("An error occurred while submitting form data:", error);
  }
}

// Event listener for form submission
document.getElementById("myForm").addEventListener("submit", submitForm);

// Event listeners for input validation on user input
document.getElementById("fullname").addEventListener("input", validateName);
document.getElementById("studentID").addEventListener("input", validateStudentID);
document.getElementById("email").addEventListener("input", validateEmail);

function validation(){
  if(!validateName() || !validateStudentID() || !validateEmail()){
      return false;
  }
  getValuetoResult();
  showimage();
}

function getValuetoResult(){     
  document.getElementById('submitdate').removeAttribute('hidden')
  let fullname = document.getElementById('fullname')
  let gen = document.getElementById('gender')
  let birth = document.getElementById('doB')
  let stid = document.getElementById('studentID')
  let mail = document.getElementById('email')
  let fact = document.getElementById('faculty')
  let work = document.getElementById('workTitle')
  let type = document.getElementById('activityType')
  let year = document.getElementById('academicYear')
  let semester = document.getElementById('semester')
  let date = document.getElementById('dateofWork/Activity')
  let location = document.getElementById('location')


  let res = document.getElementById('showresult')
  let msg = ''
  msg += '<p><b>Full Name :</b> '+ fullname.value +'</p>'
  msg += '<p><b>Gender :</b> '+ gen.value +'</p>'
  msg += '<p><b>Date of Birth :</b> '+ birth.value +'</p>'
  msg += '<p><b>Student ID :</b> '+ stid.value +'</p>'
  msg += '<p><b>University Email :</b> '+ mail.value +'</p>'
  msg += '<p><b>Faculty :</b> '+ fact.value +'</p>'
  msg += '<p><b>Work/Activity Title : </b> '+ work.value +'</p>'
  msg += '<p><b>Type of Work/Activity :</b> '+ type.value +'</p>'
  msg += '<p><b>Academic Year :</b> ' + year.value +'</p>'
  msg += '<p><b>Semester :</b> '+ semester.value +'</p>'
  msg += '<p><b>dateofWork/Activity:</b> '+ date.value +'</p>'
  msg += '<p><b>Location :</b> '+ location.value +'</p>'

  res.innerHTML = msg

  res.scrollIntoView()
}

function showimage(){
  var input = document.getElementById("imageInput");
  var imageContainer = document.getElementById("showimg");  
  if (input.files && input.files[0]) {
      var reader = new FileReader();
      reader.onload = function(e) {
          
          var imageElement = document.createElement("img");
          imageElement.src = e.target.result;
          imageElement.width = 300; 
          imageContainer.innerHTML = ""; 
          imageContainer.appendChild(imageElement);
      };
      reader.readAsDataURL(input.files[0]);
  }
}