import { Fragment, useEffect, useState, FormEvent } from "react";
import { CaretDown, Check, GameController } from "phosphor-react";
import { Dialog } from "@headlessui/react";
import { Input } from "./Form/Input";
import { Listbox } from "@headlessui/react";
import { CustomSelect } from "./Form/CustomSelect"
import axios from "axios";
import { CustomMultipleSelect } from "./Form/CustomMultipleSelect";
import { Checkbox } from "./Form/CustomCheckbox";

interface AdModalProps {
  isOpen: boolean;
  onModalClose: () => void;
}

interface Game {
  id: string;
  title: string;
}

const weekDays = [
  { id: 0, name: "Domingo", abbr: "D" },
  { id: 1, name: "Segunda-feira", abbr: "S" },
  { id: 2, name: "Terça-feira", abbr: "T" },
  { id: 3, name: "Quarta-feira", abbr: "Q" },
  { id: 4, name: "Quinta-feira", abbr: "Q" },
  { id: 5, name: "Sexta-feira", abbr: "S" },
  { id: 6, name: "Sábado", abbr: "S" },
];

export function CreateAdModal({ isOpen, onModalClose }: AdModalProps) {
  const [selected, setSelected] = useState();
  const [games, setGames] = useState<Game[]>([]);
  const [selectedWeekDays, setSelectedWeekDays] = useState<string[]>([]);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  useEffect(() => {
    axios("http://localhost:3333/games").then((response) => {
      setGames(response.data);
    });
  }, []);

  async function handleCreateAd(event: FormEvent) {
    event.preventDefault()

    const formData = new FormData(event.target as HTMLFormElement);
    const data = Object.fromEntries(formData);

    if (!data.name) {
      return;
    }

    try {
      const currentSelectedGame = games.find((x) => x.title === selected)
      
      const response = await axios.post(`http://localhost:3333/games/${currentSelectedGame?.id}/ads`, {
        name: data.name,
        yearsPlaying: Number(data.yearsPlaying),
        discord: data.discord,
        weekDays: selectedWeekDays.map((item: any) => item.id),
        hourStart: data.hourStart,
        hourEnd: data.hourEnd,
        useVoiceChannel: isChecked,
      });
    
      alert('Anúncio criado com sucesso!');
    } catch (err) {
      console.log(err);
      alert('Erro ao criar anúncio!');
    }
  }

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
              <Dialog.Title as="h1" className="text-3xl font-black">
                Publique um anúncio
              </Dialog.Title>
              <form onSubmit={handleCreateAd} className="mt-8 flex flex-col gap-4">
                <div className="flex flex-col gap-2">
                  <label htmlFor="game" className="font-semibold">
                    Qual o game?
                  </label>
                  <CustomSelect 
                    selected={selected}
                    setSelected={setSelected}
                    placeholder="Selecione um game"
                    myArr={games}
                    filterBy={(data: Game) => data.title}
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-semibold">
                    Seu nome (ou nickname)
                  </label>
                  <Input
                    id="name"
                    name="name"
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
                      name="yearsPlaying"
                      type="number"
                      placeholder="Tudo bem ser ZERO"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="discord" className="font-semibold">
                      Qual seu Discord?
                    </label>
                    <Input id="discord" name="discord" placeholder="Usuario#0000" />
                  </div>
                </div>

                <div className="flex gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="weekDays" className="font-semibold">
                      Quando costuma jogar?
                    </label>
                    <CustomMultipleSelect 
                      selected={selectedWeekDays}
                      setSelected={setSelectedWeekDays}
                      placeholder="Selecione o(s) dia(s)"
                      myArr={weekDays}
                      filterBy={(data: any) => data.name}
                      filterValue={(data: any) => data.abbr}
                    />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <label htmlFor="hourStart" className="font-semibold">
                      Qual horário do dia?
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <Input id="hourStart" name="hourStart" type="time" placeholder="De" />
                      <Input id="hourEnd" name="hourEnd" type="time" placeholder="Até" />
                    </div>
                  </div>
                </div>

                <div className="mt-2 flex gap-2 text-sm">
                  <Checkbox
                    isChecked={isChecked}
                    setIsChecked={setIsChecked}
                    labelText="Costumo me conectar ao chat de voz"
                  />
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
                    className="bg-violet-700 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-800 transition-colors"
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
