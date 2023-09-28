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
});