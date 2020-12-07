const header = document.querySelector('header');

window.addEventListener('scroll', (e) => {
    let sticky = 35 + header.offsetTop;

    if(window.pageYOffset > sticky) {
        header.classList.add('sticky');
    }
    else{
        header.classList.remove('sticky');
    }
});