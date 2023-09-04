let mainColor = localStorage.getItem('color-option')
if (mainColor !== null) {
    document.documentElement.style.setProperty('--main--color', mainColor)
    const colorlist = document.querySelectorAll('.colors-list li')
    colorlist.forEach(element => {
        element.classList.remove('active');
        if (element.dataset.color === mainColor) {
            element.classList.add('active');
        };
    });
};

let backgroundOption;
const bckYes = document.querySelector('.setting-options .randombackground .yes')
const bckNo = document.querySelector('.setting-options .randombackground .no')
if (localStorage.getItem('background-option') == "false") {
    backgroundOption = false;
    bckYes.classList.remove('active')
    bckNo.classList.add('active')
} else {
    backgroundOption = true;
    bckYes.classList.add('active')
    bckNo.classList.remove('active')
}
const bulletYes = document.querySelector('.option-box .show-bullets .yes')
const bulletNo = document.querySelector('.option-box .show-bullets .no')
const bullets = document.querySelectorAll('.nav-bullets .bullet')
const links = document.querySelectorAll('.landing .header-area a')
if (localStorage.getItem('hideen') == 'true') {

    bullets.forEach(bullet => {
        bullet.classList.add('hideen')
    });
    bulletYes.classList.remove('active');
    bulletNo.classList.add('active');
} else {
    bullets.forEach(bullet => {
        bullet.classList.add('show')
        localStorage.setItem('hideen', false)
    })
    bulletNo.classList.remove('active')
    bulletYes.classList.add('active')
}

let backgroundInterval;
let randombackground = () => {
    backgroundInterval = setInterval(() => {
        const landing = document.querySelector('.landing');
        let imgsArray = ['01.jpg', '02.jpg', '03.webp', '04.webp', '05.jpg'];
        let randomImageNumber = () => {
            return Math.floor(Math.random() * 5);
        }
        landing.style.backgroundImage = `url("../images/${imgsArray[randomImageNumber()]}")`
        landing.style.transition = '0.3s'
    }, 1000)
}

if (backgroundOption == true) {
    randombackground();
}

bckYes.addEventListener("click", () => {
    clearInterval(backgroundInterval)
    bckYes.classList.add('active')
    bckNo.classList.remove('active')
    randombackground()
    localStorage.setItem('background-option', true)
})
bckNo.addEventListener("click", () => {
    clearInterval(backgroundInterval)
    bckYes.classList.remove('active')
    bckNo.classList.add('active')
    localStorage.setItem('background-option', false)
})

// ===================================================
const settings = document.querySelector(".setting-box")
const settingBox = document.querySelector(".setting-box .fa-gear")
settingBox.addEventListener("click", () => {
    settingBox.classList.toggle("fa-spin")
    settings.classList.toggle("open")
})
// ===================================================
const settingList = document.querySelectorAll('.setting-box .colors-list li')
for (let li of settingList) {
    li.addEventListener("click", (e) => {
        document.documentElement.style.setProperty('--main--color', e.target.dataset.color)
        localStorage.setItem('color-option', e.target.dataset.color)
        removeActive(e)
    })
}
// ===================================================
const ourSkills = document.querySelector(".our-skills")
let skillsActive = () => {

    let skillOffsetTop = ourSkills.offsetTop;
    let skillOuterHeight = ourSkills.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = scrollY;
    if ((windowScrollTop - 100) > (skillOffsetTop + skillOuterHeight - windowHeight * 2)) {
        let skills = document.querySelectorAll('.our-skills .skill-card .skill-progress span')
        skills.forEach(skill => {
            skill.style.width = skill.dataset.progress
        })
    } else {
        let skills = document.querySelectorAll('.our-skills .skill-card .skill-progress span')
        skills.forEach(skill => {
            skill.style.width = '0%'
        })
    }
}

let ourGallery = document.querySelectorAll('.our-gally .images-box img');
ourGallery.forEach(img => {
    img.addEventListener("click", (e) => {
        let overlay = document.createElement('div');
        overlay.className = 'popup-overlay';
        document.body.appendChild(overlay)
        let popupBox = document.createElement('div');
        popupBox.className = "popup-box"
        if (img.alt !== null) {
            let popupText = document.createElement('h3')
            popupText.innerHTML = img.alt;
            popupText.className = 'popup-text'
            popupBox.appendChild(popupText);
        }
        let popupSpan = document.createElement('span')
        popupSpan.innerHTML = 'X'
        popupSpan.className = 'popup-span'
        popupBox.appendChild(popupSpan)
        let image = document.createElement('img');
        image.className = 'popup-image'
        image.src = img.src;
        document.body.appendChild(popupBox);
        popupBox.appendChild(image);

    });
});
document.addEventListener('click', (e) => {
    if (e.target.className == 'popup-span') {
        document.querySelector('.popup-box').remove()
        document.querySelector('.popup-overlay').remove()
    }

})
// ===============================
function scrollTo(elements) {
    elements.forEach(element => {
        element.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}
scrollTo(bullets)
scrollTo(links)
function removeActive(e) {
    e.target.parentElement.querySelectorAll('.active').forEach(element => {
        element.classList.remove('active')
    });
    e.target.classList.add('active')
}


let displayBullets = document.querySelectorAll('.option-box .show-bullets')
displayBullets.forEach(ele => {
    ele.addEventListener("click", (e) => {
        removeActive(e)
        if (e.target.dataset.display == 'hide') {
            bullets.forEach(bullet => {
                bullet.classList.add('hideen')
                bullet.classList.remove('show')
                localStorage.setItem('hideen', true)
            })
        } else {
            bullets.forEach(bullet => {
                bullet.classList.remove('hideen')
                bullet.classList.add('show')
                localStorage.setItem('hideen', false)
            })
        }
    })
})
document.querySelector('.setting-options .reset span').addEventListener("click", () => {
    localStorage.clear()
    window.location.reload()
})

function getWidth() {
    return Math.max(
        document.body.scrollWidth,
        document.documentElement.scrollWidth,
        document.body.offsetWidth,
        document.documentElement.offsetWidth,
        document.documentElement.clientWidth
    );
}

const ul = document.querySelector('.header-area ul');
const menu = document.querySelector(".toggle-menu .menu");

menu.addEventListener("click", () => {
    ul.classList.toggle('open');
    menu.classList.toggle('no-before')
});
window.onscroll = () => {
    if (ul.classList.contains('open')) {
        menu.classList.add('no-before')
    } else {
        menu.classList.remove('no-before')
    }
}
window.addEventListener("resize", () => {
    if (getWidth() > 991) {
        ul.classList.remove('open');
    };
});
document.addEventListener("click", (e) => {
    if (e.target !== settings) {
        // settings.classList.remove("open")
        console.log('this is the ')
    } else {
        console.log('this isnt the ')

    }
})
window.onscroll = () => {
    skillsActive()
}
