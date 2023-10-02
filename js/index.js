document.addEventListener("DOMContentLoaded", function() {
  // Your code here

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


	const params = new URLSearchParams(window.location.search);
	const language = params.get('lang');

	if(language === 'en') {
		document.querySelector('html').setAttribute('lang', 'en');
		document.querySelector('.language-english').classList.add('active');
	} else {
		document.querySelector('html').setAttribute('lang', 'de');
		document.querySelector('.language-german').classList.add('active');
	}

	const anchorLinks = document.querySelectorAll('a[href^="#"]');

	anchorLinks.forEach(link => {
		link.addEventListener('click', event => {
			event.preventDefault();

			const targetId = link.getAttribute('href').slice(1);
			const targetElement = document.getElementById(targetId);

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
		});
	});


	// mobile menu

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
			mobileMenu.classList.remove('mobile-nav--visible');
		});
	});
});