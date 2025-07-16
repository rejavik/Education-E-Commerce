import React, { useState } from "react";
import {
  Box,
  Button,
  Paper,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  Link,
  Divider,
  Alert,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
  Google,
  Facebook,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import axios from "axios";
import type { UserType } from "../../types/UserType";
import { toast } from "react-toastify";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setAuth } = useAuth();
  const [accountName, setAccountName] = React.useState("");
  const [password, setPassword] = React.useState("");

  const handleSubmit = async (
    accountName: string,
    password: string,
    e: any
  ) => {
    e.preventDefault();
    try {
      const res: any = await axios.get(
        "https://686f659991e85fac42a0db8f.mockapi.io/user/1"
      );
      if (res.data.accountName === accountName) {
        if (res.data.passWord === password) {
          const user: UserType = {
            createdAt: res.data.createdAt,
            name: res.data.name,
            avatar: res.data.avatar,
            accountName: res.data.accountName,
            categoriesSuggest: res.data.categoriesSuggest,
          };
          localStorage.setItem("userInfor", JSON.stringify(user));
          setAuth(res?.data);
          toast.success("Đăng nhập thành công");
          navigate("/home");
        } else {
          toast.error("Mật khẩu không đúng");
        }
      } else {
        toast.error("Tên tài khoản không đúng");
      }
    } catch (error) {
      toast.error("Đăng nhập thất bại, vui lòng thử lại sau");
    }
  };

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.7), rgba(255, 255, 255, 0.7)),
          url('https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&w=1950&q=80')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Paper
        elevation={24}
        sx={{
          padding: { xs: 3, sm: 4 },
          width: "100%",
          maxWidth: "420px",
          borderRadius: 4,
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
        }}
      >
        {/* Header */}
        <Box textAlign="center" mb={4}>
          <Typography
            variant="h4"
            fontWeight="700"
            sx={{
              background: "linear-gradient(45deg, #667eea, #764ba2)",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              color: "transparent",
              mb: 1,
            }}
          >
            Chào mừng
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Đăng nhập vào tài khoản của bạn
          </Typography>
        </Box>

        {/* Form */}
        <Box component="form">
          <TextField
            fullWidth
            label="Tên tài khoản"
            value={accountName}
            onChange={(e) => setAccountName(e.target.value)}
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Person color="action" />
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(102, 126, 234, 0.15)",
                },
                "&.Mui-focused": {
                  boxShadow: "0 4px 12px rgba(102, 126, 234, 0.25)",
                },
              },
            }}
          />

          <TextField
            fullWidth
            label="Mật khẩu"
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            margin="normal"
            variant="outlined"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Lock color="action" />
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={{
              "& .MuiOutlinedInput-root": {
                borderRadius: 3,
                transition: "all 0.3s ease",
                "&:hover": {
                  boxShadow: "0 4px 12px rgba(102, 126, 234, 0.15)",
                },
                "&.Mui-focused": {
                  boxShadow: "0 4px 12px rgba(102, 126, 234, 0.25)",
                },
              },
            }}
          />

          {/* Forgot Password */}
          <Box display="flex" justifyContent="flex-end" mt={1} mb={2}>
            <Link
              href="#"
              underline="hover"
              color="primary"
              sx={{ fontSize: "0.9rem" }}
            >
              Quên mật khẩu?
            </Link>
          </Box>

          {/* Login Button */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            onClick={() => handleSubmit(accountName, password, event)}
            sx={{
              mt: 2,
              mb: 2,
              borderRadius: 3,
              background: "linear-gradient(45deg, #667eea, #764ba2)",
              color: "white",
              fontWeight: "bold",
              textTransform: "none",
              fontSize: "1.1rem",
              padding: "12px 0",
              boxShadow: "0 8px 24px rgba(102, 126, 234, 0.4)",
              transition: "all 0.3s ease",
              "&:hover": {
                background: "linear-gradient(45deg, #5a67d8, #6b46c1)",
                boxShadow: "0 12px 32px rgba(102, 126, 234, 0.5)",
                transform: "translateY(-2px)",
              },
            }}
          >
            Đăng nhập
          </Button>

          {/* Divider */}
          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              Hoặc
            </Typography>
          </Divider>

          {/* Social Login */}
          <Box display="flex" gap={1} mb={3}>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Google />}
              sx={{
                borderRadius: 3,
                textTransform: "none",
                borderColor: "#db4437",
                color: "#db4437",
                "&:hover": {
                  borderColor: "#db4437",
                  backgroundColor: "rgba(219, 68, 55, 0.04)",
                },
              }}
            >
              Google
            </Button>
            <Button
              fullWidth
              variant="outlined"
              startIcon={<Facebook />}
              sx={{
                borderRadius: 3,
                textTransform: "none",
                borderColor: "#4267B2",
                color: "#4267B2",
                "&:hover": {
                  borderColor: "#4267B2",
                  backgroundColor: "rgba(66, 103, 178, 0.04)",
                },
              }}
            >
              Facebook
            </Button>
          </Box>

          {/* Sign Up Link */}
          <Box textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Chưa có tài khoản?{" "}
              <Link
                href="#"
                underline="hover"
                color="primary"
                fontWeight="bold"
              >
                Đăng ký ngay
              </Link>
            </Typography>
          </Box>
        </Box>
      </Paper>
    </Box>
  );
};

export default LoginPage;
