import {
  Favorite,
  FavoriteBorder,
  ShoppingCart,
  Visibility,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  FormControl,
  Grid,
  IconButton,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Paper,
  Rating,
  Select,
  Skeleton,
  Stack,
  TextField,
  Tooltip,
  Typography,
  useTheme,
  Zoom,
  type SelectChangeEvent,
  type Theme,
} from "@mui/material";
import axios from "axios";
import React, { useEffect } from "react";
import type { Product } from "../../types/ProductType";
import { formatMoney } from "../../utils/FormatMoney";
import { useNavigate } from "react-router-dom";

interface Category {
  id: string;
  name: string;
  renderName: string;
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const names: Category[] = [
  {
    id: "1",
    name: "English",
    renderName: "Tiếng anh",
  },
  {
    id: "2",
    name: "literature",
    renderName: "Văn Học",
  },
  {
    id: "3",
    name: "Grammar",
    renderName: "Ngữ Pháp",
  },
  {
    id: "4",
    name: "vocabulary",
    renderName: "Từ vựng",
  },
  {
    id: "5",
    name: "dictionary",
    renderName: "Từ điển",
  },
  {
    id: "6",
    name: "science",
    renderName: "Khoa học",
  },
  {
    id: "7",
    name: "math",
    renderName: "Toán học",
  },
  { id: "8", name: "document", renderName: "Tài liệu" },
];

function getStyles(name: string, catName: readonly string[], theme: Theme) {
  return {
    fontWeight: catName.includes(name)
      ? theme.typography.fontWeightMedium
      : theme.typography.fontWeightRegular,
  };
}

const HomeComponent = () => {
  const theme = useTheme();
  //Define state
  const navigate = useNavigate();
  const [dataProduct, setDataProduct] = React.useState<Product[]>([]);
  const [visibleCount, setVisibleCount] = React.useState(8);
  const [loading, setLoading] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [filterLoading, setFilterLoading] = React.useState(false);
  const [catName, setCatName] = React.useState<string[]>([]);
  const [searchProduct, setSearchProduct] = React.useState<string>("");
  const [price, setPrice] = React.useState<string | number>("");
  const [open, setOpen] = React.useState(false);
  const [filterData, setFilterData] = React.useState<Product[]>([]);
  const [isFavorite, setIsFavorite] = React.useState<Record<string, boolean>>(
    {}
  );

  //Handle loading more products
  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount((prev) => prev + 8);
      setLoadingMore(false);
    }, 1000);
  };

  //Call API
  const getDataProduct = async () => {
    try {
      const response = await axios.get(
        "https://686f659991e85fac42a0db8f.mockapi.io/products"
      );
      setDataProduct(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
      // Set data to empty array on error
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataProduct();
  }, []);

  // useEffect riêng để xử lý filterData khi dataProduct thay đổi
  useEffect(() => {
    if (dataProduct.length > 0) {
      // Set filterData = dataProduct khi chưa có filter nào được áp dụng
      if (
        catName.length === 0 &&
        (searchProduct === "" || searchProduct === null) &&
        (price === "" || price === 0)
      ) {
        setFilterData(dataProduct);
      }
    }
  }, [dataProduct]);

  // function để apply tất cả filters cùng lúc:
  const applyFilters = () => {
    let filtered = [...dataProduct];

    // Apply category filter
    if (catName.length > 0) {
      filtered = filtered.filter((product) =>
        product.category.some((cat) => catName.includes(cat))
      );
    }

    // Apply search filter
    if (searchProduct && searchProduct.trim() !== "") {
      filtered = filtered.filter((product) =>
        product.productName.toLowerCase().includes(searchProduct.toLowerCase())
      );
    }

    // Apply price filter
    if (price === 10) {
      filtered = filtered.filter((product) => product.price < 500000);
    } else if (price === 20) {
      filtered = filtered.filter(
        (product) => product.price >= 500000 && product.price < 1000000
      );
    } else if (price === 30) {
      filtered = filtered.filter((product) => product.price >= 1000000);
    }

    setFilterData(filtered);
  };

  // UseEffect để apply filters khi có thay đổi
  useEffect(() => {
    if (dataProduct.length > 0) {
      applyFilters();
    }
  }, [dataProduct, catName, searchProduct, price]);

  //Handle select category
  const handleChange = (event: SelectChangeEvent<typeof catName>) => {
    setFilterLoading(true);

    const {
      target: { value },
    } = event;

    const selectedCategories =
      typeof value === "string" ? value.split(",") : value;

    setCatName(selectedCategories);

    if (selectedCategories.length === 0) {
      setTimeout(() => {
        setFilterData(dataProduct);
        setFilterLoading(false);
      }, 1000);
      return;
    }

    const filtered = dataProduct.filter((product) =>
      product.category.some((cat) => selectedCategories.includes(cat))
    );

    setTimeout(() => {
      setFilterData(filtered);
      setFilterLoading(false);
    }, 1000);
  };

  //Handle search product
  const handleSearchProduct = (searchTerm: string) => {
    setSearchProduct(searchTerm);
    setFilterLoading(true);

    if (!searchTerm) {
      setTimeout(() => {
        setFilterLoading(false);
        setFilterData(dataProduct);
      }, 1000);
      return;
    }

    const filtered = dataProduct.filter((product) =>
      product.productName.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setTimeout(() => {
      setFilterLoading(false);
      setFilterData(filtered);
    }, 1000);
  };

  //Handle select price
  const handleChangePrice = (event: SelectChangeEvent<typeof price>) => {
    setFilterLoading(true);

    const {
      target: { value },
    } = event;

    const selectedPriceRange = value;
    setPrice(selectedPriceRange);

    let filtered: Product[] = [];
    if (selectedPriceRange === 10) {
      filtered = dataProduct.filter((product) => product.price < 500000);
      console.log(filtered);
    } else if (selectedPriceRange === 20) {
      filtered = dataProduct.filter(
        (product) => product.price >= 500000 && product.price < 1000000
      );
    } else if (selectedPriceRange === 30) {
      filtered = dataProduct.filter((product) => product.price >= 1000000);
    } else {
      filtered = dataProduct;
    }
    setTimeout(() => {
      setFilterData(filtered);
      setFilterLoading(false);
    }, 1000);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  //handle favorite click
  const addToFavorites = (product: Product) => {
    const existingFavorites = JSON.parse(
      localStorage.getItem("favorites") || "[]"
    );

    const isAlreadyFavorite = existingFavorites.some(
      (item: { id: string }) => item.id === product.id
    );

    let updatedFavorites;
    if (!isAlreadyFavorite) {
      updatedFavorites = [...existingFavorites, product];
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      console.log("Đã thêm vào mục yêu thích!");

      // Cập nhật state ngay lập tức
      setIsFavorite((prev) => ({ ...prev, [product.id]: true }));
    } else {
      updatedFavorites = existingFavorites.filter(
        (fav: any) => fav.id !== product.id
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      console.log("Đã xóa khỏi mục yêu thích!");

      // Cập nhật state ngay lập tức
      setIsFavorite((prev) => ({ ...prev, [product.id]: false }));
    }
  };

  //Check favorite status:

  useEffect(() => {
    if (dataProduct.length > 0) {
      const favorites = JSON.parse(localStorage.getItem("favorites") || "[]");
      const favoriteIds = new Set(favorites.map((fav: any) => fav.id));

      const newFavoriteState: Record<string, boolean> = {};
      dataProduct.forEach((product) => {
        newFavoriteState[product.id] = favoriteIds.has(product.id);
      });

      setIsFavorite(newFavoriteState);
    }
  }, [dataProduct]);

  // Hiển thị skeleton trong khi dữ liệu đang tải
  const SkeletonCard = () => (
    <Card sx={{ width: 345, maxWidth: 365, borderRadius: 3, boxShadow: 3 }}>
      <Skeleton variant="rectangular" height={200} />
      <CardContent>
        <Skeleton variant="text" width="60%" />
        <Skeleton variant="text" width="80%" />
        <Skeleton variant="text" width="40%" />
        <Stack direction="row" spacing={1} sx={{ my: 1 }}>
          <Skeleton variant="rounded" width={60} height={30} />
          <Skeleton variant="rounded" width={60} height={30} />
        </Stack>
        <Skeleton variant="text" width="30%" />
      </CardContent>
    </Card>
  );

  // Handle detail product
  const handleDetailProduct = (productId: string) => {
    navigate(`/product/${productId}`);
    console.log("Navigate to detail product:", productId);
  };

  return (
    <Box sx={{ padding: "100px" }}>
      <Box>
        <Paper
          elevation={3}
          sx={{
            background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
            borderRadius: "16px",
            overflow: "hidden",
            border: "1px solid rgba(255, 255, 255, 0.2)",
            backdropFilter: "blur(10px)",
            transition: "all 0.3s ease-in-out",
            "&:hover": {
              transform: "translateY(-2px)",
              boxShadow: "0 12px 24px rgba(0, 0, 0, 0.15)",
            },
          }}
        >
          <Grid
            spacing={2}
            container
            display="flex"
            alignItems="center"
            justifyContent="center"
            sx={{
              p: 3,
              background: "rgba(255, 255, 255, 0.9)",
              backdropFilter: "blur(10px)",
            }}
          >
            <Grid size={{ mobile: 12, tablet: 6, desktop: 4 }}>
              <Box
                sx={{
                  position: "relative",
                  "&::before": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    borderRadius: "25px",
                    background:
                      "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
                    opacity: 0,
                    transition: "opacity 0.3s ease",
                    zIndex: 0,
                  },
                  "&:hover::before": {
                    opacity: 0.1,
                  },
                }}
              >
                <TextField
                  size="small"
                  variant="outlined"
                  fullWidth
                  placeholder="🔍 Tìm kiếm sản phẩm..."
                  onChange={(e) => handleSearchProduct(e.target.value)}
                  sx={{
                    position: "relative",
                    zIndex: 1,
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "25px",
                      backgroundColor: "rgba(255, 255, 255, 0.9)",
                      backdropFilter: "blur(10px)",
                      border: "2px solid transparent",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "rgba(255, 255, 255, 1)",
                        border: "2px solid rgba(102, 126, 234, 0.3)",
                        transform: "scale(1.02)",
                      },
                    },
                    "& .MuiOutlinedInput-input": {
                      fontSize: "14px",
                      fontWeight: 500,
                    },
                    "& .MuiInputAdornment-root": {
                      marginLeft: "8px",
                    },
                  }}
                />
              </Box>
            </Grid>

            <Grid size={{ mobile: 12, tablet: 6, desktop: 4 }}>
              <FormControl
                size="small"
                fullWidth
                sx={{
                  m: 1,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "25px",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(10px)",
                    border: "2px solid transparent",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 1)",
                      border: "2px solid rgba(102, 126, 234, 0.3)",
                      transform: "scale(1.02)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    fontWeight: 500,
                    color: "#555",
                    "&.Mui-focused": {
                      color: "#667eea",
                    },
                  },
                }}
              >
                <InputLabel id="category-select-label">
                  🏷️ Lọc theo thể loại
                </InputLabel>
                <Select
                  labelId="category-select-label"
                  id="category-select"
                  fullWidth
                  multiple
                  value={catName}
                  onChange={handleChange}
                  input={
                    <OutlinedInput
                      id="select-multiple-chip"
                      label="🏷️ Lọc theo thể loại"
                    />
                  }
                  renderValue={(selected) => (
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                      {selected.map((value) => (
                        <Chip
                          key={value}
                          label={value}
                          sx={{
                            background:
                              "linear-gradient(45deg, #667eea 0%, #764ba2 100%)",
                            color: "white",
                            fontWeight: 500,
                            border: "none",
                            "&:hover": {
                              background:
                                "linear-gradient(45deg, #5a6fd8 0%, #6a4190 100%)",
                              transform: "scale(1.05)",
                            },
                            "& .MuiChip-deleteIcon": {
                              color: "rgba(255, 255, 255, 0.8)",
                              "&:hover": {
                                color: "white",
                              },
                            },
                          }}
                        />
                      ))}
                    </Box>
                  )}
                  MenuProps={{
                    ...MenuProps,
                    PaperProps: {
                      sx: {
                        borderRadius: "12px",
                        background: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                      },
                    },
                  }}
                >
                  {names.map((name) => (
                    <MenuItem
                      key={name.id}
                      value={name.renderName}
                      sx={{
                        ...getStyles(name.renderName, catName, theme),
                        borderRadius: "8px",
                        margin: "2px 8px",
                        transition: "all 0.2s ease",
                        "&:hover": {
                          backgroundColor: "rgba(102, 126, 234, 0.1)",
                          transform: "translateX(4px)",
                        },
                        "&.Mui-selected": {
                          backgroundColor: "rgba(102, 126, 234, 0.2)",
                          "&:hover": {
                            backgroundColor: "rgba(102, 126, 234, 0.3)",
                          },
                        },
                      }}
                    >
                      {name.renderName}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>

            <Grid size={{ mobile: 12, tablet: 6, desktop: 4 }}>
              <FormControl
                size="small"
                fullWidth
                sx={{
                  m: 1,
                  minWidth: 220,
                  width: "100%",
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "25px",
                    backgroundColor: "rgba(255, 255, 255, 0.9)",
                    backdropFilter: "blur(10px)",
                    border: "2px solid transparent",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      backgroundColor: "rgba(255, 255, 255, 1)",
                      border: "2px solid rgba(102, 126, 234, 0.3)",
                      transform: "scale(1.02)",
                    },
                  },
                  "& .MuiInputLabel-root": {
                    fontWeight: 500,
                    color: "#555",
                    "&.Mui-focused": {
                      color: "#667eea",
                    },
                  },
                }}
              >
                <InputLabel id="price-select-label">💰 Lọc theo giá</InputLabel>
                <Select
                  labelId="price-select-label"
                  id="price-select"
                  fullWidth
                  open={open}
                  onClose={handleClose}
                  onOpen={handleOpen}
                  value={price}
                  label="💰 Lọc theo giá"
                  onChange={handleChangePrice}
                  MenuProps={{
                    PaperProps: {
                      sx: {
                        borderRadius: "12px",
                        background: "rgba(255, 255, 255, 0.95)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                      },
                    },
                  }}
                >
                  <MenuItem
                    value=""
                    sx={{
                      borderRadius: "8px",
                      margin: "2px 8px",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: "rgba(102, 126, 234, 0.1)",
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    <em>Tất cả</em>
                  </MenuItem>
                  <MenuItem
                    value={10}
                    sx={{
                      borderRadius: "8px",
                      margin: "2px 8px",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: "rgba(102, 126, 234, 0.1)",
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    dưới 500k
                  </MenuItem>
                  <MenuItem
                    value={20}
                    sx={{
                      borderRadius: "8px",
                      margin: "2px 8px",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: "rgba(102, 126, 234, 0.1)",
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    500k - 1 triệu
                  </MenuItem>
                  <MenuItem
                    value={30}
                    sx={{
                      borderRadius: "8px",
                      margin: "2px 8px",
                      transition: "all 0.2s ease",
                      "&:hover": {
                        backgroundColor: "rgba(102, 126, 234, 0.1)",
                        transform: "translateX(4px)",
                      },
                    }}
                  >
                    trên 1 triệu
                  </MenuItem>
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        </Paper>
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: "20px",
        }}
      >
        <Grid
          container
          spacing={"50px"}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {loading || filterLoading
            ? [...Array(8)].map((index) => (
                <Grid
                  size={{ mobile: 12, tablet: 6, desktop: 3 }}
                  key={index}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <SkeletonCard />
                </Grid>
              ))
            : filterData.slice(0, visibleCount).map((product) => (
                <Grid
                  size={{ mobile: 12, tablet: 6, desktop: 3 }}
                  key={product.id}
                  display={"flex"}
                  justifyContent={"center"}
                  alignItems={"center"}
                >
                  <Card
                    sx={{
                      minWidth: { mobile: 120, tablet: 240, desktop: 275 },
                      borderRadius: 4,
                      overflow: "hidden",
                      position: "relative",
                      background:
                        "linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
                      transition: "all 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
                      cursor: "pointer",
                      "&:hover": {
                        transform: "translateY(-8px) scale(1.02)",
                        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                        "& .card-overlay": {
                          opacity: 1,
                        },
                        "& .card-actions": {
                          transform: "translateY(0)",
                          opacity: 1,
                        },
                        "& .card-image": {
                          transform: "scale(1.1)",
                        },
                      },
                    }}
                  >
                    {/* Favorite Button */}
                    <IconButton
                      onClick={() => addToFavorites(product)}
                      sx={{
                        position: "absolute",
                        top: 16,
                        right: 16,
                        zIndex: 3,
                        background: "rgba(255, 255, 255, 0.9)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        transition: "all 0.3s ease",
                        "&:hover": {
                          background: "rgba(255, 255, 255, 1)",
                          transform: "scale(1.1)",
                        },
                      }}
                    >
                      <Zoom in={isFavorite[product.id]} timeout={300}>
                        <Favorite
                          sx={{
                            color: isFavorite ? "#ff6b6b" : "#ccc",
                            fontSize: 20,
                            transition: "all 0.3s ease",
                          }}
                        />
                      </Zoom>
                      {!isFavorite[product.id] && (
                        <FavoriteBorder
                          sx={{
                            color: "#666",
                            fontSize: 20,
                            position: "absolute",
                            transition: "all 0.3s ease",
                          }}
                        />
                      )}
                    </IconButton>

                    {/* Image Container */}
                    <Box sx={{ position: "relative", overflow: "hidden" }}>
                      <CardMedia
                        component="img"
                        height="250"
                        width="345"
                        image={product.img}
                        alt={product.productName}
                        className="card-image"
                        sx={{
                          transition: "transform 0.6s ease",
                          objectFit: "cover",
                        }}
                      />
                    </Box>

                    <CardContent sx={{ p: 3 }}>
                      <Typography
                        gutterBottom
                        variant="h6"
                        component="div"
                        sx={{
                          fontWeight: 600,
                          color: "#2c3e50",
                          lineHeight: 1.3,
                          mb: 1,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {product.productName}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 2,
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          lineHeight: 1.5,
                        }}
                      >
                        {product.detail}
                      </Typography>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 2,
                        }}
                      >
                        <Typography
                          variant="h6"
                          sx={{
                            fontWeight: 700,
                            background:
                              "linear-gradient(45deg, #1976d2, #42a5f5)",
                            backgroundClip: "text",
                            WebkitBackgroundClip: "text",
                            color: "transparent",
                          }}
                        >
                          {formatMoney(product.price)}
                        </Typography>
                        {product.price && (
                          <Typography
                            variant="body2"
                            sx={{
                              textDecoration: "line-through",
                              color: "#999",
                              fontSize: "0.9rem",
                            }}
                          >
                            {formatMoney(product.price)}
                          </Typography>
                        )}
                      </Box>

                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ mb: 2, flexWrap: "wrap", gap: 0.5 }}
                      >
                        {product.category.length > 0 ? (
                          product.category.slice(0, 3).map((cat, index) => (
                            <Chip
                              key={index}
                              label={cat}
                              variant="outlined"
                              size="small"
                              sx={{
                                borderRadius: "16px",
                                backgroundColor: "rgba(25, 118, 210, 0.08)",
                                borderColor: "rgba(25, 118, 210, 0.3)",
                                color: "#1976d2",
                                fontSize: "0.75rem",
                                fontWeight: 500,
                                "&:hover": {
                                  backgroundColor: "rgba(25, 118, 210, 0.12)",
                                },
                              }}
                            />
                          ))
                        ) : (
                          <Chip
                            label="No Category"
                            variant="outlined"
                            size="small"
                            sx={{ borderRadius: "16px" }}
                          />
                        )}
                        {product.category.length > 3 && (
                          <Chip
                            label={`+${product.category.length - 3}`}
                            variant="outlined"
                            size="small"
                            sx={{
                              borderRadius: "16px",
                              backgroundColor: "rgba(158, 158, 158, 0.08)",
                              borderColor: "rgba(158, 158, 158, 0.3)",
                              color: "#666",
                              fontSize: "0.75rem",
                            }}
                          />
                        )}
                      </Stack>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "space-between",
                          mb: 2,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 1,
                          }}
                        >
                          <Rating
                            name="size-medium"
                            value={product.rating}
                            max={5}
                            precision={0.5}
                            readOnly
                            size="small"
                            sx={{
                              "& .MuiRating-iconFilled": {
                                color: "#ffc107",
                              },
                              "& .MuiRating-iconEmpty": {
                                color: "#e0e0e0",
                              },
                            }}
                          />
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontWeight: 500 }}
                          >
                            ({product.rating})
                          </Typography>
                        </Box>
                      </Box>

                      {/* Add to Cart Button */}
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        {/* Nút Thêm Vào Giỏ Hàng */}
                        <Button
                          variant="contained"
                          fullWidth
                          // onClick={handleAddToCart}
                          startIcon={<ShoppingCart />}
                          sx={{
                            borderRadius: "12px",
                            py: 1.5,
                            background:
                              "linear-gradient(45deg, #1976d2 0%, #42a5f5 100%)",
                            boxShadow: "0 4px 16px rgba(25, 118, 210, 0.4)",
                            textTransform: "none",
                            fontWeight: 600,
                            fontSize: "14px",
                            position: "relative",
                            overflow: "hidden",
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
                              boxShadow: "0 6px 20px rgba(25, 118, 210, 0.6)",
                              transform: "translateY(-2px)",
                              "&::before": {
                                left: "100%",
                              },
                            },
                            "&:active": {
                              transform: "translateY(0)",
                            },
                          }}
                        >
                          Thêm vào giỏ hàng
                        </Button>

                        {/* Nút Xem Chi Tiết */}
                        <Tooltip title={"Xem chi tiết"} arrow placement="top">
                          <IconButton
                            sx={{
                              color: "primary.main",
                              "&:hover": {
                                backgroundColor: "primary.light",
                                color: "white",
                              },
                              padding: "8px",
                              borderRadius: "50%",
                            }}
                            onClick={() => handleDetailProduct(product.id)}
                          >
                            <Visibility />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
          {loadingMore &&
            [...Array(8)].map((index) => (
              <Grid
                size={{ mobile: 12, tablet: 6, desktop: 3 }}
                key={index}
                display={"flex"}
                justifyContent={"center"}
                alignItems={"center"}
              >
                <SkeletonCard />
              </Grid>
            ))}
        </Grid>
        {!loading && visibleCount < dataProduct.length && (
          <Button
            variant="contained"
            sx={{ mt: 4 }}
            onClick={handleLoadMore}
            disabled={loadingMore}
          >
            {loadingMore ? "Đang tải..." : "Xem thêm"}
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default HomeComponent;
