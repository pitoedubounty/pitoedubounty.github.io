/* Typewriter Effect Logic */

const typeWriter = (elementId, text, speed = 50, callback) => {
    const element = document.getElementById(elementId);
    if (!element) {
        if (callback) callback();
        return;
    }

    element.innerHTML = ""; // Clear existing text
    element.style.opacity = 1; // Make sure it's visible if hidden
    let i = 0;

    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        } else {
            if (callback) callback();
        }
    }
    type();
};

document.addEventListener('DOMContentLoaded', () => {
    // Hide elements initially to prevent flash of unstyled content
    const elementsToAnimate = [
        'typing-line-1',
        'typing-line-2',
        'term-cmd-1',
        'term-out-1',
        'term-out-2',
        'term-out-3',
        'term-sys-ok'
    ];

    elementsToAnimate.forEach(id => {
        const el = document.getElementById(id);
        if (el) el.innerHTML = ""; // Clear content initially
    });

    // Start Animation Sequence
    // 1. First Line: "Okul Gelişim Projesi"
    typeWriter('typing-line-1', 'Okul Gelişim Projesi', 50, () => {

        // 2. Second Line: "Güvenli KOBİ, Güvenli Gelecek Projesi"
        typeWriter('typing-line-2', 'Güvenli KOBİ, Güvenli Gelecek Projesi', 40, () => {

            // 3. Terminal Command
            setTimeout(() => {
                typeWriter('term-cmd-1', '> ./welcome.sh', 80, () => {

                    // 4. Terminal Outputs
                    setTimeout(() => {
                        typeWriter('term-out-1', "PİTO EduBounty'ye hoş geldiniz!", 30, () => {
                            typeWriter('term-out-2', "Siber güvenlik tutkusuyla bir araya gelen öğrencilerin topluluğuyuz.", 30, () => {
                                typeWriter('term-out-3', "CTF yarışmaları, workshop'lar ve projelerle yeteneklerimizi geliştiriyoruz.", 30, () => {
                                    const sysOk = document.getElementById('term-sys-ok');
                                    if (sysOk) sysOk.innerHTML = "Sistem başlatılıyor... <span class='status-ok'>[OK]</span>";
                                });
                            });
                        });
                    }, 500);
                });
            }, 500);
        });
    });
});
