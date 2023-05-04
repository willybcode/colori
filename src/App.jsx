import {useState, Fragment, useEffect} from 'react'
import {RadioGroup, Dialog, Transition } from '@headlessui/react'
import useKeypress from 'react-use-keypress';
import {Buffer} from 'buffer';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

    

    const useLocalStorage = (storageKey, fallbackState,sec=false) => {
       let fet=sec?(Buffer.from(JSON.parse(localStorage.getItem(storageKey)),'base64').toString("utf8") ?? fallbackState): (JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState)
    /* 
    All of the code commented below was an attempt at base64 encoding/decoding along with some sort of "post-salt-scrabler" implementation.
    It's purpose is to encode the data stored in localstorage so that users cannot just modify it to improve their score or unlock new levels.
    
    The problems I encourted were:
    1. btoa() and atob() were being deprecated
    2. Buffer.from().toString() does not work well with Json objects

    I am still looking into it, contributions are welcome
    */
    
    // let fcc= JSON.parse(localStorage.getItem(storageKey))  
    // alert(JSON.parse(localStorage.getItem(storageKey))) 
    // let fet=sec?(((false)? false:btoa(JSON.parse(localStorage.getItem(storageKey))) )?? fallbackState): (JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState)
        // if(sec){

        // }else{
        //     JSON.parse(localStorage.getItem(storageKey)) ?? fallbackState

        // }
        const [value, setValue] = useState(fet);
        let tef=sec?(Buffer.from(JSON.stringify(value),"utf8").toString("base64")):(JSON.stringify(value))
        // let tef=sec?(atob(JSON.stringify(value))):(JSON.stringify(value))
      
        // localStorage.setItem(storageKey, JSON.stringify(value));
        useEffect(() => {
          localStorage.setItem(storageKey, tef);
        }, [value, storageKey]);
      
        return [value, setValue];
      };

    const [gameLevel, setGameLevel] = useLocalStorage('gameLVL',0)
    const [gameFinish, setGameFinish] = useLocalStorage('gameFinish',false)
    const [score, setScore] = useState(0);
    const [best, setBest] = useState(0);
    const [gs, setgs] = useState(0);

    const gl_ori = [
        {
            id: 0,
            name: 'Easy',
            timing: 1100,
            scoreRate: 20,
            penalty:10,
            score: 0,
            best: 0,
            target: 70,
            unlocked:true
        },
        {
            id: 1,
            name: 'Normal',
            timing: 800,
            scoreRate: 30,
            penalty:15,
            score: 0,
            best: 0,
            target: 80,
            unlocked:false
        },
        {
            id: 2,
            name: 'Hard',
            timing: 550,
            scoreRate: 50,
            penalty:20,
            score: 0,
            best: 0,
            target: 120,
            unlocked:false
        },

        {
            id: 3,
            name: 'Insane',
            timing: 400,
            scoreRate: 110,
            penalty:20,
            score: 0,
            best: 0,
            target: 310,
            unlocked:false
        },

    ]

    let colors = [
        "bg-gray-950",
        "bg-slate-50",
        "bg-red-500",
        "bg-stone-500",
        "bg-orange-500",
        "bg-amber-300",
        "bg-yellow-700",
        "bg-lime-500",
        "bg-sky-500",
        "bg-violet-500",
        "bg-pink-500"
    ];


    // const [gameLevels, setGl] = useLocalStorage('gameLVLs',gl_ori,true) // this will be usable once the Buffer.from().toString() issue is resolved
    const [gameLevels, setGl] = useLocalStorage('gameLVLs',gl_ori)
    const [attempts, setAttempts] = useLocalStorage('attempts',0);
    const [color1, setColor1] = useState(cs());
    const [color2, setColor2] = useState(0);
    const [numLvl, setnumLvl] = useState(gl_ori.length);
    const [intervaltime, setIntervalTime] = useLocalStorage('gameInterval',gl_ori[0].timing);
    const [intervalId, setIntervalId] = useState(null);
    const [isIntervalRunning, setIsIntervalRunning] = useState(false);

    const [numChildlog, setNumChildlog] = useLocalStorage('numChildlog',0)
    const [childlog, setChildlog] = useLocalStorage('childlog',[])
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
      setIsOpen(false)
    }
    function ClearcloseModal() {
        localStorage.clear();
        setChildlog([])
        setNumChildlog(0)
        setAttempts(0)
        setGl(gl_ori)
        setgs(0)
        
        setIsOpen(false)
    }
  
    function openModal() {
      setIsOpen(true)
    }

    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
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

    function cs(cl = 0,colorIndex=0) {

        let chosen_color = colors[Math.floor(Math.random() * colors.length)]

                if(cl==1){
                    return colors[colorIndex]
                }

            return chosen_color


    }
    function toaster (msg){
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

    function Play() {
        if (isIntervalRunning) {
            let nb=false
            let type=0;
            let content=[];
            let ll=gameLevels[gameLevel].score +gameLevels[gameLevel].scoreRate
            let ll2=gameLevels[gameLevel].best
            if (color1 == color2) {
                var lapt=false
                var laptid=0
                if(ll>ll2){
                    nb=true
                    if((gameLevel==(numLvl-1)) ){
                        if((ll>=(gameLevels[gameLevel].target))&&(!gameFinish)){

                            setGameFinish(true)
                            toaster("Wow you are incredible!!!");
                            toaster("Wow you are a true LEGEND!!!");
                        }
                        if(gameFinish){
                            
                            toaster("!!!!! Impossible !!!!!!");
                        }
                        
                    }else if((ll>=(gameLevels[gameLevel].target))&&(!gameLevels[gameLevel+1].unlocked)){
                        
                        laptid=gameLevel+1
                        lapt=true
                        let unlmsg="You've just unlocked level "+gameLevels[gameLevel+1].name+" !!!"
                        toaster(unlmsg);

                    }
                }

                setGl(gameLevels.map((gl)=>
                
                gl.id===gameLevel
                ? {...gl, score:gl.score + gl.scoreRate ,best: Math.max(gl.best,ll)}
                : {...gl,unlocked:((lapt)&&(gl.id==laptid))?true:gl.unlocked}
            ))

                type=2
                content={

                    circle:color1,
                    square:color2,
                    rate:gameLevels[gameLevel].scoreRate
                }
                

            } else {
                if (gameLevels[gameLevel].score - (gameLevels[gameLevel].penalty) < 0) {
                    setGl(gameLevels.map((gl)=>
                        gl.id===gameLevel
                        ? {...gl, score:0 }
                        : {...gl}
                        
                    ))

                    type=3
                    content={
                        
                        circle:color1,
                        square:color2
                        
                    }
                } else {
                    setGl(gameLevels.map((gl)=>
                        
                        gl.id===gameLevel
                        ? {...gl, score:gl.score-(gl.penalty) }
                        : {...gl}
                        
                    ))
                    type=1
                    content={
    
                        circle:color1,
                        square:color2,
                        rate:gameLevels[gameLevel].penalty
                    }
                }
                
            }
            
 
            setChildlog((childlog) => [...childlog, {id:numChildlog+1,type:type,content:content,level:gameLevel}]);
            
            if(nb){
                setChildlog((childlog) => [...childlog, {id:numChildlog+2,type:4,newbest:ll,level:gameLevel}]);
                setNumChildlog(numChildlog+2)
                
            }else{
                setNumChildlog(numChildlog+1)

            }

            

            setAttempts(attempts + 1)
        }

    }

    function timer(reset = 0) {
      if(reset==1 && !isIntervalRunning){
        //run
        let color_iter=0
        let colen= colors.length
        const newIntervalId = setInterval(() => {
            if(color_iter>=colen){
                shuffle(colors)
                color_iter=0
            }
            setColor1(cs(1,color_iter));
            color_iter++;


        }, intervaltime);
        setIntervalId(newIntervalId);
        setIsIntervalRunning(true);

      }
      if(reset==2 ){
        //stop
 
          clearInterval(intervalId);
          setIsIntervalRunning(false);
      }
      


    }
    function lvlch(ido){
        if(!gameLevels[ido].unlocked){
            let prevname= gameLevels[ido-1].name
            let prevmin= gameLevels[ido-1].target
            let tota= "Score "+prevmin+" points in *"+prevname+"* to unlock this level"
            toaster(tota)
            
        }
    }




    useKeypress(['r', 's','S','R',' ','Spacebar','Enter'], (event) => {
        if ((event.key === 's')|| (event.key==='S')) {
          timer(1)
        } else if((event.key === 'r')|| (event.key==='R')) {
          timer(2)
        }else{
            // Play() // There is currently an issue where long press or sometimes single press of Spacebar/Enter trigger the play action multiple times, thus making the user loose points. As such I have disabled this until I find a solution
        }
      });

    useEffect(() => {

        setColor2(cs(2));


    }, [isIntervalRunning, attempts]);

    useEffect(() => {
        setgs(0)
        childlog.map((chilo)=>
        {
            if(chilo.level==gameLevel){
                setgs(gs+1)
            }
        }
        )

    }, [gameLevel,numChildlog]);
    useEffect(() => {

        setIntervalTime(gameLevels[gameLevel].timing)
        if(isIntervalRunning){ 
            timer(2)
           timer(1)
        }
        if((gameLevel==(gameLevels.length-1)) && gameLevels[gameLevel].unlocked){
            let msg=gameFinish?('You are already the goat'):('You got this. Try to get ' +gameLevels[gameLevel].target + ' to be the absolute king ')


            toaster(msg)
        }

    }, [gameLevel]);


    useEffect(()=>{
        document.getElementById('logger').scrollTo({
            top: 30*numChildlog,
            
        })
        
    },[childlog])
    useEffect(()=>{
        setScore(gameLevels[gameLevel].score)
        setBest(gameLevels[gameLevel].best)
 
    },[gameLevel,gameLevels])
    

    return (
        <div >

            <section className="text-gray-400 bg-gray-900 h-full w-full body-font">
                <div
                    className='w-full fixed flex justify-center md:justify-start pt-5 md:pt-10 md:pl-10'>
                </div>
                <ToastContainer transition={Flip} />
                <div className="container px-5 py-4 mx-auto">
                    <div className="text-center flex flex-col items-center mb-4 gap-3">
                            <a
                            href="https://github.com/willybcode/colori"
                            aria-label="Colori GitHub repository"
                            target="_blank"
                            rel="noreferrer"
                            class="py-2 px-5 bg-indigo-800 items-center place-self-end justify-center md:mt-4 text-white  leading-none rounded-full gap-4 w-fit   flex "
                            role="alert">
                            <span class=" rounded-full bg-gray-800 hover:bg-gray-600">
                                <svg
                                    viewBox="0 0 40 40"
                                    className='w-6 h-6 fill-current'
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M20 0C8.95 0 0 8.95 0 20C0 28.85 5.725 36.325 13.675 38.975C14.675 39.15 15.05 38.55 15.05 38.025C15.05 37.55 15.025 35.975 15.025 34.3C10 35.225 8.7 33.075 8.3 31.95C8.075 31.375 7.1 29.6 6.25 29.125C5.55 28.75 4.55 27.825 6.225 27.8C7.8 27.775 8.925 29.25 9.3 29.85C11.1 32.875 13.975 32.025 15.125 31.5C15.3 30.2 15.825 29.325 16.4 28.825C11.95 28.325 7.3 26.6 7.3 18.95C7.3 16.775 8.075 14.975 9.35 13.575C9.15 13.075 8.45 11.025 9.55 8.275C9.55 8.275 11.225 7.75 15.05 10.325C16.65 9.875 18.35 9.65 20.05 9.65C21.75 9.65 23.45 9.875 25.05 10.325C28.875 7.725 30.55 8.275 30.55 8.275C31.65 11.025 30.95 13.075 30.75 13.575C32.025 14.975 32.8 16.75 32.8 18.95C32.8 26.625 28.125 28.325 23.675 28.825C24.4 29.45 25.025 30.65 25.025 32.525C25.025 35.2 25 37.35 25 38.025C25 38.55 25.375 39.175 26.375 38.975C30.3454 37.6346 33.7954 35.0829 36.2396 31.6791C38.6838 28.2752 39.9989 24.1905 40 20C40 8.95 31.05 0 20 0Z"
                                        figll="#ffffff" className='text-white'></path>
                                </svg>
                            </span>
                            <span class="font-semibold text-sm flex-auto">Check it out on Github</span>
                            <svg
                                class="fill-current opacity-75 h-4 w-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"><path
                                d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z"/></svg>
                        </a>
                        <h1
                            className="sm:text-3xl text-2xl font-medium text-center title-font text-white mb-1 md:mb-4">Welcome to
                            <span
                                className='mx-2 font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-blue-400 via-red-800 to-yellow-600'>Colori</span>.
                            <i className='text-slate-400 text-base ml-2'>Can you beat the algorithm?</i>
                        </h1>
                        <p className="text-base leading-relaxed xl:w-2/4 lg:w-3/4 mx-auto">The color on the circle changes constantly, 
                        {/* <span className='hidden md:inline-block '> press <b className='text-lg mx-2'> space </b> or </span>  */}
                        <span className='ml-1'>

                            click on  
                            <b className='text-md ml-1'>
                                Go
                            </b> when it matches the color in the square
                        </span>
                            </p>
                            <span className='text-xs text-slate-400 animate-pulse hidden'>! Some colors are purposefully look very similar, whatch out for that trick XD !</span>
                            <span className='text-sm text-slate-400  hidden md:inline-block'> You can also press <b>S</b> to start and <b>R</b> to stop.</span>
                            
                    </div>
                    <div className="flex  lg:w-4/5 sm:mx-auto sm:mb-2  justify-center ">

                        <div className="p-2  w-auto">
                            <div className="bg-gray-800 rounded-2xl md:mx-auto   flex p-4 h-full items-center flex-col">
                                <div className='flex justify-between bg-500 px-2 w-full'>

                                    <span className=" flex flex-col title-font  font-medium text-white">
                                      <span>Score: {score}</span>
                                      <span className=" text-yellow-500 text-xs">Best: {best}</span>
                                      </span>
                                    <span id='logger' className='flex resize-y max-h-[102px] flex-wrap min-h-fit border border-gray-700 rounded-lg p-2 h-16 w-32 overflow-auto justify-cednter items-center scroll-smooth'>
                                        

                                        {childlog.map((chilo,index)=>

                                        
                                        {
                                            if(chilo.level==gameLevel){
                                            switch (chilo.type) {
                                            case 1:
                                                //loss penality
                                                return <span key={index} className={`w-full flex items-center space-x-2`}><span className={`${chilo.content.circle}  rounded-full h-5 w-5`}></span><span className='text-red-500'> X </span><span className={`${chilo.content.square} rounded-md w-5 h-5`}></span><span className='text-xs text-red-400 '> -{chilo.content.rate}</span></span>
                                                // break;
                                            case 2:
                                                //win
                                                return <span key={index} className={`w-full flex items-center space-x-2`}><span className={`${chilo.content.circle}  rounded-full h-5 w-5`}></span><span className='text-green-500'>=</span><span className={`${chilo.content.square} rounded-md w-5 h-5`}></span><span className='text-xs text-green-400 '> +{chilo.content.rate}</span></span>
                                                // break;
                                            case 3:
                                                //loss empty
                                                return <span key={index} className={`w-full flex items-center space-x-2`}><span className={`${chilo.content.circle}  rounded-full h-5 w-5`}></span><span className='text-red-500'>X</span><span className={`${chilo.content.square} rounded-md w-5 h-5`}></span></span>
                                                // break;
                                            case 4:
                                                //new best
                                                return <span key={index} className={`w-full flex items-center pl-2 space-x-1 my-1`}><span className='text-xs text-yellow-400'>New Best: <span className='font-extralight'>{chilo.newbest}</span></span></span>
                                    
                                                // break;
                                        
                                            default:
                                                break;
                                        }}}
                                        )}
                                    <span className={`w-full title-fondt font-norfmal text-blue-200 text-center text-xs transition-all duration-400   ${gs>0 && ' -translate-y-10 opacity-0'}`}>Empty level</span>

                                    </span>
                                    

                                </div>

                                <span
                                    className=" flex justify-between w-full h-full px-2 md:px-16 mt-6 mb-2  items-center">
                                    <span className={`${color1} rounded-full w-24 h-24 md:h-32 md:w-32 transition-colors duration-0`}></span>
                                    <span className={` text-blue-500 font-bold text-md  mx-3`}>
                                        {`<=>`}

                                    </span>
                                    <span className={`${color2} rounded  w-24 h-full md:h-32 md:w-32 transition-colors duration-500`}></span>
                                    

                                </span>
                                <div className='flex-col space-y-5 justify-center '>
                                    <button
                                        className={` ${isIntervalRunning
                                            ? 'text-white bg-purple-500 hover:bg-purple-600 animate-pulse '
                                            : 'cursor-not-allowed scale-50 bg-gray-500 text-slate-400 hover:bg-purple-400/40'} transition-all duration-1000 flex mx-auto mt-6  border-0 py-2 px-6 focus:outline-none  rounded-lg text-lg`}
                                        onClick={Play}>Go</button>
                                    <div className='flex space-x-1 mt-auto justify-center'>


                                        <button
                                            className={`bg-green-700  hover:bg-green-800 animate-bounce mt-auto text-white uppercase w-fit border-0 py-1 items-center text-center px-2  focus:outline-none  rounded-xl text-sm first-letter
                                            ${isIntervalRunning
                                                ? 'hidden'
                                                : ''} `}
                                            onClick={() =>timer(1)}>Start</button>
                                        <button
                                            className={` mt-auto bg-red-700 hover:bg-red-800 text-white uppercase w-fit border-0 py-1 items-center text-center px-2  focus:outline-none  rounded-xl text-sm first-letter
                                            ${isIntervalRunning
                                                ? ''
                                                : 'hidden'} `}
                                            onClick={() =>timer(2)}> Stop</button>

                                    </div>
                                    <button
                                    type="button"
                                    onClick={openModal}
                                            className={`bg-gray-600 transition-all duration-700  text-white  w-fit border-0 py-px items-center text-center px-1  focus:outline-none  rounded-md text-sm first-letter
                                            ${!isIntervalRunning
                                                ? 'hover:bg-red-700'
                                                : 'opacity-50 scale-0'} `}
                                                disabled={isIntervalRunning}> Clear</button>
                                    <RadioGroup value={gameLevel} onChange={setGameLevel} className={` cursor-pointer !mt-1 text-center w-fit p-0 flex transition-all duration-700 ${isIntervalRunning ? 'opacity-30 scale-90':'opacity-90'} font-semibold rounded disabled:cursor-not-allowed  `} disabled={isIntervalRunning}>
                                        {gameLevels.map((gm)=>


                                        <RadioGroup.Option key={gm.id} value={gm.id} disabled={!gm.unlocked} >
                                            {
                                                ({checked}) => (<span onClick={()=>(!isIntervalRunning && lvlch(gm.id))}
                                                    className={` px-2 mt-0 flex flex-wrap ${(gm.id==0) ? 'rounded-l-md' :''} ${(gm.id==(gameLevels.length-1)) ? ' rounded-r-md' :''} pb-1 ${checked
                                                        ? 'bg-blue-700 text-gray-200'
                                                        : 'bg-slate-400 text-slate-900'} ${!gm.unlocked && 'bg-slate-500'}`} ><span className='w-full'>{gm.name}</span><span className={`w-full text-xs font-normal transition-all duration-1000 hidden ${isIntervalRunning && 'opafcity-0 scale-0'}`}>{(gm.timing>=1000)? `${(gm.timing/1000)}s`: `${gm.timing}ms`}</span></span>)
                                            }
                                        </RadioGroup.Option>
                                                                                
                                                                                )}
                                        

                                    </RadioGroup>

                                   
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </section>
            <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-70" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-900 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-100"
                  >
                    Clear All Data?
                  </Dialog.Title>
                  <div className="mt-2">
                    <p className="text-sm text-gray-400">
                      If you proceed, all your progress and history will be lost
                    </p>
                  </div>

                  <div className="mt-4 flex justify-between">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-2 py-2 text-sm font-medium text-gray-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Keep Data
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-2 py-2 text-sm font-medium text-blue-50 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={ClearcloseModal}
                    >
                      Delete!
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
      <div className='text-white text-center mb-4'>Made by <a href="https://codewilly.com" target='_blank' className='italic font-semibold  text-indigo-800 rounded-lg p-0.5 pr-1  transform bg-lime-50/50 text-lg'> CodeWilly</a> </div>
        </div>
    )
}

export default App
