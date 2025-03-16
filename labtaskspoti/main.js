let textWords=document.querySelectorAll('span')

let array=[]
textWords.forEach(function (word) {
    array.push(word.textContent)
})
for (let i  = 0; i< array.length; i++) {
   setTimeout(function () {
     textWords[i].style.color='white'
     textWords[i].style.fontSize='23px'
     
     
   },300*(i+1))
    
}