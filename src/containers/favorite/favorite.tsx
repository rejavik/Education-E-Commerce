import { Delete, FavoriteBorder, ShoppingCart } from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  IconButton,
  Chip,
  Paper,
  Container,
  Fade,
  Tooltip,
} from "@mui/material";
import { useEffect, useState } from "react";
import type { Product } from "../../types/ProductType";
import { formatMoney } from "../../utils/FormatMoney";

const Favorite = () => {
  const [favorites, setFavorites] = useState<Product[]>([]);

  // Load danh sách yêu thích từ localStorage
  useEffect(() => {
    const storedFavorites =
      JSON.parse(localStorage.getItem("favorites") || "[]") || [];
    setFavorites(storedFavorites);
  }, []);

  // Xóa 1 sản phẩm khỏi mục yêu thích
  const removeFromFavorites = (id: string | number) => {
    const updatedFavorites = favorites.filter((item) => item.id !== id);
    setFavorites(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Header Section */}
      <Paper
        elevation={0}
        sx={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          color: "white",
          p: 4,
          mb: 4,
          borderRadius: 3,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h3"
          fontWeight="bold"
          gutterBottom
          sx={{
            background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            mb: 2,
          }}
        >
          ❤️ Sản Phẩm Yêu Thích
        </Typography>
        <Typography variant="h6" sx={{ opacity: 0.9 }}>
          {favorites.length} sản phẩm trong danh sách yêu thích của bạn
        </Typography>
      </Paper>

      {favorites.length === 0 ? (
        <Fade in={true}>
          <Paper
            elevation={2}
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 3,
              background: "linear-gradient(145deg, #f0f2f5, #ffffff)",
            }}
          >
            <FavoriteBorder sx={{ fontSize: 80, color: "#ccc", mb: 2 }} />
            <Typography variant="h5" color="text.secondary" gutterBottom>
              Danh sách yêu thích trống
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Hãy thêm những sản phẩm bạn yêu thích vào đây!
            </Typography>
          </Paper>
        </Fade>
      ) : (
        <Grid container spacing={3}>
          {favorites.map((product: Product, index) => (
            <Grid size={{ xs: 12, md: 6, lg: 4 }} key={product.id}>
              <Fade in={true} timeout={300 + index * 100}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    overflow: "hidden",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-8px)",
                      boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <Box sx={{ position: "relative", overflow: "hidden" }}>
                    <CardMedia
                      component="img"
                      image={
                        product.img || "https://via.placeholder.com/300x250"
                      }
                      alt={product.productName}
                      sx={{
                        height: 250,
                        objectFit: "cover",
                        transition: "transform 0.3s ease",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                    />
                    <Chip
                      label="Yêu thích"
                      color="error"
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 12,
                        right: 12,
                        fontWeight: "bold",
                        background: "rgba(244, 67, 54, 0.9)",
                        color: "white",
                      }}
                    />
                  </Box>

                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography
                      variant="h6"
                      fontWeight="bold"
                      gutterBottom
                      sx={{
                        minHeight: 48,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {product.productName}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                      <Typography
                        variant="h5"
                        fontWeight="bold"
                        sx={{
                          color: "#f44336",
                          background:
                            "linear-gradient(45deg, #f44336, #ff5722)",
                          WebkitBackgroundClip: "text",
                          WebkitTextFillColor: "transparent",
                        }}
                      >
                        {formatMoney(product.price)}
                      </Typography>
                    </Box>

                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Button
                        variant="contained"
                        size="small"
                        startIcon={<ShoppingCart />}
                        sx={{
                          flex: 1,
                          borderRadius: 2,
                          background:
                            "linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)",
                          "&:hover": {
                            background:
                              "linear-gradient(45deg, #1976D2 30%, #0288D1 90%)",
                          },
                        }}
                      >
                        Mua ngay
                      </Button>

                      <Tooltip title="Xóa khỏi yêu thích" arrow>
                        <IconButton
                          color="error"
                          onClick={() => removeFromFavorites(product.id)}
                          sx={{
                            borderRadius: 2,
                            border: "1px solid #f44336",
                            "&:hover": {
                              backgroundColor: "#f44336",
                              color: "white",
                              transform: "scale(1.1)",
                            },
                          }}
                        >
                          <Delete />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Favorite;
