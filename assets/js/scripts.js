$(document).ready(function () {

  // Toggle Navbar
  $('#menu').click(function () {
    $(this).toggleClass('fa-times');
    $('.navbar').toggleClass('nav-toggle');
  });

  // Scroll and Load Events
  $(window).on('scroll load', function () {
    $('#menu').removeClass('fa-times');
    $('.navbar').removeClass('nav-toggle');

    // Scroll-top button visibility
    if (window.scrollY > 60) {
      $('#scroll-top').addClass('active');
    } else {
      $('#scroll-top').removeClass('active');
    }

    // Scroll Spy
    $('section').each(function () {
      let height = $(this).height();
      let offset = $(this).offset().top - 200;
      let top = $(window).scrollTop();
      let id = $(this).attr('id');

      if (top > offset && top < offset + height) {
        $('.navbar ul li a').removeClass('active');
        $(`.navbar a[href="#${id}"]`).addClass('active');
      }
    });
  });

  // Smooth Scrolling
  $('a[href*="#"]').on('click', function (e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $($(this).attr('href')).offset().top,
    }, 500, 'linear');
  });

  // Contact Form (EmailJS)
  $("#contact-form").submit(function (event) {
    event.preventDefault();

    emailjs.init("user_TTDmetQLYgWCLzHTDgqxm");

    emailjs.sendForm('contact_service', 'template_contact', '#contact-form')
      .then(() => {
        alert("Form Submitted Successfully");
        $("#contact-form")[0].reset();
      })
      .catch(() => {
        alert("Form Submission Failed! Try Again");
      });
  });

});


// Change Title + Favicon on Tab Change
document.addEventListener('visibilitychange', function () {
  if (document.visibilityState === "visible") {
    document.title = "Portfolio | Ab Raheman Shaikh";
    $("#favicon").attr("href", "assets/images/favicon.png");
  } else {
    document.title = "Come Back To Portfolio";
    $("#favicon").attr("href", "assets/images/favhand.png");
  }
});


// Typed.js Effect
new Typed(".typing-text", {
  strings: [
    "frontend development",
    "backend development",
    "web designing",
    "software development",
    "web development"
  ],
  loop: true,
  typeSpeed: 50,
  backSpeed: 25,
  backDelay: 500,
});


// === Skills Section ===
async function fetchSkills() {
  const response = await fetch("skills.json");
  return await response.json();
}

function showSkills(skills) {
  const container = document.getElementById("skillsContainer");
  container.innerHTML = skills.map(skill => `
    <div class="bar">
      <div class="info">
        ${skill.icon.startsWith("http")
          ? `<img src="${skill.icon}" alt="${skill.name}" />`
          : `<i class="${skill.icon}" style="font-size:48px;"></i>`}
        <span>${skill.name}</span>
      </div>
    </div>
  `).join('');
}

function filterSkills(skills, category) {
  return category === "All" ? skills : skills.filter(s => s.category === category);
}

async function initSkills() {
  const allSkills = await fetchSkills();
  showSkills(allSkills);

  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelector(".filter-btn.active").classList.remove("active");
      btn.classList.add("active");

      const category = btn.dataset.category;
      const filtered = filterSkills(allSkills, category);
      showSkills(filtered);
    });
  });
}

initSkills();


// === Projects Section ===
function fetchProjects() {
  return fetch("projects/projects.json")
    .then(res => res.json())
    .catch(err => console.error("Error fetching projects:", err));
}

function showProjects(projects) {
  const projectsContainer = document.querySelector(".work .box-container");
  projectsContainer.innerHTML = projects.slice(0, 3).map(project => `
    <div class="grid-item">
      <div class="box tilt">
        <img draggable="false" src="/assets/images/projects/${project.image}" alt="${project.title}" />
        <div class="content">
          <div class="tag"><h3>${project.title}</h3></div>
          <div class="desc">
            <p>${project.description}</p>
            <div class="tech-stack">
              ${project.techStack.map(tech => `<span class="tech">${tech}</span>`).join(' ')}
            </div>
            <div class="btns">
              <a href="${project.link}" class="btn" target="_blank"><i class="fas fa-eye"></i> View</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `).join('');

  VanillaTilt.init(document.querySelectorAll(".tilt"), { max: 15 });

  ScrollReveal().reveal('#work .box', {
    origin: 'top',
    distance: '80px',
    duration: 1000,
    interval: 200
  });
}

fetchProjects().then(showProjects);


// === Disable Developer Mode ===
document.onkeydown = function (e) {
  if (
    e.keyCode === 123 || // F12
    (e.ctrlKey && e.shiftKey && ['I', 'C', 'J'].includes(String.fromCharCode(e.keyCode))) ||
    (e.ctrlKey && String.fromCharCode(e.keyCode) === 'U')
  ) {
    return false;
  }
};


// === Tawk.to Live Chat ===
var Tawk_API = Tawk_API || {}, Tawk_LoadStart = new Date();
(function () {
  var s1 = document.createElement("script"), s0 = document.getElementsByTagName("script")[0];
  s1.async = true;
  s1.src = 'https://embed.tawk.to/60df10bf7f4b000ac03ab6a8/1f9jlirg6';
  s1.charset = 'UTF-8';
  s1.setAttribute('crossorigin', '*');
  s0.parentNode.insertBefore(s1, s0);
})();


// === Scroll Reveal Animations ===
const srtop = ScrollReveal({
  origin: 'top',
  distance: '80px',
  duration: 1000,
  reset: true
});

srtop.reveal('.home .content h3, .home .content p, .home .content .btn', { delay: 200 });
srtop.reveal('.home .image', { delay: 400 });
srtop.reveal('.home .linkedin, .home .github, .home .twitter, .home .telegram, .home .instagram, .home .dev', { interval: 200 });
srtop.reveal('.about .content h3, .about .content .tag, .about .content p, .about .content .box-container, .about .content .resumebtn', { delay: 200 });
srtop.reveal('.skills .container, .skills .container .bar', { interval: 200 });
srtop.reveal('.education .box', { interval: 200 });
srtop.reveal('.work .box', { interval: 200 });
srtop.reveal('.experience .timeline, .experience .timeline .container', { interval: 400 });
srtop.reveal('.contact .container, .contact .container .form-group', { delay: 400 });
