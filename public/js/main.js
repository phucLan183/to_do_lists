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