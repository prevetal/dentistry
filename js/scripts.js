WW = window.innerWidth || document.clientWidth || document.getElementsByTagName('body')[0].clientWidth
WH = window.innerHeight || document.clientHeight || document.getElementsByTagName('body')[0].clientHeight
BODY = document.getElementsByTagName('body')[0]


document.addEventListener('DOMContentLoaded', function () {
	// USA standarts
	let USAStandarts = document.querySelector('.USA_standarts .swiper')

	if (USAStandarts) {
		new Swiper('.USA_standarts .swiper', {
			loop: true,
			speed: 750,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			spaceBetween: 24,
			slidesPerView: 1,
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				bulletActiveClass: 'active'
			},
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			lazy: true
		})
	}


	// Doctors
	let doctors = document.querySelector('.doctors .swiper')

	if (doctors) {
		new Swiper('.doctors .swiper', {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			lazy: true,
			breakpoints: {
				0: {
					spaceBetween: 12,
					slidesPerView: 'auto'
				},
				1280: {
					spaceBetween: 12,
					slidesPerView: 3
				}
			},
			on: {
				init: swiper => setHeight(swiper.el.querySelectorAll('.doctor')),
				resize: swiper => {
					let items = swiper.el.querySelectorAll('.doctor')

					items.forEach(el => el.style.height = 'auto')

					setHeight(items)
				}
			}
		})
	}


	// Results
	let results = document.querySelector('.results .swiper')

	if (results) {
		new Swiper('.results .swiper', {
			loop: true,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			lazy: true,
			breakpoints: {
				0: {
					spaceBetween: 20,
					slidesPerView: 'auto'
				},
				1280: {
					spaceBetween: 27,
					slidesPerView: 3,
				}
			},
		})
	}


	// Photo gallery slider
	const photoGallerySliders = [],
		photoGallery = document.querySelectorAll('.photo_gallery .swiper')

	photoGallery.forEach((el, i) => {
		el.classList.add('photo_gallery_s' + i)

		let options = {
			loop: false,
			speed: 500,
			watchSlidesProgress: true,
			slideActiveClass: 'active',
			slideVisibleClass: 'visible',
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev'
			},
			lazy: true,
			spaceBetween: 20,
			slidesPerView: 'auto'
		}

		photoGallerySliders.push(new Swiper('.photo_gallery_s' + i, options))
	})


	// Tabs
	var locationHash = window.location.hash

	$('body').on('click', '.tabs .btn', function(e) {
		e.preventDefault()

		if (!$(this).hasClass('active')) {
			let parent = $(this).closest('.tabs_container'),
				activeTab = $(this).data('content'),
				activeTabContent = $(activeTab),
				level = $(this).data('level')

			parent.find('.tabs:first .btn').removeClass('active')
			parent.find('.tab_content.' + level).removeClass('active')

			$(this).addClass('active')
			activeTabContent.addClass('active')
		}
	})

	if (locationHash && $('.tabs_container').length) {
		let activeTab = $(`.tabs button[data-content="${locationHash}"]`),
			activeTabContent = $(locationHash),
			parent = activeTab.closest('.tabs_container'),
			level = activeTab.data('level')

		parent.find('.tabs:first .btn').removeClass('active')
		parent.find('.tab_content.' + level).removeClass('active')

		activeTab.addClass('active')
		activeTabContent.addClass('active')

		$('html, body').stop().animate({ scrollTop: $activeTabContent.offset().top }, 1000)
	}


	// Mob. menu
	$('.mob_header .mob_menu_btn').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').addClass('active')
		$('body').addClass('lock')
		$('header').addClass('show')
		$('.overlay').fadeIn(300)
	})

	$('header .mob_close_btn, .overlay').click((e) => {
		e.preventDefault()

		$('.mob_header .mob_menu_btn').removeClass('active')
		$('body').removeClass('mlockenu_open')
		$('header').removeClass('show')
		$('.overlay').fadeOut(300)
	})


	// Smooth scrolling to anchor
	const scrollBtns = document.querySelectorAll('.scroll_btn')

	if (scrollBtns) {
		scrollBtns.forEach(element => {
			element.addEventListener('click', e => {
				e.preventDefault()

				let anchor = element.getAttribute('data-anchor')

				$('.mob_header .mob_menu_btn').removeClass('active')
				$('body').removeClass('lock')
				$('header').removeClass('show')
				$('.overlay').fadeOut(300)

				document.getElementById(anchor).scrollIntoView({
					behavior: 'smooth',
					block: 'start'
				}, 1000)
			})
		})
	}


	// Phone input mask
	const phoneInputs = document.querySelectorAll('input[type=tel]')

	if (phoneInputs) {
		phoneInputs.forEach(el => {
			IMask(el, {
				mask: '+{7} (000) 000-00-00',
				lazy: true
			})
		})
	}


	// Before/After
	document.documentElement.style.setProperty('--before_after_height', $('.first_section .before_after .slider').outerHeight() + 'px')

	$('.before_after .slider').on('input change', function(e) {
		let sliderPos = e.target.value,
			parent = $(this).closest('.before_after')

		parent.find('.img.before').css('width', `${sliderPos}%`)

		parent.find('.circle').css('left', `${sliderPos}%`)
	})
})



