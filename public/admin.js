// Firebase Modules
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// TODO: Replace with your Firebase Project Configuration
// આ જ સેમ કન્ફિગરેશન script.js માં પણ નાખવાનું રહેશે.
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);

document.addEventListener('DOMContentLoaded', () => {
    const adminForm = document.getElementById('adminPostForm');
    
    if (adminForm) {
        adminForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const title = document.getElementById('postTitle').value;
            const image = document.getElementById('postImage').value;
            const content = document.getElementById('postContent').value;
            const submitBtn = adminForm.querySelector('.submit-btn');
            
            submitBtn.innerText = "પબ્લિશ થઈ રહ્યું છે...";
            submitBtn.disabled = true;

            try {
                // Save post to Firestore
                await addDoc(collection(db, "posts"), {
                    title: title,
                    image: image,
                    content: content,
                    timestamp: new Date()
                });
                
                alert("પોસ્ટ સફળતાપૂર્વક પબ્લિશ થઈ ગઈ!");
                adminForm.reset();
            } catch (error) {
                console.error("Error adding post: ", error);
                alert("ભૂલ આવી! શું તમે Firebase કન્ફિગરેશન બરાબર નાખ્યું છે?");
            } finally {
                submitBtn.innerText = "પોસ્ટ પબ્લિશ કરો";
                submitBtn.disabled = false;
            }
        });
    }
});
