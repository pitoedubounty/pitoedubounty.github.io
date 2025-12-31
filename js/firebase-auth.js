// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZ6DXCk55mQeqHBrVHR3VPm8jyyBoS0_Y",
  authDomain: "pitoedubounty-66d70.firebaseapp.com",
  projectId: "pitoedubounty-66d70",
  storageBucket: "pitoedubounty-66d70.firebasestorage.app",
  messagingSenderId: "15511295194",
  appId: "1:15511295194:web:14cfde5bff34a4774e41e3",
  measurementId: "G-NGRZSHJG4W"
};

// İzin verilen email adresleri
const authorizedEmails = [
  "selmanfarisicuzdan@gmail.com",
  "pitoedubounty@gmail.com"
];

// Firebase'i başlat
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

// Google provider
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Google ile giriş yap
function signInWithGoogle() {
  auth.signInWithPopup(googleProvider)
    .then((result) => {
      const user = result.user;
      console.log('Giriş başarılı:', user.email);
      checkAuthorization(user);
    })
    .catch((error) => {
      console.error('Giriş hatası:', error);
      alert('Giriş sırasında bir hata oluştu: ' + error.message);
    });
}

// Çıkış yap
function signOut() {
  auth.signOut()
    .then(() => {
      console.log('Çıkış yapıldı');
      window.location.href = 'auth.html';
    })
    .catch((error) => {
      console.error('Çıkış hatası:', error);
    });
}

// Yetki kontrolü
function checkAuthorization(user) {
  if (!user) {
    window.location.href = 'auth.html';
    return false;
  }

  const userEmail = user.email.toLowerCase();
  const isAuthorized = authorizedEmails.some(email => email.toLowerCase() === userEmail);

  if (!isAuthorized) {
    alert('⛔ Erişim Reddedildi!\n\nBu blog yazılarını görüntülemek için yetkiniz bulunmamaktadır.');
    signOut();
    return false;
  }

  return true;
}

// Auth state değişikliğini dinle
auth.onAuthStateChanged((user) => {
  if (window.location.pathname.includes('blog-post.html')) {
    // Blog post sayfasındaysak, yetki kontrolü yap
    if (!user) {
      window.location.href = 'auth.html';
    } else {
      checkAuthorization(user);
    }
  }
});

// Email listesine yeni email eklemek için (konsol üzerinden)
function addAuthorizedEmail(email) {
  console.log('Not: Email listesini güncellemek için firebase-auth.js dosyasını düzenleyin.');
  console.log('Eklenecek email:', email);
}
