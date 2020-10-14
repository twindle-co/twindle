if(window.location.href.includes('twitter.com/')&&window.location.href.includes('/status/'))
    document.querySelector("#buttonPDF").addEventListener('click',toPDF)
else 
    document.querySelector("#buttonPDF").removeEventListener('click',toPDF)

