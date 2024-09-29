import * as React from "react";
import Box from "@mui/material/Box";

interface TabPanelProps {
  children?: React.ReactNode;
  id: string;
  index: number;
  value: number;
}

export function FlatTabPanel(props: TabPanelProps) {
  const { children, value, index, id, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={id} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}
