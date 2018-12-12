import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/firestore';
import CONFIG from './config';
// export const CONFIG = { ... }; export default CONFIG
class Firebase {
    constructor() {  
        debugger
        app.initializeApp(CONFIG);  
        this.auth = app.auth();
        this.db = app.firestore();
    }
    // *** Auth API ***
    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password)

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => 
        this.auth.signOut();

    doPasswordReset = email => 
        this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = password =>
        this.auth.currentUser.updatePassword(password);

    // *** User API ***
    user = uid => this.db.collection('users').doc(uid);
    users = () => this.db.collection('users');
}
  
export default Firebase;