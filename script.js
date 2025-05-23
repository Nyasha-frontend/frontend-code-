document.addEventListener('DOMContentLoaded', function() {
  const optionContainers = document.querySelectorAll('.option-container');
  let currentSelected = null;
  
  
  optionContainers.forEach(container => {
    container.querySelector('.hidden-content').style.maxHeight = '0';
    container.querySelector('.popular-tag').style.display = 'none';
  });
  
  optionContainers.forEach(container => {
    const box = container.querySelector('.box');
    const hiddenContent = container.querySelector('.hidden-content');
    const popularTag = container.querySelector('.popular-tag');
    const radio = container.querySelector('input[type="radio"]');
    

    if (radio.id === 'unit1') {
      radio.checked = true;
    }
    
    box.addEventListener('click', function(e) {
      if (e.target.tagName === 'INPUT' && e.target.type === 'radio') {
        e.preventDefault();
        return;
      }
      
      if (container === currentSelected) {
        container.classList.remove('selected');
        hiddenContent.style.maxHeight = '0';
        popularTag.style.display = 'none';
        currentSelected = null;
        return;
      }
      
    
      if (currentSelected) {
        currentSelected.classList.remove('selected');
        currentSelected.querySelector('.hidden-content').style.maxHeight = '0';
        currentSelected.querySelector('.popular-tag').style.display = 'none';
      }
      
      
      container.classList.add('selected');
      hiddenContent.style.maxHeight = hiddenContent.scrollHeight + 'px';
      popularTag.style.display = 'block';
      radio.checked = true;
      
      currentSelected = container;
      
     
      updateTotalPrice(radio.id);
    });
    
   
    const selects = container.querySelectorAll('select');
    selects.forEach(select => {
      select.addEventListener('click', function(e) {
        e.stopPropagation();
      });
    });
  });
  
  function updateTotalPrice(selectedId) {
    const priceMap = {
      'unit1': '10.00',
      'unit2': '18.00',
      'unit3': '24.00'
    };
    document.querySelector('.total-price').textContent = 
      `Total: $${priceMap[selectedId] || '18.00'} USD`;
  }
});