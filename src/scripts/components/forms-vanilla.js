import { unBannedDomains } from "../utils/top-domain-list";

// Import banned domains
// Helper Functions
const showError = (element, message = '') => {
    if (element) {
        element.classList.remove('hidden');
        if (message) {
            element.textContent = message;
        }
    }
};

const hideError = (element) => {
    if (element) {
        element.classList.add('hidden');
    }
};

// Form Data Customization
const formDataCustomize = (form) => {
    const formData = new FormData(form);
    const data = {};
    
    // Remove phoneCountryCode from data
    for (let [key, value] of formData.entries()) {
        if (key !== 'phoneCountryCode') {
            data[key] = value;
        }
    }
    
    return data;
};

// Form Submit Handler
const formSubmit = (form) => {
    const formButton = form.querySelector('button[type="submit"]');
    formButton.disabled = true;

    // For development - just show alert and console log
    const formData = formDataCustomize(form);
    console.log('Form Data:', formData);
    alert('Form submitted successfully!');
    formButton.disabled = false;

    // Production code - uncomment when ready
    /*
    fetch(document.location.origin + '/cta/cta.php', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(result => {
        if (result.status) {
            window.location.replace(form.querySelector("input[name='retURL']").value);
        } else {
            showError('.captcha-error');
            formButton.disabled = false;
        }
    })
    .catch(error => {
        console.error('Error:', error);
        showError('.captcha-error');
        formButton.disabled = false;
    });
    */
};

// UTM Parameters Handler
const GetParams = (form) => {
    if (!form) return;
    
    const utmFields = {
        utm_id: {
            name: "utm_id",
            id: "utm_id",
        },
        utm_source: {
            name: "UTM_Source__c",
            id: "00N4I00000F3Trn",
        },
        utm_medium: {
            name: "UTM_Medium__c",
            id: "00N4I00000F3Trs",
        },
        utm_campaign: {
            name: "UTM_Campaign__c",
            id: "00N4I00000F3Trx",
        },
        utm_term: {
            name: "UTM_Term__c",
            id: "00N4I00000F3Ts7",
        },
        utm_content: {
            name: "UTM_Content__c",
            id: "00N4I00000F3Ts2",
        },
        gclid: {
            name: "GCLID__c",
            id: "00N4I00000F3RLu",
        },
    };

    try {
        const params = new URLSearchParams(window.location.search);

        Object.entries(utmFields).forEach(([param, field]) => {
            const value = params.get(param);
            if (!value) return;

            try {
                const inputField = document.createElement('input');
                inputField.type = 'hidden';
                inputField.name = field.name;
                if (field.id) inputField.id = field.id;
                inputField.value = encodeURIComponent(value);
                form.prepend(inputField);
            } catch (err) {
                console.warn(`Error adding ${param} parameter to form:`, err);
            }
        });
    } catch (err) {
        console.warn("Error processing UTM parameters:", err);
    }
};

// Validation Rules
const validators = {
    required: (value) => {
        if (typeof value === 'string') return value.trim() !== '';
        return value !== null && value !== undefined;
    },
    minLength: (value, min) => value.length >= min,
    email: (value) => {
        // Önce temel email formatını kontrol et
        const regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if (!regex.test(value)) return false;
        
        // Domain kontrolü
        const domain = value.split('.').pop().toLowerCase();
        // return unBannedDomains.includes(domain);
        return unBannedDomains.indexOf(domain) > 0;
    },
    url: (value) => {
        try {
            new URL(value.startsWith('http') ? value : `http://${value}`);
            return true;
        } catch {
            return false;
        }
    },
    checkboxGroup: () => {
        return document.querySelectorAll('.solution-checkbox:checked').length > 0;
    },
    phone: (value) => {
        return /^[0-9]+$/.test(value); // Sadece sayı kontrolü
    }
};

