document.addEventListener("DOMContentLoaded", () => {
  // UI ELEMENTS
  const navbar = document.querySelector(".navbar");
  const mobileMenu = document.getElementById("mobile-menu");
  const navMenu = document.querySelector(".nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  /* =========================================
       1. MATRIX RAIN ANIMATION (Canvas)
       ========================================= */
  const canvas = document.getElementById("matrixCanvas");
  const ctx = canvas.getContext("2d");

  // Canvas boyutlarını pencere boyutuna eşitle
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  // Matrix karakterleri (Katakana + Latin + Rakam)
  const katakana =
    "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン";
  const latin = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const nums = "0123456789";

  const alphabet = katakana + latin + nums;

  const fontSize = 16;
  const columns = canvas.width / fontSize;

  // Her kolon için 'y' koordinatını tutan dizi
  const rainDrops = [];

  for (let x = 0; x < columns; x++) {
    rainDrops[x] = 1;
  }

  function draw() {
    // Hafif bir karartma efekti ile önceki kareyi sil (iz bırakma efekti için opacity 0.05)
    ctx.fillStyle = "rgba(10, 10, 10, 0.05)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#0F0"; // Yeşil font
    ctx.font = fontSize + "px monospace";

    for (let i = 0; i < rainDrops.length; i++) {
      // Rastgele karakter seç
      const text = alphabet.charAt(Math.floor(Math.random() * alphabet.length));

      // Ekrana yaz
      // x = i * fontSize, y = rainDrops[i] * fontSize
      ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

      // Karakter ekranın altına geldiyse ve rastgele bir ihtimalle başa dön
      if (rainDrops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        rainDrops[i] = 0;
      }

      // Bir sonraki karede y koordinatını artır
      rainDrops[i]++;
    }
  }

  // 30 FPS hızında animasyon
  setInterval(draw, 33);

  /* =========================================
       2. UI INTERACTION
       ========================================= */

  // Navbar Scroll Shadow Effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Mobile Menu Toggle
  mobileMenu.addEventListener("click", () => {
    mobileMenu.classList.toggle("active");
    navMenu.classList.toggle("active");
  });

  // Close mobile menu when a link is clicked
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      mobileMenu.classList.remove("active");
      navMenu.classList.remove("active");
    });
  });


    /* =========================================
       3. PAGE TRANSITION & ACTIVE LINK
       ========================================= */

    // 1. Highlight Active Link based on URL
    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    
    navLinks.forEach(link => {
        // href değerini al (örn: "projects.html")
        const linkPath = link.getAttribute('href');
        
        // Eğer link şu anki sayfaya eşitse active yap
        // index.html için özel durum: eğer boş ise de index.html kabul et
        if (linkPath === currentPath || (currentPath === '' && linkPath === 'index.html')) {
            link.classList.add('active');
        } else {
            // "Ana Sayfa" linkini sadece tam eşleşmelerde active yapmıyoruz,
            // ama diğer alt sayfalar için kontrol basit.
            link.classList.remove('active');
        }
    });


    // 2. Page Transition Logic
    // Sayfa yüklendiğinde body'ye 'loaded' class'ı ekle (Fade In)
    document.body.classList.add('loaded');

    // Link tıklamalarını yakala
    document.querySelectorAll('a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetUrl = this.getAttribute('href');

            // Sadece dahili linkler ve hash (#) olmayanlar, mailto vs olmayanlar için
            if (targetUrl && 
                !targetUrl.startsWith('#') && 
                !targetUrl.startsWith('mailto:') && 
                !targetUrl.startsWith('tel:') &&
                !targetUrl.includes('http')) { 
                
                e.preventDefault();
                
                // Fade Out Efekti
                document.body.classList.remove('loaded');
                
                // Animasyon bitince yönlendir (300-500ms sonra)
                setTimeout(() => {
                    window.location.href = targetUrl;
                }, 400); 
            }
        });
    });

  /* =========================================
       3. SMOOTH SCROLL (Additional Polyfill Logic if needed)
       ========================================= */
  // Modern tarayıcılar için CSS scroll-behavior: smooth zaten ekli.
  // Ancak daha yumuşak bir deneyim için manuel implementasyon:

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        // Navbar yüksekliğini hesaba kat
        const offsetTop = targetElement.offsetTop - 70;

        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        });
      }
    });
  });
});
