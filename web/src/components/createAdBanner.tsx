import { useState } from "react";
import { MagnifyingGlassPlus } from "phosphor-react";
import { CreateAdModal } from "./CreateAdModal";

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
            className="py-3 px-4 bg-violet-700 hover:bg-violet-800 transition-colors text-white font-semibold rounded flex item-center gap-3"
            onClick={openModal}
          >
            <MagnifyingGlassPlus size={24} />
            Publicar anúncio
          </button>
        </div>
      </div>

      <CreateAdModal isOpen={isOpen} onModalClose={closeModal} />
    </>
  );
}
