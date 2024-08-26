import React, { useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import { Chrome, hsvaToHex } from "@uiw/react-color";
import { Button, Divider, Stack } from "@mui/material";
import type { ChromeProps, ColorResult, HsvaColor } from "@uiw/react-color";

interface ChromePropsExt {
  readonly onSave?: (color: string | HsvaColor) => void;
  readonly onCancel?: () => void;
}

type ColorPickerProps = ChromeProps & ChromePropsExt;

export type FHColorPickerProps = Readonly<Omit<ColorPickerProps, "onChange">>;

export function ColorPicker(args: FHColorPickerProps) {
  const [showColorPicker, setShowColorPicker] = useState(true);
  const [color, setColor] = useState(() => args.color || "#008080");
  function saveColor() {
    if (args.onSave) {
      args.onSave(color);
    }
    setShowColorPicker(false);
  }
  function changeColor(color: ColorResult) {
    setColor(hsvaToHex(color.hsva));
  }
  if (showColorPicker) {
    return (
      <Stack
        gap={2}
        sx={{ width: "230px", margin: "auto", backgroundColor: "white" }}
      >
        <Chrome {...args} color={color} onChange={changeColor} />
        <Divider />
        <Stack
          direction="row"
          gap={2}
          justifyContent="end"
          sx={{ paddingRight: "8px", paddingBottom: "8px" }}
        >
          <Button
            color="info"
            onClick={() => {
              setShowColorPicker(false);
              if (args.onCancel) {
                args.onCancel();
              }
            }}
            size="small"
            variant="text"
          >
            Cancel
          </Button>
          <Button
            color="primary"
            onClick={saveColor}
            size="small"
            startIcon={<SaveIcon />}
            variant="contained"
          >
            Save
          </Button>
        </Stack>
      </Stack>
    );
  }
  return null;
}
