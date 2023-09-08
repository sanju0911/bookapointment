const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize(
  "your_database_name",
  "your_username",
  "your_password",
  {
    host: "localhost",
    dialect: "mysql",
  }
);

const Appointment = sequelize.define("Appointment", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const form = document.getElementById("appointment-form");
const appointmentsList = document.getElementById("appointments-list");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const phone = document.getElementById("phone").value;

  sequelize
    .sync()
    .then(() => {
      return Appointment.create({
        name,
        email,
        phone,
      });
    })
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
  Appointment.findAll()
    .then((appointments) => {
      displayItems(appointments);
    })
    .catch((error) => {
      console.log(error);
    });
}

window.addEventListener("DOMContentLoaded", fetchAndDisplayAppointments);

function displayItems(appointments) {
  appointmentsList.innerHTML = "";

  appointments.forEach((appointment) => {
    const name = appointment.name;
    const email = appointment.email;
    const phone = appointment.phone;
    const appointmentId = appointment.id;

    const appointmentItem = document.createElement("div");
    appointmentItem.className = "appointment-item";
    appointmentItem.innerHTML = `
      <p>Name: ${name}</p>
      <p>Email: ${email}</p>
      <p>Phone: ${phone}</p>
      <button onclick="editAppointment('${appointmentId}')">Edit</button>
      <button onclick="deleteAppointment('${appointmentId}')">Delete</button>
    `;

    appointmentsList.appendChild(appointmentItem);
  });
}

function editAppointment(appointmentId) {
  Appointment.findByPk(appointmentId)
    .then((appointment) => {
      if (appointment) {
        document.getElementById("name").value = appointment.name;
        document.getElementById("email").value = appointment.email;
        document.getElementById("phone").value = appointment.phone;
      }
    })
    .catch((error) => {
      console.log(error);
    });
}

function deleteAppointment(appointmentId) {
  Appointment.destroy({
    where: {
      id: appointmentId,
    },
  })
    .then(() => {
      fetchAndDisplayAppointments();
      console.log("Appointment deleted successfully!");
    })
    .catch((error) => {
      console.log(error);
    });
}
