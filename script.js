const form = document.getElementById('appointment-form');
const appointmentsList = document.getElementById('appointments-list');

form.addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;

    const appointment = {
        name,
        email,
        phone
    };

    axios.post("https://crudcrud.com/api/99b96b3377044912b96aa9410b770c30/appbook", appointment)
        .then(() => {
        
            fetchAndDisplayAppointments();
            console.log("Appointment booked successfully!");
        })
        .catch((err) => {
            console.log(err);
        });


    form.reset();
});
function fetchAndDisplayAppointments() {
    axios.get("https://crudcrud.com/api/99b96b3377044912b96aa9410b770c30/appbook")
        .then((response) => {
            const appointments = response.data;
            displayItems(appointments);
        })
        .catch((error) => {
            console.log(error);
        });
}
window.addEventListener('DOMContentLoaded',fetchAndDisplayAppointments)
fetchAndDisplayAppointments();

function displayItems(dataArray) {
    appointmentsList.innerHTML = ''; 

    dataArray.forEach((data, index) => {
        const name = data.name;
        const email = data.email;
        const phone = data.phone;

        const appointmentItem = document.createElement('div');
        appointmentItem.className = 'appointment-item';
        appointmentItem.innerHTML = `
            <p>Name: ${name}</p>
            <p>Email: ${email}</p>
            <p>Phone: ${phone}</p>
            <button onclick="editAppointment(${index})">Edit</button>
            <button onclick="deleteAppointment(${index})">Delete</button>

        `;

        appointmentsList.appendChild(appointmentItem);
    });
}
