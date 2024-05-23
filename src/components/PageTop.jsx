import React from 'react'

function PageTop() {
    return (

        <div className="text-center flex flex-col items-center mb-4 gap-3">
            <a
                href="https://github.com/willybcode/colori"
                aria-label="Colori GitHub repository"
                target="_blank"
                rel="noreferrer"
                className="py-2 px-5 bg-indigo-800 items-center place-self-end justify-center md:mt-4 text-white  leading-none rounded-full gap-4 w-fit   flex "
                role="alert">
                <span className=" rounded-full bg-gray-800 hover:bg-gray-600">
                    <svg viewBox="0 0 40 40" className='w-6 h-6 fill-current' xmlns="http://www.w3.org/2000/svg">
                        <path d="M20 0C8.95 0 0 8.95 0 20C0 28.85 5.725 36.325 13.675 38.975C14.675 39.15 15.05 38.55 15.05 38.025C15.05 37.55 15.025 35.975 15.025 34.3C10 35.225 8.7 33.075 8.3 31.95C8.075 31.375 7.1 29.6 6.25 29.125C5.55 28.75 4.55 27.825 6.225 27.8C7.8 27.775 8.925 29.25 9.3 29.85C11.1 32.875 13.975 32.025 15.125 31.5C15.3 30.2 15.825 29.325 16.4 28.825C11.95 28.325 7.3 26.6 7.3 18.95C7.3 16.775 8.075 14.975 9.35 13.575C9.15 13.075 8.45 11.025 9.55 8.275C9.55 8.275 11.225 7.75 15.05 10.325C16.65 9.875 18.35 9.65 20.05 9.65C21.75 9.65 23.45 9.875 25.05 10.325C28.875 7.725 30.55 8.275 30.55 8.275C31.65 11.025 30.95 13.075 30.75 13.575C32.025 14.975 32.8 16.75 32.8 18.95C32.8 26.625 28.125 28.325 23.675 28.825C24.4 29.45 25.025 30.65 25.025 32.525C25.025 35.2 25 37.35 25 38.025C25 38.55 25.375 39.175 26.375 38.975C30.3454 37.6346 33.7954 35.0829 36.2396 31.6791C38.6838 28.2752 39.9989 24.1905 40 20C40 8.95 31.05 0 20 0Z"
                            figll="#ffffff" className='text-white'></path>
                    </svg>
                </span>
                <span className="font-semibold text-sm flex-auto">Check it out on Github</span>
                <svg className="fill-current opacity-75 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M12.95 10.707l.707-.707L8 4.343 6.586 5.757 10.828 10l-4.242 4.243L8 15.657l4.95-4.95z" /></svg>
            </a>
            <h1
                className="sm:text-3xl text-2xl font-medium text-center title-font text-white mb-1 md:mb-4">
                <span
                    className='mx-2 font-extrabold text-transparent text-4xl bg-clip-text bg-gradient-to-r from-blue-400 via-red-800 to-yellow-600'>Colori</span>.
                <i className='text-slate-400 text-xs ml-2'>Can you beat it?</i>
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
            {/* <span className='text-xs text-slate-400 animate-pulse hidden'>! Some colors are purposefully look very similar, whatch out for that trick XD !</span> */}
            <span className='text-sm text-slate-400  hidden md:inline-block'> You can also press <b>S</b> to start and <b>R</b> to stop and <b>Space</b> or <b>Enter</b> to play</span>

        </div>
    )
}

export default PageTop