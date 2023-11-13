'use strict';
/* ============================================================================================================================= */
const burgerButton = document.querySelectorAll('.header__burger-wrapper');
const navigation = document.querySelectorAll('.menu');
const bodyElem = document.body;

let isBurgerOpen = false;

const handleBurgerAction = () => {
  bodyElem.classList.toggle('invisible');
  if (burgerButton.length) {
    burgerButton[0].classList.toggle('open');
  }
  if (navigation.length) {
    navigation[0].classList.toggle('visible');
  }
  isBurgerOpen ? (isBurgerOpen = false) : (isBurgerOpen = true);
};

if (burgerButton.length) {
  burgerButton.forEach((el) => {
    return el.addEventListener('click', handleBurgerAction);
  });
}
/* ============================================================================================================================= */
const englishLayout = {
  header: ['Home', 'About me', 'Skills', 'Portfolio', 'Contacts'],
  'main-block': [
    'Denis <br> Novik',
    'UX | UI designer <br>24 years old, Minsk',
  ],
  about: [
    'About me',
    `Hi, I'm Denis – UX / UI designer from Minsk. < br > I'm interested in design and everything connected with it.`,
    `I'm studying at courses "Web and mobile design < br > interfaces" in IT-Academy.`,
    `Ready to implement excellent projects <br>with wonderful people.`,
  ],
  skills: {
    title: 'Skills',
    subtitle: 'I work in such programs as',
  },
  contacts: [
    'Contacts',
    'Want to know more or just chat? You are welcome!',
    'Send message',
  ],
  footer: ['Like me on <br />LinkedIn, Instagram, Behance, Dribble'],
};
const russianLayot = {
  header: ['Главная', 'Обо мне', 'Навыки', 'Портфолио', 'Контакты'],
  'main-block': ['Денис <br> Новик', 'UX | UI дизайнер <br>24 года, Минск'],
  about: [
    'Обо мне',
    `Привет, я Денис – UX / UI дизайнер из Минска. <br> Я интересуюсь дизайном и всем, что с ним связано.`,
    `Я учусь на курсах «Веб- и мобильный дизайн интерфейсов» в IT-Академии.`,
    `Я готов реализовать отличные проекты с замечательными людьми.`,
  ],
  skills: ['Навыки', 'Я работаю в таких программах как'],
  contacts: [
    'Контакты',
    'Хотите узнать больше или просто пообщаться? Пожалуйста!',
    'Отправить сообщение',
  ],
  footer: ['Подпишитесь на меня в LinkedIn, Instagram, Behance, Dribbble.'],
};
/* ============================================================================================================================= */
let currentLanguage = 'en';

const switchLangButton = document.querySelectorAll('.switch-lang');

const handleSwitchLang = () => {
  const switchLangLabel = document.querySelectorAll('.switch-lang__label');
  if (switchLangLabel.length) {
    switchLangLabel.forEach((el) => {
      el.classList.toggle('_active');
    });
  }

  currentLanguage = currentLanguage === 'en' ? 'ru' : 'en';

  const sections = document.querySelectorAll('section');
  const header = document.querySelectorAll('header');
  const footer = document.querySelectorAll('footer');
  const mainElems = [...header, ...sections, ...footer];

  const fillWithText = (layout) => {
    for (const key in layout) {
      const element = mainElems.find((el) => el.classList.contains(key));
      const textElements = element.querySelectorAll('[data-embedded-text]');

      if (textElements.length) {
        textElements.forEach((el, index) => {
          el.innerHTML = layout[key][index];
        });
      }
    }
  };

  if (currentLanguage === 'en') {
    fillWithText(englishLayout);
  } else {
    fillWithText(russianLayot);
  }
};

if (switchLangButton.length) {
  switchLangButton.forEach((el) =>
    el.addEventListener('click', handleSwitchLang)
  );
}
/* ============================================================================================================================= */
const links = document.querySelectorAll('[data-goto]');

if (links.length) {
  let isLinkClicked = false;

  function handleGotoSection(event, el) {
    isLinkClicked = true;
    setTimeout(() => (isLinkClicked = false), 700);
    event.preventDefault();
    const gotoValue = el.getAttribute('data-goto');
    const section = document.querySelector(`.${gotoValue}`);
    links.forEach((el) => el.classList.remove('_active'));
    el.classList.toggle('_active');
    if (isBurgerOpen) {
      handleBurgerAction();
    }
    section.scrollIntoView({
      block: 'start',
      inline: 'nearest',
      behavior: 'smooth',
    });
  }

  links.forEach((el) => {
    return el.addEventListener('click', (event) =>
      handleGotoSection(event, el)
    );
  });

  function updateActiveLink() {
    // Перебираем все секции
    document.querySelectorAll('section').forEach((section) => {
      const rect = section.getBoundingClientRect();
      // Проверяем, если секция видна на экране
      if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
        // Удаляем класс _active у всех ссылок
        links.forEach((link) => link.classList.remove('_active'));
        // Находим соответствующую ссылку и добавляем класс _active
        const correspondingLink = document.querySelector(
          `[data-goto="${section.classList[0]}"]`
        );
        if (correspondingLink) {
          correspondingLink.classList.add('_active');
        }
      }
    });
  }

  window.addEventListener('load', updateActiveLink);
  window.addEventListener('scroll', () => {
    if (isLinkClicked) {
      setTimeout(() => updateActiveLink(), 700);
    } else {
      updateActiveLink();
    }
  });
}

/* ============================================================================================================================= */
const animItems = document.querySelectorAll('._anim-items');

if (animItems.length) {
  window.addEventListener('scroll', animOnScroll);
  function animOnScroll() {
    for (let i = 0; i < animItems.length; i++) {
      const animItem = animItems[i];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;

      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (
        scrollY > animItemOffset - animItemPoint &&
        scrollY < animItemOffset + animItemHeight
      ) {
        animItem.classList.add('_active');
      } else {
        if (!animItem.classList.contains('_anim-no-hide')) {
          animItem.classList.remove('_active');
        }
      }
    }
  }

  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.scrollX || document.documentElement.scrollLeft,
      scrollTop = window.scrollY || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }

  setTimeout(() => {
    animOnScroll();
  }, 300);
}
