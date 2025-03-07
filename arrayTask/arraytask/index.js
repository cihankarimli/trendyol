let students = [
    { name: 'Alice', age: 20, score: 85 },
    { name: 'Bob', age: 22, score: 92 },
    { name: 'Charlie', age: 21, score: 78 },
    { name: 'Dave', age: 24, score: 90 },
    { name: 'Eve', age: 23, score: 88 },
    { name: 'Frank', age: 20,score:80}
  ];


    // let sum=0
    // for (let i = 0; i < students.length; i++) {
    //       sum=sum+students[i].score
    //       avarageScore=sum/students.length
    //      }
    //     console.log(avarageScore);

//     let maxscore=students[0].score
// for (let i = 0; i < students.length; i++) {
//   if(maxscore<students[i].score){
//     maxscore=students[i].score
//    }
   
   
// }
// console.log(maxscore);
let array=[]
let maxscore=students[0].score
for (let f = 0; f < students.length; f++) {
    
    for (let i = 0; i < students.length; i++) {
        if (maxscore<students[f].score) {
            array.push(students[f].score)
        }
        
    }
    console.log(array);
    
}

