const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];

const cookieServiceLibrary = {
    googleAnalytics: {
        name: 'Google Tag Manager',
        description: 'Gestion des balises, mesure d’audience et suivi statistique.',
        learnMore: 'https://policies.google.com/privacy',
        icon: `<svg width="14" height="14" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid"><g><polygon fill="#8AB4F8" points="150.261818 245.516364 105.825455 202.185455 201.258182 104.730909 247.265455 149.821818"></polygon><path d="M150.450909,53.9381818 L106.174545,8.73090909 L9.36,104.629091 C-3.12,117.109091 -3.12,137.341818 9.36,149.836364 L104.72,245.821818 L149.810909,203.64 L77.1563636,127.232727 L150.450909,53.9381818 Z" fill="#4285F4"></path><path d="M246.625455,105.370909 L150.625455,9.37090909 C138.130909,-3.12363636 117.869091,-3.12363636 105.374545,9.37090909 C92.88,21.8654545 92.88,42.1272727 105.374545,54.6218182 L201.374545,150.621818 C213.869091,163.116364 234.130909,163.116364 246.625455,150.621818 C259.12,138.127273 259.12,117.865455 246.625455,105.370909 Z" fill="#8AB4F8"></path><circle fill="#246FDB" cx="127.265455" cy="224.730909" r="31.2727273"></circle></g></svg>`,
        load: () => {
            console.log('Google Analytics actif via Consent Mode V2');
        }
    },

    facebookPixel: {
        name: 'Facebook Pixel',
        description: 'Suivi publicitaire et campagnes Meta Ads.',
        icon: `<svg role="img" fill="#0467DF" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><title>Meta</title><path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"/></svg>`,
        load: ({ key }) => {
            if ($('#facebook-pixel-script') || !key) return;

            ((f, b, e, v, n, t, s) => {
                if (f.fbq) return;

                n = f.fbq = (...args) => {
                    n.callMethod ? n.callMethod(...args) : n.queue.push(args);
                };

                f._fbq ||= n;

                n.push = n;
                n.loaded = true;
                n.version = '2.0';
                n.queue = [];

                t = b.createElement(e);
                t.async = true;
                t.src = v;
                t.id = 'facebook-pixel-script';

                s = b.getElementsByTagName(e)[0];
                s.parentNode.insertBefore(t, s);
            })(window, document, 'script', 'https://connect.facebook.net/en_US/fbevents.js');

            fbq('init', key);
            fbq('track', 'PageView');

            console.log('Facebook Pixel chargé');
        }
    }
};

const getService = service => cookieServiceLibrary[service];

const getAllPreferences = value =>
    activeCookieServices.reduce((preferences, { service }) => {
        preferences[service] = value;
        return preferences;
    }, {});

const setPopupVisible = visible => {
    const popup = $('#cookiePopup');
    if (!popup) return;

    popup.style.display = visible ? 'block' : 'none';
    popup.classList.toggle('is-visible', visible);

    if (visible) {
        popup.classList.remove('hide-bottom');
    }
};

const generateCookieServices = () => {
    const container = $('#cookieServicesContainer');
    if (!container) return;

    container.innerHTML = activeCookieServices
        .map(({ service }) => {
            const item = getService(service);
            if (!item) return '';

            const learnMoreLink = item.learnMore
                ? `<a href="${item.learnMore}" target="_blank" rel="noopener noreferrer" class="cookie-service-more">En savoir plus</a>`
                : '';

            return `
                <div class="cookie-setting-item checkbox-style">
                    <label class="cookie-checkbox">
                        <div class="d-inline-flex align-items-baseline">
                            <div class="cookieIconManage mr-2">${item.icon || ''}</div>

                            <div class="cookie-label">
                                <strong>${item.name}</strong>
                                <span>
                                    ${item.description}
                                    ${learnMoreLink}
                                </span>
                            </div>
                        </div>

                        <input type="checkbox" id="${service}">
                        <span class="checkmark ml-auto"></span>
                    </label>
                </div>
            `;
        })
        .join('');
};