// Main Form Handler
const CtaForm = () => {
    console.log("CtaForm fonksiyonu çağrıldı!"); // Test için

    const form = document.getElementById('cta-form');
    if (!form) return;

    // HTML5 validasyonunu devre dışı bırak
    form.setAttribute('novalidate', 'novalidate');

    // Field Validation Handler
    const validateField = (field) => {
        let isValid = true;
        let errorElement;

        // Promo checkbox için özel kontrol
        if (field.id === 'promo') {
            errorElement = document.getElementById('promo-error-msg');
            if (!field.checked) {
                showError(errorElement, 'This field is required.');
                isValid = false;
            }
        } else {
            errorElement = field.id === 'message' 
                ? form.querySelector('.message-error-message')
                : field.nextElementSibling;

            if (!errorElement || !errorElement.classList.contains('error')) return true;

            // Required kontrolü
            if (field.hasAttribute('data-required') && !validators.required(field.value)) {
                showError(errorElement, 'This field is required.');
                isValid = false;
            }
            // Email kontrolü
            else if (field.name === 'email' && field.value) {
                if (!validators.email(field.value)) {
                    showError(errorElement, 'Please enter a valid email address.');
                    isValid = false;
                }
            }
            // Phone kontrolü
            else if (field.name === 'phone' && field.value) {
                if (!validators.phone(field.value)) {
                    showError(errorElement, 'Please enter numbers only.');
                    isValid = false;
                }
            }
            // URL kontrolü
            else if (field.name === 'url' && field.value && !validators.url(field.value)) {
                showError(errorElement, 'Please enter a valid URL.');
                isValid = false;
            }
            // Checkbox group kontrolü
            else if (field.classList.contains('solution-checkbox')) {
                const checkboxErrorElement = form.querySelector('.wsaylf-error-message');
                if (!validators.checkboxGroup()) {
                    showError(checkboxErrorElement, 'Please select at least one option.');
                    isValid = false;
                } else {
                    hideError(checkboxErrorElement);
                }
            }
        }

        if (isValid && errorElement) {
            hideError(errorElement);
        }

        return isValid;
    };

    // Phone input için sayı kontrolü
    const phoneInput = form.querySelector('input[name="phone"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            this.value = this.value.replace(/[^0-9]/g, '');
        });
    }

    // Form Validation Handler
    const validateForm = () => {
        let isValid = true;
        
        // Clear all previous errors
        form.querySelectorAll('.error').forEach(error => {
            error.classList.add('hidden');
        });

        // Tüm alanları validate et
        form.querySelectorAll('input, select, textarea').forEach(field => {
            if (!validateField(field)) {
                isValid = false;
            }
        });

        // Checkbox group kontrolü
        if (!validators.checkboxGroup()) {
            const checkboxErrorElement = form.querySelector('.wsaylf-error-message');
            if (checkboxErrorElement) {
                showError(checkboxErrorElement, 'Please select at least one option.');
                isValid = false;
            }
        }

        // Promo checkbox kontrolü
        const promoCheckbox = form.querySelector('#promo');
        if (promoCheckbox && !promoCheckbox.checked) {
            const promoError = document.getElementById('promo-error-msg');
            if (promoError) {
                showError(promoError, 'This field is required.');
                isValid = false;
            }
        }

        // Message alanı kontrolü
        const messageField = form.querySelector('#message');
        if (messageField && messageField.hasAttribute('data-required') && !validators.required(messageField.value)) {
            const messageError = form.querySelector('.message-error-message');
            if (messageError) {
                showError(messageError, 'This field is required.');
                isValid = false;
            }
        }

        return isValid;
    };

    // Textarea karakter sayacı
    const textarea = form.querySelector('textarea');
    if (textarea) {
        textarea.addEventListener('input', function() {
            const characterCount = this.value.length;
            const currentCount = document.getElementById('current_count');
            if (currentCount) {
                currentCount.textContent = characterCount;
            }
        });
    }

    // Lead source ayarı
    const leadSource = form.querySelector('[name="lead_source"]');
    if (leadSource && !leadSource.value) {
        leadSource.value = document.title;
    }

    // Input başında boşluk engelleme
    form.querySelectorAll('input').forEach(input => {
        input.addEventListener('keydown', function(e) {
            if (e.key === ' ' && this.selectionStart === 0) {
                e.preventDefault();
            }
        });
    });

    // Input değişiklik takibi
    form.querySelectorAll('input, select, textarea').forEach(field => {
        ['input', 'change', 'blur'].forEach(eventType => {
            field.addEventListener(eventType, () => validateField(field));
        });
    });

    // Checkbox group için özel listener
    form.querySelectorAll('.solution-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const checkboxErrorElement = form.querySelector('.wsaylf-error-message');
            if (validators.checkboxGroup()) {
                hideError(checkboxErrorElement);
            }
        });
    });

    // Promo checkbox için özel listener
    const promoCheckbox = form.querySelector('#promo');
    if (promoCheckbox) {
        promoCheckbox.addEventListener('change', () => {
            const errorElement = document.getElementById('promo-error-msg');
            if (promoCheckbox.checked) {
                hideError(errorElement);
            } else {
                showError(errorElement, 'This field is required.');
            }
        });
    }

    // Form gönderim
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        if (validateForm()) {
            formSubmit(form);
        }
    });

    // UTM parametrelerini başlat
    GetParams(form);
};

// Export
export { CtaForm };
