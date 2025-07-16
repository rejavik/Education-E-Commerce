import {
  Box,
  CardMedia,
  Typography,
  TextField,
  Button,
  Paper,
  Divider,
  Chip,
  IconButton,
  Rating,
  Stack,
  Card,
  CardContent,
  Fade,
  useTheme,
  alpha,
} from "@mui/material";
import {
  ShoppingCart,
  FavoriteBorder,
  Share,
  Add,
  Remove,
  LocalShipping,
  Security,
  Verified,
} from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState } from "react";
import type { Product } from "../../../types/ProductType";
import { formatMoney } from "../../../utils/FormatMoney";

interface ProductDetailPageProps {
  product: any;
}

const ProductDetailPage: React.FC<ProductDetailPageProps> = ({ product }) => {
  const theme = useTheme();
  //Define state for product data
  const [productData, setProductData] = useState<Product>();
  const [quantity, setQuantity] = useState(1);

  //Call API

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `https://686f659991e85fac42a0db8f.mockapi.io/products/${product.id}`
        );
        console.log("Product Data:", response?.data);
        setProductData(response?.data);
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };

    fetchProduct();
  }, [product]);

  return (
    <Box
      sx={{
        maxWidth: 1200,
        mx: "auto",
        py: { xs: 2, md: 4 },
        px: { xs: 2, md: 3 },
      }}
    >
      <Fade in timeout={600}>
        <Card
          elevation={0}
          sx={{
            borderRadius: 4,
            overflow: "hidden",
            background: `linear-gradient(135deg, ${alpha(
              theme.palette.primary.light,
              0.02
            )} 0%, ${alpha(theme.palette.secondary.light, 0.02)} 100%)`,
            border: `1px solid ${alpha(theme.palette.divider, 0.1)}`,
          }}
        >
          <CardContent sx={{ p: { xs: 2, md: 4 } }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: { xs: "column", md: "row" },
                gap: { xs: 3, md: 6 },
              }}
            >
              {/* Product Image Section */}
              <Box
                sx={{
                  flex: { xs: "none", md: "0 0 450px" },
                  position: "relative",
                }}
              >
                <Paper
                  elevation={8}
                  sx={{
                    borderRadius: 3,
                    overflow: "hidden",
                    position: "relative",
                    "&::before": {
                      content: '""',
                      position: "absolute",
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: `linear-gradient(45deg, ${alpha(
                        theme.palette.primary.main,
                        0.1
                      )} 0%, transparent 50%, ${alpha(
                        theme.palette.secondary.main,
                        0.1
                      )} 100%)`,
                      zIndex: 1,
                      pointerEvents: "none",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    image={
                      productData?.img || "https://via.placeholder.com/450x600"
                    }
                    alt={productData?.productName}
                    sx={{
                      width: "100%",
                      height: { xs: 300, md: 450 },
                      objectFit: "cover",
                      transition: "transform 0.3s ease",
                      "&:hover": {
                        transform: "scale(1.05)",
                      },
                    }}
                  />
                </Paper>

                {/* Action buttons overlay */}
                <Box
                  sx={{
                    position: "absolute",
                    top: 16,
                    right: 16,
                    display: "flex",
                    flexDirection: "column",
                    gap: 1,
                  }}
                >
                  <IconButton
                    sx={{
                      backgroundColor: alpha(
                        theme.palette.background.paper,
                        0.9
                      ),
                      backdropFilter: "blur(10px)",
                      "&:hover": {
                        backgroundColor: alpha(
                          theme.palette.background.paper,
                          1
                        ),
                      },
                    }}
                  >
                    <FavoriteBorder />
                  </IconButton>
                  <IconButton
                    sx={{
                      backgroundColor: alpha(
                        theme.palette.background.paper,
                        0.9
                      ),
                      backdropFilter: "blur(10px)",
                      "&:hover": {
                        backgroundColor: alpha(
                          theme.palette.background.paper,
                          1
                        ),
                      },
                    }}
                  >
                    <Share />
                  </IconButton>
                </Box>
              </Box>

              {/* Product Info Section */}
              <Box sx={{ flex: 1 }}>
                <Stack spacing={3}>
                  {/* Header */}
                  <Box>
                    <Chip
                      label="Mới nhất"
                      color="primary"
                      size="small"
                      sx={{ mb: 2 }}
                    />
                    <Typography
                      variant="h3"
                      fontWeight="bold"
                      sx={{
                        mb: 1,
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                        backgroundClip: "text",
                        WebkitBackgroundClip: "text",
                        color: "transparent",
                        fontSize: { xs: "1.8rem", md: "2.5rem" },
                      }}
                    >
                      {productData?.productName}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        mb: 2,
                      }}
                    >
                      <Rating value={4.5} readOnly precision={0.5} />
                      <Typography variant="body2" color="text.secondary">
                        {productData?.rating || "Chưa có đánh giá"}
                      </Typography>
                    </Box>
                  </Box>

                  {/* Price */}
                  <Box
                    sx={{
                      p: 3,
                      backgroundColor: alpha(theme.palette.primary.main, 0.05),
                      borderRadius: 2,
                      border: `1px solid ${alpha(
                        theme.palette.primary.main,
                        0.1
                      )}`,
                    }}
                  >
                    <Typography
                      variant="h4"
                      fontWeight="bold"
                      sx={{
                        color: theme.palette.primary.main,
                        mb: 1,
                      }}
                    >
                      {formatMoney(productData?.price)}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {formatMoney(productData?.price)}
                      <Chip
                        label="-20%"
                        color="error"
                        size="small"
                        sx={{ ml: 1 }}
                      />
                    </Typography>
                  </Box>

                  {/* Description */}
                  <Box>
                    <Typography variant="h6" fontWeight="600" gutterBottom>
                      Mô tả sản phẩm
                    </Typography>
                    <Typography
                      variant="body1"
                      color="text.secondary"
                      sx={{
                        lineHeight: 1.7,
                        backgroundColor: alpha(
                          theme.palette.background.default,
                          0.5
                        ),
                        p: 2,
                        borderRadius: 2,
                        border: `1px solid ${alpha(
                          theme.palette.divider,
                          0.1
                        )}`,
                      }}
                    >
                      {productData?.detail || "Mô tả sản phẩm đang cập nhật..."}
                    </Typography>
                  </Box>

                  <Divider />

                  {/* Quantity Selection */}
                  <Box>
                    <Typography variant="h6" fontWeight="600" gutterBottom>
                      Số lượng
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                        p: 2,
                        backgroundColor: alpha(
                          theme.palette.background.default,
                          0.5
                        ),
                        borderRadius: 2,
                        border: `1px solid ${alpha(
                          theme.palette.divider,
                          0.1
                        )}`,
                        width: "fit-content",
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        sx={{
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.1
                          ),
                          "&:hover": {
                            backgroundColor: alpha(
                              theme.palette.primary.main,
                              0.2
                            ),
                          },
                        }}
                      >
                        <Remove />
                      </IconButton>

                      <TextField
                        type="number"
                        size="small"
                        value={quantity}
                        onChange={(e) =>
                          setQuantity(
                            Math.max(1, parseInt(e.target.value) || 1)
                          )
                        }
                        sx={{
                          width: 80,
                          "& .MuiOutlinedInput-root": {
                            textAlign: "center",
                            fontWeight: "bold",
                          },
                        }}
                        inputProps={{ min: 1, style: { textAlign: "center" } }}
                      />

                      <IconButton
                        size="small"
                        onClick={() => setQuantity(quantity + 1)}
                        sx={{
                          backgroundColor: alpha(
                            theme.palette.primary.main,
                            0.1
                          ),
                          "&:hover": {
                            backgroundColor: alpha(
                              theme.palette.primary.main,
                              0.2
                            ),
                          },
                        }}
                      >
                        <Add />
                      </IconButton>
                    </Box>
                  </Box>

                  {/* Action Buttons */}
                  <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
                    <Button
                      variant="contained"
                      size="large"
                      startIcon={<ShoppingCart />}
                      sx={{
                        py: 1.5,
                        px: 4,
                        borderRadius: 2,
                        fontWeight: "bold",
                        background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                        "&:hover": {
                          background: `linear-gradient(45deg, ${theme.palette.primary.dark}, ${theme.palette.primary.main})`,
                          transform: "translateY(-2px)",
                          boxShadow: theme.shadows[8],
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      Thêm vào giỏ hàng
                    </Button>

                    <Button
                      variant="outlined"
                      size="large"
                      sx={{
                        py: 1.5,
                        px: 4,
                        borderRadius: 2,
                        fontWeight: "bold",
                        borderWidth: 2,
                        "&:hover": {
                          borderWidth: 2,
                          transform: "translateY(-2px)",
                          boxShadow: theme.shadows[4],
                        },
                        transition: "all 0.3s ease",
                      }}
                    >
                      Mua ngay
                    </Button>
                  </Stack>

                  {/* Features */}
                  <Box
                    sx={{
                      mt: 3,
                      p: 2,
                      backgroundColor: alpha(theme.palette.success.main, 0.05),
                      borderRadius: 2,
                      border: `1px solid ${alpha(
                        theme.palette.success.main,
                        0.1
                      )}`,
                    }}
                  >
                    <Stack direction="row" spacing={3} flexWrap="wrap">
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <LocalShipping color="success" />
                        <Typography variant="body2" fontWeight="500">
                          Miễn phí vận chuyển
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Security color="success" />
                        <Typography variant="body2" fontWeight="500">
                          Bảo hành 12 tháng
                        </Typography>
                      </Box>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <Verified color="success" />
                        <Typography variant="body2" fontWeight="500">
                          Chính hãng 100%
                        </Typography>
                      </Box>
                    </Stack>
                  </Box>
                </Stack>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Fade>
    </Box>
  );
};

export default ProductDetailPage;