const applyPreferencesToCheckboxes = preferences => {
    activeCookieServices.forEach(({ service }) => {
        const input = $(`#${service}`);
        if (input) input.checked = !!preferences[service];
    });
};

const updateGoogleConsent = preferences => {
    const analyticsGranted = preferences.googleAnalytics === true;
    const adsGranted = preferences.facebookPixel === true;

    if (typeof gtag !== 'function') {
        console.warn('gtag non disponible : Google Consent non mis à jour');
        return;
    }

    const consent = {
        analytics_storage: analyticsGranted ? 'granted' : 'denied',
        ad_storage: adsGranted ? 'granted' : 'denied',
        ad_user_data: adsGranted ? 'granted' : 'denied',
        ad_personalization: adsGranted ? 'granted' : 'denied',
        functionality_storage: 'granted',
        security_storage: 'granted'
    };

    gtag('consent', 'update', consent);

    if (analyticsGranted) {
        gtag('event', 'cookie_consent_accepted', {
            event_category: 'cookie',
            event_label: 'Google Analytics accepted',
            debug_mode: true
        });
    }

    console.log('Google Consent Mode V2 mis à jour', consent);
};

const applyConsent = preferences => {
    updateGoogleConsent(preferences);

    activeCookieServices.forEach(activeService => {
        if (preferences[activeService.service] !== true) return;

        const service = getService(activeService.service);

        if (service?.load) {
            service.load(activeService);
        }
    });
};

const savePreferences = preferences => {
    localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
    applyConsent(preferences);
    closeCookiePopup();
};

const toggleCookieSettings = () => {
    const popup = $('#cookiePopup');
    const settings = $('#cookieSettings');

    popup?.classList.add('settings-open');

    if (settings) {
        settings.style.display = 'block';
    }
};

const closeCookiePopup = () => {
    const popup = $('#cookiePopup');
    if (!popup) return;

    popup.classList.remove('is-visible');
    popup.classList.add('hide-bottom');

    setTimeout(() => {
        popup.style.display = 'none';
        popup.classList.remove('hide-bottom');
    }, 600);
};

const reopenCookiePopup = () => {
    const popup = $('#cookiePopup');
    const mainActions = $('#cookieMainActions');
    const settings = $('#cookieSettings');
    const savedPreferences = localStorage.getItem('cookiePreferences');

    if (popup) {
        popup.style.display = 'block';
        popup.classList.add('is-visible', 'settings-open');
        popup.classList.remove('hide-bottom');
    }

    if (mainActions) mainActions.style.display = 'none';
    if (settings) settings.style.display = 'block';

    if (savedPreferences) {
        applyPreferencesToCheckboxes(JSON.parse(savedPreferences));
    }
};

const acceptAllCookies = () => {
    savePreferences(getAllPreferences(true));
};

const refuseAllCookies = () => {
    savePreferences(getAllPreferences(false));
};

const acceptAllFromSettings = () => {
    applyPreferencesToCheckboxes(getAllPreferences(true));
};

const refuseAllFromSettings = () => {
    applyPreferencesToCheckboxes(getAllPreferences(false));
};

const saveCookiePreferences = () => {
    const preferences = activeCookieServices.reduce((result, { service }) => {
        result[service] = $(`#${service}`)?.checked === true;
        return result;
    }, {});

    savePreferences(preferences);
};

document.addEventListener('DOMContentLoaded', () => {
    generateCookieServices();

    const savedPreferences = localStorage.getItem('cookiePreferences');

    if (!savedPreferences) {
        setPopupVisible(true);
        return;
    }

    try {
        const preferences = JSON.parse(savedPreferences);

        activeCookieServices.forEach(({ service }) => {
            preferences[service] ??= false;
        });

        localStorage.setItem('cookiePreferences', JSON.stringify(preferences));

        setPopupVisible(false);
        applyPreferencesToCheckboxes(preferences);
        applyConsent(preferences);
    } catch (error) {
        localStorage.removeItem('cookiePreferences');

        console.warn('Préférences cookies invalides, réinitialisation.', error);

        setPopupVisible(true);
    }
});