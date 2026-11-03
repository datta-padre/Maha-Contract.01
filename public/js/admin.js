
document.querySelectorAll('.submenu-toggle').forEach(toggle => {

    toggle.addEventListener('click', function () {

        const targetId = this.dataset.target;
        const submenu = document.getElementById(targetId);

        if (!submenu) return;

        submenu.classList.toggle('active');

        const icon = this.querySelector('.toggle-icon');

        if (icon) {
            icon.classList.toggle('fa-chevron-down');
            icon.classList.toggle('fa-chevron-up');
        }

    });

});

  document.querySelectorAll('.submenu-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
      const submenu = toggle.nextElementSibling;
      const icon = toggle.querySelector('.toggle-icon');

      // Close all other submenus
      document.querySelectorAll('.submenu').forEach(s => {
        if (s !== submenu) s.classList.remove('show');
      });
      document.querySelectorAll('.toggle-icon').forEach(i => {
        if (i !== icon) i.classList.remove('rotate');
      });

      // Toggle current
      submenu.classList.toggle('show');
      icon.classList.toggle('rotate');
    });
  });


    // Initialize AOS animations
    AOS.init();
    
    // Toggle sidebar
    document.getElementById('toggleSidebar').addEventListener('click', function() {
      document.getElementById('sidebar').classList.toggle('sidebar-collapsed');
      document.getElementById('mainContent').classList.toggle('main-content-collapsed');
    });
    
    // Responsive sidebar for mobile
    function handleResponsiveSidebar() {
      if (window.innerWidth < 992) {
        document.getElementById('sidebar').classList.remove('sidebar-collapsed');
        document.getElementById('mainContent').classList.remove('main-content-collapsed');
      }
    }


    
    window.addEventListener('resize', handleResponsiveSidebar);
    handleResponsiveSidebar();



    let ckeditor;
    ClassicEditor.create(document.querySelector(".editor"), {
    
    }).
    then(editor => {
    
      ckeditor = editor;
    }).
    catch(error => {
      console.error(error);
    });


  const houseownerThemeButton = document.getElementById('houseowner-theme-toggle');
  const isHouseownerDarkTheme = localStorage.getItem('theme') === 'dark';

  function setHouseownerTheme(isDark) {
    document.body.classList.toggle('houseowner-dark-theme', isDark);
    houseownerThemeButton.innerHTML = `<i class="fa-solid ${isDark ? 'fa-sun' : 'fa-moon'}" aria-hidden="true"></i>`;
    houseownerThemeButton.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    houseownerThemeButton.title = isDark ? 'Switch to light mode' : 'Switch to dark mode';
  }

  setHouseownerTheme(isHouseownerDarkTheme);
  houseownerThemeButton.addEventListener('click', () => {
    const isDark = !document.body.classList.contains('houseowner-dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    setHouseownerTheme(isDark);
  });

  function googleTranslateElementInit() {
    new google.translate.TranslateElement({
      pageLanguage: 'en',
      includedLanguages: 'en,hi,mr',
      layout: google.translate.TranslateElement.InlineLayout.SIMPLE,
      autoDisplay: false
    }, 'google_translate_element');
  }


    // Initialize AOS
    AOS.init();

    const sidebar      = document.getElementById('sidebar');
    const mainContent  = document.getElementById('mainContent');
    const overlay      = document.getElementById('sidebarOverlay');
    const toggleBtn    = document.getElementById('toggleSidebar');

    toggleBtn.addEventListener('click', function () {
      if (window.innerWidth < 992) {
        // Mobile: toggle show class + overlay
        sidebar.classList.toggle('show');
        overlay.classList.toggle('show');
      } else {
        // Desktop: collapse/expand
        sidebar.classList.toggle('sidebar-collapsed');
        mainContent.classList.toggle('main-content-collapsed');
      }
    });

    // Close sidebar when overlay is clicked (mobile)
    overlay.addEventListener('click', function () {
      sidebar.classList.remove('show');
      overlay.classList.remove('show');
    });

    // On resize: clean up classes
    window.addEventListener('resize', function () {
      if (window.innerWidth >= 992) {
        sidebar.classList.remove('show');
        overlay.classList.remove('show');
        mainContent.style.marginLeft = '';
      }
    });

    const userDropdown = document.getElementById('userDropdown');
    const userAvatar = document.querySelector('#userProfile .user-avatar');

    function toggleUserDropdown() {
      const isOpen = userDropdown.classList.toggle('show');
      userAvatar.setAttribute('aria-expanded', String(isOpen));
    }

    userAvatar.addEventListener('click', toggleUserDropdown);
    userAvatar.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        toggleUserDropdown();
      }
    });

    window.addEventListener('click', function (event) {
      if (!event.target.closest('#userProfile') && userDropdown.classList.contains('show')) {
        userDropdown.classList.remove('show');
        userAvatar.setAttribute('aria-expanded', 'false');
      }
    });

    userDropdown.addEventListener('click', function (event) {
      if (event.target.closest('a, button')) {
        userDropdown.classList.remove('show');
        userAvatar.setAttribute('aria-expanded', 'false');
      }
    });

    window.addEventListener('keydown', function (event) {
      if (event.key === 'Escape' && userDropdown.classList.contains('show')) {
        userDropdown.classList.remove('show');
        userAvatar.setAttribute('aria-expanded', 'false');
        userAvatar.focus();
      }
    });

    document.getElementById('fullscreenToggle').addEventListener('click', async function () {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await document.documentElement.requestFullscreen();
      }
    });

    document.getElementById('printPage').addEventListener('click', function () {
      window.print();
    });

    document.getElementById('resetLayout').addEventListener('click', function () {
      sidebar.classList.remove('sidebar-collapsed', 'show');
      mainContent.classList.remove('main-content-collapsed');
      mainContent.style.marginLeft = '';
      overlay.classList.remove('show');
      userDropdown.classList.remove('show');
      userAvatar.setAttribute('aria-expanded', 'false');
    });

    document.querySelectorAll('.submenu-toggle').forEach(toggle => {
      toggle.addEventListener('click', () => {
        const submenu = toggle.nextElementSibling;
        const icon    = toggle.querySelector('.toggle-icon');

        document.querySelectorAll('.submenu').forEach(s => {
          if (s !== submenu) s.classList.remove('show');
        });
        document.querySelectorAll('.toggle-icon').forEach(i => {
          if (i !== icon) i.classList.remove('rotate');
        });

        submenu.classList.toggle('show');
        icon.classList.toggle('rotate');
      });
    });



    // ── Submenu toggle ───────────────────────────────────────────
document.querySelectorAll('.submenu-toggle').forEach(function (toggle) {
  toggle.addEventListener('click', function () {
    const targetId = toggle.getAttribute('data-target');
    const submenu  = document.getElementById(targetId);
    const icon     = toggle.querySelector('.toggle-icon');

    // Close all other open submenus
    document.querySelectorAll('.submenu').forEach(function (s) {
      if (s !== submenu) s.classList.remove('show');
    });
    document.querySelectorAll('.toggle-icon').forEach(function (i) {
      if (i !== icon) i.classList.remove('rotate');
    });

    // Toggle clicked submenu
    submenu.classList.toggle('show');
    icon.classList.toggle('rotate');
  });
});
