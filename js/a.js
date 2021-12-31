let box = document.querySelector('.box'); //盒子
let boxP = document.querySelector('.box p');

let TX = document.querySelector('.TX input');
let TY = document.querySelector('.TY input');
let TZ = document.querySelector('.TZ input');
let RX = document.querySelector('.RX input');
let RY = document.querySelector('.RY input');
let RZ = document.querySelector('.RZ input');
let SX = document.querySelector('.SX input');
let SkX = document.querySelector('.SkX input');
let SkY = document.querySelector('.SkY input');
let inSpeed = document.querySelector('.inSpeed input');
let Time = document.querySelector('.Time input');
let arr = [TX, TY, TZ, RX, RY, RZ, SX, SkX, SkY, Time];
let obj = {
    TX: 0,
    TY: 0,
    TZ: 0,
    RX: 0,
    RY: 0,
    RZ: 0,
    SX: 0,
    SkX: 0,
    SkY: 0,
    opa: 0,
    time: 0.75,
    speedFn: 'linear',
    leave: '100%',
};
let allInput = Array.from(document.querySelectorAll('input'));

TX.addEventListener('blur', function () {
    obj.TX = this.value ? this.value : 0;
});
TY.addEventListener('blur', function () {
    obj.TY = this.value ? this.value : 0;
});
TZ.addEventListener('blur', function () {
    obj.TZ = this.value ? this.value : 0;
});
RX.addEventListener('blur', function () {
    obj.RX = this.value ? this.value : 0;
});
RY.addEventListener('blur', function () {
    obj.RY = this.value ? this.value : 0;
});
RZ.addEventListener('blur', function () {
    obj.RZ = this.value ? this.value : 0;
});
SX.addEventListener('blur', function () {
    obj.SX = this.value ? this.value : 1;
});
SkX.addEventListener('blur', function () {
    obj.SkX = this.value ? this.value : 0;
});
SkY.addEventListener('blur', function () {
    obj.SkY = this.value ? this.value : 0;
});

allInput.forEach(a => {
    if (a.type == 'button') {
        a.addEventListener('click', function () {
            copy2.innerHTML = '';
            copy2.style.height = '0';
            copy2.style.padding = '0';
            obj.speedFn = this.name ? this.name : 'linear';
            wait();
        });
    }
});
inSpeed.addEventListener('blur', function () {
    if (this.value) {
        obj.speedFn = this.value;
        fill();
        wait();
    } else {
        obj.speedFn = 'linear';
        fill();
        wait();
    }
});

Time.addEventListener('blur', function () {
    obj.time = this.value ? this.value : 1;
    wait();
});

let opa = document.querySelector('.opacity input');
let opacity = document.querySelector('.opacity');
opa.addEventListener('change', function () {
    opacity.style.transitionDuration = '.5s';
    opacity.style.opacity = '0';
    setTimeout(() => {
        opacity.style.opacity = '1';
        setTimeout(() => {
            opacity.style.transitionDuration = '';
        }, 500);
    }, 500);
    if (this.checked) {
        obj.opa = 0;
        fill();
    } else {
        obj.opa = 1;
        fill();
    }
});

function wait() {
    box.style.transitionDuration = obj.time + 's';
    box.style.transitionTimingFunction = obj.speedFn;
}

function noWait() {
    box.style.transitionDuration = '0s';
    box.style.transitionTimingFunction = 'linear';
}

let fn = function () {
    noWait();
    box.style.transform = setTrans();
    box.style.opacity = obj.opa;
    setTimeout(() => {
        wait();
        box.style.transform = '';
        box.style.opacity = 1;
    }, 100);
};
let go = fn;
let leaveStop = '';
let inOut = document.querySelector('.go input');
let Out = document.querySelector('.go');
let goWhat = document.querySelectorAll('.goWhat');
inOut.addEventListener('change', function () {
    Out.style.transitionDuration = '.5s';
    Out.style.transform = 'scale(0)';
    setTimeout(() => {
        Out.style.transform = 'scale(1)';
        setTimeout(() => {
            Out.style.transitionDuration = '';
        }, 500);
    }, 500);
    if (this.checked) {
        goWhat[0].innerHTML = '去往何处';
        goWhat[1].innerHTML = '去往角度';
        goWhat[2].innerHTML = '去往倍数';
        goWhat[3].innerHTML = '去往倾斜度';
        obj.leave = '0%';
        leaveStop = ' both';
        fill();
        go = function () {
            wait();
            box.style.transform = setTrans();
            box.style.opacity = obj.opa;
            setTimeout(() => {
                noWait();
                box.style.transform = '';
                box.style.opacity = 1;
            }, obj.time * 1500);
        };
    } else {
        goWhat[0].innerHTML = '来自何处';
        goWhat[1].innerHTML = '来前角度';
        goWhat[2].innerHTML = '来前倍数';
        goWhat[3].innerHTML = '来前倾斜度';
        obj.leave = '100%';
        leaveStop = '';
        noWait();
        go = fn;
        fill();
    }
});

