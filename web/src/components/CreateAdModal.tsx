import { Fragment, useEffect, useState } from "react";
import { CaretDown, Check, GameController } from "phosphor-react";
import { Dialog, Transition } from "@headlessui/react";
import { Input } from "./Form/input";
import { Listbox } from "@headlessui/react";

interface AdModalProps {
  isOpen: boolean;
  onModalClose: () => void;
}
interface Game {
  id: string;
  title: string;
}

export function CreateAdModal({ isOpen, onModalClose }: AdModalProps) {
  const [selected, setSelected] = useState();
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    fetch("http://localhost:3333/games")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
      });
  }, []);

  // useEffect(() => {
  //   const test = games.find((x) => x.id == selected) as Game
  //   console.log(test.title);
  // }, [selected]);

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={onModalClose}>
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

                      <Listbox value={selected} onChange={setSelected}>
                        <div className="relative">
                          <Listbox.Button className="relative w-full cursor-default rounded bg-zinc-900 py-3 px-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 sm:text-sm">
                            <span className="block truncate text-white">
                              {selected ? selected : 'Selecione um jogo'}
                            </span>
                            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                              <CaretDown
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                              />
                            </span>
                          </Listbox.Button>

                          <Transition
                            as={Fragment}
                            leave="transition ease-in duration-100"
                            leaveFrom="opacity-100"
                            leaveTo="opacity-0"
                          >
                            <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                              {games.map((game) => (
                                <Listbox.Option
                                  key={game.id}
                                  className={({ active }) =>
                                    `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                      active
                                        ? "bg-violet-100 text-zinc-900"
                                        : "text-gray-900"
                                    }`
                                  }
                                  value={game.title}
                                >
                                  {({ selected }) => (
                                    <>
                                      <span
                                        className={`block truncate ${
                                          selected
                                            ? "font-medium"
                                            : "font-normal"
                                        }`}
                                      >
                                        {game.title}
                                      </span>
                                      {selected ? (
                                        <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-violet-600">
                                          <Check
                                            className="h-5 w-5"
                                            aria-hidden="true"
                                          />
                                        </span>
                                      ) : null}
                                    </>
                                  )}
                                </Listbox.Option>
                              ))}
                            </Listbox.Options>
                          </Transition>
                        </div>
                      </Listbox>
                    </div>

                    <div className="flex flex-col gap-2">
                      <label htmlFor="name" className="font-semibold">Seu nome (ou nickname)</label>
                      <Input
                        id="name"
                        placeholder="Como te chamam dentro do game?"
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="yearsPlaying" className="font-semibold">
                          Joga há quantos anos?
                        </label>
                        <Input
                          id="yearsPlaying"
                          type="number"
                          placeholder="Tudo bem ser ZERO"
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label htmlFor="discord" className="font-semibold">Qual seu Discord?</label>
                        <Input id="discord" placeholder="Usuario#0000" />
                      </div>
                    </div>

                    <div className="flex gap-6">
                      <div className="flex flex-col gap-2">
                        <label htmlFor="weekDays" className="font-semibold">Quando costuma jogar?</label>
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
                        <label htmlFor="yearsPlaying" className="font-semibold">
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
                      <span className="font-semibold">Costumo me conectar ao chat de voz</span>
                    </div>

                    <footer className="mt-4 flex justify-end gap-4">
                      <button
                        onClick={onModalClose}
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
