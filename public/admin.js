// Firebase Modules
import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, addDoc } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

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
const storage = getStorage(app);

document.addEventListener('DOMContentLoaded', () => {
    const adminForm = document.getElementById('adminPostForm');
    
    if (adminForm) {
        adminForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            const title = document.getElementById('postTitle').value;
            const content = document.getElementById('postContent').value;
            const fileInput = document.getElementById('postImageFile');
            const submitBtn = adminForm.querySelector('.submit-btn');
            
            submitBtn.innerText = "પબ્લિશ થઈ રહ્યું છે...";
            submitBtn.disabled = true;

            try {
                let imageUrl = "";

                // If a file is selected, upload it to Firebase Storage
                if (fileInput.files.length > 0) {
                    const file = fileInput.files[0];
                    const storageRef = ref(storage, 'posts/' + new Date().getTime() + '_' + file.name);
                    
                    submitBtn.innerText = "ફોટો અપલોડ થઈ રહ્યો છે...";
                    await uploadBytes(storageRef, file);
                    imageUrl = await getDownloadURL(storageRef);
                }

                submitBtn.innerText = "માહિતી સેવ થઈ રહી છે...";
                // Save post to Firestore
                await addDoc(collection(db, "posts"), {
                    title: title,
                    image: imageUrl,
                    content: content,
                    timestamp: new Date()
                });
                
                alert("પોસ્ટ સફળતાપૂર્વક પબ્લિશ થઈ ગઈ!");
                adminForm.reset();
            } catch (error) {
                console.error("Error adding post: ", error);
                alert("ભૂલ આવી! શું તમે Firebase અને Firebase Storage બરાબર સેટ કર્યું છે?");
            } finally {
                submitBtn.innerText = "પોસ્ટ પબ્લિશ કરો";
                submitBtn.disabled = false;
            }
        });
    }
});
