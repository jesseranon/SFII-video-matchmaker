const CHARACTERS = Array.from(document.querySelectorAll('.character-portrait'))
const CURSORS = Array.from(document.getElementsByClassName('cursor'))
const FLAGS = Array.from(document.getElementsByClassName('flag'))
const RESET = document.getElementById('return-click')
const VIDEO_CANVAS = document.getElementById('video-screen')
const IFRAME = document.getElementById('video-iframe')

let chooser
let player1
let player2

const CHARACTER_SPRITES = {
    ryu: {
        flag: {top: 39, left: 198, bgPos: "top right"},
        p1cursor: {top: 140, left: 128},
        p2cursor: {top: 144, left: 128},
        nameplate: {top: -37}
    },
    ken: {
        flag: {top: 25, left: 274, bgPos: "top right"},
        p1cursor: {top: 172, left: 128},
        p2cursor: {top: 176, left: 128},
        nameplate: {top: -86.5}
    },
    guile: {
        flag: {top: 59, left: 278, bgPos: "top right"},
        p1cursor: {top: 140, left: 224},
        p2cursor: {top: 144, left: 224},
        nameplate: {top: -52.5}
    },
    blanka: {
        flag: {top: 95, left: 262, bgPos: "top right"},
        p1cursor: {top: 140, left: 192},
        p2cursor: {top: 144, left: 192},
        nameplate: {top: -17}
    },
    ehonda: {
        flag: {top: 75, left: 182, bgPos: "top right"},
        p1cursor: {top: 140, left: 160},
        p2cursor: {top: 144, left: 160},
        nameplate: {top: -73.5}
    },
    chunli: {
        flag: {top: 35, left: 154, bgPos: "top right -4px"},
        p1cursor: {top: 172, left: 160},
        p2cursor: {top: 176, left: 160},
        nameplate: {top: -76.5}
    },
    zangief: {
        flag: {top: 35, left: 101, bgPos: "top left -101px"},
        p1cursor: {top: 172, left: 192},
        p2cursor: {top: 176, left: 192},
        nameplate: {top: -76.5}
    },
    dhalsim: {
        flag: {top: 71, left: 108, bgPos: "top left -108px"},
        p1cursor: {top: 172, left: 224},
        p2cursor: {top: 176, left: 224},
        nameplate: {top: -41}
    },
}

const MATCHUPS = {
    ryu: {
        ken: 'tzlNINm5sJM?start=3',
        guile: '0ma66BsZhKw?start=3',
        blanka: '6jdrwcwkw6k?start=3',
        ehonda: 'ierad5n70rc?start=3',
        chunli: 'cuvZQ7SuCfg?start=1',
        zangief: 'mk8N8P_q4GA?start=3',
        dhalsim: 'mjBHVD1vx6k?start=3'
    },
    ken: {
        ryu: 'wSX0OoUsBwE?start=4',
        guile: 'yHISgObIYJ8?start=4',
        blanka: 'SkOj2FNVHzQ?start=5',
        ehonda: 'adkxOcOxOdI?start=3',
        chunli: 'AhMUHb-gKqE?start=4',
        zangief: 'IBDCpND5RxQ?start=6',
        dhalsim: '5eIAn7jIK50?start=6'
    },
    guile: {
        ryu: 'vlXDlP9NaQQ?start=3',
        ken: 'Gm5Guh12shQ?start=3',
        blanka: 'bydLp-XxW2M?start=3',
        ehonda: '7VMiC7d4mp8?start=3',
        chunli: '0hvhgzuEBfc?start=3',
        zangief: '9qC2oHCdKsQ?start=3',
        dhalsim: '8CD8mPMd-nA?start=4'
    },
    blanka: {
        ryu: 'fLPidl-835o?start=5',
        ken: 'tw1iO8XO3E8?start=3',
        guile: 'g7nOP5DYOVo?start=6',
        ehonda: 'BcgSMig-Fi8?start=3',
        chunli: 'Fl3-ebybLJg?start=3',
        zangief: '7dwOJZtpdT4?start=3',
        dhalsim: 'Msc8VlTzwFg?start=3'
    },
    ehonda: {
        ryu: 'P4GwQh1HbBc?start=3',
        ken: '55mQRj8g7to?start=3',
        guile: 'IpFs5fOc22M?start=3',
        blanka: 'hqATyzuOteo?start=3',
        chunli: 'EeT1hA1vBX4?start=3',
        zangief: 'Cz6GR6TCBrM?start=3',
        dhalsim: 'vOl5uQuXlvM?start=4'
    },
    chunli: {
        ryu: '_ZFw-rJZHGU?start=3',
        ken: 'T2uIVas3EEE?start=3',
        guile: '0hvhgzuEBfc?start=3',
        blanka: 'J7skyFzkIV8?start=3',
        ehonda: 'WRu-l850WWY?start=3',
        zangief: 'Wp61AvTli-0?start=3',
        dhalsim: 'zN4jqXREf_Q?start=4'
    },
    zangief: {
        ryu: 'LmVl8Wzu258?start=3',
        ken: 'PLdtns-Yt7k?start=3',
        guile: '5ftiysnz0tk?start=3',
        blanka: '4-stoo9_0Jk?start=3',
        chunli: 'o8MJW5nMkMg?start=3',
        ehonda: '8h_Pm2gaBiY?start=3',
        dhalsim: 'CoeiaE63cdo?start=3'
    },
    dhalsim: {
        ryu: 'YuMxEhM729U?start=3',
        ken: '8EZFHWMWJ5U?start=3',
        guile: 'rB288z6QQLc?start=3',
        blanka: 'qgugs5Rql90?start=3',
        chunli: 'f0I7pJHFX0o?start=3',
        zangief: 'gVrssDEsPok?start=3',
        ehonda: 'Ry5aAXyVAb0?start=3'
    }
}

