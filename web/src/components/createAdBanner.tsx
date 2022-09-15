import { Fragment, useState } from "react";
import { GameController, MagnifyingGlassPlus } from "phosphor-react";
import { Dialog, Transition } from "@headlessui/react";
import { Input } from "./Form/input";

export function CreateAdBanner() {
  let [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <div className="pt-1 mt-8 bg-nlw-gradient self-stretch rounded-lg overflow-hidden">
        <div className="bg-[#2A2634] px-8 py-6 self-stretch flex justify-between items-center">
          <div>
            <strong className="text-2xl text-white font-black block">
              Não encontrou seu duo?
            </strong>
            <span className="text-zinc-400 block">
              Publique um anúncio para encontrar novos players!
            </span>
          </div>
          <button
            className="py-3 px-4 bg-violet-500 hover:bg-violet-600 transition-colors text-white rounded flex item-center gap-3"
            onClick={openModal}
          >
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </button>
        </div>
      </div>

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
            <div className="fixed inset-0 bg-black/60" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="bg-[#2A2634] py-8 px-10 text-white rounded-lg w-[480px] shadow-lg shadow-black/25">
                  <Dialog.Title as="h3" className="text-3xl font-black">
                    Publique um anúncio
                  </Dialog.Title>
                  <form className="mt-8 flex flex-col gap-4">
                    <div className="flex flex-col gap-2">
                      <label htmlFor="game" className="font-semibold">
                        Qual o game?
                      </label>
                      <Input
                        id="game"
                        placeholder="Selecione o game que deseja jogar"
                      />
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="name">Seu nome (ou nickname)</label>
                      <Input
                        id="name"
                        placeholder="Como te chamam dentro do game?"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="yearsPlaying">
                          Joga há quantos anos?
                        </label>
                        <Input
                          id="yearsPlaying"
                          type="number"
                          placeholder="Tudo bem ser ZERO"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="discord">Qual seu Discord?</label>
                        <Input id="discord" placeholder="Usuario#0000" />
                      </div>
                    </div>

                    <div className="flex gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="weekDays">Quando costuma jogar?</label>
                        <div className="grid grid-cols-4 gap-2">
                          <button className="w-8 h-8 rounded bg-zinc-900">
                            D
                          </button>
                          <button className="w-8 h-8 rounded bg-zinc-900">
                            S
                          </button>
                          <button className="w-8 h-8 rounded bg-zinc-900">
                            T
                          </button>
                          <button className="w-8 h-8 rounded bg-zinc-900">
                            Q
                          </button>
                          <button className="w-8 h-8 rounded bg-zinc-900">
                            Q
                          </button>
                          <button className="w-8 h-8 rounded bg-zinc-900">
                            S
                          </button>
                          <button className="w-8 h-8 rounded bg-zinc-900">
                            S
                          </button>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2 flex-1">
                        <label htmlFor="yearsPlaying">
                          Qual horário do dia?
                        </label>
                        <div className="grid grid-cols-2 gap-2">
                          <Input id="hourStart" type="time" placeholder="De" />
                          <Input id="hourEnd" type="time" placeholder="Até" />
                        </div>
                      </div>
                    </div>

                    <div className="mt-2 flex gap-2 text-sm">
                      <Input type="checkbox" />
                      Costumo me conectar ao chat de voz
                    </div>

                    <footer className="mt-4 flex justify-end gap-4">
                      <button
                        onClick={closeModal}
                        type="button"
                        className="bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600 transition-colors"
                      >
                        Cancelar
                      </button>
                      <button
                        type="submit"
                        className="bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600 transition-colors"
                      >
                        <GameController size={24} />
                        Encontrar duo
                      </button>
                    </footer>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
