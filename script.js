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













const contactForm = document.getElementById("contact-form");
const formStatus = document.getElementById("form-status");

contactForm.addEventListener("submit", async function (event) {
    event.preventDefault();

    const submitButton = contactForm.querySelector("button[type='submit']");

    submitButton.disabled = true;
    formStatus.textContent = "Nachricht wird gesendet...";

    const formData = new FormData(contactForm);

    const data = {
        name: formData.get("name"),
        company: formData.get("company"),
        email: formData.get("email"),
        phone: formData.get("phone"),
        message: formData.get("message")
    };

    try {
        const response = await fetch("/api/contact", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Fehler beim Senden");
        }

        formStatus.textContent = "Vielen Dank! Deine Nachricht wurde gesendet.";
        contactForm.reset();

    } catch (error) {
        console.error(error);
        formStatus.textContent =
            "Leider konnte die Nachricht nicht gesendet werden.";
    }

    submitButton.disabled = false;
});