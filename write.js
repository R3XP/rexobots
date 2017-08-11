const fs = require('fs');
let mtrue = true;
let ftrue = true;
let i = 0;
var myfile
try{
    fs.readFile('./log.txt', 'utf-8', function(e, content) {

            if(e) { 
                console.log("We have an Error!!!!   " +e)
            } else {
                myfile = content;
            }
    });
}
catch(e) { if(e) {
        console.log(e) 
    }else {


 



        console.log(myfile)



        // while(mtrue == true){
        //     if(ftrue) {
        //         try{
        //             fs.writeFile('./log.txt', "this is log" +i, function(e) {

        //                 if(e) {
        //                     console.log(e) 
        //                 } else {
        //                     console.log("succes!")
        //                 }
        //             })
        //         }
        //         catch(e){
        //             console.log("blub")

        //             if(e){
        //                 console.log(e)
        //             }
        //         }
        //         i++;
        //     }

        //     if(i > 5) mtrue = false;
        // }
    }
}