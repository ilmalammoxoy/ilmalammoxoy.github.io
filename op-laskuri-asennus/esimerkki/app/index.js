document.addEventListener("DOMContentLoaded", function(){
  document
    .querySelector('#example-product')
    .addEventListener('change', (event) => {
      var element = event.currentTarget;
      var value = element.options[element.selectedIndex].value;
      
      document.querySelector('.price-amount').innerHTML = value;

      // Hinnan asettaminen laskuriin
      __opCalcWidget['product'].setAmount(value);

      // Minimihinnan asettaminen
      __opCalcWidget['product'].setAmountMin(value);

      // __opCalcWidget['floating'].setAmount(3333);
      // __opCalcWidget['content'].setAmount(4444);
  });  
});
