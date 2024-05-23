
import { toast } from "react-toastify";
import { GameModes } from "./BaseData";


export function newUData() {
    let data = []
    for (let i = 0; i < GameModes.length; i++) {
        const d = {};
        d.lvlId = GameModes[i].id
        d.score = 0
        d.best = 0
        d.unlock = (GameModes[i].id == 0) ? true : false
        data.push(d)
    }
    return data;
}

export function shuffle(array) {
    let currentIndex = array.length, randomIndex;
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
        // Pick a remaining element.
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        // And swap it with the current element.
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

export function selectColor(colors, cl = 0, colorIndex = 0) {
    let chosen_color = colors[Math.floor(Math.random() * colors.length)]
    return (cl == 1) ? colors[colorIndex] : chosen_color
}

export function Run(cl1, cl2, currentLevel, GameModes, userData) {
    let userData_run = JSON.parse(JSON.stringify(userData));
    const rate = GameModes[currentLevel].scoreRate
    const currentBest = userData_run[currentLevel].best
    const score = userData_run[currentLevel].score
    const target = GameModes[currentLevel].target
    const penalty = GameModes[currentLevel].penalty
    var log = []
    var best_run = currentBest
    var newScore = 0

    if (cl1 == cl2) {
        newScore = score + rate
        if ((newScore) > currentBest) {
            userData_run[currentLevel].best = newScore
            best_run = newScore
            if (newScore >= target) {
                if (currentLevel == GameModes.length - 1) {
                    if (userData_run[currentLevel].score >= target) {
                        toaster("!!!!! Impossible !!!!!!");
                    } else {
                        toaster("Wow you are incredible!!!");
                        toaster("You are a true LEGEND!!!");
                    }
                } else if (!userData_run[currentLevel + 1].unlock) {
                    userData_run[currentLevel + 1].unlock = true
                    let msg = "You've just unlocked level " + GameModes[currentLevel + 1].name + " !!!"
                    toaster(msg);
                }
            }
        }
        userData_run[currentLevel].score = newScore

        log = logAttempt(currentLevel, cl1, cl2, rate, best_run)
    } else {
        if (score == 0) {
            log = logAttempt(currentLevel, cl1, cl2)
        } else {
            userData_run[currentLevel].score = Math.max(0, score - penalty)
            log = logAttempt(currentLevel, cl1, cl2, penalty)
        }
    }
    return { userData_run, log, best_run }
}

export function logAttempt(lvl, cl1, cl2, mod = 0, newbest = false) {
    return [
        { cl1, cl2, lvl, mod },
        (newbest != 0) && { lvl, newbest },
    ]
}

export function toaster(msg) {
    toast(msg, {
        position: "top-left",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
    });
}

export const getLocalStorage = (storageKey, fallbackState, sec = true) => {
    const i = localStorage.getItem(storageKey)
    let val = fallbackState
    if (i == null) return fallbackState
    try {
        // decode the base64-encoded string
        val = sec ? JSON.parse(window.atob(i)) : JSON.parse(i)
    } catch (e) {
        val = fallbackState
    }
    return val;
};

export const setLocalStorage = (storageKey, value, sec = true) => {
    // optionaly encode the string using base64 (incredibly weak security)
    let val = sec ? (window.btoa(JSON.stringify(value))) : (JSON.stringify(value))
    localStorage.setItem(storageKey, val);
}