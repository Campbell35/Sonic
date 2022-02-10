function toggleClass(elem,className){
    if (elem.className.indexOf(className)
    !== -1){
        elem.className =
    elem.className.replace(className,'');    
    }
    else{
        elem.className =
   elem.className.replace(/\s+/g,' ') + ' '
   + className;     
    }

    return elem;
}

function toggleDiplay(elem){
    const curDispalyStyle =
    elem.style.display;

    if (curDispalyStyle === 'none' || curDispalyStyle === ''){
        elem.style.display = 'block';
    }
    else{
        elem.style.display = 'none';
    }
}

function toggleMenuDisplay(e){
    const dropdown =
e.currentTarget.parentNode;
    const menu =
dropdown.querySelector('.menu');
    const icon =
dropdown.querySelector('.fa-angle-right');

toggleClass(menu, 'hide');
toggleClass(icon, 'rotate-90');
}

function handleOptionSelected(e){
    toggleClass(e.target.parentNode, 'hide');

    const id = e.target.id;
    const newValue = e.target.textContent + ' ';
    const titleElem =
document.querySelector('.dropdown .title');
    const icon =
document.querySelector('.dropdown .title .fa');

  titleElem.textContent = newValue;
  titleElem.appendChild(icon);

  document.querySelector('.dropdown .title').dispatchEvent(newEvent('change'));
   setTimeout(() => 
   toggleClass(icon, 'rotate-90', 0));
}

function handleTitleChange(e){
    const result =
document.getElementById('result');

  result.innerHTML = 'The result is: ' +
 e.target.textContent; 
}

const dropdownTitle =
document.querySelector('.dropdown .title');
const dropdownOptions =
document.querySelectorAll('.dropdown .option');

dropdownTitle.addEventListener('click', toggleMenuDisplay);
dropdownOptions.forEach(option => opyoon.addEventListener('click',handleOptionSelected));

document.querySelector('.dropdown .title').addEventListener('change',handleTitleChange);

setInterval(setClock, 1000)

const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')

function setClock() {
    const currentDate = new Date()
    const secondsRatio = currentDate.getSeconds() / 60
    const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
    const hoursRatio = (minutesRatio + currentDate.getHours()) / 12
    setRotation(secondHand, secondsRatio)
    setRotation(minuteHand, minutesRatio)
    setRotation(hourHand, hoursRatio)
    
} 

function setRotation(element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio * 360)
}

let cavas = document.getElementById("canvas");
let c = canvas.getContext("2d");
let tx = window.innerWidth;
let ty = window.innerHeight;
canvas.width = tx;
canvas.height = ty;

let mousex = 0;
let mousey = 0;

addEventListener("mousemove", function() {
    mousex = Event.clientX;
    mousey = Event.clientY;
});

let grav = 0.99;
c.strokeWidth=5;
function randomColor() {
    return (
        "rgba(" +
        Math.round(Math.random() * 250) +
        "," +
        Math.round(Math.random() * 250) +
        "," +
        Math.round(Math.random() * 250) +
        "," +
        Math.ceil(Math.random() * 10) / 10 +
        ")"
    );
}

function Ball() {
    this.color = randomColor();
    this.radius = Math.random() * 20 + 14;
    this.startradius = this.radius;
    this.x = Math.random() * (tx - this.radius * 2) + this.radius;
    this.y = Math.random() * (ty - this.radius);
    this.dy = Math.random() * 2;
    this.dx = Math.round((Math.random() - 0.5) * 10);
    this.vel = Math.random() /5;
    this.update = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
        c.fillStyle = this.color;
        c.fill();
    };
}

let bal = [];
for (let i=0; i<50; i++){
    bal.push(new Ball());
}

function animate() {
    if (tx != window.innerWidth || ty != window.innerHeight) {
        tx = window.innerWidth;
        ty = window.innerHeight;
        canvas.width = tx;
        canvas.height = ty;
    }
  requestAnimationFrame(animate);
  c.clearRect(0, 0, tx, ty);
  for (let i = 0; i < bal.length; i++) {
      bal[i].update();
      bal[i].y += bal[i].dy;
      bal[i].x += bal[i].dx;
      if (bal[i].y + bal[i].radius >= ty) {
        bal[i].dy = -bal[i].dy * grav;
      } else {
        bal[i].dy += bal[i].vel;
      }
      if(bal[i].x + bal[i].radius > tx || bal[i].x - bal[i].radius < 0){
          bal[i].dx = -bal[i].dx;

      }
      if(mousex > bal[i].x - 20&&
        mousex < bal[i].x + 20&&
        mousey < bal[i].y -50&&
        mousey < bal[i].y +50&&
        bal[i].radius < 70){
         bal[i].radius +=5;
       
       } else {
         if(bal[i].radius > bal[i].startradius){
             bal[i].radius += -5;
         }
       }
      }
}

animate();

setInterval(function() {
    bal.push(new Ball());
    bal.splice(0, 1);
}, 400);


function getTimeRemaining(endtime) {
    let t = Date.parse(endtime) -
Date.parse(new Date());
    let seconds = Math.floor((t / 1000) % 60);
    let minutes = Math.floor((t / 1000 / 60) % 60);
    let hours = Math.floor((t / (1000 * 60 * 60)) % 24);
    let days = Math.floor(t / (1000 * 60 * 60 * 24));

    return {
        'total': t,
        'days': days,
        'hours': hours,
        'minutes': minutes,
        'seconds': seconds
    };
}

function initializeClock(id, endtime) {
    let clock = document.getElementById(id);
    let daysSpan =
clock.querySelector('.days');
  let hoursSpan =
clock.querySelector('.hours');
  let minutesSpan =
clock.querySelector('.minutes');
  let secondsSpan =
clock.querySelector('.seconds');

function updateClock() {
    let t = getTimeRemaining(endtime);

    daysSpan.innerHTML = t.days;
    hoursSpan.innerHTML = ('0' + t.hours).slice(-2);
    minutesSpan.innerHTML = ('0' + t.minutes).slice(-2);
    secondsSpan.innerHTML = ('0' + t.seconds).slice(-2);

    if (t.total <= 0) {
        clearInterval(timeinterval);
    }
}

updateClock();
let timeinterval =
setInterval(updateClock, 1000);

}

let deadline = new Date(Date.parse(new Date()) + 15 * 24 * 60 * 60 * 1000);
initializeClock('clockdiv', deadline);