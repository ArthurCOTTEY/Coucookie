[![5bf2da1c-ffd4-466c-ac69-0a95773034d6.png](https://i.postimg.cc/YSMb570N/5bf2da1c-ffd4-466c-ac69-0a95773034d6.png)](https://postimg.cc/9Dgd9vGz)

# Coucookie 🍪

**Coucookie** is a lightweight, source-based cookie consent manager designed to help websites handle cookie preferences with clarity, flexibility, and a touch of sweetness.

No package manager. No heavy dependency. Just grab the source code, plug it into your project, and customize it to fit your needs.

## 📦 File size

<!-- MINIFY-STATS:START -->

## Build size

| File          | Original | Minified | Reduction |
| ------------- | -------: | -------: | --------: |
| coucookie.css |  5.91 KB |  4.11 KB |    30.47% |
| coucookie.js  | 14.38 KB | 12.03 KB |    16.30% |

<!-- MINIFY-STATS:END -->

## ✨ Why Coucookie?

Cookie consent should not feel like a legal maze or an annoying popup.

Coucookie aims to make consent management:

* **Simple** — copy the source code and integrate it directly
* **Transparent** — clear categories and user-friendly consent choices
* **Flexible** — easy to adapt to your design system
* **Privacy-first** — built around explicit user preferences
* **Developer-friendly** — readable source code, predictable behavior, minimal overhead

## 🍪 What is Coucookie?

Coucookie is a cookie manager that helps you:

* Display a cookie consent banner
* Let users accept, reject, or customize cookie preferences
* Organize cookies by category
* Store and retrieve consent choices
* Trigger services only after the right consent has been given
* Let users update their preferences later

## 🚀 Getting Started

Download or copy the Coucookie source files into your project.

For example:

```txt
your-project/
├── index.html
├── coucookie/
│   ├── coucookie.js
│   └── coucookie.css
```

Then include Coucookie in your HTML:

```html
<link rel="stylesheet" href="./coucookie/coucookie.css" />
<script src="./coucookie/coucookie.js"></script>
```

Initialize Coucookie with your consent configuration:

```html
<script>
  const coucookie = new Coucookie({
    categories: {
      necessary: {
        label: "Necessary cookies",
        required: true,
        description: "Required for the website to work properly.",
      },
      analytics: {
        label: "Analytics cookies",
        description: "Help us understand how visitors use the website.",
      },
      marketing: {
        label: "Marketing cookies",
        description: "Used to deliver relevant content and ads.",
      },
    },
  });

  coucookie.init();
</script>
```

## 🧁 Example

Load a script only when the user has accepted a specific cookie category:

```html
<script>
  coucookie.onConsent("analytics", () => {
    console.log("Analytics consent granted");

    // Example:
    // loadAnalyticsScript();
  });
</script>
```

## 📦 Features

* Source-code based integration
* No npm required
* No build step required
* Cookie consent banner
* Customizable cookie categories
* Accept all / reject all / customize actions
* Consent storage
* Consent-based script loading
* Easy preference updates
* Simple HTML, CSS, and JavaScript setup

## 🛡️ Privacy by Design

Coucookie helps you create a more respectful web experience by making consent explicit, understandable, and easy to change.

Users stay in control. Developers stay productive.
