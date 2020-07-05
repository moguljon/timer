//Timer 

//Displays a timer, shows an animated border

//class Timer
//start()
//pause()
//duraction()
//tick() - change the numbers of seconds etc...


class Timer {
  constructor(duration, startButton, pauseButton, callbacks) {
    this.duration = duration;
    this.startButton = startButton;
    this.pauseButton = pauseButton;
    //optional
    if(callbacks) {
      this.onStart = callbacks.onStart;
      this.onTick = callbacks.onTick;
      this.onComplete = callbacks.onComplete;
    }

    this.startButton.addEventListener('click', this.start);
    this.pauseButton.addEventListener('click', this.pause);
  }

  start = () => {
    if(this.onStart) {
      this.onStart(this.timeRemaining);
    }
    //call tick before the interval
    this.tick();
    //start the timer and go down
    //start will just call the tick method
    //the interval bring out an id 
    //to pass variables among method you use the keyword this not const or let
      this.interval = setInterval(this.tick, 20);
  };

  pause = () => {
    clearInterval(this.interval);
  }

  tick = () => {
    if(this.timeRemaining <= 0) {
      this.pause();
      if(this.onComplete) {
        this.onComplete();
      }
    } else {
      this.timeRemaining = this.timeRemaining - .02;
      if(this.onTick) {
        this.onTick(this.timeRemaining);
      }

    }
    // const remainingTime = parseFloat(this.duration.value);
    //or use gettter
  };

  //or

  //tick = () => {
    // const timeRemaining = parseFloat(this.duration.value)
    // this.duration.value = timeRemaining - 1
  //}

  get timeRemaining() {
    return parseFloat(this.duration.value);
  }

  set timeRemaining(time) {
    this.duration.value = time.toFixed(2);
  }
}

const input = document.querySelector('#duration');
const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');
const circle = document.querySelector('circle');

const perimeter = circle.getAttribute('r') * 2 * Math.PI;
circle.setAttribute('stroke-dasharray', perimeter);

let duration;
const timer = new Timer(input, startBtn, pauseBtn, {
  //callbacks that are optional, 
  //to let it be known its doing what is doing
  onStart(totalDuration) {
   duration = totalDuration;
    
  },
  onTick(timeRemaining) {
    circle.setAttribute('stroke-dashoffset', 
      perimeter * timeRemaining / duration - perimeter
    );
  },
  onComplete() {
    console.log('Timer is completed');
  }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           
});

