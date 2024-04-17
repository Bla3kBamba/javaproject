import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-analytics.js";
import { getFirestore, collection, addDoc, setDoc, updateDoc,where, doc,arrayUnion,arrayRemove,deleteField,deleteDoc,getDocs} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";


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



async function getUserRecord(userName) {
    try {
        // Reference to a Firestore collection
        const myCollection = collection(db, 'users');

        
        const q = query(myCollection, where('user name', '==', userName));
        console.log(q);
        const querySnapshot = await getDocs(q);

       
        if (!querySnapshot.empty) {
            const doc = querySnapshot.docs[0];
            console.log(doc.id, ' => ', doc.data());
            return doc.id
        } else {
            console.log("No record found for username:", username);
        }
    } catch (error) {
        console.error("Error reading data: ", error);
    }
}

async function addNewShift(userId, branch, endTime, hourlyWage, role ,startTime){
    const docRef = await setDoc(doc(db, "shifts", "ABC"), {
        "UserId": userId,
        "branch":branch,
        "endTime ":endTime,
        "hourlyWage":hourlyWage,
        "role": role,
        "startTime": startTime,
    });
    console.log("Document written with ID: ", docRef.id);
}


async function UpdateUser(age, email, firstName, lastName, userName){
    const docRef = await addDoc(collection(db, "shifts"), {
        "UserId": userId,
        "branch":branch,
        "endTime ":endTime,
        "hourlyWage":hourlyWage,
        "role": role,
        "startTime": startTime
    });
    console.log("Document written with ID: ", docRef.id);
}


let currentUserEmail = localStorage.getItem('currentUser');
let shifts = JSON.parse(localStorage.getItem(currentUserEmail + '-shifts')) || [];

document.querySelector('.shift-form').addEventListener('submit', function(event) {
    event.preventDefault();

    let date = document.querySelector('.date').value;
    let startTime = document.querySelector('.start-time').value;
    let endTime = document.querySelector('.end-time').value;
    let hourlyWage = parseFloat(document.querySelector('.hourly-wage').value);
    let role = document.querySelector('.role').value;
    let branch = document.querySelector('.branch').value;

    if (!date || !startTime || !endTime || isNaN(hourlyWage) || !role || !branch) {
        alert('אנא מלא את כל השדות.'); 
        return; 
    } else {
        alert('הפרטים נקלטו במערכת')
    }

    let start = new Date('1970-01-01T' + startTime + 'Z');
    let end = new Date('1970-01-01T' + endTime + 'Z');
    let diff = (end - start) / (1000 * 60 * 60);
    let totalWage = diff * hourlyWage;

    shifts.push({ date, startTime, endTime, hourlyWage, role, branch, totalWage });
    let curUser = localStorage.getItem('userName');
    let userId = getUserRecord(curUser);
    addNewShift(userId,branch,endTime,hourlyWage,role,startTime)

    localStorage.setItem(currentUserEmail + '-shifts', JSON.stringify(shifts));
});
