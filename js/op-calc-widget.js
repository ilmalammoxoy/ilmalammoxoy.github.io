var slider1, slider2, loanAmount, loanTime, interest, annualPayment;
// Korkoprosentit lainan eri kestoille (1, 2, ..., 6+ vuotta)
var interestTable = [9, 5, 3.3, 2.8, 2.1, 1.7];
var updateTimer = null;
var manualInput = false;
var amount, time, payment, info, infoboksi, infonappi, hakunappi;
// Maksimi lainamäärä
var MAXAMOUNT = 50000;
// Maksimi laina-aika
var MAXTIME = 6;

window.onload = function () {
  info = document.getElementById("info");
  infoboksi = document.getElementById("infoboksi");
  infonappi = document.getElementById("infonappi");
  suljenappi = document.getElementById("suljenappi");
  amount = document.getElementById("amount");
  time = document.getElementById("time");
  payment = document.getElementById("payment");

  slider1 = new Dragdealer("slider_lainan_maara", {
    animationCallback: updateAmount,
    callback: updateAmount,
  });
  slider2 = new Dragdealer("slider_lainan_kesto", {
    animationCallback: updateTime,
    callback: updateTime,
  });

  if (!isTouchSupported()) {
    amount.onpropertychange = amount.oninput = inputHandler;
    time.onpropertychange = time.oninput = inputHandler;
  } else {
    amount.onchange = inputHandler;
    time.onchange = inputHandler;
  }
  infonappi.onclick = infoboksi.onclick = suljenappi.onclick = infoToggle;
};
var updateAmount = function (x, y) {
  if (!manualInput) {
    amount.value = 2500 + Math.round(((MAXAMOUNT - 2500) / 500) * x) * 500;
    updateTotal();
  }
};
var updateTime = function (x, y) {
  if (!manualInput) {
    time.value = 1 + Math.round((MAXTIME - 1) * x);
    updateTotal();
  }
};

window.onresize = function () {
  slider1.reflow();
  slider2.reflow();
};
var updateTotal = function () {
  loanAmount = parseInt(amount.value);
  loanTime = parseInt(time.value);
  interest = interestTable[loanTime - 1];
  // Edit: Helpotetaan laskukaavaa
  // var newPayment = Math.round( (loanAmount * ((interest / 12) / 100)) / (1 - Math.pow(1 + ((interest / 12) / 100), -(loanTime * 12))) ) + ' \u20AC';
  var newPayment = Math.round(loanAmount * (interest / 100));
  // Minimierä 50 €
  if (newPayment < 50) newPayment = 50;
  payment.innerHTML = newPayment + " \u20AC";
};
var inputHandler = function (event) {
  if (updateTimer != null) {
    clearTimeout(updateTimer);
    updateTimer = null;
  }
  manualInput = true;
  try {
    var myInput = event.target !== undefined ? event.target : event.srcElement;
  } catch (e) {
    var myInput = this;
  }
  switch (myInput.id) {
    case "amount":
      updateTimer = setTimeout(function () {
        var myAmount = parseInt(myInput.value);
        if (isNaN(myAmount) || myAmount < 1000) myAmount = 1000;
        else if (myAmount > MAXAMOUNT) myAmount = MAXAMOUNT;
        myInput.value = myAmount;
        var newPct = (myAmount - 1000) / (MAXAMOUNT - 1000);
        slider1.setValue(newPct, 0, true);
        updateTimer = null;
        setTimeout(function () {
          manualInput = false;
          updateTotal();
        }, 1000);
      }, 500);
      break;
    case "time":
      updateTimer = setTimeout(function () {
        var myTime = parseInt(myInput.value);
        if (isNaN(myTime) || myTime < 1) myTime = 1;
        else if (myTime > MAXTIME) myTime = MAXTIME;
        myInput.value = myTime;
        var newPct = (myTime - 1) / (MAXTIME - 1);
        slider2.setValue(newPct, 0, true);
        updateTimer = null;
        setTimeout(function () {
          manualInput = false;
          updateTotal();
        }, 1000);
      }, 500);
      break;
  }
};
var infoToggle = function (event) {
  if (getStyle("infoboksi", "display") == "none") {
    info.style.cssText = "z-index: 10";
    suljenappi.style.cssText = "display: block";
    infoboksi.style.cssText = "display: block";
  } else {
    info.style.cssText = "z-index: 1";
    suljenappi.style.cssText = "display: none";
    infoboksi.style.cssText = "display: none";
  }
};
var getStyle = function (id, name) {
  var element = document.getElementById(id);
  return element.currentStyle
    ? element.currentStyle[name]
    : window.getComputedStyle
    ? window.getComputedStyle(element, null).getPropertyValue(name)
    : null;
};
var isTouchSupported = function () {
  var msTouchEnabled = window.navigator.msMaxTouchPoints;
  var generalTouchEnabled = "ontouchstart" in document.createElement("div");

  if (msTouchEnabled || generalTouchEnabled) {
    return true;
  }
  return false;
};
