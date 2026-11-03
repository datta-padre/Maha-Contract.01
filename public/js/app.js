let currentRole = 'houseowner';

function openModal(modalId) {
    document.getElementById(modalId).style.display = 'flex';
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = 'none';
}

// Close modal if clicked outside
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
    }
}


// set current role 

function selectRole(element, role) {
    // Remove active class from all
    document.querySelectorAll('.role-card').forEach(card => {
        card.classList.remove('active');
    });
    // Add to clicked
    element.classList.add('active');
    currentRole = role;
}



// user register and login api 

function goToDashboard(mode) {
if (mode === 'register') {

    const phone = document.getElementById('regPhone').value.trim();
    const email = document.getElementById('regEmail').value.trim();
    const pass = document.getElementById('regPass').value;

    // Basic validation
    if (!phone || !email || !pass) {
        alert('Please fill all fields.');
        return;
    }

    if (pass.length < 8) {
        alert('Password must be at least 8 characters.');
        return;
    }

    console.log(`Registering user: ${phone}, ${email}, Role: ${currentRole}`);

    fetch(`/register/${currentRole}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            phone: phone,
            email: email,
            password: pass,
            role: currentRole
        })
    })
    .then(async response => {

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || 'Registration failed.');
        }

        return data;
    })
    .then(data => {

        console.log('Server Response:', data);

        if (data.success) {

            alert('Registration successful! Redirecting to dashboard...');

            window.location.href = data.redirect || `/${currentRole}`;

        } else {

            alert(data.message || 'Registration failed. Please try again.');

        }

    })
    .catch(error => {

        console.error('Registration Error:', error);

        alert(error.message || 'Something went wrong. Please try again.');

    });
}

    if(mode == "login"){

        const role = document.getElementById("loginRole").value;
        const email = document.getElementById('loginEmail').value;
        const pass = document.getElementById('loginPass').value;

        console.log("role", role , "Email", email , "password", pass );

        fetch('/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email, password: pass, role: role })
        }).then(response => response.json()).then(data => {
            console.log('Server Response:', data);
            if (data.success) {
                alert('Login successful! Redirecting to dashboard...');
                window.location.href = data.redirect || `/${role}/dashboard`;
            } else {
                alert(data.message || 'Login failed. Please check your credentials.');
            }
        })
        .catch(error => {
            console.error('Error during login:', error);
            alert('An error occurred. Please try again later.');    
        }); 

        }
}


function submitAdmin() {
    const email = document.getElementById('adminEmail').value;
    const pass = document.getElementById('adminPass').value;

    fetch('/master-admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: pass })
    })
    .then(function (response) { return response.json(); })
    .then(function (data) {
        if (data.success) {
            window.location.href = data.redirect || '/master-admin';
        } else {
            alert(data.message || 'Intrusion Blocked: Invalid Admin Credentials.');
        }
    })
    .catch(function (err) {
        console.error(err);
        alert('Admin login failed. Please try again.');
    });
}

function initThemeToggle() {
    if (!document.body) return;

    let btn = document.getElementById('theme-toggle-btn');
    if (!btn) {
        btn = document.createElement('button');
        btn.id = 'theme-toggle-btn';
        btn.type = 'button';
        btn.innerHTML = '<i data-lucide="sun"></i>';
        btn.style.position = 'fixed';
        btn.style.bottom = '20px';
        btn.style.right = '20px';
        btn.style.zIndex = '9999';
        btn.style.background = 'var(--surface)';
        btn.style.border = '1px solid var(--surface-border)';
        btn.style.color = 'var(--text-main)';
        btn.style.padding = '12px';
        btn.style.borderRadius = '50%';
        btn.style.cursor = 'pointer';
        btn.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
        document.body.appendChild(btn);
    }

    const savedTheme = localStorage.getItem('theme');
    const prefersLight = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    const isLightMode = savedTheme ? savedTheme === 'light' : prefersLight;

    const updateThemeButton = (isLight) => {
        document.documentElement.classList.toggle('light-theme', isLight);
        btn.setAttribute('aria-label', isLight ? 'Switch to dark mode' : 'Switch to light mode');
        btn.title = isLight ? 'Switch to dark mode' : 'Switch to light mode';
        btn.classList.toggle('is-light', isLight);
        if (!btn.querySelector('.ri-sun-fill, .ri-moon-fill')) {
            btn.innerHTML = isLight ? '<i data-lucide="moon"></i>' : '<i data-lucide="sun"></i>';
            if (window.lucide) lucide.createIcons();
        }
    };

    updateThemeButton(isLightMode);
    btn.onclick = () => {
        const isLight = !document.documentElement.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        updateThemeButton(isLight);
    };

    if (window.lucide) lucide.createIcons();
}

function translatePageTo(langCode) {
    const targetLang = langCode || 'en';
    if (window.google && window.google.translate && window.google.translate.TranslateElement) {
        const container = document.getElementById('google_translate_element');
        if (container) {
            container.innerHTML = '';
            new google.translate.TranslateElement({
                pageLanguage: 'en',
                includedLanguages: 'en,hi,mr',
                layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
                autoDisplay: false
            }, 'google_translate_element');
        }

        const combo = document.querySelector('.goog-te-combo');
        if (combo) {
            combo.value = targetLang;
            combo.dispatchEvent(new Event('change'));
        }
        return;
    }

    const url = new URL('https://translate.google.com/translate');
    url.searchParams.set('sl', 'auto');
    url.searchParams.set('tl', targetLang);
    url.searchParams.set('u', window.location.href);
    window.open(url.toString(), '_blank', 'noopener,noreferrer');
}

function initLanguageSwitcher() {
    if (!document.body || document.getElementById('language-switcher')) return;

    const wrapper = document.createElement('div');
    wrapper.id = 'language-switcher';
    wrapper.style.position = 'fixed';
    wrapper.style.bottom = '84px';
    wrapper.style.right = '20px';
    wrapper.style.zIndex = '9998';
    wrapper.style.display = 'flex';
    wrapper.style.flexDirection = 'column';
    wrapper.style.gap = '8px';
    wrapper.style.alignItems = 'flex-end';

    const trigger = document.createElement('button');
    trigger.id = 'language-switch-btn';
    trigger.type = 'button';
    trigger.setAttribute('aria-label', 'Change language');
    trigger.textContent = 'EN';
    trigger.style.background = 'var(--surface)';
    trigger.style.border = '1px solid var(--surface-border)';
    trigger.style.color = 'var(--text-main)';
    trigger.style.padding = '10px 12px';
    trigger.style.borderRadius = '999px';
    trigger.style.cursor = 'pointer';
    trigger.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
    trigger.title = 'Change Language';

    const menu = document.createElement('div');
    menu.style.display = 'none';
    menu.style.flexDirection = 'column';
    menu.style.gap = '6px';
    menu.style.padding = '8px';
    menu.style.borderRadius = '12px';
    menu.style.background = 'var(--surface)';
    menu.style.border = '1px solid var(--surface-border)';
    menu.style.boxShadow = '0 10px 20px rgba(0,0,0,0.2)';
    menu.style.backdropFilter = 'blur(12px)';

    const options = [
        { label: 'English', code: 'en', short: 'EN' },
        { label: 'हिंदी', code: 'hi', short: 'हिं' },
        { label: 'मराठी', code: 'mr', short: 'MR' }
    ];

    const setActiveLanguage = (langCode, shortLabel) => {
        trigger.textContent = shortLabel;
        document.documentElement.lang = langCode;
        document.documentElement.setAttribute('data-language', langCode);
    };

    options.forEach(option => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.textContent = option.label;
        btn.style.padding = '8px 10px';
        btn.style.borderRadius = '8px';
        btn.style.border = '1px solid transparent';
        btn.style.background = 'transparent';
        btn.style.color = 'var(--text-main)';
        btn.style.cursor = 'pointer';
        btn.style.textAlign = 'left';
        btn.onclick = () => {
            setActiveLanguage(option.code, option.short);
            translatePageTo(option.code);
            menu.style.display = 'none';
        };
        menu.appendChild(btn);
    });

    trigger.onclick = () => {
        menu.style.display = menu.style.display === 'flex' ? 'none' : 'flex';
    };

    wrapper.appendChild(trigger);
    wrapper.appendChild(menu);
    document.body.appendChild(wrapper);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initThemeToggle();
        initLanguageSwitcher();
        initGlobalTranslate();
    });
} else {
    initThemeToggle();
    initLanguageSwitcher();
    initGlobalTranslate();
}

// Initialize Google Translate Globally
function initGlobalTranslate() {
    if(!document.getElementById('google_translate_element')) {
        const translateContainer = document.createElement('div');
        translateContainer.id = 'google_translate_element';
        translateContainer.style.position = 'fixed';
        translateContainer.style.bottom = '80px'; 
        translateContainer.style.right = '20px';
        translateContainer.style.zIndex = '9999';
        translateContainer.style.background = 'var(--surface)';
        translateContainer.style.padding = '0.5rem';
        translateContainer.style.borderRadius = '8px';
        translateContainer.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        translateContainer.style.border = '1px solid var(--surface-border)';
        document.body.appendChild(translateContainer);
    }

    window.googleTranslateElementInit = function() {
        new google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: 'en,hi,mr',
            layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
        }, 'google_translate_element');
    };

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
    document.body.appendChild(script);
}

// Mobile Navigation Logic
function toggleMobileNav() {
    const navLinks = document.querySelector('.nav-links');
    if (navLinks.style.display === 'flex') {
        navLinks.style.display = 'none';
    } else {
        navLinks.style.display = 'flex';
        // Add mobile-specific styles block dynamically or handled in CSS
        navLinks.classList.add('mobile-active');
    }
}

function updateProfile(form, e) {
    e.preventDefault();
    let user = JSON.parse(localStorage.getItem('currentUser')) || {};
    const inputs = form.querySelectorAll('input, select');
    inputs.forEach(inp => {
        if(inp.placeholder === 'e.g. Haveli') user.taluka = inp.value;
        if(inp.placeholder === 'e.g. Pune') user.district = inp.value;
        if(inp.type === 'email') user.email = inp.value;
        if(inp.type === 'tel') user.phone = inp.value;
        if(inp.value === 'John Doe' && inp.type === 'text') user.name = inp.value;
    });
    localStorage.setItem('currentUser', JSON.stringify(user));
    alert('Profile Location Data Saved Permanently!');
}

function markFileSelected(input, multiple) {
    const zone = input.closest('.upload-zone');
    if (!zone) return;

    const label = zone.querySelector('.file-chosen');
    const files = input.files;

    if (!files || !files.length) {
        zone.classList.remove('has-file');
        if (label) {
            label.textContent = label.getAttribute('data-placeholder') || (multiple ? 'No files chosen' : 'No file chosen');
        }
        return;
    }

    zone.classList.add('has-file');
    if (!label) return;

    if (multiple && files.length > 1) {
        label.textContent = files.length + ' files selected';
    } else {
        label.textContent = files[0].name;
    }
}
