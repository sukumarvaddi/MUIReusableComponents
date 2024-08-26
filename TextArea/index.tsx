import React, { useState } from "react";
import type { TextFieldProps } from "@mui/material/TextField";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";

export type TextAreaProps = TextFieldProps & { maxLength?: number };

export function TextArea({ maxLength = 20, ...rest }: TextAreaProps) {
  const [value, setValue] = useState(() => (rest.value as string) || "");
  maxLength = maxLength < 1 || !maxLength ? 20 : maxLength;
  const { onChange, rows, error = false, helperText = "" } = rest;

  const maxRows = rows !== undefined ? Number(rows) + 10 : 10;

  function onCharEnter(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) {
    if (event.target.value.length <= maxLength) {
      setValue(event.target.value);

      if (onChange) {
        onChange(event);
      }
    }
  }

  return (
    <Box sx={{ width: "100%" }}>
      <TextField
        fullWidth
        multiline
        rows={maxRows}
        {...rest}
        error={error}
        helperText={helperText}
        onBlur={(event) => {
          setValue(event.target.value.trim());
          event.target.value = event.target.value.trim();
          if (rest.onBlur) {
            rest.onBlur(event);
          }
        }}
        onChange={onCharEnter}
        value={value}
      />
      {maxLength ? (
        <Box
          sx={{
            backgroundColor: "divider",
            height: "38px",
            display: "flex",
            justifyContent: "flex-end",
            fontFamily: "Source Sans Pro,Helvetica,Arial,sans-serif",
            alignItems: "center",
            paddingRight: "8px",
            marginTop:
              helperText?.toString().trim() !== "" ? "-3.92rem" : "-38px",
          }}
        >
          {value.length < maxLength ? value.length : maxLength}/{maxLength}
        </Box>
      ) : null}
    </Box>
  );
}
