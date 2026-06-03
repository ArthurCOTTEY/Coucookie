[![5bf2da1c-ffd4-466c-ac69-0a95773034d6.png](https://i.postimg.cc/YSMb570N/5bf2da1c-ffd4-466c-ac69-0a95773034d6.png)](https://postimg.cc/9Dgd9vGz)

# Coucookie 🍪

**Coucookie** is a lightweight, source-based cookie consent manager designed to help websites handle cookie preferences with clarity, flexibility, and a touch of sweetness.

No package manager. No heavy dependency. Just grab the source code, plug it into your project, and customize it to fit your needs.

## 📦 File size

<!-- MINIFY-STATS:START -->
## Build size

| File | Original | Minified | Reduction |
|---|---:|---:|---:|
| coucookie.css | 5.91 KB | 4.11 KB | 30.47% |
<!-- MINIFY-STATS:END -->

## ✨ Why Coucookie?

Cookie consent should not feel like a legal maze or an annoying popup.

Coucookie aims to make consent management:

* **Simple** — copy the source code and integrate it directly
* **Transparent** — clear services and user-friendly consent choices
* **Flexible** — easy to adapt to your design system and your tracking tools
* **Privacy-first** — built around explicit user preferences
* **Developer-friendly** — readable source code, predictable behavior, minimal overhead
* **Consent Mode ready** — supports Google Consent Mode V2 with Basic or Advanced behavior

## 🍪 What is Coucookie?

Coucookie is a cookie consent manager that helps you:

* Display a cookie consent banner
* Let users accept, reject, or customize cookie preferences
* Declare active services from a simple JavaScript configuration
* Store and retrieve consent choices with `localStorage`
* Trigger services only after the right consent has been given
* Let users update their preferences later
* Handle Google Consent Mode V2
* Load Google Tag Manager, GA4, Facebook Pixel, or your own custom services

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

Then include Coucookie in your HTML.

The configuration must be declared **before** loading `coucookie.js`.

```html
<link rel="stylesheet" href="./coucookie/coucookie.css">

<script>
    window.coucookieConfig = {
        services: {
            googleAnalytics: 'GTM-XXXXXXX',
            facebookPixel: '123456789'
        }
    };
</script>

<script src="./coucookie/coucookie.js"></script>
```

## 🧁 Basic example

```html
<link rel="stylesheet" href="./coucookie/coucookie.css">

<script>
    window.coucookieConfig = {
        services: {
            googleAnalytics: 'GTM-XXXXXXX',
            facebookPixel: '123456789'
        }
    };
</script>

<script src="./coucookie/coucookie.js"></script>
```

With this configuration, Coucookie will:

* Display the cookie banner
* Initialize Google Consent Mode V2
* Store user preferences
* Load Google only when allowed, depending on the selected Consent Mode
* Load Facebook Pixel only after user consent
* Allow users to reopen their preferences later

## ⚙️ Configuration

Coucookie uses a global configuration object:

```js
window.coucookieConfig = {
    services: {
        googleAnalytics: 'GTM-XXXXXXX',
        facebookPixel: '123456789'
    }
};
```

Each service is declared inside `services`.

The key must match a service available in `cookieServiceLibrary`.

Example:

```js
services: {
    googleAnalytics: 'GTM-XXXXXXX'
}
```

matches:

```js
cookieServiceLibrary.googleAnalytics
```

## 🔧 Advanced service declaration

You can declare a service with a simple string:

```js
window.coucookieConfig = {
    services: {
        googleAnalytics: 'GTM-XXXXXXX'
    }
};
```

Or with an object:

```js
window.coucookieConfig = {
    services: {
        googleAnalytics: {
            key: 'GTM-XXXXXXX'
        }
    }
};
```

Both declarations are valid.

The object format is useful if you want to add custom options later.

## 🧠 Google Consent Mode V2

Coucookie supports Google Consent Mode V2.

By default, Google consent is initialized with:

```js
{
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: 'denied',
    functionality_storage: 'granted',
    security_storage: 'granted',
    wait_for_update: 500
}
```

Coucookie handles the following Consent Mode V2 fields:

* `ad_storage`
* `ad_user_data`
* `ad_personalization`
* `analytics_storage`
* `functionality_storage`
* `security_storage`

When the user accepts the relevant services, Coucookie updates Google consent with:

```js
gtag('consent', 'update', {
    analytics_storage: 'granted',
    ad_storage: 'granted',
    ad_user_data: 'granted',
    ad_personalization: 'granted',
    functionality_storage: 'granted',
    security_storage: 'granted'
});
```

If the user refuses, consent remains denied.

## 🛡️ Google Consent Mode: Basic mode

By default, Coucookie works in **Basic mode**.

```js
window.coucookieConfig = {
    googleConsentMode: 'basic',

    services: {
        googleAnalytics: 'GTM-XXXXXXX'
    }
};
```

In Basic mode:

* Google Consent Mode V2 is initialized
* Consent is set to denied by default
* Google scripts are not loaded before user consent
* No Google request is sent before user consent
* Google is loaded only after the user accepts the Google service

This is the safest default behavior.

If `googleConsentMode` is not defined, Coucookie can keep this Basic behavior by default.

## 📊 Google Consent Mode: Advanced mode

Coucookie can also work in **Advanced mode**.

```js
window.coucookieConfig = {
    googleConsentMode: 'advanced',

    services: {
        googleAnalytics: 'GTM-XXXXXXX'
    }
};
```

In Advanced mode:

* Google Consent Mode V2 is initialized immediately
* Consent is denied by default
* Google Tag Manager or GA4 is loaded immediately
* Google may receive cookieless consent pings before user consent
* If the user accepts, consent is updated to granted
* If the user refuses, consent remains denied

Use Advanced mode when you want Google Consent Mode to collect cookieless pings before consent.

## 🏷️ Using Google Tag Manager

To use Google Tag Manager, declare a GTM container ID:

```js
window.coucookieConfig = {
    services: {
        googleAnalytics: 'GTM-XXXXXXX'
    }
};
```

Coucookie detects the `GTM-` prefix and loads:

```txt
https://www.googletagmanager.com/gtm.js?id=GTM-XXXXXXX
```

## 📈 Using GA4 directly

To use GA4 without Google Tag Manager, declare a GA4 Measurement ID:

```js
window.coucookieConfig = {
    services: {
        googleAnalytics: 'G-XXXXXXXXXX'
    }
};
```

Coucookie detects that the key is not a GTM ID and loads:

```txt
https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX
```

Then GA4 is initialized with:

```js
gtag('js', new Date());

gtag('config', key, {
    anonymize_ip: true
});
```

## 📣 Using Facebook Pixel

To use Facebook Pixel, declare your Meta Pixel ID:

```js
window.coucookieConfig = {
    services: {
        facebookPixel: '123456789'
    }
};
```

Facebook Pixel is loaded only after the user accepts the Facebook Pixel service.

When accepted, Coucookie runs:

```js
fbq('init', key);
fbq('track', 'PageView');
```

## 🧩 Full example

```html
<!doctype html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Coucookie example</title>

    <link rel="stylesheet" href="./coucookie/coucookie.css">

    <script>
        window.coucookieConfig = {
            googleConsentMode: 'basic',

            services: {
                googleAnalytics: 'GTM-XXXXXXX',
                facebookPixel: '123456789'
            }
        };
    </script>

    <script src="./coucookie/coucookie.js"></script>
</head>
<body>

    <h1>My website</h1>

    <button type="button" onclick="reopenCookiePopup()">
        Cookie preferences
    </button>

</body>
</html>
```

## ⚙️ Available built-in services

Coucookie currently includes these services:

| Service key       | Description                                           |
| ----------------- | ----------------------------------------------------- |
| `googleAnalytics` | Google Tag Manager or GA4 with Google Consent Mode V2 |
| `facebookPixel`   | Meta / Facebook Pixel                                 |

## 🔁 Reopen cookie preferences

You can reopen the cookie preferences panel at any time with:

```html
<button type="button" onclick="reopenCookiePopup()">
    Cookie preferences
</button>
```

Or with a footer link:

```html
<a href="#" onclick="reopenCookiePopup(); return false;">
    Cookie preferences
</a>
```

## 💾 Stored preferences

Coucookie stores user preferences in `localStorage` under:

```txt
cookiePreferences
```

Example:

```json
{
    "googleAnalytics": true,
    "facebookPixel": false
}
```

If preferences already exist, Coucookie automatically applies them when the page loads.

## 🌍 Global functions

Coucookie exposes the following global functions:

```js
acceptAllCookies()
refuseAllCookies()
toggleCookieSettings()
acceptAllFromSettings()
refuseAllFromSettings()
saveCookiePreferences()
reopenCookiePopup()
```

These functions are used internally by the banner.

The most useful public function is:

```js
reopenCookiePopup()
```

It allows users to change their cookie preferences later.

## 🛠️ Create a new service

To create a new service, add it inside `cookieServiceLibrary`.

Example:

```js
customService: {
    name: 'Custom Service',
    description: 'Description displayed in the cookie settings panel.',
    learnMore: 'https://example.com/privacy',
    icon: '<svg><!-- optional icon --></svg>',

    load: ({ key }) => {
        if (!key) return;

        if (document.querySelector('#custom-service-script')) return;

        const script = document.createElement('script');
        script.async = true;
        script.id = 'custom-service-script';
        script.src = `https://example.com/script.js?id=${key}`;

        document.head.appendChild(script);

        console.log('Custom Service loaded');
    }
}
```

Then declare it in your configuration:

```js
window.coucookieConfig = {
    services: {
        customService: 'YOUR_SERVICE_KEY'
    }
};
```

The service key must be the same in both places.

This:

```js
customService: {
    name: 'Custom Service'
}
```

must be declared as:

```js
services: {
    customService: 'YOUR_SERVICE_KEY'
}
```

## 🧱 Service structure

A service can contain:

```js
{
    name: 'Service name',
    description: 'Service description displayed to the user.',
    learnMore: 'https://example.com/privacy',
    icon: '<svg></svg>',

    load: ({ key }) => {
        // Load your service here
    }
}
```

| Property      | Required | Description                                        |
| ------------- | -------: | -------------------------------------------------- |
| `name`        |      Yes | Service name displayed in the preferences panel    |
| `description` |      Yes | Service description displayed to the user          |
| `learnMore`   |       No | Optional link to a privacy policy or documentation |
| `icon`        |       No | Optional SVG icon                                  |
| `load`        |      Yes | Function executed when the service is accepted     |

## 🧪 Legacy configuration

Coucookie still supports the previous declaration format:

```js
window.activeCookieServices = [
    {
        service: 'googleAnalytics',
        key: 'GTM-XXXXXXX'
    },
    {
        service: 'facebookPixel',
        key: '123456789'
    }
];
```

However, the recommended format is now:

```js
window.coucookieConfig = {
    services: {
        googleAnalytics: 'GTM-XXXXXXX',
        facebookPixel: '123456789'
    }
};
```
## 🏗️ Build minified files with Node.js

Coucookie keeps readable source files in `/src` and production-ready minified files in `/dist`.

Project structure:

```txt id="wgyto0"
coucookie/
├── src/
│   ├── coucookie.js
│   └── coucookie.css
├── dist/
│   ├── coucookie.min.js
│   └── coucookie.min.css
├── package.json
├── package-lock.json
└── README.md
```

If you modify the source files in `/src`, you can rebuild the minified files in `/dist` with Node.js.

### Install dependencies

After cloning the project, install the Node dependencies:

```bash id="3ykz6e"
npm install
```

### Build minified files

Run the build command:

```bash id="vwhmfy"
npm run build
```

This command generates or updates:

```txt id="mg6t99"
dist/coucookie.min.js
dist/coucookie.min.css
```

from:

```txt id="tf87vc"
src/coucookie.js
src/coucookie.css
```

It can also update the build size table in the README if the build script is configured to do so.

### Recommended workflow

When you want to modify Coucookie:

```bash id="83serl"
# 1. Edit the readable source files
src/coucookie.js
src/coucookie.css

