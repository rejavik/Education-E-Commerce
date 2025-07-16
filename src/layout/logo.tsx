import { Tooltip, Typography } from "@mui/material";
import { FontSizes } from "../enum/fontSizes";
import { Colors } from "../enum/colors";

const Logo = () => {
  return (
    <Tooltip title="Trang chủ" arrow placement="right">
      <Typography sx={{ fontSize: FontSizes.h3, color: Colors.primary }}>
        📚 Education
      </Typography>
    </Tooltip>
  );
};

export default Logo;
