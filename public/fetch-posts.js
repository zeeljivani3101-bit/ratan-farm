import { initializeApp, getApps, getApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getFirestore, collection, getDocs, query, orderBy } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

// TODO: Replace with your Firebase Project Configuration (Same as script.js and admin.js)
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT_ID.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT_ID.appspot.com",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

document.addEventListener('DOMContentLoaded', async () => {
    const postsContainer = document.getElementById('postsContainer');
    const updatesSection = document.getElementById('latest-updates-section');
    
    if (postsContainer && updatesSection) {
        try {
            const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
            const db = getFirestore(app);
            
            // Fetch posts ordered by timestamp descending
            const q = query(collection(db, "posts"), orderBy("timestamp", "desc"));
            const querySnapshot = await getDocs(q);
            
            if (!querySnapshot.empty) {
                updatesSection.style.display = 'block'; // Show section if posts exist
                
                querySnapshot.forEach((doc) => {
                    const post = doc.data();
                    const dateObj = post.timestamp ? post.timestamp.toDate() : new Date();
                    const dateStr = dateObj.toLocaleDateString('gu-IN', { day: 'numeric', month: 'short', year: 'numeric' });
                    
                    const postHtml = `
                        <div class="col-md-4">
                            <div class="luxury-card" style="height: 100%;">
                                ${post.image ? `<img src="${post.image}" alt="Post Image" style="width: 100%; height: 200px; object-fit: cover; border-radius: 10px 10px 0 0;">` : ''}
                                <div style="padding: 20px;">
                                    <div style="font-size: 0.9em; color: #888; margin-bottom: 10px;">${dateStr}</div>
                                    <h3 style="color: #d32f2f; margin-bottom: 10px; font-size: 1.3rem;">${post.title}</h3>
                                    <p style="color: #555;">${post.content}</p>
                                </div>
                            </div>
                        </div>
                    `;
                    postsContainer.innerHTML += postHtml;
                });
            }
        } catch (error) {
            console.error("Error fetching posts:", error);
            // Hide section if error or config missing
            updatesSection.style.display = 'none';
        }
    }
});
