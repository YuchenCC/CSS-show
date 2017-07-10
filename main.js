let $frame = $('#drawFrame')
let canvasWidth = $frame.width()
let canvasHeight = $frame.height()
let coordinate = null
let listen = [
    {
        el: 'canvas',
        event: 'touchstart',
        fn: handleStart
    },
    {
        el: 'canvas',
        event: 'touchmove',
        fn: handleMove
    },
    {
        el: 'clear',
        event: 'click',
        fn: initFrame
    }
];
function initChoice($canvas){
    setInterval(function () {
        clock()
    }, 1000)
    let $clock = $('#clock').hide()
    let $captain = $('#captain').hide()
    let $taiji = $('#taiji').hide()
    let $doraemon = $('#doraemon').hide()
    $('#choice>ul').on('click','li',function(e){
        $e = $(e.currentTarget)
        let choice = $e.attr('data-role')
        console.log(choice)
        switch (choice){
            case 'clockshow' : 
                $clock.show()            
                $captain.hide()
                $taiji.hide()
                $doraemon.hide()
                $canvas.hide()
                break
            case 'captain' :
                $clock.hide()
                $captain.show()
                $taiji.hide()
                $doraemon.hide()
                $canvas.hide()
                break
            case 'taiji' :
                $clock.hide()
                $captain.hide()
                $taiji.show()
                $doraemon.hide()
                $canvas.hide()
                break
            case 'doraemon' :
                $clock.hide()
                $captain.hide()
                $taiji.hide()
                $doraemon.show()
                $canvas.hide()
                break
            default: 
                $clock.hide()
                $captain.hide()
                $taiji.hide()
                $doraemon.hide()
                $canvas.show() 
        }
    })  
}

+function init(){
    initFrame()
    initCaptain(canvasWidth)
    initTaiji(canvasWidth)
    initDoraemon(canvasWidth)
}()
function initCaptain(width){
    $captain = $('#captain>svg')
    scale = width/600
    //console.log(scale)
    $captain.css('transform',`scale(${scale})`)
}
function initTaiji(width){
    $taiji = $('#taiji>svg')
    scale = width/300
    console.log(scale)
    $taiji.css('transform',`scale(${scale})`)
}
function initDoraemon(width){
    $doraemon = $('#doraemon>.wrapper')
    scale = width/600
    console.log(scale)
    $doraemon.css('transform',`scale(${scale})`)
}
function initFrame(){
    if($('#canvas')){
        $('#canvas').remove()
        console.log('click')
    }
    coordinate = []
    let $canvas = initialCanvas(canvasWidth,canvasHeight)
    initChoice($canvas)
}



function initialCanvas(width,height){
    let $canvas = $(`<canvas id='canvas' width="${width}" height="${height}"></canvas>`)
    .prependTo($frame)
    let canvas = $canvas[0]
    console.log('canvas')
    listenEvent(listen)

    return $canvas
}


function listenEvent(listenList){

    listenList.map((object)=>{
        let {el,event,fn} = object
        let $el = $(`#${el}`)
        //console.log(fn)
        $el.on(event,fn)
    })
}

function handleStart(e){
    e.preventDefault()
    figure(e)
}

function figure(e){
   // console.log(e.originalEvent)
    let {clientX,clientY} = e.originalEvent.touches[0]
    let rect = canvas.getBoundingClientRect()
    let pageX = clientX - rect.left
    let pageY = clientY - rect.top
    let temp = [pageX,pageY]
    console.log(coordinate)
    coordinate.push(temp)
    
    return {
            pageX,
            pageY
            }
}


function handleMove(e){
  e.preventDefault()
  let tool = getTool()
  if (tool === 'eraser'){
    let {pageX, pageY} = figure(e)
    console.log('use eraser')
    eraser(pageX,pageY,20,20)
  }
  else if(tool === 'pen'){
    let pre = coordinate[coordinate.length-1]
    let x = pre[0]
    let y = pre[1]  
    let {pageX, pageY} = figure(e)
    console.log('use pen')
    draw(pageX,pageY,x,y)
  }
}

function draw(pageX,pageY,x,y){
  let canvas = $('#canvas')[0]
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d')
  }
  ctx.beginPath() // 开始路径绘制
  ctx.moveTo(x,y) // 设置路径起点
  ctx.lineTo(pageX,pageY) 
  ctx.lineWidth = 1.0 // 设置线宽
  ctx.lineCap = "round" //设置端点样式:butt(默认),round,square
  ctx.lineJoin = "round" //设置连接样式:miter(默认),bevel,round
  ctx.strokeStyle = 'blue' // 设置线的颜色
  ctx.stroke() // 进行线的着色，这时整条线才变得可见
  console.log('drawing')
}

function eraser(x,y,width,height) {  
  let canvas = $('#canvas')[0]
  if (canvas.getContext) {
    var ctx = canvas.getContext('2d')
  } 
  ctx.clearRect(x - width / 2, y - height / 2, width, height)
}
function getTool () {
    return $('[name=tool]:checked').val()
}

function clock() {
    var date = new Date()
    //console.log(date)
    var hours = date.getHours()
    var minutes = date.getMinutes()
    var seconds = date.getSeconds()

    if (hours > 12) {
        hours -= 12
    }

    var secondDeg = seconds / 60 * 360
    var minuteDeg = (minutes * 60 + seconds) / 3600 * 360
    var hourDeg = (hours * 3600 + minutes * 60 + seconds) / (12 * 3600) * 360

    //console.log(secondDeg)
    //console.log(minuteDeg)
    //console.log(hourDeg)

    document.querySelector('.secondHand').style.transform = `rotate(${-90 + secondDeg}deg)`
    document.querySelector('.hourHand').style.transform = `rotate(${-90 + hourDeg}deg)`
    document.querySelector('.minuteHand').style.transform = `rotate(${-90 + minuteDeg}deg)`
}



