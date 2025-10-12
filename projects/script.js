// ================================
// Menu Toggle & Scroll Events
// ================================
$(document).ready(() => {
    // Menu toggle
    $('#menu').click(function () {
        $(this).toggleClass('fa-times');
        $('.navbar').toggleClass('nav-toggle');
    });

    // Scroll and load actions
    $(window).on('scroll load', () => {
        $('#menu').removeClass('fa-times');
        $('.navbar').removeClass('nav-toggle');

        if (window.scrollY > 60) {
            document.querySelector('#scroll-top').classList.add('active');
        } else {
            document.querySelector('#scroll-top').classList.remove('active');
        }
    });
});

// ================================
// Page Visibility Change
// ================================
document.addEventListener('visibilitychange', () => {
    const favicon = $("#favicon");
    if (document.visibilityState === "visible") {
        document.title = "Projects | Portfolio Jigar Sable";
        favicon.attr("href", "/assets/images/favicon.png");
    } else {
        document.title = "Come Back To Portfolio";
        favicon.attr("href", "/assets/images/favhand.png");
    }
});

// ================================
// Fetch & Display Projects
// ================================
const getProjects = async () => {
    const response = await fetch("projects.json");
    const data = await response.json();
    return data;
};

const showProjects = (projects) => {
    const projectsContainer = document.querySelector(".work .box-container");
    let projectsHTML = projects.map(project => `
        <div class="grid-item" href="${project.link}">
            <div class="box tilt" style="width: 380px; margin: 1rem">
                <img draggable="false" src="/assets/images/projects/${project.image}" alt="${project.title}" />
                <div class="content">
                    <div class="tag">
                        <h3>${project.title}</h3>
                    </div>
                    <div class="desc">
                        <p>${project.description}</p>
                        <div class="tech-stack">
                            ${project.techStack.map(tech => `<span class="tech">${tech}</span>`).join(' ')}
                        </div>
                        <div class="btns">
                            <a href="${project.link}" class="btn" target="_blank">
                                <i class="fas fa-eye"></i> View
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `).join('');

    projectsContainer.innerHTML = projectsHTML;

    // Initialize Isotope
    const $grid = $('.box-container').isotope({
        itemSelector: '.grid-item',
        layoutMode: 'fitRows',
        masonry: { columnWidth: 200 }
    });

    // Filter items on button click
    $('.button-group').on('click', 'button', function () {
        $('.button-group').find('.is-checked').removeClass('is-checked');
        $(this).addClass('is-checked');
        const filterValue = $(this).attr('data-filter');
        $grid.isotope({ filter: filterValue });
    });
};

// Load projects
getProjects().then(data => showProjects(data));

// ================================
// Tawk.to Live Chat
// ================================
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(() => {
    const s1 = document.createElement("script");
    const s0 = document.getElementsByTagName("script")[0];
    s1.async = true;
    s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
    s1.charset = 'UTF-8';
    s1.setAttribute('crossorigin', '*');
    s0.parentNode.insertBefore(s1, s0);
})();

// ================================
// Disable Developer Tools
// ================================
document.onkeydown = (e) => {
    const forbidden = [
        123, // F12
        'I'.charCodeAt(0),
        'C'.charCodeAt(0),
        'J'.charCodeAt(0),
        'U'.charCodeAt(0)
    ];

    if (
        e.keyCode === 123 ||
        (e.ctrlKey && e.shiftKey && forbidden.includes(e.keyCode)) ||
        (e.ctrlKey && e.keyCode === 85)
    ) {
        return false;
    }
};
