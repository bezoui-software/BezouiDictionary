function createSwitch(state) {
  const toogle = document.createElement('label');
  toogle.classList.add('switch');

  const input = document.createElement('input'); 
  input.type = 'checkbox';
  input.checked = state;
  toogle.appendChild(input);

  const slider = document.createElement('span');
  slider.classList.add('slider');
  toogle.appendChild(slider);

  return toogle;
}
