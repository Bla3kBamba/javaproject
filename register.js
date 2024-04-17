
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, setDoc, updateDoc, doc,arrayUnion,arrayRemove,deleteField,deleteDoc,getDocs} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";


const firebaseConfig = {
    apiKey: "AIzaSyCjbbnlCLXE8FXQHkZM-8h4hSvp0Ra6ijI",
    authDomain: "shiftswork-99de1.firebaseapp.com",
    projectId: "shiftswork-99de1",
    storageBucket: "shiftswork-99de1.appspot.com",
    messagingSenderId: "758620038197",
    appId: "1:758620038197:web:92620342c72624b5cebd7c",
    measurementId: "G-RJ0YD87T87"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);




async function updateUser(age, email, firstName, lastName, userName){
    const docRef = await setDoc(doc(db, "users", "ABC"), {
        "age": age,
        "email": email,
        "first name": firstName,
        "last name": lastName,
        "user name": userName
    });
    console.log("Document written with ID: ", docRef.id);
}


async function addNewUser(age, email, firstName, lastName, userName){
    const docRef = await addDoc(collection(db, "users"), {
        "age": age,
        "email": email,
        "first name": firstName,
        "last name": lastName,
        "user name": userName
    });
    console.log("Document written with ID: ", docRef.id);

    
}
async function DeleteUser(age, email, firstName, lastName, userName){
    const docRef = await addDoc(collection(db, "users"), {
        "age": age,
        "email": email,
        "first name": firstName,
        "last name": lastName,
        "user name": userName
    });
    console.log("Document written with ID: ", docRef.id);
}





let firstNameInputRegister = document.querySelector('.Firstname-input-register');
let LastNameInputRegister = document.querySelector('.Lastname-input-register');
let userNameInputRegister = document.querySelector('.user-input-register');
let emailInputRegister = document.querySelector('.email-input-register');
let passlInputRegister = document.querySelector('.password-input-register');
let passlInputRegister2 = document.querySelector('.password-input-register2');
let buttonRegister = document.querySelector('.save-register');
let ageRegister= document.querySelector('.age-input');
let buttongo=document.querySelector('.go-register');

let lowerCase = /[a-z]/g;
let upperCase = /[A-Z]/g;
let numbers = /[1-9]/g;

function saveToLocalStorage() {
    if (emailInputRegister.value.length == 0) {
        alert("please enter emil");
    }
    else if (userNameInputRegister.value.length <= 6) {
        alert('שם משתמש חייב להכיל לפחות 6 תווים');
    }
    else if (firstNameInputRegister.value.length <= 2) {
        alert('חייב להכיל לפחות 2 תווים');
    }
    else if (LastNameInputRegister.value.length <= 2) {
        alert('שם משפחה חייב להכיל לפחות 2 תווים');
    }
    else if (passlInputRegister.value.length == 0) {
        alert("please enter password");
    }
    else if (!passlInputRegister.value.match(lowerCase)) {
        alert("חייב להזין לפחות אות קטנה");
    }
    else if (!passlInputRegister.value.match(upperCase)) {
        alert("חייב להזין לפחות אות גדולה");
    }
    else if (!passlInputRegister.value.match(numbers)) {
        alert("חייב להזין לפחות ספרה אחת");
    }
    else if (passlInputRegister.value !== passlInputRegister2.value) {
        alert('Try Again Password!');
    }
    else if(ageRegister.value < 18 || ageRegister.value > 65){
        alert('minimum age is 18 and maximum is 65');
    }
    else {
        let userDetails = {
            firstName: firstNameInputRegister.value,
            lastName: LastNameInputRegister.value,
            userName: userNameInputRegister.value,
            email: emailInputRegister.value,
            password: passlInputRegister.value, 
            age: ageRegister.value
        };

      
        localStorage.setItem(userDetails.email, JSON.stringify(userDetails));
        localStorage.setItem("currentUserEmail", userDetails.email);
        localStorage.setItem("userName", userDetails.userName);

        addNewUser(userDetails.age,userDetails.email,userDetails.firstName,userDetails.lastName,userDetails.userName);

        alert("הפרטים שלך נשמרו!");
    }
}
function Gotologin() {
    window.location.href = 'http://127.0.0.1:5500/login.html';
}

buttongo.addEventListener('click', Gotologin);
buttonRegister.addEventListener('click', saveToLocalStorage);
