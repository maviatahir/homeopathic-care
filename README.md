# Homeopathic Care

A modern static consultation website for a homeopathic doctor. The website allows visitors to submit their basic consultation details and send a formatted consultation request directly to the doctor through WhatsApp.

## Overview

Homeopathic Care is a lightweight, responsive, front-end-only website built with plain HTML, CSS, and JavaScript.

The website provides:

- A professional consultation-focused landing page
- A structured consultation form
- A case type dropdown
- Client-side form validation
- Dynamic WhatsApp consultation message generation
- Direct WhatsApp Click-to-Chat integration
- Responsive design for desktop, tablet, and mobile devices
- Netlify-ready static deployment

No backend, database, authentication, or API server is required.

## How It Works

The consultation flow is intentionally simple:

1. The visitor opens the website.
2. They enter their name, city, country, case type, and message.
3. The website validates the submitted information.
4. A formatted consultation message is generated automatically.
5. WhatsApp opens with the message prefilled.
6. The visitor reviews the message and presses **Send** to contact the doctor.

The website itself does not send the WhatsApp message automatically.

## Project Structure

```text
Homeopathic Care/
│
├── index.html       # Main website markup
├── styles.css       # Styling, layout, and responsive design
├── script.js        # Form validation and WhatsApp logic
├── config.js        # Branding, WhatsApp number, and case types
├── netlify.toml     # Netlify deployment configuration
└── favicon.svg      # Website favicon
```

## Features

### Consultation Form

The consultation form collects:

- Name
- City
- Country
- Case Type
- Patient Message

The form performs client-side validation before allowing the consultation flow to continue.

### Case Type Selection

Case types are maintained in `config.js`, making them easy to update without modifying the main application logic.

### WhatsApp Integration

The website generates a structured consultation message and opens WhatsApp using the doctor's configured WhatsApp number.

The visitor must still press **Send** inside WhatsApp to deliver the consultation request.

### Responsive Design

The interface is designed to work across:

- Desktop
- Laptop
- Tablet
- Mobile devices

### Front-End Only

The project does not require:

- Backend server
- Database
- User accounts
- Authentication
- External API
- Form submission service

This keeps the project lightweight and easy to deploy.

## Configuration

Core project settings are maintained in `config.js`.

The main configurable values include:

### `DOCTOR_WHATSAPP`

The doctor's WhatsApp number in international digits-only format.

Example:

```js
var DOCTOR_WHATSAPP = "923002259848";
```

### `DISEASE_OPTIONS`

The list of case types displayed in the consultation form dropdown.

This list can be manually updated according to the consultation categories supported by the doctor.

### `BRAND_NAME`

The website's branding name used throughout the project and in generated WhatsApp consultation messages.

Example:

```js
var BRAND_NAME = "Homeopathic Care";
```

## Local Setup

Because this is a static website, there is no build process or package installation required.

### Option 1 — Run with Python

Open the project folder in a terminal and run:

```bash
python -m http.server 8000
```

Then open:

```text
http://127.0.0.1:8000/
```

### Option 2 — Open Directly

You can also open `index.html` directly in a browser.

However, using a local web server is recommended during development for more consistent browser behavior.

## Deployment

Homeopathic Care is configured for static hosting on Netlify.

### Netlify Deployment

1. Push the project to a Git repository.
2. Connect the repository to Netlify.
3. Select the repository and deploy the project.
4. Keep the provided `netlify.toml` configuration.
5. Netlify publishes the project root as the website.

The current Netlify configuration uses:

```toml
[build]
  publish = "."
```

Since the project does not require a build process, no build command is necessary.

## Data & Privacy

The website does not store consultation submissions on a server or database.

The information entered into the consultation form is used to generate a WhatsApp message. The visitor then chooses whether to send that message to the doctor through WhatsApp.

## Important Notes

- The website is a static front-end application.
- The WhatsApp number is configured in `config.js`.
- The consultation case types can be updated manually in `config.js`.
- WhatsApp must be available on the visitor's device/browser for the consultation handoff to work.
- The visitor must manually press **Send** in WhatsApp.
- No consultation data is stored by the website itself.

## License

This project is provided for personal or business use.

If the project is intended to be distributed publicly as open-source software, add an appropriate license file to the repository.
