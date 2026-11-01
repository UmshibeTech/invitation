
// Open the invitation when the guest clicks the button.
const openButton = document.getElementById("open-invitation");
const openingCover = document.getElementById("opening-cover");
const promotionDialog = document.getElementById("film-promotion");
const closePromotionButton = document.getElementById("close-promotion");
const invitationTitle = document.getElementById("invitation-title");

const countdown = document.getElementById("wedding-countdown");
const countdownFields = {
  days: countdown?.querySelector('[data-countdown="days"]'),
  hours: countdown?.querySelector('[data-countdown="hours"]'),
  minutes: countdown?.querySelector('[data-countdown="minutes"]'),
  seconds: countdown?.querySelector('[data-countdown="seconds"]')
};
const weddingDate = new Date("2026-12-13T10:00:00+02:00").getTime();

if (countdown && Object.values(countdownFields).every(Boolean)) {
  const updateCountdown = () => {
    const remaining = weddingDate - Date.now();

    if (remaining <= 0) {
      countdown.innerHTML = '<p class="countdown-finished">The celebration is here!</p>';
      return false;
    }

    const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((remaining / (1000 * 60)) % 60);
    const seconds = Math.floor((remaining / 1000) % 60);

    countdownFields.days.textContent = String(days);
    countdownFields.hours.textContent = String(hours).padStart(2, "0");
    countdownFields.minutes.textContent = String(minutes).padStart(2, "0");
    countdownFields.seconds.textContent = String(seconds).padStart(2, "0");
    return true;
  };

  if (updateCountdown()) {
    const countdownInterval = window.setInterval(() => {
      if (!updateCountdown()) {
        window.clearInterval(countdownInterval);
      }
    }, 1000);
  }
}

openButton?.addEventListener("click", () => {
  document.body.classList.add("invitation-open");
  document.body.classList.remove("invitation-locked");

  openingCover?.setAttribute("aria-hidden", "true");

  window.setTimeout(() => {
    openingCover?.remove();
  }, 1300);

  window.setTimeout(() => {
    promotionDialog?.showModal();
  }, 8000);
});

closePromotionButton?.addEventListener("click", () => {
  promotionDialog?.close();
});

promotionDialog?.addEventListener("close", () => {
  invitationTitle?.focus();
});

promotionDialog?.addEventListener("click", (event) => {
  if (event.target === promotionDialog) {
    promotionDialog.close();
  }
});

// WhatsApp RSVP contacts.
// Both buttons currently use the same number supplied by the couple.
const RSVP_CONTACTS = {
  bride: {
    label: "Bafo Manqele",
    phone: "27603619904"
  },
  groom: {
    label: "F.A Mthethwa",
    phone: "27738063202"
  }
};

const form = document.getElementById("rsvp-form");
const statusMessage = document.getElementById("form-status");

// Handle the RSVP buttons.
document.querySelectorAll("[data-contact]").forEach((button) => {
  button.addEventListener("click", () => {
    if (!form.reportValidity()) {
      return;
    }

    const data = new FormData(form);
    const contact = RSVP_CONTACTS[button.dataset.contact];

    const message = [
      "Wedding RSVP — Bafo Manqele & F.A Mthethwa",
      `Name: ${data.get("guestName")}`,
      `Guests: ${data.get("guestCount")}`,
      `Attendance: ${data.get("attendance")}`,
      data.get("message")
        ? `Message: ${data.get("message")}`
        : ""
    ]
      .filter(Boolean)
      .join("\n");

    statusMessage.textContent =
      `Opening WhatsApp to send your RSVP to ${contact.label}…`;

    const whatsappURL =
      `https://wa.me/${contact.phone}?text=${encodeURIComponent(message)}`;

    window.open(whatsappURL, "_blank", "noopener,noreferrer");
  });
});
