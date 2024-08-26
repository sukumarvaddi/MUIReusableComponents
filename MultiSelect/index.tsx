import { useState } from "react";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Checkbox from "@mui/material/Checkbox";
import ListItemText from "@mui/material/ListItemText";
import type { SelectChangeEvent, SelectProps } from "@mui/material/Select";
import Select from "@mui/material/Select";
import ListSubheader from "@mui/material/ListSubheader";
import OutlinedInput from "@mui/material/OutlinedInput";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

type FirstCharacterType =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";

interface OptionsByAlphabetType {
  a: string[];
  b: string[];
  c: string[];
  d: string[];
  e: string[];
  f: string[];
  g: string[];
  h: string[];
  i: string[];
  j: string[];
  k: string[];
  l: string[];
  m: string[];
  n: string[];
  o: string[];
  p: string[];
  q: string[];
  r: string[];
  s: string[];
  t: string[];
  u: string[];
  v: string[];
  w: string[];
  x: string[];
  y: string[];
  z: string[];
}

function organizeOptionsByAlphabet(options: string[]): OptionsByAlphabetType {
  const optionsByAlphabet: OptionsByAlphabetType = {
    a: [],
    b: [],
    c: [],
    d: [],
    e: [],
    f: [],
    g: [],
    h: [],
    i: [],
    j: [],
    k: [],
    l: [],
    m: [],
    n: [],
    o: [],
    p: [],
    q: [],
    r: [],
    s: [],
    t: [],
    u: [],
    v: [],
    w: [],
    x: [],
    y: [],
    z: [],
  };
  options.forEach((option: string) => {
    const firstCharacter: FirstCharacterType = option
      .charAt(0)
      .toLocaleLowerCase() as FirstCharacterType;
    const options = optionsByAlphabet[firstCharacter];
    options.push(option);
  });
  return optionsByAlphabet;
}

export interface MultiSelectProps extends SelectProps {
  options: string[];
  labelName?: string;
}

function MultiSelect({
  options,
  labelName = "",

  ...rest
}: MultiSelectProps) {
  const [selectedOptionsValues, setSelectedOptionsValues] = useState<string[]>(
    [],
  );

  const optionsByAlphabet = organizeOptionsByAlphabet(options);
  const alphabets = Object.keys(optionsByAlphabet) as FirstCharacterType[];
  const alphabetsToDisplay = alphabets.filter(
    (alphabet) => optionsByAlphabet[alphabet].length > 0,
  );

  function handleSelectedOption(
    event: SelectChangeEvent<typeof options>,
    child: React.ReactNode,
  ) {
    const {
      target: { value },
    } = event;

    setSelectedOptionsValues(
      typeof value === "string" ? value.split(",") : value,
    );
    if (rest.onChange) {
      rest.onChange(event, child);
    }
  }

  function onCheckBoxClick(
    event: React.ChangeEvent<HTMLInputElement>,
    option: string,
  ) {
    if (event.target.checked) {
      if (!selectedOptionsValues.includes(option)) {
        setSelectedOptionsValues([...selectedOptionsValues, option]);
      }
    } else {
      setSelectedOptionsValues([
        ...selectedOptionsValues.filter(
          (selectedOption: string) => selectedOption !== option,
        ),
      ]);
    }
  }

  return (
    <FormControl
      sx={{ m: 1, width: 300, flex: "5 10000 100%", minWidth: "100%" }}
    >
      <InputLabel>{labelName}</InputLabel>
      <Select
        MenuProps={MenuProps}
        fullWidth
        input={<OutlinedInput label={labelName} />}
        labelId={labelName}
        multiple
        onChange={handleSelectedOption}
        renderValue={(selected) =>
          Array.isArray(selected) ? selected.join(", ") : ""
        }
        value={selectedOptionsValues}
      >
        {alphabetsToDisplay.map((alphabet) => {
          return (
            <>
              <ListSubheader>{alphabet.toUpperCase()}</ListSubheader>
              {optionsByAlphabet[alphabet].map((option: string) => (
                <MenuItem key={option}>
                  <Checkbox
                    checked={selectedOptionsValues.includes(option)}
                    onChange={(event) => {
                      onCheckBoxClick(event, option);
                    }}
                  />
                  <ListItemText primary={option} />
                </MenuItem>
              ))}
            </>
          );
        })}
      </Select>
    </FormControl>
  );
}

export { MultiSelect };
