import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  Typography,
} from "@mui/material";
import { ChevronLeft, ChevronRight, ShoppingCart, Star } from "lucide-react";
import { useEffect, useState } from "react";

const BookstoreBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Khám Phá Thế Giới Sách",
      subtitle: "Hàng nghìn cuốn sách tuyệt vời đang chờ bạn",
      description:
        "Từ văn học kinh điển đến sách phát triển kỹ năng, chúng tôi có mọi thứ bạn cần",
      image: "📚",
      bgGradient: "linear-gradient(to bottom right, #E0E7FF, #C7D2FE, #BFDBFE)",
      buttonText: "Mua Ngay",
      offer: "Giảm 30% cho đơn hàng đầu tiên",
    },
    {
      id: 2,
      title: "Sách Mới Nhất 2025",
      subtitle: "Luôn cập nhật những tựa sách hot nhất",
      description:
        "Đừng bỏ lỡ các sách bán chạy và các đầu sách mới phát hành năm nay",
      image: "🔥",
      bgGradient: "linear-gradient(to bottom right, #FEF3C7, #FED7AA, #FECACA)",
      buttonText: "Xem Ngay",
      offer: "Miễn phí vận chuyển toàn quốc",
    },
    {
      id: 3,
      title: "Sách Học Tập & Kỹ Năng",
      subtitle: "Đầu tư cho tương lai của bạn",
      description:
        "Nâng cao kiến thức và kỹ năng với bộ sưu tập sách chất lượng của chúng tôi",
      image: "🎯",
      bgGradient: "linear-gradient(to bottom right, #D1FAE5, #A7F3D0, #BFDBFE)",
      buttonText: "Khám Phá",
      offer: "Combo 3 cuốn chỉ 299K",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () =>
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  const goToSlide = (index: any) => setCurrentSlide(index);

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: { xs: 384, md: 500 },
        overflow: "hidden",
        borderRadius: 4,
        boxShadow: 6,
        backgroundImage: slides[currentSlide].bgGradient,
        transition: "all 1s ease",
        mt: 4,
      }}
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.2)",
        }}
      />

      <Box
        sx={{
          position: "relative",
          zIndex: 10,
          height: "100%",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ color: "white" }}>
                <Box
                  sx={{
                    display: "inline-flex",
                    alignItems: "center",
                    backgroundColor: "#FACC15",
                    color: "black",
                    px: 2,
                    py: 1,
                    borderRadius: "999px",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    mb: 2,
                    animation: "bounce 1.5s infinite",
                  }}
                >
                  <Star style={{ width: 16, height: 16, marginRight: 8 }} />
                  {slides[currentSlide].offer}
                </Box>

                <Typography variant="h3" sx={{ fontWeight: "bold", mb: 2 }}>
                  {slides[currentSlide].title}
                </Typography>

                <Typography
                  variant="h5"
                  sx={{ opacity: 0.9, fontWeight: 300, mb: 2 }}
                >
                  {slides[currentSlide].subtitle}
                </Typography>

                <Typography sx={{ opacity: 0.8, maxWidth: 500, mb: 4 }}>
                  {slides[currentSlide].description}
                </Typography>

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="contained"
                    sx={{
                      backgroundColor: "white",
                      color: "grey.900",
                      fontWeight: 600,
                      borderRadius: "999px",
                      px: 4,
                      py: 1.5,
                      boxShadow: 3,
                      "&:hover": {
                        backgroundColor: "grey.100",
                        transform: "scale(1.05)",
                      },
                      transition: "all 0.3s ease",
                    }}
                    startIcon={
                      <ShoppingCart style={{ width: 20, height: 20 }} />
                    }
                  >
                    {slides[currentSlide].buttonText}
                  </Button>

                  <Button
                    variant="outlined"
                    sx={{
                      borderColor: "white",
                      color: "white",
                      fontWeight: 600,
                      borderRadius: "999px",
                      px: 4,
                      py: 1.5,
                      "&:hover": {
                        backgroundColor: "white",
                        color: "grey.900",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                    Tìm hiểu thêm
                  </Button>
                </Box>
              </Box>
            </Grid>

            <Grid
              size={{ xs: 12, md: 6 }}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box
                sx={{
                  fontSize: { xs: 80, md: 120 },
                  animation: "pulse 2s infinite",
                }}
              >
                {slides[currentSlide].image}
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Navigation Arrows */}
      <IconButton
        onClick={prevSlide}
        sx={{
          position: "absolute",
          top: "50%",
          left: 16,
          transform: "translateY(-50%)",
          backgroundColor: "rgba(255,255,255,0.2)",
          color: "white",
          "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
          zIndex: 20,
        }}
      >
        <ChevronLeft />
      </IconButton>

      <IconButton
        onClick={nextSlide}
        sx={{
          position: "absolute",
          top: "50%",
          right: 16,
          transform: "translateY(-50%)",
          backgroundColor: "rgba(255,255,255,0.2)",
          color: "white",
          "&:hover": { backgroundColor: "rgba(255,255,255,0.3)" },
          zIndex: 20,
        }}
      >
        <ChevronRight />
      </IconButton>

      {/* Slide Indicators */}
      <Box
        sx={{
          position: "absolute",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          gap: 1.5,
          zIndex: 20,
        }}
      >
        {slides.map((_, index) => (
          <Box
            key={index}
            onClick={() => goToSlide(index)}
            sx={{
              width: 12,
              height: 12,
              borderRadius: "50%",
              backgroundColor:
                index === currentSlide ? "white" : "rgba(255,255,255,0.5)",
              transform: index === currentSlide ? "scale(1.25)" : "none",
              transition: "all 0.3s ease",
              cursor: "pointer",
              "&:hover": { backgroundColor: "rgba(255,255,255,0.75)" },
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

export default BookstoreBanner;
