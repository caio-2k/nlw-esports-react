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

const weekDays = [
  { id: 1, name: "Domingo", abbr: "D" },
  { id: 2, name: "Segunda-feira", abbr: "S" },
  { id: 3, name: "Terça-feira", abbr: "T" },
  { id: 4, name: "Quarta-feira", abbr: "Q" },
  { id: 5, name: "Quinta-feira", abbr: "Q" },
  { id: 6, name: "Sexta-feira", abbr: "S" },
  { id: 7, name: "Sábado", abbr: "S" },
];

function useLog(name, property) {
  useEffect(() => console.log(name, property), [name, property]);
}

export function CreateAdModal({ isOpen, onModalClose }: AdModalProps) {
  const [selected, setSelected] = useState();
  const [games, setGames] = useState<Game[]>([]);
  const [selectedWeekDays, setSelectedWeekDays] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3333/games")
      .then((response) => response.json())
      .then((data) => {
        setGames(data);
      });
  }, []);

  useLog("selectedWeekDays", selectedWeekDays);

  // useEffect(() => {
  //   const test = games.find((x) => x.id == selected) as Game
  //   console.log(test.title);
  // }, [selected]);

  return (
    <>
      <Dialog
        as="div"
        className="relative z-10"
        open={isOpen}
        onClose={onModalClose}
      >
        <div className="fixed inset-0 bg-black/60" />
        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4">
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
                        <span
                          className={`block truncate ${
                            selected ? "text-white" : "text-zinc-500"
                          }`}
                        >
                          {selected ? selected : "Selecione um jogo"}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <CaretDown
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>

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
                                    selected ? "font-medium" : "font-normal"
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
                    </div>
                  </Listbox>
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-semibold">
                    Seu nome (ou nickname)
                  </label>
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
                    <label htmlFor="discord" className="font-semibold">
                      Qual seu Discord?
                    </label>
                    <Input id="discord" placeholder="Usuario#0000" />
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="weekDays" className="font-semibold">
                      Quando costuma jogar?
                    </label>
                    <Listbox
                      as="div"
                      value={selectedWeekDays}
                      onChange={setSelectedWeekDays}
                      className="relative"
                      multiple
                    >
                      <Listbox.Button className="relative w-full cursor-default rounded bg-zinc-900 py-3 px-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 sm:text-sm">
                        <span
                          className={`block truncate ${
                            selectedWeekDays.length
                              ? "text-white font-bold"
                              : "text-zinc-500"
                          }`}
                        >
                          {selectedWeekDays.length
                            ? selectedWeekDays.map((day) => day.abbr).join(", ")
                            : "Selecione o(s) dia(s)"}
                        </span>
                        <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                          <CaretDown
                            className="h-5 w-5 text-gray-400"
                            aria-hidden="true"
                          />
                        </span>
                      </Listbox.Button>
                      <Listbox.Options
                        as="ul"
                        className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                      >
                        {weekDays.map((day) => (
                          <Listbox.Option
                            value={day}
                            key={day.id}
                            as={Fragment}
                          >
                            {({ active, selected }) => (
                              <li
                                className={`
                                    ${
                                      active
                                        ? "bg-violet-100 text-zinc-900"
                                        : "text-gray-900"
                                    } 
                                    ${selected ? "font-medium" : "font-normal"} 
                                    flex items-center gap-2 pl-8 py-1 px-2 transition-all relative
                                    `}
                              >
                                {selected ? (
                                  <Check className="w-4 text-violet-600 absolute left-2" />
                                ) : null}
                                {day.name}
                              </li>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Listbox>
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
                  <Input id="voiceChat" type="checkbox" />
                  <span className="font-semibold">
                    Costumo me conectar ao chat de voz
                  </span>
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
          </div>
        </div>
      </Dialog>
    </>
  );
}
