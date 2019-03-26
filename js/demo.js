/**
 * demo.js
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2019, Codrops
 * http://www.codrops.com
 */
{
    const frame = document.querySelector('.frame');
    const frameDeco = frame.querySelector('.frame__deco');
    const contentTitle = document.querySelector('.content__title');
    const contentLocation = document.querySelector('.content__location');
    const contentDate = document.querySelector('.content__date');
    charming(contentTitle);
    contentTitle.style.opacity = 1;
    const titleLetters = [...contentTitle.querySelectorAll('span')];
    const contentDetailsCols = [...document.querySelectorAll('.content__item--details > .content__inner')];
    const enterCtrl = document.querySelector('.content__button');

    let animation = new explosion.default(
        'container', // id of DOM el
        {
            surface: '5E6262',
            inside: 'ef572d',
            background: '151616',
            onLoad: ()=>{
                document.body.classList.remove('loading');
            }
        },

    );

    let targetMouseX = 0, mouseX = 0, targetMouseY = 0, mouseY = 0, ta = 0, taY = 0;
    const sign = n => n === 0 ? 1 : n/Math.abs(n);    
    document.addEventListener('mousemove',(e) => {
        targetMouseX = 2*(e.clientX - animation.width/2)/animation.width;
        targetMouseY = 2*(e.clientY - animation.height/2)/animation.height
    });
    document.addEventListener('touchmove',(e) => {
        targetMouseX = ( e.touches[0].clientX / animation.width ) * 2 - 1;
        targetMouseY = ( e.touches[0].clientY / animation.height ) * 2 - 1;
    });

    const draw = () => {
        if ( animation ) {
            mouseX += (targetMouseX - mouseX)*0.05;
            mouseY += (targetMouseY - mouseY)*0.05;
            ta = Math.abs(mouseX);
            taY = Math.abs(mouseY);
            animation.scene.rotation.x = Math.PI/2 - taY*(2 - taY)*Math.PI * sign(mouseY);
            animation.scene.rotation.y = Math.PI/2 - ta*(2 - ta)*Math.PI * sign(mouseX);
            animation.scene.rotation.z = Math.PI/2 - ta*(2 - ta)*Math.PI * sign(mouseX);
        }
        window.requestAnimationFrame(draw);
    }
    draw();


    let isOpen = false;
    enterCtrl.addEventListener('click', () => {
        isOpen = true;

        new TimelineMax()
        .to(enterCtrl, 0.3, {
            opacity: 0,
            ease: Expo.easeOut,
            complete: () => TweenMax.set(enterCtrl, {'pointer-events' : 'none'})
        })
        .to(animation.camera.position, 0.5, {
            z: 10,
            ease: Expo.easeIn
        }, 0)
        .to(animation.settings, 4, {
            progress: 2,
            ease: Expo.easeOut
        }, 0.4)
        .to(frame, 1, {
            opacity: 1,
            startAt: {scale: 0.9},
            scale: 1,
            ease: Expo.easeOut
        }, 0.4)
        .to([contentDate, contentLocation], 1, {
            opacity: 1,
            startAt: {scale: 0},
            scale: 1,
            ease: Expo.easeOut
        }, 0.4)
        .staggerTo(titleLetters.sort(() => Math.round(Math.random())-0.5), 1, {
            opacity: 1,
            startAt: {scale: 0},
            scale: 1,
            ease: Expo.easeOut
        }, 0.04 , 0.4)
        .to(animation.settings, 1, {
            progress: 0,
            ease: Quart.easeInOut
        }, 4)
        .to(animation.camera.position, 1, {
            z: 7,
            ease: Quart.easeInOut
        }, 4)
        .staggerTo([contentDate, contentLocation], 1, {
            opacity: 0,
            scale: 0,
            ease: Expo.easeInOut
        }, 0.06, 4)
        .staggerTo(titleLetters, 1, {
            opacity: 0,
            scale: 0,
            ease: Expo.easeInOut
        }, 0.04 , 4)
        .staggerTo(contentDetailsCols, 0.8, {
            opacity: 1,
            startAt: {scale: 1.3},
            scale: 1,
            ease: Expo.easeOut
        }, 0.08 , 4.4)
        .call(function() {
            frameDeco.classList.add('frame__deco--hide');
        }, null, null, 4.4);
    });
    
    enterCtrl.addEventListener('mouseenter', () => {
        if ( isOpen ) return;
        new TimelineMax()
        .to(animation.camera.position, 1, {
            z: 5.5,
            ease: Expo.easeOut
        }, 0);
    });
    enterCtrl.addEventListener('mouseleave', () => {
        if ( isOpen ) return;
        new TimelineMax()
        .to(animation.camera.position, 1, {
            z: 7,
            ease: Expo.easeOut
        }, 0);
    });
}
