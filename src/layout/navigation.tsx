import { ShoppingCart } from "@mui/icons-material";
import { Avatar, Box, Button, IconButton, Menu, MenuItem } from "@mui/material";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import Logo from "./logo";

const Navigation = () => {
  //Define
  const { auth } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  //handle logout
  const handleLogout = () => {
    localStorage.removeItem("userInfor");
    window.location.reload();
  };

  // Handle cart click
  const handleCartClick = () => {
    navigate("/cart/1");
  };

  // Handle favorite click
  const handleFavoriteClick = () => {
    navigate("/favorites/1");
    handleClose();
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        width: "100vw",
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(240, 248, 255, 0.95) 100%)",
        backdropFilter: "blur(20px)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.3)",
        justifyContent: "space-around",
        position: "fixed",
        zIndex: 1000,
        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        transition: "all 0.3s ease",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "linear-gradient(90deg, transparent, rgba(25, 118, 210, 0.05), transparent)",
          animation: "shimmer 3s infinite",
        },
        "@keyframes shimmer": {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(100%)" },
        },
      }}
    >
      <Box
        sx={{
          width: "1280px",
          display: "flex",
          position: "relative",
          zIndex: 1,
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            padding: "16px 24px",
            gap: "24px",
            position: "relative",
            "&::after": {
              content: '""',
              position: "absolute",
              right: 0,
              top: "20%",
              height: "60%",
              width: "1px",
              background:
                "linear-gradient(to bottom, transparent, rgba(25, 118, 210, 0.3), transparent)",
            },
          }}
        >
          <Box
            sx={{
              transition: "all 0.3s ease",
              "&:hover": {
                transform: "scale(1.05)",
                filter: "drop-shadow(0 4px 12px rgba(25, 118, 210, 0.3))",
              },
            }}
          >
            <Link to="/home" style={{ textDecoration: "none" }}>
              <Logo />
            </Link>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            padding: "16px 24px",
            gap: "16px", // Thêm gap để các element cách nhau
          }}
        >
          {!auth ? (
            <Link to="/" style={{ textDecoration: "none" }}>
              <Button
                variant="contained"
                sx={{
                  background:
                    "linear-gradient(45deg, #1976d2 0%, #42a5f5 100%)",
                  color: "white",
                  fontWeight: "600",
                  fontSize: "14px",
                  borderRadius: "25px",
                  px: 4,
                  py: 1.5,
                  boxShadow: "0 8px 24px rgba(25, 118, 210, 0.4)",
                  textTransform: "none",
                  position: "relative",
                  overflow: "hidden",
                  border: "2px solid transparent",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: "-100%",
                    width: "100%",
                    height: "100%",
                    background:
                      "linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                    transition: "left 0.5s ease",
                  },
                  "&:hover": {
                    background:
                      "linear-gradient(45deg, #1565c0 0%, #1976d2 100%)",
                    boxShadow: "0 12px 32px rgba(25, 118, 210, 0.6)",
                    transform: "translateY(-2px)",
                    "&::before": {
                      left: "100%",
                    },
                  },
                  "&:active": {
                    transform: "translateY(0)",
                    boxShadow: "0 4px 16px rgba(25, 118, 210, 0.4)",
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                  }}
                >
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: "50%",
                      backgroundColor: "rgba(255, 255, 255, 0.8)",
                      animation: "pulse 2s infinite",
                      "@keyframes pulse": {
                        "0%, 100%": { opacity: 0.8 },
                        "50%": { opacity: 0.4 },
                      },
                    }}
                  />
                  Đăng nhập
                </Box>
              </Button>
            </Link>
          ) : (
            <Box sx={{ display: "flex", alignItems: "center", gap: "16px" }}>
              {/* User Avatar */}
              <IconButton
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
                sx={{
                  p: 0,
                  borderRadius: "50%",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: -4,
                    left: -4,
                    right: -4,
                    bottom: -4,
                    borderRadius: "50%",
                    background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                    opacity: 0,
                    transition: "all 0.3s ease",
                    zIndex: -1,
                  },
                  "&:hover": {
                    transform: "scale(1.1)",
                    "&::before": {
                      opacity: 0.2,
                    },
                  },
                  "&:active": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <Avatar
                  alt="User Avatar"
                  src={auth.avatar}
                  sx={{
                    width: 44,
                    height: 44,
                    border: "3px solid transparent",
                    background:
                      "linear-gradient(white, white) padding-box, linear-gradient(45deg, #1976d2, #42a5f5) border-box",
                    boxShadow: "0 8px 24px rgba(25, 118, 210, 0.3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 12px 32px rgba(25, 118, 210, 0.4)",
                    },
                  }}
                />

                <Box
                  sx={{
                    position: "absolute",
                    bottom: -2,
                    right: -2,
                    width: 16,
                    height: 16,
                    borderRadius: "50%",
                    background: "linear-gradient(45deg, #4caf50, #8bc34a)",
                    border: "2px solid white",
                    boxShadow: "0 2px 8px rgba(76, 175, 80, 0.4)",
                    animation: "bounce 2s infinite",
                    "@keyframes bounce": {
                      "0%, 100%": { transform: "scale(1)" },
                      "50%": { transform: "scale(1.1)" },
                    },
                  }}
                />
              </IconButton>
              {/* Cart Icon Button */}
              <IconButton
                onClick={handleCartClick}
                sx={{
                  p: 1,
                  borderRadius: "50%",
                  transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                  position: "relative",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  border: "2px solid transparent",
                  background:
                    "linear-gradient(white, white) padding-box, linear-gradient(45deg, #1976d2, #42a5f5) border-box",
                  boxShadow: "0 4px 16px rgba(25, 118, 210, 0.2)",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: -2,
                    left: -2,
                    right: -2,
                    bottom: -2,
                    borderRadius: "50%",
                    background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                    opacity: 0,
                    transition: "all 0.3s ease",
                    zIndex: -1,
                  },
                  "&:hover": {
                    transform: "scale(1.1)",
                    boxShadow: "0 8px 24px rgba(25, 118, 210, 0.3)",
                    "&::before": {
                      opacity: 0.1,
                    },
                  },
                  "&:active": {
                    transform: "scale(1.05)",
                  },
                }}
              >
                <ShoppingCart
                  sx={{
                    fontSize: "24px",
                    color: "#1976d2",
                    transition: "all 0.3s ease",
                  }}
                />
              </IconButton>
            </Box>
          )}

          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            slotProps={{
              list: {
                "aria-labelledby": "basic-button",
              },
            }}
            PaperProps={{
              sx: {
                borderRadius: 3,
                minWidth: 200,
                background: "rgba(255, 255, 255, 0.95)",
                backdropFilter: "blur(20px)",
                border: "1px solid rgba(255, 255, 255, 0.3)",
                boxShadow: "0 16px 48px rgba(0, 0, 0, 0.15)",
                mt: 1,
                overflow: "hidden",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  height: "2px",
                  background: "linear-gradient(90deg, #1976d2, #42a5f5)",
                },
              },
            }}
          >
            <MenuItem
              onClick={() => handleFavoriteClick()}
              sx={{
                fontWeight: 500,
                py: 1.5,
                px: 2,
                position: "relative",
                transition: "all 0.3s ease",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "0px",
                  background: "linear-gradient(45deg, #1976d2, #42a5f5)",
                  transition: "width 0.3s ease",
                },
                "&:hover": {
                  backgroundColor: "rgba(25, 118, 210, 0.08)",
                  color: "#1976d2",
                  transform: "translateX(4px)",
                  "&::before": {
                    width: "3px",
                  },
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#1976d2",
                    opacity: 0.6,
                  }}
                />
                Danh sách yêu thích
              </Box>
            </MenuItem>

            <MenuItem
              onClick={handleLogout}
              sx={{
                fontWeight: 500,
                py: 1.5,
                px: 2,
                position: "relative",
                transition: "all 0.3s ease",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: "0px",
                  background: "linear-gradient(45deg, #d32f2f, #f44336)",
                  transition: "width 0.3s ease",
                },
                "&:hover": {
                  backgroundColor: "rgba(211, 47, 47, 0.08)",
                  color: "#d32f2f",
                  transform: "translateX(4px)",
                  "&::before": {
                    width: "3px",
                  },
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    backgroundColor: "#d32f2f",
                    opacity: 0.6,
                  }}
                />
                Đăng xuất
              </Box>
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );
};

export default Navigation;
