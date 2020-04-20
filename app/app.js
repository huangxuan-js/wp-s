require('../css/app.css');

require('../less/app.less');

let $ = require('jquery');


//js代码
$(function(){
    $("button").on("click",function(){
        $.ajax({
            type:'get',
            url:'/pros',
            success(data){
                console.log(data)
            },
        })
    })
    
})












// let img = require('../images/conversation.png')
// console.log(img)

// // let img = require('../images/sn.png')
// // console.log("img==>", img)

// let a = [1, 2, 3]
// console.log(a)



// // 创建图片
// let image = new Image();

// if (/^data:image\/[A-Za-z]+;base64,/.test(img)) {
//     image.src = img;
// } else {
//     image.src = './assets/' + img;
// }
// document.body.appendChild(image);