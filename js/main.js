//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||Секция .header---
//Плавная прокрутка
const navLinks = document.querySelectorAll('.nav-link')

navLinks.forEach(link => {
  link.addEventListener('click', event => {
    event.preventDefault()
    const id = event.target.getAttribute('href')
    document.querySelector(id).scrollIntoView({
      behavior: 'smooth'
    })
  })
})

//Мобильное меню 
let hamburger = document.querySelector('.hamburger')
let hamburgerLines = document.querySelectorAll('.hamburger-line')
let mobileMenuPanel = document.querySelector('.nav-container-mobile')
let mobileMenuLinks = document.querySelectorAll('.link')

hamburger.addEventListener('click', () => {
    hamburgerLines.forEach((el, index) => {
        el.classList.toggle(`active-hamburger-line-${index + 1}`)
    })

    mobileMenuPanel.classList.toggle('active')
})

mobileMenuLinks.forEach(el => {
    el.addEventListener('click', () => {
        hamburgerLines.forEach((el, index) => {
            el.classList.remove(`active-hamburger-line-${index + 1}`)
        })
        mobileMenuPanel.classList.remove('active')
    })
})

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||Секция .service---
//Привязка кнопок и карточек
const serviceButtons = document.querySelectorAll('.service-button')
const serviceCards = document.querySelectorAll('.service-item')
let activeButtons = []

//Фнкция-конструктор для кнопок
function BlurButton(btn) {
  this.btn = btn

  //eventListener для кнопок
  this.btn.addEventListener('click', function(event) {
    let target = event.target.dataset.service

    if (!target) return

    //Работа кнопок
    if (activeButtons.includes(target)) {
      this.btn.classList.remove('active')
      activeButtons = activeButtons.filter(function(el) {
        return el !== target
      })
    } else {
      if (activeButtons.length < 2 && !activeButtons.includes(target)) {
        this.btn.classList.add('active')
        activeButtons.push(target)
      }
    }

    //Размытие
    serviceCards.forEach(function(card) {
      card.classList.remove('blur')
    })

    if (activeButtons.length > 0) {
      serviceCards.forEach(function(card) {
        if (!activeButtons.includes(card.dataset.service)) {
          card.classList.add('blur')
        }
      })
    }
  }.bind(this)) // Привязка this к экземпдяру класса
}

//Экземпляры класса для каждой кнопки
serviceButtons.forEach(function(btn) {
  new BlurButton(btn)
})

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||Секция .prices---
const accordionPrices = document.querySelectorAll('.prices-option-header');

accordionPrices.forEach(el => {
  const innerContent = el.parentElement.querySelector('.prices-option-inner-content');

  el.addEventListener('click', () => {
    const isActive = el.parentElement.classList.contains('active')
    accordionPrices.forEach(item => {
      item.parentElement.classList.remove('active')
    })

    if (!isActive) {
      el.parentElement.classList.add('active')
    }
  })
})

//|||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||||Секция .contacts
//eventListeners
const accordionButton = document.querySelector('.contacts-accordion-button')
const accordionList = document.querySelector('.contacts-accordion-list')

accordionButton.addEventListener('click', () => {
  accordionList.classList.toggle('open')
  accordionButton.classList.toggle('open')
  if (accordionButton.classList.contains('active')) {
    accordionButton.classList.remove('active')
  }
})

//Добавление элемента списка во фрейм кнопки
let accordionButtonText = document.querySelector('.contacts-accordion-button-text')
let accordionListItems = document.querySelectorAll('.contacts-accordion-list li')

accordionListItems.forEach(item => {
  item.addEventListener('click', () => {
    accordionButtonText.textContent = item.textContent
    accordionList.classList.remove('open')
    accordionButton.classList.remove('open')
    accordionButton.classList.add('active')
  })
})

//Массив, добавление элементов в поля карточек
let accordionCardCityValue = document.querySelector('.contacts-card-city-value')
let accordionCardPhoneValue = document.querySelector('.contacts-card-phone-value')
let accordionCardAddressValue = document.querySelector('.contacts-card-address-value')

const contactArr = [{
  canandaigua: {
    city: 'Canandaigua, NY',
    phone: '+1	585	393 0001',
    address: '151 Charlotte Street'
  },
  nyc: {
    city: 'New York City',
    phone: '+1	585	393 0001',
    address: '151 Charlotte Street'
  },
  yonkers: {
    city: 'Yonkers, NY',
    phone: '+1	914	678 0003',
    address: '511 Warburton Ave'
  },
  sherrill: {
    city: 'Sherrill, NY',
    phone: '+1	315	908 0004',
    address: '14 WEST Noyes BLVD'
  }
}]

//Выпадающая карточка с контактами
let accordionCard = document.querySelector('.contacts-card')

let accordionPosition = document.querySelector('.contacts-accordion')
let contactsWoman = document.querySelector('.contacts-woman')

accordionListItems.forEach(item => {
  item.addEventListener('click', () => {
    accordionCard.style.display = 'flex'
    accordionCard.style.justifyContent = 'space-evenly'

    const selectedCity = item.dataset.city
    const contactInfo = contactArr[0][selectedCity]

    accordionCardCityValue.textContent = contactInfo.city
    accordionCardPhoneValue.textContent = contactInfo.phone
    accordionCardAddressValue.textContent = contactInfo.address

    //При размере 380px фрейм перемещается вверх, а картинка исчезает
    
    if (window.matchMedia('(max-width: 380px)').matches && accordionCard.style.display === 'flex') {
      accordionPosition.style.marginTop = '42px'
      contactsWoman.style.opacity = '0'
    }
  })
})