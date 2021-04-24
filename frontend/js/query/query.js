var keyArr = [];

document.addEventListener('keydown', function() {
    let key = event.key;

    if(keyArr.indexOf(key) === -1) {
      keyArr.push(key);
    }
        
    console.log(keyArr);

    if(
      keyArr[0] === 'Control'
      && keyArr[1] === 'Enter'
    ) {
      console.log('pow!');
      document.querySelectorAll('input[value="Write query"]')[0].click()
    }

  })

document.addEventListener('keyup', function() {
  keyArr.pop();
  console.log(keyArr);
})