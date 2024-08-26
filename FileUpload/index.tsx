import React, { useEffect, useRef, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import { Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "1px solid #000",
  boxShadow: 24,
  p: 4,
};

const initialDropZoneStyles = {
  height: "200px",
  padding: "25px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  cursor: "pointer",
  color: "info.light",
  border: ".5px dashed",
  borderColor: "info.main",
  marginBottom: 1,
  ":hover": {
    backgroundColor: "rgba(0, 128, 128, 0.2)",
  },
};

export interface FileUploadProps {
  label: string;
  title: string;
  fileTypes: string[];
  isMultiple: boolean;
  maxSize?: number;
  position?: "vertical" | "horizontal";
  maxHeight?: number;
  name: string;
  onChange?: (base64Image: string | string[]) => void;
}

export function FileUpload(args: FileUploadProps) {
  const { maxSize = 22 * 270 } = args;
  const { maxHeight = 36 } = args;
  const { position = "horizontal" } = args;
  const filesContainer = useRef(null);
  const inputElement = useRef(null);
  const dropZone = useRef(null);
  const [fileNameContainer, setFileNameContainer] = useState<React.ReactNode>();
  const [open, setOpen] = useState(false);
  const [dropZoneStyle, setDropZoneStyle] = useState(initialDropZoneStyles);
  useEffect(() => {
    function onDropZoneClick() {
      if (inputElement && inputElement.current !== null) {
        const fileInput = inputElement.current as HTMLInputElement;
        fileInput.click();
      }
    }

    function onFileInputChange() {
      setOpen(false);
      updateThumbNail();
    }

    function updateThumbNail() {
      if (inputElement && inputElement.current !== null) {
        const fileInput = inputElement.current as HTMLInputElement;
        if (fileInput.files != null) {
          const fileNameContainers: React.ReactNode[] = [];
          if (fileInput.files.length === 1) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
              if (reader.result) {
                if (typeof reader.result === "string") {
                  const imageTag = (
                    <img src={reader.result} style={{ maxHeight: "inherit" }} />
                  );
                  if (args.onChange) {
                    args.onChange(reader.result);
                  }
                  setFileNameContainer(imageTag);
                }
              }
            });
            reader.readAsDataURL(fileInput.files[0]);
          } else {
            let images: React.ReactNode[] = [];
            let base64Images: string[] = [];
            for (const file of Array.from(fileInput.files)) {
              const reader = new FileReader();
              reader.addEventListener("load", () => {
                if (reader.result) {
                  if (typeof reader.result === "string") {
                    const imageTag = (
                      <img
                        alt=""
                        src={reader.result}
                        style={{ maxHeight: "inherit" }}
                      />
                    );
                    base64Images = [...base64Images, reader.result];
                    images = [...images, imageTag];
                    if (base64Images.length === fileInput.files?.length) {
                      if (args.onChange) {
                        args.onChange(base64Images);
                      }
                      setFileNameContainer(images);
                    }
                  }
                }
              });
              reader.readAsDataURL(file);
            }
          }
        }
      }
    }

    function dragOverEventListener(e: DragEvent) {
      e.preventDefault();
      setDropZoneStyle((dropZoneStyles) => ({
        ...dropZoneStyles,
        border: ".5px solid",
      }));
    }

    function removeSolidBorder(e: DragEvent) {
      setDropZoneStyle(() => ({
        ...initialDropZoneStyles,
      }));
    }

    function fileDropHandler(e: DragEvent) {
      e.preventDefault();
      removeSolidBorder(e);
      if (e.dataTransfer?.files) {
        if (inputElement && inputElement.current !== null) {
          const fileInput = inputElement.current as HTMLInputElement;
          fileInput.files = e.dataTransfer.files;
          const event = new Event("change", {
            bubbles: true,
            cancelable: true,
          });
          fileInput.dispatchEvent(event);
        }
      }
    }

    if (open) {
      requestAnimationFrame(() => {
        if (dropZone && dropZone.current) {
          const dropZoneArea = dropZone.current as HTMLParagraphElement;
          dropZoneArea.addEventListener("click", onDropZoneClick);
          //@ts-ignore
          const fileInput = inputElement.current as HTMLInputElement;
          fileInput.addEventListener("change", onFileInputChange);

          dropZoneArea.addEventListener("dragover", dragOverEventListener);
          dropZoneArea.addEventListener("dragleave", removeSolidBorder);
          dropZoneArea.addEventListener("dragend", removeSolidBorder);
          dropZoneArea.addEventListener("drop", fileDropHandler);

          return () => {
            if (dropZone && dropZone.current) {
              const dropZoneArea = dropZone.current as HTMLParagraphElement;
              dropZoneArea.removeEventListener("click", onDropZoneClick);
              dropZoneArea.removeEventListener(
                "dragover",
                dragOverEventListener,
              );
              dropZoneArea.removeEventListener("dragleave", removeSolidBorder);
              dropZoneArea.removeEventListener("dragend", removeSolidBorder);
              dropZoneArea.removeEventListener("drop", fileDropHandler);
            }
            if (inputElement && inputElement.current !== null) {
              const fileInput = inputElement.current as HTMLInputElement;
              fileInput.removeEventListener("change", onFileInputChange);
            }
          };
        }
      });
    }
  }, [open, args.maxSize]);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  return (
    <Box sx={{ display: "inline-block" }}>
      <Stack
        direction={position === "vertical" ? "column" : "row"}
        useFlexGap
        justifyContent="center"
        alignItems="center"
      >
        <Box ref={filesContainer} sx={{ maxHeight: `${maxHeight}px` }}>
          {fileNameContainer}
        </Box>
        <label htmlFor={args.name} style={{ display: "none" }}>
          file upload{" "}
        </label>
        <input
          id={args.name}
          type="file"
          name={args.name}
          accept={args.fileTypes.join(", ")}
          style={{ display: "none" }}
          ref={inputElement}
          multiple={args.isMultiple}
          key="fileTypeField"
          title="file upload"
        />
        <Button endIcon={<EditIcon />} onClick={handleOpen} variant="text">
          {args.label}
        </Button>
      </Stack>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} id="modal-modal-title">
          <Typography variant="h6" component="h2">
            {args.title}
          </Typography>
          <Typography
            id="modal-modal-description"
            sx={{ mt: 2, mb: 1 }}
            variant="body1"
          >
            {`${Math.round(
              maxSize / (1024 * 8),
            )}KB - TIP: We recommend using an image with a transparent
            background like a PNG.`}
          </Typography>
          <Box component="div" ref={dropZone} sx={dropZoneStyle}>
            <Typography variant="body2" sx={{ color: "info.main" }}>
              <span
                style={{
                  color: "rgba(0, 128, 128, 0.5)",
                  textDecoration: "underline",
                }}
              >
                Click to upload
              </span>{" "}
              or drag and drop{" "}
              <span style={{ color: "hsla(358, 41%, 15%, 0.65)" }}>
                {args.fileTypes.join(", ")}
              </span>
            </Typography>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
}
