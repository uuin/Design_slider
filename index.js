let images = [{
    url: "./img/1.png",
    title: "Rostov-on-Don",
    city: "Rostov-on-Don LCD admiral",
    area: "81 m2",
    time: "3.5 months",
    cost: "Upon request"
  }, {
    url: "./img/2.png",
    title: "Sochi Thieves",
    city: "Sochi Thieves",
    area: "105 m2",
    time: "4 months",
    cost: "Upon request"
  }, {
    url: "./img/3.png",
    title: "Rostov-on-Don Patriotic",
    city: "Rostov-on-Don Patriotic",
    area: "93 m2",
    time: "3.5 months",
    cost: "Upon request"
  }];

function initSlider(options) {
  if (!images || !images.length) return;
  
  options = options || {
    titles: true,
    dots: true,
    autoplay: false
  };
  
  let sliderImages = document.querySelector(".slider__images");
  let sliderArrows = document.querySelector(".slider__arrows");
  let sliderDots = document.querySelector(".slider__dots");
  let sliderText = document.querySelector(".slider__text");
  let city = document.querySelector(".city");
  let apartament = document.querySelector(".apartament");
  let time = document.querySelector(".time");
  let cost = document.querySelector(".cost");

  initImages();
  initArrows();
  initText();
  initCity();
  
  if (options.dots) {
    initDots();
  }
  if (options.titles) {
    initTitles();
  }
  if (options.autoplay) {
    initAutoplay();
  }
  
  function initImages() { //ставит первую картинки
    images.forEach((image, index) => {
      let imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`;
      sliderImages.innerHTML += imageDiv;
    });
  }
  
  function initArrows() { // обрабатывает стрелки по нажатию вперед назад
    sliderArrows.querySelectorAll(".slider__arrow").forEach(arrow => {
      arrow.addEventListener("click", function() {
        let curNumber = +sliderImages.querySelector(".active").dataset.index;
        let nextNumber;
        if (arrow.classList.contains("left")) {
          nextNumber = curNumber === 0? images.length - 1 : curNumber - 1;
        } else {
          nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
        }
        moveSlider(nextNumber);
      });
    });
  }
  
  function initDots() {//отображение точек по индексу фото, соотвественно сколько фоток столько
    images.forEach((image, index) => {
      let dot = `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`;
      sliderDots.innerHTML += dot;
    });
    sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
      dot.addEventListener("click", function() {
        moveSlider(this.dataset.index);
      })
    })
  }
  
  function initText(){ //добавлекние текста над картинкой slider__text
    images.forEach((item, index) => {
      let textDiv = `<div class="text n${index} ${index === 0 ? "active" : ""}" data-index="${index}">${images[index].title}</div>`;
      sliderText.innerHTML += textDiv;
    });
      sliderText.querySelectorAll(".text").forEach(textDiv => {
        textDiv.addEventListener("click", function () {
          moveSlider(this.dataset.index);
          sliderText.querySelector(".active").classList.remove("active");
          this.classList.add("active");
        })
      })
  }

  function initCity(){ //добавлекние текста city apart time cost
    images.forEach((item, index) => {
      let textDivCity = `<div class="text__city n${index} ${index === 0 ? "active" : ""}" data-index="${index}">${images[index].city}</div>`;
      city.innerHTML += textDivCity;

      let textDivApartament = `<div class="text__apartament n${index} ${index === 0 ? "active" : ""}" data-index="${index}">${images[index].area}</div>`;
      apartament.innerHTML += textDivApartament;

      let textDivTime = `<div class="text__time n${index} ${index === 0 ? "active" : ""}" data-index="${index}">${images[index].time}</div>`;
      time.innerHTML += textDivTime;
      
      let textDivCost = `<div class="text__cost n${index} ${index === 0 ? "active" : ""}" data-index="${index}">${images[index].cost}</div>`;
      cost.innerHTML += textDivCost;
    });
  }

  function moveSlider(num) {//с картинкой мняется точка и текст
    sliderImages.querySelector(".active").classList.remove("active");
    sliderImages.querySelector(".n" + num).classList.add("active");    
    sliderText.querySelector(".active").classList.remove("active");
    sliderText.querySelector(".n" + num).classList.add("active");   
    city.querySelector(".active").classList.remove("active");
    city.querySelector(".n" + num).classList.add("active");
    apartament.querySelector(".active").classList.remove("active");
    apartament.querySelector(".n" + num).classList.add("active");
    time.querySelector(".active").classList.remove("active");
    time.querySelector(".n" + num).classList.add("active");
    cost.querySelector(".active").classList.remove("active");
    cost.querySelector(".n" + num).classList.add("active");

     if (options.dots) {
      sliderDots.querySelector(".active").classList.remove("active");
      sliderDots.querySelector(".n" + num).classList.add("active");
    }
    if (options.titles) changeTitle(num);
  }

  
  function initAutoplay() {//авто воспроизведение
    setInterval(() => {
      let curNumber = +sliderImages.querySelector(".active").dataset.index;
      let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
      moveSlider(nextNumber);
    }, options.autoplayInterval);
  }
}

let sliderOptions = {
  dots: true,
  titles: true,
  autoplay: true,
  autoplayInterval: 1000
};

document.addEventListener("DOMContentLoaded", function() {
  initSlider(sliderOptions);
});