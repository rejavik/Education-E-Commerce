import {
  Add,
  Delete,
  Favorite,
  LocalShipping,
  Remove,
  Security,
  ShoppingCart,
  Star,
} from "@mui/icons-material";
import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Fade,
  Grid,
  IconButton,
  Paper,
  Snackbar,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { formatMoney } from "../../utils/FormatMoney";
import { Link } from "react-router-dom";

export default function Cart() {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Sách tiếng Anh giao tiếp cho người mất gốc",
      price: 350000,
      quantity: 1,
      image:
        "https://elight.edu.vn/wp-content/uploads/2019/01/gioi-thieu-1.png",
      originalPrice: 450000,
      discount: 22,
      rating: 4.5,
      inStock: true,
    },
    {
      id: 2,
      name: "Sách ngữ pháp tiếng anh toàn diện",
      price: 680000,
      quantity: 1,
      image:
        "https://etest.edu.vn/wp-content/uploads/2020/03/sach-ngu-phap-tieng-anh-nang-cao-1.jpg",
      originalPrice: 800000,
      discount: 15,
      rating: 4.8,
      inStock: true,
    },
    {
      id: 3,
      name: "Từ điển tiếng Anh Oxford",
      price: 1200000,
      quantity: 1,
      image:
        "https://static.oreka.vn/800-800_2dff0c26-7837-421d-a642-439f3acc4f88",
      originalPrice: 1500000,
      discount: 20,
      rating: 4.7,
      inStock: false,
    },
  ]);

  const [snackbar, setSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "info" | "warning" | "error";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    setCartItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
    setSnackbar({
      open: true,
      message: "Đã xóa sản phẩm khỏi giỏ hàng",
      severity: "info",
    });
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const totalOriginalPrice = cartItems.reduce(
    (sum, item) => sum + item.originalPrice * item.quantity,
    0
  );
  const totalSavings = totalOriginalPrice - totalPrice;

  const QuantityControl = ({
    item,
  }: {
    item: { id: number; quantity: number };
  }) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        border: "1px solid #e0e0e0",
        borderRadius: 2,
        overflow: "hidden",
      }}
    >
      <IconButton
        size="small"
        onClick={() => updateQuantity(item.id, item.quantity - 1)}
        disabled={item.quantity <= 1}
        sx={{ borderRadius: 0 }}
      >
        <Remove fontSize="small" />
      </IconButton>
      <TextField
        size="small"
        value={item.quantity}
        onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)}
        sx={{
          width: 60,
          "& .MuiOutlinedInput-root": {
            borderRadius: 0,
            "& fieldset": { border: "none" },
          },
          "& input": { textAlign: "center", py: 0.5 },
        }}
        inputProps={{ min: 1 }}
      />
      <IconButton
        size="small"
        onClick={() => updateQuantity(item.id, item.quantity + 1)}
        sx={{ borderRadius: 0 }}
      >
        <Add fontSize="small" />
      </IconButton>
    </Box>
  );

  return (
    <Box
      sx={{
        py: 4,
        px: 2,
        mt: 2,
        borderRadius: 3,
        maxWidth: 1200,
        mx: "auto",
        background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Header */}
      <Paper
        elevation={0}
        sx={{ p: 3, mb: 3, borderRadius: 3, background: "white" }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ bgcolor: "primary.main", width: 48, height: 48 }}>
            <ShoppingCart />
          </Avatar>
          <Box>
            <Typography variant="h4" fontWeight="bold" color="primary.main">
              Giỏ Hàng Của Bạn
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {cartItems.length} sản phẩm đang chờ thanh toán
            </Typography>
          </Box>
        </Stack>
      </Paper>

      {cartItems.length === 0 ? (
        <Paper
          elevation={0}
          sx={{ p: 6, textAlign: "center", borderRadius: 3 }}
        >
          <ShoppingCart sx={{ fontSize: 80, color: "text.disabled", mb: 2 }} />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            Giỏ hàng đang trống
          </Typography>
          <Typography variant="body1" color="text.secondary" mb={3}>
            Hãy thêm sản phẩm yêu thích vào giỏ hàng
          </Typography>
          <Button variant="contained" size="large" sx={{ borderRadius: 3 }}>
            Tiếp tục mua sắm
          </Button>
        </Paper>
      ) : (
        <>
          {/* Cart Items */}
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 8 }}>
              <Stack spacing={2}>
                {cartItems.map((item, index) => (
                  <Fade in timeout={500 + index * 100} key={item.id}>
                    <Card
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        p: 2,
                        borderRadius: 3,
                        boxShadow: "0 4px 20px rgba(0,0,0,0.08)",
                        position: "relative",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          boxShadow: "0 8px 30px rgba(0,0,0,0.12)",
                          transform: "translateY(-2px)",
                        },
                      }}
                    >
                      {/* Discount Badge */}
                      {item.discount > 0 && (
                        <Chip
                          label={`-${item.discount}%`}
                          color="error"
                          size="small"
                          sx={{
                            position: "absolute",
                            top: 8,
                            left: 8,
                            zIndex: 1,
                            fontWeight: "bold",
                          }}
                        />
                      )}

                      {/* Stock Status */}
                      {!item.inStock && (
                        <Chip
                          label="Hết hàng"
                          color="warning"
                          size="small"
                          sx={{
                            position: "absolute",
                            top: 8,
                            right: 8,
                            zIndex: 1,
                          }}
                        />
                      )}

                      <CardMedia
                        component="img"
                        image={item.image}
                        alt={item.name}
                        sx={{
                          width: 120,
                          height: 160,
                          objectFit: "cover",
                          borderRadius: 2,
                          mr: 2,
                        }}
                      />

                      <CardContent sx={{ flex: 1, p: 0 }}>
                        <Typography variant="h6" fontWeight="bold" gutterBottom>
                          {item.name}
                        </Typography>

                        {/* Rating */}
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          mb={1}
                        >
                          <Star sx={{ color: "orange", fontSize: 16 }} />
                          <Typography variant="body2" color="text.secondary">
                            {item.rating}
                          </Typography>
                        </Stack>

                        {/* Price */}
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={1}
                          mb={2}
                        >
                          <Typography
                            variant="h6"
                            color="primary"
                            fontWeight="bold"
                          >
                            {formatMoney(item.price)}
                          </Typography>
                          {item.originalPrice > item.price && (
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ textDecoration: "line-through" }}
                            >
                              {formatMoney(item.originalPrice)}
                            </Typography>
                          )}
                        </Stack>

                        {/* Controls */}
                        <Stack direction="row" alignItems="center" spacing={2}>
                          <Typography variant="body2" color="text.secondary">
                            Số lượng:
                          </Typography>
                          <QuantityControl item={item} />
                          <Tooltip title="Xóa khỏi giỏ hàng">
                            <IconButton
                              onClick={() => removeItem(item.id)}
                              color="error"
                              sx={{
                                "&:hover": {
                                  backgroundColor: "error.light",
                                  color: "white",
                                },
                              }}
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Thêm vào yêu thích">
                            <IconButton color="secondary">
                              <Favorite />
                            </IconButton>
                          </Tooltip>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Fade>
                ))}
              </Stack>
            </Grid>

            {/* Order Summary */}
            <Grid size={{ xs: 12, md: 4 }}>
              <Paper
                elevation={0}
                sx={{ p: 3, borderRadius: 3, position: "sticky", top: 20 }}
              >
                <Typography variant="h6" fontWeight="bold" mb={2}>
                  Tóm tắt đơn hàng
                </Typography>

                <Stack spacing={2} mb={3}>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>Tạm tính:</Typography>
                    <Typography>
                      {totalOriginalPrice.toLocaleString()} đ
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      color: "success.main",
                    }}
                  >
                    <Typography>Giảm giá:</Typography>
                    <Typography>-{totalSavings.toLocaleString()} đ</Typography>
                  </Box>
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography>Phí vận chuyển:</Typography>
                    <Typography color="success.main">Miễn phí</Typography>
                  </Box>
                  <Divider />
                  <Box
                    sx={{ display: "flex", justifyContent: "space-between" }}
                  >
                    <Typography variant="h6" fontWeight="bold">
                      Tổng cộng:
                    </Typography>
                    <Typography variant="h6" fontWeight="bold" color="primary">
                      {totalPrice.toLocaleString()} đ
                    </Typography>
                  </Box>
                </Stack>

                <Button
                  variant="contained"
                  fullWidth
                  size="large"
                  sx={{
                    mb: 2,
                    py: 1.5,
                    borderRadius: 3,
                    background:
                      "linear-gradient(45deg, #FF6B6B 30%, #4ECDC4 90%)",
                    "&:hover": {
                      background:
                        "linear-gradient(45deg, #FF5252 30%, #26C6DA 90%)",
                    },
                  }}
                >
                  Tiến hành thanh toán
                </Button>
                <Link to="/home">
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{ borderRadius: 3, mb: 3 }}
                  >
                    Tiếp tục mua sắm
                  </Button>
                </Link>

                {/* Trust Badges */}
                <Stack spacing={1}>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <LocalShipping color="primary" fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      Miễn phí vận chuyển từ 500k
                    </Typography>
                  </Stack>
                  <Stack direction="row" alignItems="center" spacing={1}>
                    <Security color="primary" fontSize="small" />
                    <Typography variant="body2" color="text.secondary">
                      Thanh toán an toàn 100%
                    </Typography>
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
