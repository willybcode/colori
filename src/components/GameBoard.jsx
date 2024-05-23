import { RadioGroup } from '@headlessui/react'
import React, { useEffect, useState } from 'react'
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { attemptsLogState, currentLevelState, modalState, userDataState } from '../store';
import Logger from './Logger';
import { Run, selectColor, setLocalStorage, shuffle, toaster } from '../Utils';
import { Colors, GameModes } from '../BaseData';
import useKeypress from 'react-use-keypress';


function SampleBoard() {

    const [isOpen, setIsOpen] = useRecoilState(modalState);
    const [userData, setUserData] = useRecoilState(userDataState);
    const [attemptsLog, setAttempsLog] = useRecoilState(attemptsLogState);
    const [currentLevel, setCurrentLevel] = useRecoilState(currentLevelState);
    const [score, setScore] = useState(0);
    const [best, setBest] = useState(0);
    const [color1, setColor1] = useState(selectColor(Colors));
    const [color2, setColor2] = useState('');
    const [isIntervalRunning, setIsIntervalRunning] = useState(false);
    const [intervalId, setIntervalId] = useState();


    const startGame = () => {
        if (!isIntervalRunning) {
            let color_iter = 0
            let colen = Colors.length
            var shuffledColors = [...Colors].sort(() => Math.random() - 0.5);
            const newIntervalId = setInterval(() => {
                if (color_iter >= colen) {
                    shuffle(shuffledColors)
                    color_iter = 0
                }
                setColor1(selectColor(shuffledColors, 1, color_iter));
                color_iter++;
            }, GameModes[currentLevel].timing);
            setIntervalId(newIntervalId);
            setIsIntervalRunning(true);
        }
    }
    const stopGame = () => {
        if (isIntervalRunning) {
            clearInterval(intervalId);
            setIsIntervalRunning(false);
        }
    }

    const [throttleTime, setThrottleTime] = useState(new Date());

    const throttlePlay = () => {
        if (isIntervalRunning) {
            if (new Date() - throttleTime > 700) {
                const ud = [...userData]
                const { userData_run, log, best_run } = Run(color1, color2, currentLevel, GameModes, ud)

                setUserData(userData_run)
                setAttempsLog([...attemptsLog, ...log])
                setBest(best_run)
                setScore(userData_run[currentLevel].score)

                setThrottleTime(new Date());
                setLocalStorage("udat", userData_run)
                setLocalStorage("alog", [...attemptsLog, ...log])

            }

        }
    }


    function changeLevel(target) {
        if (userData[target].unlock) {
            setCurrentLevel(target)
        } else {
            let prevname = GameModes[target - 1].name
            let prevmin = GameModes[target - 1].target
            let msg = "Score " + prevmin + " points in *" + prevname + "* to unlock this level"
            toaster(msg)
        }

    }



    function openModal() {
        setIsOpen(true)
    }


    useKeypress(['r', 's', 'S', 'R', ' ', 'Spacebar', 'Enter'], (event) => {
        if (!isOpen) {
            if ((event.key === 's') || (event.key === 'S')) {
                startGame()
            } else if ((event.key === 'r') || (event.key === 'R')) {
                stopGame()
            } else {
                throttlePlay()
            }

        }
    });

    useEffect(() => {
        var col = selectColor(Colors)
        while (col == color2) {
            col = selectColor(Colors)
        }
        setColor2(col)
        setScore(userData[currentLevel].score)
        setBest(userData[currentLevel].best)

    }, [isIntervalRunning, attemptsLog, currentLevel])

    return (

        <div className="flex  lg:w-4/5 sm:mx-auto sm:mb-2  justify-center ">

            <div className="p-2  w-auto">
                <div className="bg-gray-800 rounded-2xl md:mx-auto   flex p-4 h-full items-center flex-col">
                    <div className='flex justify-between bg-500 px-2 w-full'>
                        <span className=" flex flex-col title-font  font-medium text-white">
                            <span>Score: {score}</span>
                            <span className=" text-yellow-500 text-xs">Best: {best}</span>
                            <span className=" text-slate-500 text-xs">Target: {GameModes[currentLevel].target}</span>
                        </span>
                        <Logger />
                    </div>

                    <span className=" flex justify-between w-full h-full px-2 md:px-16 mt-6 mb-2  items-center">
                        <span className={`${color1} rounded-full w-24 h-24 md:h-32 md:w-32 transition-colors duration-0`}></span>
                        <span className={` text-blue-500 font-bold text-md  mx-3`}>
                            {`<=>`}
                        </span>
                        <span className={`${color2} rounded  w-24 h-full md:h-32 md:w-32 transition-colors duration-500`}></span>
                    </span>
                    <div className='flex-col space-y-5 justify-center '>

                        <button className={` ${isIntervalRunning ? 'text-white bg-purple-500 hover:bg-purple-600 '
                            : 'cursor-not-allowed scale-50 bg-gray-500 text-slate-400 hover:bg-purple-400/40'} transition-all duration-1000 flex mx-auto mt-6  border-0 py-2 px-6 focus:outline-none  rounded-lg text-lg`}
                            onClick={throttlePlay}>Go</button>

                        <div className='flex space-x-1 mt-auto justify-center'>
                            <button className={`bg-green-700  hover:bg-green-800 animate-bounce mt-auto text-white uppercase w-fit border-0 py-1 items-center text-center px-2  focus:outline-none  rounded-xl text-sm first-letter ${isIntervalRunning ? 'hidden' : ''} `}
                                onClick={() => startGame()}>Start</button>

                            <button className={` mt-auto bg-red-700 hover:bg-red-800 text-white uppercase w-fit border-0 py-1 items-center text-center px-2  focus:outline-none  rounded-xl text-sm first-letter ${isIntervalRunning ? '' : 'hidden'} `}
                                onClick={() => stopGame()}> Stop</button>
                        </div>

                        <button className={`bg-gray-600 transition-all duration-700  text-white  w-fit border-0 py-px items-center text-center px-1  focus:outline-none  rounded-md text-sm first-letter ${!isIntervalRunning ? 'hover:bg-red-700' : 'opacity-50 scale-0'} `}
                            type="button" onClick={openModal} disabled={isIntervalRunning}> Clear</button>

                        <RadioGroup value={currentLevel} className={` cursor-pointer !mt-2 text-center w-fit p-0 flex transition-all duration-700 ${isIntervalRunning ? 'opacity-30 scale-90' : 'opacity-90'} font-semibold rounded disabled:cursor-not-allowed  `} disabled={isIntervalRunning}>
                            {GameModes.map((gm) =>
                                <RadioGroup.Option key={gm.id} value={gm.id} disabled={!userData[gm.id].unlock} >
                                    {
                                        ({ checked }) => (
                                            <span onClick={() => (!isIntervalRunning && changeLevel(gm.id))}
                                                className={` px-2 mt-0 flex flex-wrap ${(gm.id == 0) ? 'rounded-l-md' : ''} ${(gm.id == (GameModes.length - 1)) ? ' rounded-r-md' : ''} pb-1 ${checked ? 'bg-blue-600 text-gray-200' : 'bg-slate-400 text-slate-900'} ${!userData[gm.id].unlock && 'bg-slate-500'}`} >
                                                <span className='w-full'>{gm.name}</span>
                                                <span className={`w-full text-xs font-normal transition-all duration-1000 hiden ${isIntervalRunning && 'opafcity-0 scale-0'}`}>{(gm.timing >= 1000) ? `${(gm.timing / 1000)}s` : `${gm.timing}ms`}
                                                </span>
                                            </span>)
                                    }
                                </RadioGroup.Option>
                            )}
                        </RadioGroup>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SampleBoard