import { Listbox } from "@headlessui/react";
import { CaretDown, Check } from "phosphor-react";
import { Fragment } from "react";

interface ListBoxProps {
  selected: any;
  setSelected: any;
  placeholder: string,
  myArr: Array<any>;
  filterBy: Function;
  filterValue: Function;
}

export function CustomMultipleSelect(props: ListBoxProps) {
  return (
    <>
      <Listbox
        as="div"
        value={props.selected}
        onChange={props.setSelected}
        className="relative"
        multiple
      >
        <Listbox.Button className="relative w-full cursor-default rounded bg-zinc-900 py-3 px-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 sm:text-sm">
          <span
            className={`block truncate ${
              props.selected.length ? "text-white font-bold" : "text-zinc-300"
            }`}
          >
            {props.selected.length
              ? props.selected.map((data: any) => props.filterValue(data)).join(", ")
              : props.placeholder }
          </span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <CaretDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </Listbox.Button>
        <Listbox.Options
          as="ul"
          className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
        >
          {props.myArr.map((data, index) => (
            <Listbox.Option value={data} key={index} as={Fragment}>
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
                  {props.filterBy(data)}
                </li>
              )}
            </Listbox.Option>
          ))}
        </Listbox.Options>
      </Listbox>
    </>
  );
}
