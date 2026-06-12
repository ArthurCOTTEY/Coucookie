(() => {
    const ccQuery = (selector, parent = document) => parent.querySelector(selector);

    const cookiePopupSvg = `
        <svg xmlns="http://www.w3.org/2000/svg" xml:space="preserve" viewBox="0 0 417 417">
            <path d="M345 204a59 59 0 0 1-85-48 60 60 0 0 1-48-85 59 59 0 0 1-24-36q-64 4-111 41a42 42 0 0 1-6 66 42 42 0 0 1-23 6l-17-3a188 188 0 0 0-11 63 189 189 0 0 0 333 122 42 42 0 0 1-10-59q11-16 32-17h3l3-26a59 59 0 0 1-36-24M132 335q-20 0-32-16-9-10-10-27a42 42 0 0 1 74-26q10 11 10 27c0 23-18 42-42 42m28-151q-20 0-32-16-10-11-10-27a42 42 0 0 1 74-26q9 10 10 27c0 23-19 42-42 42m87 131q-26-1-42-20-12-14-13-35a54 54 0 0 1 96-34q13 15 13 35c0 30-24 54-54 54" style="fill:#f5b97d"/>
            <path d="M160 163a22 22 0 1 0 0-44 22 22 0 0 0 0 44m-28 151a22 22 0 1 0 0-44 22 22 0 0 0 0 44M70 106a22 22 0 0 0-8-16 189 189 0 0 0-23 36l9 2c12 0 22-10 22-22m285 190q0 11 10 18a188 188 0 0 0 20-39l-8-1c-12 0-22 9-22 22m-109-2a34 34 0 1 0 0-68 34 34 0 0 0 0 68" style="fill:#cd916e"/>
            <path d="M192 115q10 11 10 26a42 42 0 0 1-74 27 42 42 0 1 0 64-53m-18 177a42 42 0 0 1-74 27 42 42 0 1 0 64-53q10 11 10 26m126-32a54 54 0 0 1-95 35 54 54 0 1 0 83-69q12 14 12 34" style="fill:#cd916e"/>
            <path d="M160 183a42 42 0 1 0 0-84 42 42 0 0 0 0 84m0-64a22 22 0 1 1 0 44 22 22 0 0 1 0-44m-28 215a42 42 0 1 0 0-84 42 42 0 0 0 0 84m0-64a22 22 0 1 1 0 44 22 22 0 0 1 0-44"/>
            <path d="M417 207v-1a10 10 0 0 0-10-10c-14-1-28-10-34-23a10 10 0 0 0-15-4q-10 6-23 7a40 40 0 0 1-20-5q-20-13-20-39l-2-8-8-2h-4a40 40 0 0 1-33-63 10 10 0 0 0-4-15c-13-6-22-20-23-34a10 10 0 0 0-10-10h-3a209 209 0 1 0 209 207M62 90a22 22 0 0 1 8 16c0 12-10 22-22 22l-9-2a189 189 0 0 1 23-36m303 224q-10-7-10-18a22 22 0 0 1 30-21 188 188 0 0 1-20 39m26-58-13-2h-3a42 42 0 0 0-22 76q-14 17-32 29l-2 2q-47 35-111 36A189 189 0 0 1 26 161l5-16 17 3a42 42 0 0 0 23-6 42 42 0 0 0 6-66l-1-1q51-51 126-55a60 60 0 0 0 24 37 60 60 0 0 0 50 84 60 60 0 0 0 84 50 60 60 0 0 0 37 24 188 188 0 0 1-6 41"/>
            <path d="M246 314a54 54 0 1 0 0-108 54 54 0 0 0 0 108m0-88a34 34 0 1 1 0 68 34 34 0 0 1 0-68"/>
        </svg>
    `;

    const googleIcon = `
        <svg width="14" height="14" viewBox="0 0 256 256" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid">
            <g>
                <polygon fill="#8AB4F8" points="150.261818 245.516364 105.825455 202.185455 201.258182 104.730909 247.265455 149.821818"></polygon>
                <path d="M150.450909,53.9381818 L106.174545,8.73090909 L9.36,104.629091 C-3.12,117.109091 -3.12,137.341818 9.36,149.836364 L104.72,245.821818 L149.810909,203.64 L77.1563636,127.232727 L150.450909,53.9381818 Z" fill="#4285F4"></path>
                <path d="M246.625455,105.370909 L150.625455,9.37090909 C138.130909,-3.12363636 117.869091,-3.12363636 105.374545,9.37090909 C92.88,21.8654545 92.88,42.1272727 105.374545,54.6218182 L201.374545,150.621818 C213.869091,163.116364 234.130909,163.116364 246.625455,150.621818 C259.12,138.127273 259.12,117.865455 246.625455,105.370909 Z" fill="#8AB4F8"></path>
                <circle fill="#246FDB" cx="127.265455" cy="224.730909" r="31.2727273"></circle>
            </g>
        </svg>
    `;

    const metaIcon = `
        <svg role="img" fill="#0467DF" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <title>Meta</title>
            <path d="M6.915 4.03c-1.968 0-3.683 1.28-4.871 3.113C.704 9.208 0 11.883 0 14.449c0 .706.07 1.369.21 1.973a6.624 6.624 0 0 0 .265.86 5.297 5.297 0 0 0 .371.761c.696 1.159 1.818 1.927 3.593 1.927 1.497 0 2.633-.671 3.965-2.444.76-1.012 1.144-1.626 2.663-4.32l.756-1.339.186-.325c.061.1.121.196.183.3l2.152 3.595c.724 1.21 1.665 2.556 2.47 3.314 1.046.987 1.992 1.22 3.06 1.22 1.075 0 1.876-.355 2.455-.843a3.743 3.743 0 0 0 .81-.973c.542-.939.861-2.127.861-3.745 0-2.72-.681-5.357-2.084-7.45-1.282-1.912-2.957-2.93-4.716-2.93-1.047 0-2.088.467-3.053 1.308-.652.57-1.257 1.29-1.82 2.05-.69-.875-1.335-1.547-1.958-2.056-1.182-.966-2.315-1.303-3.454-1.303zm10.16 2.053c1.147 0 2.188.758 2.992 1.999 1.132 1.748 1.647 4.195 1.647 6.4 0 1.548-.368 2.9-1.839 2.9-.58 0-1.027-.23-1.664-1.004-.496-.601-1.343-1.878-2.832-4.358l-.617-1.028a44.908 44.908 0 0 0-1.255-1.98c.07-.109.141-.224.211-.327 1.12-1.667 2.118-2.602 3.358-2.602zm-10.201.553c1.265 0 2.058.791 2.675 1.446.307.327.737.871 1.234 1.579l-1.02 1.566c-.757 1.163-1.882 3.017-2.837 4.338-1.191 1.649-1.81 1.817-2.486 1.817-.524 0-1.038-.237-1.383-.794-.263-.426-.464-1.13-.464-2.046 0-2.221.63-4.535 1.66-6.088.454-.687.964-1.226 1.533-1.533a2.264 2.264 0 0 1 1.088-.285z"/>
        </svg>
    `;

    const coucookieDefaultConsent = {
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
        analytics_storage: 'denied',
        functionality_storage: 'granted',
        security_storage: 'granted',
        wait_for_update: 500
    };

    const getCoucookieConfig = () => window.coucookieConfig || {};

    const isGoogleAdvancedConsentMode = () =>
        getCoucookieConfig().googleConsentMode === 'advanced';

    const initGoogleConsentMode = () => {
        window.dataLayer = window.dataLayer || [];

        window.gtag = window.gtag || function () {
            window.dataLayer.push(arguments);
        };

        window.gtag('consent', 'default', coucookieDefaultConsent);
    };

    const loadGoogleScript = ({ key }) => {
        if (!key || ccQuery('#coucookie-google-script')) return;

        initGoogleConsentMode();

        const script = document.createElement('script');
        script.async = true;
        script.id = 'coucookie-google-script';

        if (key.startsWith('GTM-')) {
            window.dataLayer.push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
            });

            script.src = `https://www.googletagmanager.com/gtm.js?id=${key}`;
        } else {
            script.src = `https://www.googletagmanager.com/gtag/js?id=${key}`;

            script.onload = () => {
                window.gtag('js', new Date());

                window.gtag('config', key, {
                    anonymize_ip: true
                });
            };
        }

        document.head.appendChild(script);
    };

    const cookieServiceLibrary = {
        googleAnalytics: {
            name: 'Google Analytics',
            description: 'Mesure d’audience.',
            learnMore: 'https://policies.google.com/privacy',
            icon: googleIcon,
            load: ({ key }) => {
                loadGoogleScript({ key });
            }
        },

        googleTagManager: {
            name: 'Google Tag Manager',
            description: 'Mesure d’audience, suivi des conversions publicitaires et amélioration des campagnes marketing.',
            learnMore: 'https://policies.google.com/privacy',
            icon: googleIcon,
            load: ({ key }) => {
                loadGoogleScript({ key });
            }
        },

        facebookPixel: {
            name: 'Facebook Pixel',
            description: 'Suivi publicitaire et campagnes Meta Ads.',
            learnMore: 'https://www.facebook.com/privacy/policy/',
            icon: metaIcon,
            load: ({ key }) => {
                if (ccQuery('#facebook-pixel-script') || !key) return;

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

                window.fbq('init', key);
                window.fbq('track', 'PageView');
            }
        }
    };

    const normalizeCookieService = (service, config) => {
        if (typeof config === 'string') {
            return {
                service,
                key: config
            };
        }

        return {
            service,
            ...(config || {})
        };
    };

    const getActiveCookieServices = () => {
        if (window.coucookieConfig?.services) {
            return Object.entries(window.coucookieConfig.services)
                .map(([service, config]) => normalizeCookieService(service, config))
                .filter(({ service }) => cookieServiceLibrary[service]);
        }

        if (Array.isArray(window.activeCookieServices)) {
            return window.activeCookieServices.filter(({ service }) => cookieServiceLibrary[service]);
        }

        return [];
    };

    const getService = service => cookieServiceLibrary[service];

    const getGoogleServiceConfig = () =>
        getActiveCookieServices().find(({ service }) =>
            ['googleAnalytics', 'googleTagManager'].includes(service)
        );

    const createCookiePopup = () => {
        if (ccQuery('#cookiePopup')) return;

        document.body.insertAdjacentHTML('beforeend', `
            <div class="cookie-popup" id="cookiePopup">
                <div class="cookie-top">
                    <div class="cookie-icon">${cookiePopupSvg}</div>

                    <div>
                        <h3>Gestion des cookies</h3>
                        <p>
                            Nous utilisons des cookies afin d'améliorer votre expérience,
                            mesurer l’audience et personnaliser nos campagnes marketing.
                        </p>
                    </div>
                </div>

                <div class="cookie-actions" id="cookieMainActions">
                    <button type="button" class="cookie-accept" data-coucookie-action="accept-all">Accepter</button>
                    <button type="button" class="cookie-refuse" data-coucookie-action="refuse-all">Refuser</button>
                    <button type="button" class="cookie-settings-btn" data-coucookie-action="open-settings">Paramétrer</button>
                </div>

                <div class="cookie-settings" id="cookieSettings">
                    <div class="tableCookieManage" id="cookieServicesContainer"></div>

                    <div class="cookie-actions">
                        <button type="button" class="cookie-accept" data-coucookie-action="settings-accept-all">Tout accepter</button>
                        <button type="button" class="cookie-refuse" data-coucookie-action="settings-refuse-all">Tout refuser</button>
                        <button type="button" class="cookie-save" data-coucookie-action="save-settings">Sauvegarder</button>
                    </div>
                </div>
            </div>
        `);
    };

    const getAllPreferences = value =>
        getActiveCookieServices().reduce((preferences, { service }) => {
            preferences[service] = value;
            return preferences;
        }, {});

    const setPopupVisible = visible => {
        const popup = ccQuery('#cookiePopup');
        if (!popup) return;

        popup.style.display = visible ? 'block' : 'none';
        popup.classList.toggle('is-visible', visible);

        if (visible) {
            popup.classList.remove('hide-bottom');
        }
    };

    const generateCookieServices = () => {
        const container = ccQuery('#cookieServicesContainer');
        if (!container) return;

        container.innerHTML = getActiveCookieServices()
            .map(({ service }) => {
                const item = getService(service);
                if (!item) return '';

                const learnMoreLink = item.learnMore
                    ? `<a href="${item.learnMore}" target="_blank" rel="noopener noreferrer" class="cookie-service-more">En savoir plus</a>`
                    : '';

                return `
                    <div class="cookie-setting-item checkbox-style">
                        <label class="cookie-checkbox">
                            <div class="cookie-service-content">
                                <div class="cookieIconManage">${item.icon || ''}</div>

                                <div class="cookie-label">
                                    <strong>${item.name}</strong>
                                    <span>
                                        ${item.description}
                                        ${learnMoreLink}
                                    </span>
                                </div>
                            </div>

                            <input type="checkbox" id="coucookie-service-${service}" data-coucookie-service="${service}">
                            <span class="checkmark"></span>
                        </label>
                    </div>
                `;
            })
            .join('');
    };

    const applyPreferencesToCheckboxes = preferences => {
        getActiveCookieServices().forEach(({ service }) => {
            const input = ccQuery(`[data-coucookie-service="${service}"]`);
            if (input) input.checked = !!preferences[service];
        });
    };

    const updateGoogleConsent = preferences => {
        const googleGranted =
            preferences.googleAnalytics === true ||
            preferences.googleTagManager === true;

        const adsGranted =
            preferences.googleTagManager === true ||
            preferences.facebookPixel === true;

        if (typeof window.gtag !== 'function') {
            return;
        }

        const consent = {
            analytics_storage: googleGranted ? 'granted' : 'denied',
            ad_storage: adsGranted ? 'granted' : 'denied',
            ad_user_data: adsGranted ? 'granted' : 'denied',
            ad_personalization: adsGranted ? 'granted' : 'denied',
            functionality_storage: 'granted',
            security_storage: 'granted'
        };

        window.gtag('consent', 'update', consent);

        if (googleGranted) {
            window.gtag('event', 'cookie_consent_accepted', {
                event_category: 'cookie',
                event_label: 'Google consent accepted'
            });
        }
    };

    const applyConsent = preferences => {
        updateGoogleConsent(preferences);

        getActiveCookieServices().forEach(activeService => {
            if (preferences[activeService.service] !== true) return;

            const service = getService(activeService.service);

            if (service?.load) {
                service.load(activeService);
            }
        });
    };

    const closeCookiePopup = () => {
        const popup = ccQuery('#cookiePopup');
        if (!popup) return;

        popup.classList.remove('is-visible');
        popup.classList.add('hide-bottom');

        setTimeout(() => {
            popup.style.display = 'none';
            popup.classList.remove('hide-bottom');
        }, 600);
    };

    const savePreferences = preferences => {
        localStorage.setItem('cookiePreferences', JSON.stringify(preferences));
        applyConsent(preferences);
        closeCookiePopup();
    };

    const toggleCookieSettings = () => {
        const popup = ccQuery('#cookiePopup');
        const settings = ccQuery('#cookieSettings');

        popup?.classList.add('settings-open');

        if (settings) {
            settings.style.display = 'block';
        }
    };

    const reopenCookiePopup = () => {
        createCookiePopup();
        generateCookieServices();
        bindCookiePopupEvents();

        const popup = ccQuery('#cookiePopup');
        const mainActions = ccQuery('#cookieMainActions');
        const settings = ccQuery('#cookieSettings');
        const savedPreferences = localStorage.getItem('cookiePreferences');

        if (popup) {
            popup.style.display = 'block';
            popup.classList.add('is-visible', 'settings-open');
            popup.classList.remove('hide-bottom');
        }

        if (mainActions) mainActions.style.display = 'none';
        if (settings) settings.style.display = 'block';

        if (savedPreferences) {
            try {
                applyPreferencesToCheckboxes(JSON.parse(savedPreferences));
            } catch {
                localStorage.removeItem('cookiePreferences');
            }
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
        const preferences = getActiveCookieServices().reduce((result, { service }) => {
            result[service] = ccQuery(`[data-coucookie-service="${service}"]`)?.checked === true;
            return result;
        }, {});

        savePreferences(preferences);
    };

    const bindCookiePopupEvents = () => {
        const popup = ccQuery('#cookiePopup');
        if (!popup || popup.dataset.coucookieBound === 'true') return;

        popup.dataset.coucookieBound = 'true';

        popup.addEventListener('click', event => {
            const button = event.target.closest('[data-coucookie-action]');
            if (!button) return;

            const action = button.dataset.coucookieAction;

            switch (action) {
                case 'accept-all':
                    acceptAllCookies();
                    break;

                case 'refuse-all':
                    refuseAllCookies();
                    break;

                case 'open-settings':
                    toggleCookieSettings();
                    break;

                case 'settings-accept-all':
                    acceptAllFromSettings();
                    break;

                case 'settings-refuse-all':
                    refuseAllFromSettings();
                    break;

                case 'save-settings':
                    saveCookiePreferences();
                    break;
            }
        });
    };

    const initCookiePopup = () => {
        const googleServiceConfig = getGoogleServiceConfig();

        if (googleServiceConfig) {
            initGoogleConsentMode();

            if (isGoogleAdvancedConsentMode()) {
                loadGoogleScript(googleServiceConfig);
            }
        }

        createCookiePopup();
        generateCookieServices();
        bindCookiePopupEvents();

        const savedPreferences = localStorage.getItem('cookiePreferences');

        if (!savedPreferences) {
            setPopupVisible(true);
            return;
        }

        try {
            const preferences = JSON.parse(savedPreferences);

            getActiveCookieServices().forEach(({ service }) => {
                preferences[service] ??= false;
            });

            localStorage.setItem('cookiePreferences', JSON.stringify(preferences));

            setPopupVisible(false);
            applyPreferencesToCheckboxes(preferences);
            applyConsent(preferences);
        } catch (error) {
            localStorage.removeItem('cookiePreferences');
            setPopupVisible(true);
        }
    };

    document.addEventListener('DOMContentLoaded', initCookiePopup);

    window.acceptAllCookies = acceptAllCookies;
    window.refuseAllCookies = refuseAllCookies;
    window.toggleCookieSettings = toggleCookieSettings;
    window.acceptAllFromSettings = acceptAllFromSettings;
    window.refuseAllFromSettings = refuseAllFromSettings;
    window.saveCookiePreferences = saveCookiePreferences;
    window.reopenCookiePopup = reopenCookiePopup;
})();