window.addEventListener('load', function () {
	// Aligning elements in the grid
	document.querySelectorAll('.advantages .row').forEach(el => {
		let styles = getComputedStyle(el)

		advantagesHeight(el, parseInt(styles.getPropertyValue('--count')))
	})

	document.querySelectorAll('.our_advantages .row').forEach(el => {
		let styles = getComputedStyle(el)

		ourAdvantagesHeight(el, parseInt(styles.getPropertyValue('--count')))
	})
})



window.addEventListener('resize', function () {
	WH = window.innerHeight || document.clientHeight || BODY.clientHeight

	let windowW = window.outerWidth

	if (typeof WW !== 'undefined' && WW != windowW) {
		// Overwrite window width
		WW = window.innerWidth || document.clientWidth || BODY.clientWidth


		// Aligning elements in the grid
		document.querySelectorAll('.advantages .row').forEach(el => {
			let styles = getComputedStyle(el)

			advantagesHeight(el, parseInt(styles.getPropertyValue('--count')))
		})

		document.querySelectorAll('.our_advantages .row').forEach(el => {
			let styles = getComputedStyle(el)

			ourAdvantagesHeight(el, parseInt(styles.getPropertyValue('--count')))
		})


		// Before/After
		document.documentElement.style.setProperty('--before_after_height', $('.first_section .before_after .slider').outerHeight() + 'px')


		// Mob. version
		if (!fakeResize) {
			fakeResize = true
			fakeResize2 = false

			document.getElementsByTagName('meta')['viewport'].content = 'width=device-width, initial-scale=1, maximum-scale=1'
		}

		if (!fakeResize2) {
			fakeResize2 = true

			if (windowW < 375) document.getElementsByTagName('meta')['viewport'].content = 'width=375, user-scalable=no'
		} else {
			fakeResize = false
			fakeResize2 = true
		}
	}
})



// Alignment
function advantagesHeight(context, step) {
	let start = 0,
		finish = step,
		advantages = [...context.querySelectorAll('.item')],
		advantagesName = context.querySelectorAll('.name'),
		i = 0

	advantages.forEach(el => el.style.height = 'auto')
	advantagesName.forEach(el => el.style.height = 'auto')

	advantages.forEach(el => {
		advantages.slice(start, finish).forEach(el => el.setAttribute('nodeList', i))

		setHeight(context.querySelectorAll('[nodeList="' + i + '"] .name'))
		setHeight(context.querySelectorAll('[nodeList="' + i + '"]'))

		start = start + step
		finish = finish + step
		i++
	})
}


function ourAdvantagesHeight(context, step) {
	let start = 0,
		finish = step,
		advantages = [...context.querySelectorAll('.item')],
		advantagesExp = context.querySelectorAll('.exp'),
		i = 0

	advantagesExp.forEach(el => el.style.height = 'auto')

	advantages.forEach(el => {
		advantages.slice(start, finish).forEach(el => el.setAttribute('nodeList', i))

		setHeight(context.querySelectorAll('[nodeList="' + i + '"] .exp'))

		start = start + step
		finish = finish + step
		i++
	})
}



// Init map
function initMap() {
	ymaps.ready(() => {
		let myMap = new ymaps.Map('map', {
			center: [55.677636, 37.272125],
			zoom: 16,
			controls: []
		})

		// Кастомный маркер
		let myPlacemark = new ymaps.Placemark([55.677636, 37.272125], {}, {
			iconLayout : 'default#image',
			iconImageHref: 'images/map_marker.svg',
			iconImageSize : [52, 66],
			iconImageOffset : [-26, -33]
		})

		myMap.geoObjects.add(myPlacemark)

		myMap.behaviors.disable('scrollZoom')
	})
}