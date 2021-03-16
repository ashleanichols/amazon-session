let desc = document.querySelectorAll('#prodDesc');
console.log(desc);
Array.from(desc).forEach(el => el.innerHTML = el.innerText);