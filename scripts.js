let patientCount = 0; // To track the roll/serial number

// Function to add a patient
function addPatient() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const gender = document.getElementById('gender').value;
    const details = document.getElementById('details').value;
    const problem = document.getElementById('problem').value;
    const criticality = document.getElementById('criticality').value;

    // Ensure all fields are filled
    if (!name || !age || !gender || !details || !problem || !criticality) {
        alert("Please fill in all fields.");
        return;
    }

    // Increment patient count for serial number
    patientCount++;

    // Create a patient object
    const patient = {
        rollNumber: patientCount,
        name,
        age,
        gender,
        details,
        problem,
        criticality,
    };

    // Create a div to display the patient
    const patientDiv = document.createElement('div');
    patientDiv.classList.add('patient');
    patientDiv.innerHTML = `
        <strong>Name:</strong> ${patient.name}<br>
        <strong>Age:</strong> ${patient.age}<br>
        <strong>Gender:</strong> ${patient.gender}<br>
        <strong>Details:</strong> ${patient.details}<br>
        <strong>Problem:</strong> ${patient.problem}<br>
        <strong>Criticality:</strong> ${patient.criticality}<br>
        <button onclick="admitPatient(this, ${patient.rollNumber})">Admit</button>
        <button onclick="editPatient(this)">Edit</button>
        <button onclick="deletePatient(this)">Delete</button>
    `;

    // Add patient to respective category column
    const columnId = `${patient.criticality.toLowerCase()}Patients`;
    document.getElementById(columnId).appendChild(patientDiv);

    // Clear the input fields after adding the patient
    document.getElementById('name').value = '';
    document.getElementById('age').value = '';
    document.getElementById('gender').value = '';
    document.getElementById('details').value = '';
    document.getElementById('problem').value = '';
    document.getElementById('criticality').value = '';
}

// Function to admit a patient
function admitPatient(button, rollNumber) {
    const patientDiv = button.parentElement;
    const admittedPatientsColumn = document.getElementById('admittedPatients');

    // Move the patient to the admitted column
    admittedPatientsColumn.appendChild(patientDiv);

    // Add a button to print the receipt
    const printButton = document.createElement('button');
    printButton.textContent = 'Print Receipt';
    printButton.onclick = function() {
        printPatientReceipt(patientDiv, rollNumber);
    };
    patientDiv.appendChild(printButton);

    // Remove the Admit button since patient is now admitted
    button.remove();
}

// Function to print patient receipt
function printPatientReceipt(patientDiv, rollNumber) {
    // Retrieve each field using the structure of the patientDiv content
    const name = patientDiv.querySelector('strong:nth-of-type(1)').nextSibling.textContent.trim();
    const age = patientDiv.querySelector('strong:nth-of-type(2)').nextSibling.textContent.trim();
    const gender = patientDiv.querySelector('strong:nth-of-type(3)').nextSibling.textContent.trim();
    const details = patientDiv.querySelector('strong:nth-of-type(4)').nextSibling.textContent.trim();
    const problem = patientDiv.querySelector('strong:nth-of-type(5)').nextSibling.textContent.trim();
    const criticality = patientDiv.querySelector('strong:nth-of-type(6)').nextSibling.textContent.trim();

    // Create print content for the receipt
    const printContent = `
        <html>
        <head>
            <title>Patient Receipt - Serial No. ${rollNumber}</title>
        </head>
        <body>
            <h1>Patient Receipt</h1>
            <p><strong>Serial No:</strong> ${rollNumber}</p>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Age:</strong> ${age}</p>
            <p><strong>Gender:</strong> ${gender}</p>
            <p><strong>Details:</strong> ${details}</p>
            <p><strong>Problem:</strong> ${problem}</p>
            <p><strong>Criticality:</strong> ${criticality}</p>
            <button onclick="window.print()">Print</button>
        </body>
        </html>
    `;

    // Open a new window to display the receipt and print
    const printWindow = window.open('', '_blank');
    printWindow.document.write(printContent);
    printWindow.document.close();
    printWindow.focus();
}

// Function to delete a patient
function deletePatient(button) {
    const patientDiv = button.parentElement;
    patientDiv.remove();
}

// Function to edit a patient's information
function editPatient(button) {
    // Implement edit functionality if needed
    alert('Edit functionality is not implemented yet.');
}
