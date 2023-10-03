document.addEventListener("DOMContentLoaded", function() {
  // Your code here

	const getAccordion = () => {
		const accordionHeaders = document.querySelectorAll('.accordion-header');

		accordionHeaders.forEach(header => {
			header.addEventListener('click', () => {
				const accordionItem = header.parentElement;
				const accordionContent = accordionItem.querySelector('.accordion-content');
				const isExpanded = accordionItem.classList.contains('accordion-item--expanded');

				accordionItem.classList.toggle('accordion-item--expanded');

				if (isExpanded) {
					accordionContent.style.height = '0';
					accordionContent.style.opacity = '0';
				} else {
					accordionContent.style.height = `${accordionContent.scrollHeight}px`;
					accordionContent.style.opacity = '1';
				}
			});
		});
	}

	const getLanguages = () => {
		const params = new URLSearchParams(window.location.search);
		const language = params.get('lang');
		if (language === 'en') {
			document.querySelector('html').setAttribute('lang', 'en');
			document.querySelectorAll('.language-english').forEach(link => link.classList.add('active'));
		} else {
			document.querySelector('html').setAttribute('lang', 'de');
			document.querySelectorAll('.language-german').forEach(link => link.classList.add('active'));
		}

	}
 // animate on scroll

	const animateScroll = () => {
		const anchorLinks = document.querySelectorAll('a[href^="#"]');

		anchorLinks.forEach(link => {
			link.addEventListener('click', event => {
				event.preventDefault();

				const targetId = link.getAttribute('href').slice(1);
				const targetElement = document.getElementById(targetId);
				const body = document.querySelector('body');
				const mobileMenuButton = document.querySelector('.mobile-menu-button');

				const scrollTop = window.scrollY || document.documentElement.scrollTop;
				const targetOffset = targetElement.getBoundingClientRect().top + scrollTop;
				const distance = targetOffset - scrollTop;

				const duration = 500;
				const startTime = performance.now();

				const animateScroll = currentTime => {
					const elapsedTime = currentTime - startTime;
					const progress = Math.min(elapsedTime / duration, 1);
					const ease = progress => 0.5 - 0.5 * Math.cos(Math.PI * progress);
					const scrollPosition = scrollTop + distance * ease(progress);

					window.scrollTo(0, scrollPosition);

					if (progress < 1) {
						requestAnimationFrame(animateScroll);
					}
				};

				requestAnimationFrame(animateScroll);

				if(body.classList.contains('no-scroll')) {
					body.classList.remove('no-scroll');
					mobileMenuButton.classList.remove('mobile-menu-button--open');
				}
			});
		});

	}

	// mobile menu

	const getMobileMenu = () => {
		const mobileMenuButton = document.querySelector('.mobile-menu-button');
		const mobileMenu = document.querySelector('.mobile-nav');

		mobileMenuButton.addEventListener('click', () => {
			mobileMenu.classList.toggle('mobile-nav--visible');
			// rotate the svg inside mobile menu button
			mobileMenuButton.classList.toggle('mobile-menu-button--open');
		});

		const mobileMenuLinks = document.querySelectorAll('.mobile-nav a[href^="#"]');
		mobileMenuLinks.forEach(link => {
			link.addEventListener('click', () => {

				mobileMenuLinks.forEach(link => link.classList.remove('focused'));

				setTimeout(() => {
					link.classList.add('focused');
				}, 10);
				mobileMenu.classList.remove('mobile-nav--visible');

			});
		});

	}

	// Highlight active section in navigation
	const getNavHighlight = () => {
		const sections = document.querySelectorAll('section');
		const navLinks = document.querySelectorAll('.desktop-nav a');

		const options = {
			rootMargin: '-50px 0px -50px 0px',
			threshold: 0.5
		};

		const observer = new IntersectionObserver((entries, observer) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					const sectionId = entry.target.getAttribute('id');
					const navLink = document.querySelector(`.desktop-nav a[href="#${sectionId}"]`);
					navLinks.forEach(link => link.classList.remove('focused'));
					navLink.classList.add('focused');
				}
			});
		}, options);

		sections.forEach(section => observer.observe(section));

	}


	// Prevent body scrolling when menu is opened on mobile
	const preventBodyScroll = () => {
		const body = document.querySelector('body');
		const menuButton = document.querySelector('.mobile-menu-button');
		const mobileMenu = document.querySelector('.mobile-nav');

		menuButton.addEventListener('click', () => {
			body.classList.toggle('no-scroll');
		});
	}

	getAccordion();
	getLanguages();
	animateScroll();
	getMobileMenu();
	getNavHighlight();
	preventBodyScroll();
});