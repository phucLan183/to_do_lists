window.onload = () => {
  momentTime.init()
}

const momentTime = {
  init: function() {
    this.configMoment()
  },
  configMoment: function() {
    function startTime() {
      const currentTime = moment().format('MMM DD, YYYY - hh:mm:ss A')
      const target = document.querySelector('.app-header .header-date')
      if (target) target.innerHTML = currentTime
    }
    startTime()
    setInterval(startTime , 1000)
  }
}

document.querySelectorAll("[name=category]")[0].addEventListener('change',
  function () {
    if (this.value === '*') {
      window.location = "http://localhost:3333/" 
    } else {
      window.location = "http://localhost:3333/category/" + this.value;
    }
  }
);