for (i = 0; i < CHARACTERS.length; i++) {
    CHARACTERS[i].addEventListener('mouseover', (e) => {
        // don't listen for mousovers if 2p is chosen
        if (!document.querySelector('.p2-cursor-locked')) {
            // set 1p or 2p according to chooser
            if (!document.querySelector('.p1-cursor-locked')) {
                chooser = `p1`
            } else {
                chooser = `p2`
            }
            // play sound
            overCharacterSound()
            let character = e.target.id
            // set player for the case of a click
            if (chooser === 'p1') {
                player1 = character
            } else {
                player2 = character
            }
            let charDiv = document.getElementById(`${chooser}-character`)
            let flagSprite = CHARACTER_SPRITES[character].flag
            let flagDiv = document.getElementById(`${chooser}-flag`)
            let cursorDiv = document.getElementById(`${chooser}-cursor`)
            let cursorPos = CHARACTER_SPRITES[character][`${chooser}cursor`]
            // style player portrait
            charDiv.style.background = `url("img/png/${character}.png") bottom left no-repeat`
            // style flag
            flagDiv.style = `top: ${flagSprite.top}px; left: ${flagSprite.left}px; background: transparent url("img/png/${character}.png") ${flagSprite.bgPos} no-repeat;` 
            // set cursor
            cursorDiv.style = `top: ${cursorPos.top}px; left: ${cursorPos.left}px; opacity: 1;`
            // set 2p nameplate
            if (chooser === 'p2') {
                let nameplatePos = CHARACTER_SPRITES[character].nameplate
                let nameplate = document.getElementById('p2-character-nameplate')
                nameplate.style = `background: transparent url("img/png/${character}.png") 0 ${nameplatePos.top}px no-repeat;`
            }
        }
    })
}

for (i = 0; i < CURSORS.length; i++) {
    CURSORS[i].addEventListener('click', (e) => {
        chooseCharacterSound()
        let cursorDiv = document.getElementById(`${chooser}-cursor`)
        cursorDiv.classList.add(`${chooser}-cursor-locked`)
        if (chooser === 'p2') {
            console.log(`${player1} vs ${player2}`)
            showVsScreen()
        }
        // console.log(cursorDiv)
        // console.log(e)
    })
}

// audio

function overCharacterSound() {
    new Audio("http://soundfxcenter.com/video-games/street-fighter/8d82b5_Street_Fighter_Selecting_Sound_Effect.mp3").play()
}

function chooseCharacterSound() {
    new Audio("http://soundfxcenter.com/video-games/street-fighter/8d82b5_Street_Fighter_Choose_Sound_Effect.mp3").play()
}

function resetSound() {
    new Audio("http://soundfxcenter.com/video-games/street-fighter/8d82b5_Street_Fighter_Coin_Sound_Effect.mp3").play()
}

// play matchup

function showVsScreen() {
    // new Audio("http://soundfxcenter.com/video-games/street-fighter/8d82b5_Street_Fighter_Start_Music_Sound_Effect.mp3").play()
    IFRAME.src = `https://www.youtube.com/embed/${MATCHUPS[player1][player2]}&autoplay=1`
    VIDEO_CANVAS.style.zIndex = 2;
}

// RESET

RESET.addEventListener('click', reset)

function reset(click) {
    click.preventDefault()
    // play sound
    resetSound()
    let lockedPlayers = [document.getElementsByClassName('p1-cursor-locked'),document.getElementsByClassName('p2-cursor-locked')]
    // reset cursor locks
    for (i in lockedPlayers) {
        lockedPlayers[i][0].classList.remove(`p${parseInt(i)+1}-cursor-locked`)
    }
    // reset chooser
    chooser = 'p1'
    // reset cursor
    const cursors = Array.from(CURSORS)
    for (c in cursors) {
        // console.log(CURSORS[c])
        cursors[c].style.top = null
        cursors[c].style.left = null
        cursors[c].style.opacity = 0
    }
    // clear flags
    const flags = Array.from(FLAGS)
    for (f in flags) {
        flags[f].style.top = null
        flags[f].style.left = null
        flags[f].style.background = null
    }
    // clear character portraits & 2p nameplate
    const charProfiles = Array.from(document.getElementsByClassName('character'))
    for (p in charProfiles) {
        charProfiles[p].style.background = null
    }
    // bring character select screen back to foreground
    VIDEO_CANVAS.style.zIndex = 0;
    //remove source from iframe
    IFRAME.src = ''
}