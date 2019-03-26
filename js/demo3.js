/**
 * demo3.js
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
            inside: 'e0e0e0',
            background: '151616',
            onLoad: ()=>{
                document.body.classList.remove('loading');
            }
        }
    );

    animation.camera.position.y = 1.3;
	animation.camera.position.z = 3;

    let targetMouseX = 0, mouseX = 0, ta = 0;
    const sign = n => n === 0 ? 1 : n/Math.abs(n);    
    document.addEventListener('mousemove',(e) => {
        targetMouseX = 2*(e.clientX - animation.width/2)/animation.width;
    });
    document.addEventListener('touchmove',(e) => {
        targetMouseX = ( e.touches[0].clientX / animation.width ) * 2 - 1;
    });

    const draw = () => {
        if ( animation ) {
            mouseX += (targetMouseX - mouseX)*0.05;
            ta = Math.abs(mouseX);
            animation.scene.rotation.y = Math.PI/2 - ta*(2 - ta)*Math.PI * sign(mouseX);
			animation.camera.position.z = 3 + 3*ta;
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
        .to(animation.camera.position, 1, {
            y: 2,
            ease: Expo.easeOut
        }, 0)
        .to(animation.settings, 5, {
            progress: .6,
            ease: Expo.easeOut
        }, 0.1)
        .to(frame, 1, {
            opacity: 1,
            startAt: {scale: 0.9},
            scale: 1,
            ease: Expo.easeOut
        }, 0.1)
        .to([contentDate, contentLocation], 1, {
            opacity: 1,
            startAt: {y: 150},
            y: 0,
            ease: Expo.easeOut
        }, 0.1)
        .staggerTo(titleLetters.sort(() => Math.round(Math.random())-0.5), 1, {
            opacity: 1,
            startAt: {y: 150, scaleY: 10},
            y: 0,
            scaleY: 1,
            ease: Expo.easeOut
        }, 0.04 , 0.1)
        .to(animation.settings, 1, {
            progress: 0,
            ease: Quart.easeInOut
        }, 4)
        .to(animation.camera.position, 1, {
            y: 1.3,
            ease: Quart.easeInOut
        }, 4)
        .staggerTo([contentDate, contentLocation], 1, {
            opacity: 0,
            y: -100,
            ease: Expo.easeInOut
        }, 0.06, 4)
        .staggerTo(titleLetters, 1, {
            opacity: 0,
            y: -250,
            startAt: {transformOrigin: '50% 100%'},
            scaleY: 10,
            ease: Expo.easeInOut
        }, 0.04 , 3.7)
        .staggerTo(contentDetailsCols, 1, {
            opacity: 1,
            startAt: {y: 150},
            y: 0,
            ease: Expo.easeOut
        }, 0.08 , 4.3)
        .call(function() {
            frameDeco.classList.add('frame__deco--hide');
        }, null, null, 4.4);
    });

    enterCtrl.addEventListener('mouseenter', () => {
        if ( isOpen ) return;
        new TimelineMax()
        .to(animation.camera.position, 2, {
            y: 1,
            ease: Expo.easeOut
        }, 0);
    });

    enterCtrl.addEventListener('mouseleave', () => {
        if ( isOpen ) return;
        new TimelineMax()
        .to(animation.camera.position, 1, {
            y: 1.3,
            ease: Expo.easeOut
        }, 0);
    });
}