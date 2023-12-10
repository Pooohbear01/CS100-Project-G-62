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
document
  .getElementById("studentID")
  .addEventListener("input", validateStudentID);
document.getElementById("email").addEventListener("input", validateEmail);

document.addEventListener("DOMContentLoaded", function() {
  // Function to handle form submission
  function handleSubmit(event) {
    event.preventDefault(); // Prevents the default form submission behavior

    // Get form data
    var formData = {
      fullname: document.getElementById("fullname").value,
      gender: document.getElementById("gender").value,
      doB: document.getElementById("doB").value,
      studentID: document.getElementById("studentID").value,
      email: document.getElementById("email").value,
      faculty: document.getElementById("faculty").value,
      workTitle: document.getElementById("workTitle").value,
      activityType: document.getElementById("activityType").value,
      academicYear: document.getElementById("academicYear").value,
      semester: document.getElementById("semester").value,
      date: document.getElementById("date").value,
      location: document.getElementById("location").value,
      image: document.getElementById("image").value,
    };

    // Display form data (you can customize this part)
    var displayData = "Form Data:\n";
    for (var key in formData) {
      displayData += key + ": " + formData[key] + "\n";
    }

    alert(displayData);
  }

  // Attach the handleSubmit function to the form's submit event
  document.getElementById("myForm").addEventListener("submit", handleSubmit);
});

function functionName(){
  if(!validateName() || !validateThaiName()  || !validateStudentID() || !validateEmail()){
      return false;
  }
  showInfo();

}

/*
function showInfo(){
  document.getElementById('index.html').style.display='block';
  var DataUser = {
      Name: document.getElementById("fullname").value,
      Gender: document.getElementById("gender").value,
      DateofBirth: document.getElementById("doB").value,
      StudentID: document.getElementById("studentID").value,
      UniversityEmail: document.getElementById("email").value,
      Faculty: document.getElementById("faculty").value,
      WorkActivityTitle: document.getElementById("workTitle").value,
      TypeofWorkActivity: document.getElementById("activityType").value,
      AcademicYear: document.getElementById("academicYear").value,
      Semester: document.getElementById("semester").value,
      Location: document.getElementById("location").value,
      Picture: document.getElementById("image").value,
  };
  var formattedData = '<h2>Fav Act</h2><ul>';
  for (var key in DataUser) {
      formattedData += '<li><strong>' + key + ':</strong> ' + DataUser[key] + '</li>';
  }
  formattedData += '</ul>';
  document.getElementById('DateUser').innerHTML = formattedData;
}
*/