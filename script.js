document.addEventListener('DOMContentLoaded', function() {
  const optionContainers = document.querySelectorAll('.option-container');
  let currentSelected = null; // Start with no selection
  
  // Initialize - no option selected by default
  optionContainers.forEach(container => {
    container.querySelector('.hidden-content').style.maxHeight = '0';
    container.querySelector('.popular-tag').style.display = 'none';
  });
  
  optionContainers.forEach(container => {
    const box = container.querySelector('.box');
    const hiddenContent = container.querySelector('.hidden-content');
    const popularTag = container.querySelector('.popular-tag');
    const radio = container.querySelector('input[type="radio"]');
    
    // Set the first radio as checked (but don't expand it)
    if (radio.id === 'unit1') {
      radio.checked = true;
    }
    
    box.addEventListener('click', function(e) {
      // Prevent radio button from being clicked directly
      if (e.target.tagName === 'INPUT' && e.target.type === 'radio') {
        e.preventDefault();
        return;
      }
      
      if (container === currentSelected) {
        // Clicking the currently selected option - collapse it
        container.classList.remove('selected');
        hiddenContent.style.maxHeight = '0';
        popularTag.style.display = 'none';
        currentSelected = null;
        return;
      }
      
      // Hide tag and collapse previously selected option (if any)
      if (currentSelected) {
        currentSelected.classList.remove('selected');
        currentSelected.querySelector('.hidden-content').style.maxHeight = '0';
        currentSelected.querySelector('.popular-tag').style.display = 'none';
      }
      
      // Show tag and expand newly selected option
      container.classList.add('selected');
      hiddenContent.style.maxHeight = hiddenContent.scrollHeight + 'px';
      popularTag.style.display = 'block';
      radio.checked = true;
      
      currentSelected = container;
      
      // Update total price
      updateTotalPrice(radio.id);
    });
    
    // Prevent clicks on selects from bubbling up
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