// Scroll zu Kontakt
function scrollToContact() {
    document.getElementById("contact").scrollIntoView({
        behavior: "smooth"
    });
}


const cards = document.querySelectorAll(".game-card");

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {

            const card = entry.target;
            const index = [...cards].indexOf(card);

            setTimeout(() => {
                card.classList.add("show");
            }, index * 120); // ← Abstand zwischen Karten

            observer.unobserve(card); // nur 1x animieren
        }
    });
}, {
    threshold: 0.05
});

cards.forEach(card => observer.observe(card));



function setPreview(img) {
    document.getElementById("main-preview-image").src = img.src;
}








