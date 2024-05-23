import React, { Fragment } from 'react'
import { Dialog, Transition } from '@headlessui/react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { attemptsLogState, currentLevelState, modalState, userDataState } from '../store';
import { newUData } from '../Utils';

export default function ClearModal() {

    const [isOpen, setIsOpen] = useRecoilState(modalState);

    const setUserData = useSetRecoilState(userDataState);
    const setAttempsLog = useSetRecoilState(attemptsLogState);
    const setCurrentLevel = useSetRecoilState(currentLevelState);

    function closeModal() {
        setIsOpen(false)
    }

    function clearData() {
        localStorage.clear();
        setUserData(newUData())
        setAttempsLog([])
        setCurrentLevel(0)
    }

    return (
        <Transition appear show={isOpen} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={closeModal}>
                <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0">
                    <div className="fixed inset-0 bg-black bg-opacity-70" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child as={Fragment} enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100" leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95">
                            <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-gray-900 p-6 text-left align-middle shadow-xl transition-all">
                                <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-100">
                                    Clear All Data?
                                </Dialog.Title>
                                <div className="mt-2">
                                    <p className="text-sm text-gray-400">
                                        If you proceed, all your progress and history will be lost
                                    </p>
                                </div>

                                <div className="mt-4 flex justify-between">
                                    <button type="button" onClick={closeModal}
                                        className="inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-2 py-2 text-sm font-medium text-gray-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                        Keep Data
                                    </button>
                                    <button type="button" onClick={() => { clearData(); closeModal() }}
                                        className="inline-flex justify-center rounded-md border border-transparent bg-red-500 px-2 py-2 text-sm font-medium text-blue-50 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2">
                                        Delete!
                                    </button>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    )
}

