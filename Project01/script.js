let students = JSON.parse(localStorage.getItem("students")) || [];

/* LOGIN */
function login() {
    if (
        document.getElementById("adminUser").value === "admin" &&
        document.getElementById("adminPass").value === "1234"
    ) {
        localStorage.setItem("isLoggedIn", "true");
        window.location.href = "admission.html";
    } else {
        alert("Wrong Login");
    }
}


function logout() {
    location.reload();
}



/* ADD STUDENT */
function addStudent() {
    let student = {
        id: sid.value,
        name: sname.value,
        father: fname.value,
        dob: dob.value,
        category: category.value,
        contact: contact.value,
        email: email.value,
        city: city.value,
        address: address.value,
        trade: strade.value
    };

    if (!student.id || !student.name || !student.trade) {
        alert("Fill required fields");
        return;
    }

    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
    showStudents();
    document.querySelectorAll("input, textarea").forEach(e => e.value = "");
    strade.value = "";
}

document.addEventListener("DOMContentLoaded", function () {
    showStudents();
});


/* SHOW STUDENTS TRADE WISE */
function showStudents() {
    let container = document.getElementById("tables");
    container.innerHTML = "";

    let trades = [...new Set(students.map(s => s.trade))];

    trades.forEach(trade => {
        let tradeStudents = students.filter(s => s.trade === trade);

        let table = `
        <h3>${trade}</h3>
        <table>
            <tr>
                <th>Roll</th><th>Name</th><th>Father</th><th>DOB</th>
                <th>Category</th><th>Contact</th><th>Email</th>
                <th>City</th><th>Address</th><th>Action</th>
            </tr>
        `;

        tradeStudents.forEach((s, i) => {
            table += `
            <tr>
                <td>${s.id}</td>
                <td>${s.name}</td>
                <td>${s.father}</td>
                <td>${s.dob}</td>
                <td>${s.category}</td>
                <td>${s.contact}</td>
                <td>${s.email}</td>
                <td>${s.city}</td>
                <td>${s.address}</td>
                <td><button onclick="removeStudent(${students.indexOf(s)})">Remove</button></td>
            </tr>`;
        });

        table += "</table><br>";
        container.innerHTML += table;
    });
}

/* REMOVE */
function removeStudent(index) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    showStudents();
}
