class Node {
    constructor(name, phone) {
        this.name = name;
        this.phone = phone;
        this.next = null;
    }
}

class LinkedList {
    constructor(start) {
        this.start = null;
    }

    add(name, phone) {
        const newNode = new Node(name, phone);
        if (!this.start) {
            this.start = newNode;
        } else {
            let temp = this.start;
            while (temp.next) {
                temp = temp.next;
            }
            temp.next = newNode;
        }
    }

    remove(phone) {
        if (!this.start) return;

        if (this.start.phone === phone) {
            this.start = this.start.next;
            return;
        }

        let temp = this.start;
        let q = null;

        while (temp.next && temp.phone !== phone) {
            q = temp;
            temp = temp.next;
        }

        if (temp) {
            q.next = temp.next;
        }
    }

    getAllContacts() {
        const contacts = [];
        let temp = this.start;
        while (temp) {
            contacts.push({ name: temp.name, phone: temp.phone });
            temp = temp.next;
        }
        return contacts;
    }
}


const contactsList = new LinkedList();
const contactsDropdown = document.getElementById('contacts');
const popup = document.getElementById('popup');
const popupOverlay = document.getElementById('popupOverlay');
const popupName = document.getElementById('popupName');
const popupPhone = document.getElementById('popupPhone');


document.getElementById('showPopup').addEventListener('click', function () {
    popup.style.display = "block";
    popupOverlay.style.display = "block";
});

document.getElementById('closePopup').addEventListener('click', function () {
    popup.style.display = "none";
    popupOverlay.style.display = "none";
});
popupOverlay.addEventListener('click', function () {
    popup.style.display = "none";
    popupOverlay.style.display = "none";
});

function updateContactsDropdown() {
    contactsDropdown.innerHTML = "";
    contactsList.getAllContacts().forEach(contact => {
        const option = document.createElement('option');
        option.value = contact.phone;
        option.textContent = contact.name;
        contactsDropdown.appendChild(option);
    });
}


document.getElementById('addContact').addEventListener('click', function () {
    const name = popupName.value.trim();
    const phone = popupPhone.value.trim();

    if (!name || !phone) {
        alert("Please enter your name and phone number!");
        return;
    }

    contactsList.add(name, phone);
    updateContactsDropdown();

    popupName.value = "";
    popupPhone.value = "";
    popup.style.display = "none";
    popupOverlay.style.display = "none";

});

document.getElementById('deleteB').addEventListener('click', () => {
    const index = contactsDropdown.value;
    const message = document.getElementById('message');


    if (!index) {
        alert('Select the contact.');
        return;
    }

    contactsList.remove(index);
    message.value = "";
    updateContactsDropdown();
})



document.getElementById('send').addEventListener('click', function () {
    const phoneNumber = document.getElementById('contacts').value;
    const message = document.getElementById('message').value;

    if (!phoneNumber) {
        alert("Select the contact.");
        return;
    }
    if (!message) {
        alert("Please enter a message!");
        return;
    }

    const encodedMessage = encodeURIComponent(message);
    const whatsappLink = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedMessage}`;

    window.open(whatsappLink, "_blank");
});