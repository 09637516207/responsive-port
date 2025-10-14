
        // Firebase Imports and Initialization
        import { initializeApp } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-app.js";
        import { getAuth, signInAnonymously, signInWithCustomToken } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-auth.js";
        import { getFirestore, collection, addDoc, setLogLevel } from "https://www.gstatic.com/firebasejs/11.6.1/firebase-firestore.js";

        // Global Firebase variables
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : null;
        let db = null;
        let auth = null;

        /**
         * Initializes Firebase and authenticates the user.
         */
        async function initFirebase() {
            try {
                if (!firebaseConfig) {
                    console.error("Firebase config is missing.");
                    document.getElementById('formMsg').textContent = 'Error: Firebase not configured.';
                    return;
                }
                
                // Set Firestore logging for debugging
                setLogLevel('Debug');
                const app = initializeApp(firebaseConfig);
                db = getFirestore(app);
                auth = getAuth(app);
                
                // Authenticate the user (anonymously if no token provided)
                if (typeof __initial_auth_token !== 'undefined' && __initial_auth_token) {
                    await signInWithCustomToken(auth, __initial_auth_token);
                } else {
                    await signInAnonymously(auth);
                }
                console.log("Firebase initialized and user authenticated.");

            } catch (error) {
                console.error("Firebase initialization failed:", error);
                document.getElementById('formMsg').textContent = 'Error: Failed to initialize Firebase. Check console.';
            }
        }

        // --- Helper Functions ---
        
        // Typing effect
        const phrases = ["Aspiring Web Developer","BSIT Student, Davao del Sur","Building Functional Interfaces"];
        let i = 0, current = '', isDeleting = false; const speed = 80;
        function type(){
            const el = document.getElementById('typing');
            if(!el) return;
            const full = phrases[i];
            if(isDeleting){ current = full.substring(0, current.length - 1); }
            else { current = full.substring(0, current.length + 1); }
            el.textContent = current;
            if(!isDeleting && current === full){ isDeleting = true; setTimeout(type, 900); }
            else if(isDeleting && current === ''){ isDeleting = false; i = (i+1) % phrases.length; setTimeout(type, 300); }
            else{ setTimeout(type, isDeleting ? speed/2 : speed); }
        }
        
        // Scroll reveal using IntersectionObserver
        const observer = new IntersectionObserver((entries)=>{
            entries.forEach(entry=>{
                if(entry.isIntersecting){ entry.target.classList.add('is-visible'); }
            });
        },{threshold:0.12});

        document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));

        // Mobile nav toggle
        const burger = document.querySelector('.burger');
        const mobileNav = document.getElementById('mobileNav');
        burger.addEventListener('click', ()=>{
            const open = burger.getAttribute('aria-expanded') === 'true';
            burger.setAttribute('aria-expanded', String(!open));
            mobileNav.style.display = open ? 'none' : 'block';
        });

        // Small accessibility: enable keyboard nav for mobile menu (toggle with Enter)
        burger.addEventListener('keyup', (ev)=>{ if(ev.key === 'Enter') burger.click(); });


        // --- Contact Form Function (Firestore) ---

        /**
         * Saves the contact message to Firestore.
         */
        window.sendMessage = async function(e){
            e.preventDefault();
            const name = document.getElementById('name').value.trim();
            const emailOrContact = document.getElementById('emailOrContact').value.trim();
            const msg = document.getElementById('message').value.trim();
            const formMsg = document.getElementById('formMsg');
            const submitButton = e.target.querySelector('button[type="submit"]');

            if(!name || !emailOrContact || !msg){
                formMsg.textContent = 'Please fill in all fields.';
                return false;
            }
            
            if (!db || !auth.currentUser) {
                formMsg.textContent = 'Connection is being established... please wait and try again.';
                return false;
            }

            formMsg.textContent = 'Sending message...';
            submitButton.disabled = true;

            try {
                const userId = auth.currentUser.uid;
                // Messages are stored in a public collection so you can retrieve them easily later
                const messagesCollectionRef = collection(db, `/artifacts/${appId}/public/data/messages`);

                await addDoc(messagesCollectionRef, {
                    senderName: name,
                    contact: emailOrContact,
                    message: msg,
                    timestamp: new Date().toISOString(),
                    senderId: userId, // Record the sender's user ID
                });

                formMsg.textContent = `Salamat, ${name}! Your message has been successfully saved. I will get back to you soon.`;
                e.target.reset();
                
            } catch (error) {
                console.error("Error saving message to Firestore:", error);
                formMsg.textContent = 'Sending failed. Please try again.';
            } finally {
                submitButton.disabled = false;
            }
            return false;
        }

        // --- Initial Load ---
        window.addEventListener('load', () => {
            initFirebase();
            document.getElementById('year').textContent = new Date().getFullYear();
            type();
        });
