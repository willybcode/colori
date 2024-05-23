import React, { useEffect } from 'react'
import { useRecoilValue } from 'recoil'
import { attemptsLogState, currentLevelState } from '../store'

function Logger() {
    const attemptsLog = useRecoilValue(attemptsLogState)
    const currentLevel = useRecoilValue(currentLevelState)

    useEffect(() => {
        document.getElementById('logger').scrollTo({
            top: 20 * attemptsLog.length,
        })
    }, [attemptsLog, currentLevel])
    return (

        <span id='logger' className='flex resize-y max-h-[102px] flex-wrap  border border-gray-700 rounded-lg p-2 h-20 w-32 overflow-auto justify-cefnter items-center scroll-smooth'>


            {attemptsLog.map((entry, index) => {
                if (entry.lvl == currentLevel) {
                    if (!entry.newbest) {

                        return <span key={index} className={`w-full flex items-center space-x-2`}>
                            <span className={`${entry.cl1}  rounded-full h-5 w-5`}></span>
                            {entry.cl1 == entry.cl2
                                ? <span className='text-green-500'>=</span>
                                : <span className='text-red-500'> x </span>}
                            <span className={`${entry.cl2} rounded-md w-5 h-5`}></span>
                            {(entry.mod!=0) &&
                                <span className={`text-xs whitespace-nowrap ${entry.cl1 == entry.cl2 ? 'text-green-400' : 'text-red-400'}`}>{entry.cl1 == entry.cl2 ? '+' : '-'} {entry.mod}</span>}
                        </span>
                    } else {
                        return <span key={index} className={`w-full flex items-center pl-2 space-x-1 my-1`}><span className='text-xs text-yellow-400'>New Best: <span className='font-extralight'>{entry.newbest}</span></span></span>
                    }
                }
            }
            )}
            {/* count how many of the elements inside the array have the key "lvl" equal to currentLevel */}
            <span className={`w-full text-blue-200 text-center text-xs transition-all duration-400   
            ${attemptsLog.reduce((x, y) => x + (y.lvl == currentLevel ? 1 : 0), 0)  && ' -translate-y-10 opacity-0'}`}>Empty level</span>

        </span>
    )
}

export default Logger