# 2. Build the minified production files
npm run build

# 3. Commit source files, dist files, and package files
git add src/coucookie.js src/coucookie.css dist/coucookie.min.js dist/coucookie.min.css README.md package.json package-lock.json
git commit -m "Update Coucookie build"
```

### Files to keep in Git

The following files should be committed:

```txt id="n2yjmc"
src/coucookie.js
src/coucookie.css
dist/coucookie.min.js
dist/coucookie.min.css
package.json
package-lock.json
README.md
```

The `package.json` file contains the build commands.

The `package-lock.json` file ensures that everyone uses the same dependency versions.

### Files not to commit

Do not commit `node_modules`.

Add it to `.gitignore`:

```gitignore id="cvs3rb"
node_modules/
```

After cloning the project, another developer can simply run:

```bash id="49hs2k"
npm install
npm run build
```

### Use source or minified files

During development, you can use the readable source files:

```html id="rg2ivk"
<link rel="stylesheet" href="./src/coucookie.css">
<script src="./src/coucookie.js"></script>
```

In production, use the minified files from `/dist`:

```html id="zo2stx"
<link rel="stylesheet" href="./dist/coucookie.min.css">
<script src="./dist/coucookie.min.js"></script>
```

## 📦 Features

* Source-code based integration
* No npm required
* No build step required
* Cookie consent banner
* Accept all / reject all / customize actions
* Consent storage with `localStorage`
* Consent-based script loading
* Google Consent Mode V2 support
* Google Consent Mode Basic mode
* Google Consent Mode Advanced mode
* Google Tag Manager support
* GA4 support
* Facebook Pixel support
* Easy preference updates
* Public function to reopen preferences
* Custom services support
* Simple HTML, CSS, and JavaScript setup

## 📝 Legal notice attribution

If you use Coucookie on a website, a small attribution in the legal notice or privacy policy is appreciated.

Example:

```txt
Cookie consent management

This website uses Coucookie, a lightweight cookie consent manager designed to handle user preferences and consent-based service loading.

Coucookie allows visitors to accept, refuse, customize, and update their cookie preferences at any time.
```

French example:

```txt
Gestion du consentement aux cookies

Ce site utilise Coucookie, un gestionnaire léger de consentement aux cookies permettant de gérer les préférences utilisateurs et le chargement des services soumis au consentement.

Coucookie permet aux visiteurs d’accepter, de refuser, de personnaliser et de modifier leurs préférences cookies à tout moment.
```

## 🛡️ Privacy by Design

Coucookie helps you create a more respectful web experience by making consent explicit, understandable, and easy to change.

In Basic mode, services are blocked before consent.

In Advanced mode, Google can be loaded before consent with all consent signals set to denied, allowing cookieless pings while keeping cookies and advertising storage disabled until consent is granted.

Users stay in control. Developers stay productive.
