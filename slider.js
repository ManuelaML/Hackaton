let slideIndex = 0;
let slides = document
  .getElementsByClassName('slider-container')[0]
  .getElementsByTagName('img');

function showSlides(n) {
  if (n >= slides.length) {
    slideIndex = 0;
  }
  for (let i = 0; i < slides.length; i++) {
    slides[i].className = slides[i].className.replace(' slide-left', '');
    slides[i].className = slides[i].className.replace(' slide-right', '');
    slides[i].style.display = 'none';
  }
  slides[slideIndex].style.display = 'block';
  if (slideIndex + 1 < slides.length) {
    slides[slideIndex + 1].className += ' slide-left';
  }
}

showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}
