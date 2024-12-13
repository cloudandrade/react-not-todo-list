import React, { useState } from "react";
import { Modal, Box, TextField, Button, Typography } from "@mui/material";

type TaskModalProps = {
  open: boolean;
  onClose: () => void;
  onSave: (data: { title: string; description: string }) => void;
  initialData?: { title: string; description: string };
};

const TaskModal: React.FC<TaskModalProps> = ({
  open,
  onClose,
  onSave,
  initialData,
}) => {
  const [title, setTitle] = useState(initialData?.title || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  const handleSave = () => {
    onSave({ title, description });
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "90%",
          maxWidth: 400,
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          borderRadius: 2,
        }}
      >
        <Typography variant="h6" mb={2}>
          {initialData ? "Editar Task" : "Adicionar Task"}
        </Typography>
        <TextField
          fullWidth
          label="Título"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
          sx={{ mb: 2 }}
        />
        <Button fullWidth variant="contained" onClick={handleSave}>
          Salvar
        </Button>
      </Box>
    </Modal>
  );
};

export default TaskModal;
