// Modern jQuery with AOS and Smooth Parallax
$(document).ready(function () {
  // Initialize AOS (Animate On Scroll) - Optimized
  AOS.init({
    duration: 800,
    easing: "ease-out-cubic",
    once: true,
    offset: 80,
    delay: 0,
    disable: "mobile", // Disable on mobile for better performance
  });

  // Smooth Scrolling for Navigation Links
  $('a[href^="#"]').on("click", function (e) {
    e.preventDefault();
    const target = $(this.getAttribute("href"));

    if (target.length) {
      $("html, body")
        .stop()
        .animate(
          {
            scrollTop: target.offset().top - 80,
          },
          800
        );

      // Close mobile menu if open
      if ($(".mobile-menu").hasClass("active")) {
        $(".mobile-menu").removeClass("active").fadeOut(300);
      }
    }
  });

  // Navbar Scroll Effect - Throttled
  let lastScroll = 0;
  let ticking = false;

  $(window).on("scroll", function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        const currentScroll = $(window).scrollTop();

        if (currentScroll > 100) {
          $("#navbar").addClass("scrolled");
        } else {
          $("#navbar").removeClass("scrolled");
        }

        lastScroll = currentScroll;
        ticking = false;
      });
      ticking = true;
    }
  });

  // Mobile Menu Toggle
  $("#mobile-menu-btn").on("click", function () {
    $(".mobile-menu").toggleClass("active").fadeToggle(300);
    $("body").toggleClass("overflow-hidden");
  });

  // Close mobile menu on link click
  $(".mobile-menu-link").on("click", function () {
    $(".mobile-menu").removeClass("active").fadeOut(300);
    $("body").removeClass("overflow-hidden");
  });

  // Simplified Parallax Effect - Only on desktop
  if ($(window).width() > 1024) {
    let scrollTicking = false;

    $(window).on("scroll", function () {
      if (!scrollTicking) {
        window.requestAnimationFrame(function () {
          const scrolled = $(window).scrollTop();

          // Simple parallax for shapes
          $(".shape-1").css("transform", `translateY(${scrolled * 0.1}px)`);
          $(".shape-2").css("transform", `translateY(${scrolled * 0.15}px)`);
          $(".shape-3").css("transform", `translateY(${scrolled * 0.08}px)`);

          scrollTicking = false;
        });
        scrollTicking = true;
      }
    });
  }

  // Button Ripple Effect
  $("button").on("click", function (e) {
    const $button = $(this);
    const $ripple = $('<span class="ripple"></span>');

    $button.append($ripple);

    const btnOffset = $button.offset();
    const x = e.pageX - btnOffset.left;
    const y = e.pageY - btnOffset.top;

    $ripple.css({
      top: y + "px",
      left: x + "px",
      position: "absolute",
      width: "0",
      height: "0",
      borderRadius: "50%",
      background: "rgba(255, 255, 255, 0.5)",
      transform: "translate(-50%, -50%)",
      animation: "ripple-effect 0.6s ease-out",
    });

    setTimeout(() => {
      $ripple.remove();
    }, 600);
  });

  // Add ripple animation
  $("<style>")
    .prop("type", "text/css")
    .html(
      `
            @keyframes ripple-effect {
                to {
                    width: 300px;
                    height: 300px;
                    opacity: 0;
                }
            }
        `
    )
    .appendTo("head");

  // Intersection Observer for Advanced Animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -100px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        $(entry.target).addClass("in-view");
      }
    });
  }, observerOptions);

  // Observe glass cards for stagger animation
  $(".glass-card").each(function (index) {
    observer.observe(this);

    // Stagger delay
    $(this).css("animation-delay", `${index * 0.1}s`);
  });

  // Counter Animation
  function animateCounters() {
    $(".counter").each(function () {
      const $this = $(this);
      const countTo = $this.attr("data-count");

      $({ countNum: 0 }).animate(
        {
          countNum: countTo,
        },
        {
          duration: 2000,
          easing: "easeInOutCubic",
          step: function () {
            $this.text(Math.floor(this.countNum));
          },
          complete: function () {
            $this.text(countTo);
          },
        }
      );
    });
  }

  // Smooth reveal on scroll
  const revealElements = function () {
    const windowHeight = $(window).height();
    const scroll = $(window).scrollTop();

    $(".reveal").each(function () {
      const elementTop = $(this).offset().top;

      if (scroll + windowHeight > elementTop + 100) {
        $(this).addClass("revealed");
      }
    });
  };

  $(window).on("scroll", revealElements);
  revealElements(); // Initial check

  // Removed heavy tilt and magnetic effects for better performance

  // Simplified button hover
  $("button").on("mouseenter", function (e) {
    const $btn = $(this);
    const rect = this.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    $btn.css("transform", `translate(${x * 0.2}px, ${y * 0.2}px)`);
  });

  $("button").on("mouseleave", function () {
    $(this).css("transform", "");
  });

  // Gradient Animation on Hover
  $(".nav-link").on("mouseenter", function () {
    $(this).css({
      background: "linear-gradient(90deg, #ec4899, #a855f7, #6366f1)",
      "-webkit-background-clip": "text",
      "-webkit-text-fill-color": "transparent",
      "background-clip": "text",
    });
  });

  $(".nav-link").on("mouseleave", function () {
    $(this).css({
      background: "none",
      "-webkit-text-fill-color": "rgba(255, 255, 255, 0.8)",
    });
  });

  // Lazy Load Images (if any)
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.add("loaded");
          imageObserver.unobserve(img);
        }
      });
    });

    $("img[data-src]").each(function () {
      imageObserver.observe(this);
    });
  }

  // Removed cursor glow effect for better performance

  // Refresh AOS on window resize
  $(window).on("resize", function () {
    AOS.refresh();
  });

  // Prevent body overflow when mobile menu is open
  $(".mobile-menu").on("transitionend", function () {
    if (!$(this).hasClass("active")) {
      $("body").removeClass("overflow-hidden");
    }
  });

  // Add smooth scrolling for all internal links
  $('a:not([href^="#"]):not([href^="http"])').on("click", function (e) {
    const href = $(this).attr("href");
    if (href && !href.startsWith("http")) {
      e.preventDefault();
      $("body").fadeOut(300, function () {
        window.location.href = href;
      });
    }
  });

  // Log initialization
  console.log("✨ Anchor Heart - Premium Design Loaded Successfully!");
  console.log("🎨 Featuring: AOS Animations, Smooth Parallax, Glassmorphism");
  console.log("📱 Fully Responsive Design");
});

// Page Load Animation
$(window).on("load", function () {
  $("body").css("opacity", "0").animate({ opacity: 1 }, 600);
});

// Refresh AOS on dynamic content
window.refreshAOS = function () {
  AOS.refresh();
};
