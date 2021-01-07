/*
 * @Description: 下雪
 * @Author: qingyang
 * @Date: 2020-12-31 13:55:08
 * @LastEditors: qingyang
 * @LastEditTime: 2021-01-06 15:48:05
 */


 class Snow {
     constructor(option) {
         this.x = option.x;
         this.y = option.y;
         this.r = option.r;
         this.fn = option.fn;
     }
     // 绘制雪花
    render (cxt) {
        var grd = cxt.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r);
        grd.addColorStop(0, "rgba(255, 255, 255, 0.9)");
        grd.addColorStop(.5, "rgba(255, 255, 255, 0.5)");
        grd.addColorStop(1, "rgba(255, 255, 255, 0)");
        cxt.fillStyle = grd;
        cxt.fillRect(this.x - this.r, this.y - this.r, this.r * 2, this.r * 2);
        // let img = document.getElementById("logo")
        // cxt.drawImage(img, this.x ,this.y, this.r * 2, this.r * 2);

    }
    // 更新雪花位置
    update () {
        this.x = this.fn.x(this.x, this.y);
        this.y = this.fn.y(this.y, this.y);
        if (this.x > window.innerWidth || this.x < 0 || this.y > window.innerHeight || this.y < 0) {
            // 超出屏幕时,重置雪花下落位置
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
            break;
        case 'y':
            ret = Math.random() * window.innerHeight; 
            break;
        case 'r':
            //控制雪花大小在10-20之间
            ret = 5 + (Math.random() * 10); 
            break;
        case 'fnx':
            random = 27 + Math.random() * 100; 
            ret = function (x,y) {
                return x + 0.5 * Math.sin(y/random);
            }
            break;
        case 'fny':
            random = 0.4 + Math.random() * 20; 
            ret = function (x,y) {
                return y + random;
            }
        break; 
    }
    return ret;
}

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
        let randomFnx = getRandom('fnx'); // 水平漂移量
        let randomFny = getRandom('fny'); // 垂直偏移量
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
    var snowFlow = function () {
        // 清除原先的视图
        cxt.clearRect(0, 0, canvas.width, canvas.height);
        snowList.forEach((item) => {
            item.update();
            item.render(cxt)
        })
        requestAnimationFrame(snowFlow);
    }
    snowFlow();
 }

