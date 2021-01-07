/*
 * @Description: 创建3D视图
 * @Author: qingyang
 * @Date: 2021-01-06 15:44:31
 * @LastEditors: qingyang
 * @LastEditTime: 2021-01-06 17:57:38
 */

 export const createThree = () => {
    /**
     * 创建场景对象Scene
     */
    var scene = new THREE.Scene();
    /**
     * 创建网格模型
     */
    var geometry1 = new THREE.SphereGeometry(100, 25, 25); //创建一个球体几何对象
    var geometry = new THREE.BoxGeometry(50, 100, 100); //创建一个立方体几何对象Geometry
    var material = new THREE.MeshLambertMaterial({
      color: '#be1480',
      side:THREE.DoubleSide,
    //   wireframe:true
    }); //材质对象Material
    var material1 = new THREE.PointsMaterial({
        color: 'yellow',
        size: 1.0 //点对象像素尺寸
    });
    var mesh = new THREE.Mesh(geometry, material); //网格模型对象Mesh
    var mesh1 = new THREE.Mesh(geometry1, material); 
    var line = new THREE.Line(geometry1, material1); //线模型对象
    mesh.translateX(200);
    mesh1.translateZ(200);
    scene.add(mesh); //网格模型添加到场景中
    scene.add(mesh1);
    scene.add(line);
    // 辅助坐标系  参数250表示坐标系大小，可以根据场景大小去设置
    var axisHelper = new THREE.AxisHelper(500);
    scene.add(axisHelper);
    /**
     * 光源设置
     */
    //点光源
    var point = new THREE.PointLight('#fff');
    point.position.set(100, 100, 100); //点光源位置
    scene.add(point); //点光源添加到场景中
    //环境光
    var ambient = new THREE.AmbientLight(0x444444);
    scene.add(ambient);
    // console.log(scene)
    // console.log(scene.children)
    /**
     * 相机设置
     */
    var width = window.innerWidth; //窗口宽度
    var height = window.innerHeight; //窗口高度
    var k = width / height; //窗口宽高比
    var s = 200; //三维场景显示范围控制系数，系数越大，显示的范围越大
    //创建相机对象
    var camera = new THREE.OrthographicCamera(-s * k, s * k, s, -s, 1, 1000);
    camera.position.set(200, 50, 200); //设置相机位置
    camera.lookAt(scene.position); //设置相机方向(指向的场景对象)
    /**
     * 创建渲染器对象
     */
    var renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);//设置渲染区域尺寸
    renderer.setClearColor(0xb9d3ff, 1); //设置背景颜色
    let container = document.getElementById('three');
    container.appendChild(renderer.domElement); //body元素中插入canvas对象
    //执行渲染操作   指定场景、相机作为参数
    // renderer.render(scene, camera);
    let T0 = new Date();//上次时间
    function render() {
            let T1 = new Date();//本次时间
            let t = T1-T0;//时间差
            T0 = T1;//把本次时间赋值给上次时间
            requestAnimationFrame(render);
            renderer.render(scene,camera);//执行渲染操作
            mesh.rotateY(0.001*t);//旋转角速度0.001弧度每毫秒
        }
    render();
 }