/* =========================================
   SDI - SKILLING DEVELOPMENT INITIATIVE
   Main JavaScript
========================================= */

document.addEventListener("DOMContentLoaded", function () {

    // MOBILE NAVIGATION
    const menuButton = document.querySelector(
        ".menu-toggle, .mobile-menu-toggle, #menu-toggle"
    );

    const navigation = document.querySelector(
        ".nav-links, .main-nav, #navigation"
    );

    if (menuButton && navigation) {
        menuButton.addEventListener("click", function () {
            navigation.classList.toggle("active");

            const isOpen = navigation.classList.contains("active");
            menuButton.setAttribute("aria-expanded", isOpen);
        });

        navigation.querySelectorAll("a").forEach(function (link) {
            link.addEventListener("click", function () {
                navigation.classList.remove("active");
                menuButton.setAttribute("aria-expanded", "false");
            });
        });
    }


    // AUTOMATIC COPYRIGHT YEAR
    const yearElements = document.querySelectorAll(
        "#year, .current-year, [data-year]"
    );

    yearElements.forEach(function (element) {
        element.textContent = new Date().getFullYear();
    });


    // ACTIVE NAVIGATION LINK
    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll("nav a, .nav-links a").forEach(function (link) {
        const linkPage = link.getAttribute("href");

        if (linkPage && linkPage.split("/").pop() === currentPage) {
            link.classList.add("active");
            link.setAttribute("aria-current", "page");
        }
    });


    // SCROLL REVEAL ANIMATIONS
    const revealElements = document.querySelectorAll(
        ".reveal, .fade-in, .animate-on-scroll"
    );

    if ("IntersectionObserver" in window) {
        const observer = new IntersectionObserver(
            function (entries, observerInstance) {
                entries.forEach(function (entry) {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observerInstance.unobserve(entry.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(function (element) {
            observer.observe(element);
        });
    } else {
        revealElements.forEach(function (element) {
            element.classList.add("visible");
        });
    }


    // BACK TO TOP BUTTON
    const backToTop = document.querySelector(
        "#back-to-top, .back-to-top"
    );

    if (backToTop) {
        window.addEventListener("scroll", function () {
            if (window.scrollY > 400) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        });

        backToTop.addEventListener("click", function (event) {
            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        });
    }


    // CONTACT FORM BASIC VALIDATION
    const contactForm = document.querySelector(
        "#contact-form, .contact-form"
    );

    if (contactForm) {
        contactForm.addEventListener("submit", function (event) {
            const emailField = contactForm.querySelector(
                'input[type="email"]'
            );

            const nameField = contactForm.querySelector(
                'input[name="name"], input[name="fullName"]'
            );

            const messageField = contactForm.querySelector(
                "textarea"
            );

            if (
                (nameField && !nameField.value.trim()) ||
                (emailField && !emailField.value.trim()) ||
                (messageField && !messageField.value.trim())
            ) {
                event.preventDefault();
                alert("Please complete all required fields.");
                return;
            }

            if (
                emailField &&
                !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailField.value.trim())
            ) {
                event.preventDefault();
                alert("Please enter a valid email address.");
            }
        });
    }


    // FAQ ACCORDION
    const faqQuestions = document.querySelectorAll(
        ".faq-question, .accordion-button"
    );

    faqQuestions.forEach(function (question) {
        question.addEventListener("click", function () {
            const answer = question.nextElementSibling;

            if (!answer) return;

            const isOpen = question.classList.toggle("active");

            answer.classList.toggle("active", isOpen);
            question.setAttribute("aria-expanded", isOpen);
        });
    });


    // SMOOTH SCROLL FOR INTERNAL LINKS
    document.querySelectorAll('a[href^="#"]').forEach(function (link) {
        link.addEventListener("click", function (event) {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (target) {
                event.preventDefault();

                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });
            }
        });
    });


    // CLOSE MOBILE MENU WHEN CLICKING OUTSIDE
    document.addEventListener("click", function (event) {
        if (
            navigation &&
            menuButton &&
            !navigation.contains(event.target) &&
            !menuButton.contains(event.target)
        ) {
            navigation.classList.remove("active");
            menuButton.setAttribute("aria-expanded", "false");
        }
    });


    console.log("SDI website JavaScript loaded successfully.");
});