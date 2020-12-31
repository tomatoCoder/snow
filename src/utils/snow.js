/*
 * @Description: 
 * @Author: qingyang
 * @Date: 2020-12-31 13:55:08
 * @LastEditors: qingyang
 * @LastEditTime: 2020-12-31 15:55:07
 */


 class Snow {
     constructor(option) {
         this.x = option.x;
         this.y = option.y;
         this.r = option.r;
         this.fn = option.fn;
     }
    render (cxt) {
        console.log('绘制')
        var grd = cxt.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        grd.addColorStop(0, "rgba(255, 255, 255, 0.9)");
        grd.addColorStop(.5, "rgba(255, 255, 255, 0.5)");
        grd.addColorStop(1, "rgba(255, 255, 255, 0)");
        cxt.fillStyle = grd;
        cxt.fillRect(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
    }
    update () {
        this.x = this.fn.x(this.x, this.y);
        this.y = this.fn.y(this.y, this.y);

        if (this.x > window.innerWidth || this.x < 0 || this.y > window.innerHeight || this.y < 0) {
            this.x = getRandom('x');
            this.y = 0;
        }
    }
 }
const getRandom = (option) => {
    var ret, random;
    switch (option) {
        case 'x':
            ret = Math.random() * window.innerWidth;
            console.log(ret) 
            break;
        case 'y':
            ret = Math.random() * window.innerHeight; 
            break;
        case 'r':
            //控制雪花大小在10-20之间
            ret = 10 + (Math.random() * 20); 
            break;
        case 'fnx':
            random = 27 + Math.random() * 100; 
            ret = function (x,y) {
                return x + 0.5 * Math.sin(y/random);
            }
            break;
        case 'fny':
            random = 0.4 + Math.random() * 100; 
            ret = function (x,y) {
                return y + random;
            }
        break; 
    }
    return ret;
}

// const moveSnow = (snowList, cxt) => {
//     window.requestAnimationFrame(() => {
//         snowList.forEach((item) => {
//             item.update();
//             item.render(cxt)
//         })
//         moveSnow(snowList, cxt)
//     })
// }
 export const startSnow = () => {
    let canvas = document.getElementById('canvas_snow');
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    let cxt = canvas.getContext('2d');
    let snowList = [];
    for (let i = 0; i < 100; i ++) {
        let randomX = getRandom('x');
        let randomY = getRandom('y');
        let randomR = getRandom('r');
        let randomFnx = getRandom('fnx'); // 水平下落速度
        let randomFny = getRandom('fny'); // 垂直下落速度
        console.log(randomX)
         let snow = new Snow({
            x: randomX,
            y: randomY,
            r: randomR,
            fn: {
                x: randomFnx,
                y: randomFny
            } 
         })
        snow.render(cxt);
        snowList.push(snow);
        
    }
    cxt.clearRect(0, 0, canvas.width, canvas.height);
    snowList.forEach((item) => {
        item.update();
        item.render(cxt)
    })
    // moveSnow(snowList, cxt);
 }


