import React from 'react'
import PageTop from './PageTop'
import GameBoard from './GameBoard'
import ClearModal from './ClearModal'
import PageBottom from './PageBottom'
import { Flip, ToastContainer } from 'react-toastify'

function Page() {
    return (
        < >

            <section className="text-gray-400 bg-gray-900 h-full min-h-screen w-full body-font">
                <div
                    className='w-full fixed flex justify-center md:justify-start pt-5 md:pt-10 md:pl-10'>
                </div>
                <ToastContainer transition={Flip} />
                <div className="container px-5 py-4 mx-auto">
                    <PageTop />
                    <GameBoard />

                </div>
            <ClearModal />
            <PageBottom />
            </section>
        </>
    )
}

export default Page