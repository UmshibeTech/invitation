
// Open the invitation when the guest clicks the button.
const openButton = document.getElementById("open-invitation");
const openingCover = document.getElementById("opening-cover");

openButton?.addEventListener("click", () => {
  document.body.classList.add("invitation-open");
  document.body.classList.remove("invitation-locked");

  openingCover?.setAttribute("aria-hidden", "true");

  window.setTimeout(() => {
    openingCover?.remove();
  }, 1300);
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

