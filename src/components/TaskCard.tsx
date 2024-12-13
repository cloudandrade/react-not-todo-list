import React, { useState } from "react";
import {
  Card,
  CardContent,
  IconButton,
  Typography,
  CardHeader,
  Box,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";

type TaskCardProps = {
  title: string;
  description: string;
  onEdit: () => void;
  onDelete: () => void;
};

const TaskCard: React.FC<TaskCardProps> = ({
  title,
  description,
  onEdit,
  onDelete,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Card
      sx={{
        mb: 2,
        boxShadow: 3,
        position: "relative",
      }}
      onClick={() => setExpanded(!expanded)}
    >
      <CardHeader
        sx={{
          p: 1,
          display: "flex",
          alignItems: "center",
        }}
        action={
          <Box>
            <IconButton
              size="small"
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
            >
              <Edit />
            </IconButton>
            <IconButton
              size="small"
              color="error"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <Delete />
            </IconButton>
          </Box>
        }
      />
      <CardContent sx={{ pt: 0 }}>
        <Typography variant="h6">{title}</Typography>
        {expanded && <Typography sx={{ mt: 1 }}>{description}</Typography>}
      </CardContent>
    </Card>
  );
};

export default TaskCard;
