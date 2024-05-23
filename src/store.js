import { atom, selector } from "recoil"
import { newUData, getLocalStorage } from "./Utils";

export const attemptsLogState = atom({
    key: 'attemptsLog',
    default: getLocalStorage('alog',[]),
})
export const userDataState = atom({
    key: 'userData',
    default: getLocalStorage('udat', newUData()),
})

export const currentLevelState = atom({
    key: 'currentLevel',
    default: 0,
})


export const modalState = atom({
    key: 'modalState', // unique ID (with respect to other atoms/selectors)
    default: false, // default value (aka initial value)
});

