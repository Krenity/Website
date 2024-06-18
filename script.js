(function() {
    const circle = document.querySelector('.circle');
    const speed = 0.4; // Adjust the speed of the circle's movement here
    const charElems = document.querySelectorAll('.glow-on-hover'); // Select all the elements to apply the effect to
  
    const animate = () => {
      const distX = mouseX - circleX;
      const distY = mouseY - circleY;
  
      circleX = circleX + (distX * speed);
      circleY = circleY + (distY * speed);
  
      circle.style.left = circleX + 'px';
      circle.style.top = circleY + 'px';
  
      requestAnimationFrame(animate);
    };
  
    let mouseX = 0;
    let mouseY = 0;
    let circleX = 0;
    let circleY = 0;
  
    document.addEventListener('mousemove', e => {
      mouseX = e.pageX;
      mouseY = e.pageY;
    });
  
    // Check if the user is on a mobile device and hide the circle element if so
    if (/Mobi/.test(navigator.userAgent)) {
      circle.classList.add('hidden');
    }
  
    animate();
  })();
  
  const countdown = () => {
    const targetDate = new Date('2024-08-28');
    const now = new Date();
    const timeRemaining = targetDate - now;
  
    let days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
    let hours = Math.floor(
      (timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    let minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
    let seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);
  
    days = days < 10 ? '0' + days : days;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    seconds = seconds < 10 ? '0' + seconds : seconds;
  
    document.getElementById('days').innerHTML =    "<div style='background: #060d13;'>" + days + "</div><div       style='background: #060d13; color: #1a447d;'>D</div>";
    document.getElementById('hours').innerHTML =   "<div style='background: #060d13;'>" + hours + "</div><div     style='background: #060d13; color: #1a447d;'>H</div>";
    document.getElementById('minutes').innerHTML = "<div style='background: #060d13;'>" + minutes + "</div><div style='background: #060d13; color: #1a447d;'>M</div>";
    document.getElementById('seconds').innerHTML = "<div style='background: #060d13;'>" + seconds + "</div><div style='background: #060d13; color: #1a447d;'>S</div>";
  
    if (timeRemaining < 0) {
      clearInterval(countdownInterval);
      document.querySelector('.countdown').innerHTML = 'Countdown ended';
    }
  };
  
  const countdownInterval = setInterval(countdown, 1000);
  