let text = document.querySelector('.text input');
let Text = document.querySelector('.text');
text.addEventListener('change', function () {
    Text.style.transitionDuration = '.5s';
    Text.style.backgroundColor = '#fff';
    setTimeout(() => {
        Text.style.backgroundColor = 'transparent';
        setTimeout(() => {
            Text.style.transitionDuration = '';
        }, 500);
    }, 500);
    if (this.checked) {
        box.style.border = 'none';
        box.style.width = 'auto';
        box.style.backgroundColor = 'rgba(0, 0, 0, 0)';
        boxP.style.color = '#fff';
        boxP.style.fontSize = '0.233rem';
        boxP.innerHTML = 'Welcome to China!<br>点我执行';
    } else {
        box.style.border = '';
        box.style.width = '';
        boxP.style.color = '';
        boxP.innerHTML = '点我执行';
        boxP.style.fontSize = '';
    }
});

box.addEventListener('mouseup', function () {
    let num = 0;
    arr.forEach(a => {
        a.value ? num++ : '';
    });
    num == 0 ? alert('您还未输入任何参数，请输入后再点击') : go();
});

let copy1 = document.querySelectorAll('textarea')[0];
let copy2 = document.querySelectorAll('textarea')[1];

copy1.addEventListener('blur', function () {
    this.innerHTML = '';
    this.style.height = '0';
    this.style.padding = '0';
});
copy1.addEventListener('focus', function () {
    this.select();
});
copy2.addEventListener('blur', function () {
    this.innerHTML = '';
    this.style.height = '0';
    this.style.padding = '0';
});
copy2.addEventListener('focus', function () {
    this.select();
});
let translateX,
    translateY,
    translateZ,
    rotateX,
    rotateY,
    rotateZ,
    scale,
    skewX,
    skewY;

translateX = obj.TX ? 'translateX(' + obj.TX + 'px)' : '';
translateY = obj.TY ? 'translateY(' + obj.TY + 'px)' : '';
translateZ = obj.TZ ? 'translateZ(' + obj.TZ + 'px)' : '';
rotateX = obj.RX ? 'rotateX(' + obj.RX + 'deg)' : '';
rotateY = obj.RY ? 'rotateY(' + obj.RY + 'deg)' : '';
rotateZ = obj.RZ ? 'rotateZ(' + obj.RZ + 'deg)' : '';
scale = obj.SX ? 'scale(' + obj.SX + ')' : '';
skewX = obj.SkX ? 'skewX(' + obj.SkX + ')' : '';
skewY = obj.SkY ? 'skewY(' + obj.SkY + ')' : '';

allInput.forEach(a => {
    if (a.type == 'text') {
        a.addEventListener('blur', function () {
            arr.forEach(a => {
                a.value != '' ? fill() : '';
            });
        });
    }
    if (a.type == 'button') {
        a.addEventListener('click', function () {
            fill();
        });
    }
});

function setTrans() {
    return (
        translateX +
        translateY +
        translateZ +
        rotateX +
        rotateY +
        rotateZ +
        scale +
        skewX +
        skewY
    );
}
function fill() {
    translateX = obj.TX ? 'translateX(' + obj.TX + 'px)' : '';
    translateY = obj.TY ? 'translateY(' + obj.TY + 'px)' : '';
    translateZ = obj.TZ ? 'translateZ(' + obj.TZ + 'px)' : '';
    rotateX = obj.RX ? 'rotateX(' + obj.RX + 'deg)' : '';
    rotateY = obj.RY ? 'rotateY(' + obj.RY + 'deg)' : '';
    rotateZ = obj.RZ ? 'rotateZ(' + obj.RZ + 'deg)' : '';
    scale = obj.SX ? 'scale(' + obj.SX + ')' : '';
    skewX = obj.SkX ? 'skewX(' + obj.SkX + 'deg)' : '';
    skewY = obj.SkY ? 'skewY(' + obj.SkY + 'deg)' : '';

    copy1.style.height = '1.057rem';
    copy2.style.height = '1.057rem';
    copy1.style.padding = '.029rem';
    copy2.style.padding = '.029rem';
    copy1.innerHTML =
        '@keyframes lyb {' +
        obj.leave +
        ' {transform:' +
        setTrans() +
        ';opacity:' +
        obj.opa +
        ';}}';
    copy2.innerHTML =
        'animation: lyb ' + obj.time + 's ' + obj.speedFn + leaveStop + ';';
}
