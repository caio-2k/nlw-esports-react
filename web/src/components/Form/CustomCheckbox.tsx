interface InputProps {
  isChecked: boolean;
  setIsChecked: (value: boolean) => void;
  labelText: string,
}

export function Checkbox(props: InputProps) {
  const handleOnChange = () => {
    props.setIsChecked(!props.isChecked);
  };

  return (
    <>
      <input
        name="checkbox"
        id="checkbox"
        type="checkbox"
        className="accent-green-600 text-white w-4 h-4"
        checked={props.isChecked}
        onChange={handleOnChange}
      />
      <label htmlFor="checkbox" className="font-semibold">
        { props.labelText }
      </label>
    </>
  );
}
