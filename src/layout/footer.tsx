import {
  Facebook,
  Instagram,
  Mail,
  Twitter,
  Phone,
  LocationOn,
  AccessTime,
} from "@mui/icons-material";
import {
  Box,
  Grid,
  IconButton,
  Link,
  Typography,
  Divider,
} from "@mui/material";

const Footer = () => {
  return (
    <Box
      sx={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #334155 100%)",
        color: "white",
        py: 6,
        mt: 8,
        position: "relative",
        overflow: "hidden",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            "radial-gradient(circle at 20% 50%, rgba(59, 130, 246, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.1) 0%, transparent 50%)",
          pointerEvents: "none",
        },
      }}
    >
      <Box
        sx={{
          maxWidth: 1200,
          mx: "auto",
          px: 3,
          position: "relative",
          zIndex: 1,
        }}
      >
        <Grid container spacing={5}>
          {/* Logo + Giới thiệu */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box sx={{ mb: 3 }}>
              <Typography
                variant="h4"
                fontWeight="800"
                gutterBottom
                sx={{
                  background:
                    "linear-gradient(45deg, #3b82f6 0%, #8b5cf6 100%)",
                  backgroundClip: "text",
                  WebkitBackgroundClip: "text",
                  color: "transparent",
                  fontSize: { xs: "1.8rem", md: "2.2rem" },
                  letterSpacing: "-0.02em",
                }}
              >
                📚 Education Shop
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  color: "rgba(255, 255, 255, 0.8)",
                  lineHeight: 1.6,
                  mb: 2,
                  fontSize: "0.95rem",
                }}
              >
                Nền tảng sách trực tuyến hàng đầu, giúp bạn kết nối với tri thức
                mọi lúc mọi nơi. Khám phá thế giới kiến thức bất tận cùng chúng
                tôi.
              </Typography>

              {/* Thông tin liên hệ nhanh */}
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Phone sx={{ fontSize: 16, color: "#3b82f6" }} />
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    0123 456 789
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <Mail sx={{ fontSize: 16, color: "#3b82f6" }} />
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    contact@bookstore.com
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                  <LocationOn sx={{ fontSize: 16, color: "#3b82f6" }} />
                  <Typography
                    variant="body2"
                    sx={{ color: "rgba(255, 255, 255, 0.7)" }}
                  >
                    TP. Hồ Chí Minh, Việt Nam
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Grid>

          {/* Liên kết nhanh */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              variant="h6"
              fontWeight="700"
              gutterBottom
              sx={{
                color: "white",
                mb: 3,
                fontSize: "1.1rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Liên kết nhanh
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                { text: "🏠 Trang chủ", href: "/" },
                { text: "📖 Sản phẩm", href: "/products" },
                { text: "⭐ Yêu thích", href: "/favorites" },
                { text: "🛒 Giỏ hàng", href: "/cart" },
                { text: "👤 Tài khoản", href: "/account" },
                { text: "📞 Liên hệ", href: "/contact" },
              ].map((item, index) => (
                <Link
                  key={index}
                  href={item.href}
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    transition: "all 0.3s ease",
                    padding: "4px 0",
                    borderRadius: "4px",
                    "&:hover": {
                      color: "#3b82f6",
                      transform: "translateX(8px)",
                      textDecoration: "none",
                    },
                  }}
                >
                  {item.text}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Thể loại sách */}
          <Grid size={{ xs: 12, md: 3 }}>
            <Typography
              variant="h6"
              fontWeight="700"
              gutterBottom
              sx={{
                color: "white",
                mb: 3,
                fontSize: "1.1rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Thể loại sách
            </Typography>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {[
                "🌐 Tiếng Anh",
                "📚 Văn học",
                "📝 Ngữ pháp",
                "💭 Từ vựng",
                "📖 Từ điển",
                "🔬 Khoa học",
                "🧮 Toán học",
                "📄 Tài liệu",
              ].map((category, index) => (
                <Link
                  key={index}
                  href="#"
                  sx={{
                    color: "rgba(255, 255, 255, 0.8)",
                    textDecoration: "none",
                    fontSize: "0.9rem",
                    transition: "all 0.3s ease",
                    padding: "4px 0",
                    borderRadius: "4px",
                    "&:hover": {
                      color: "#8b5cf6",
                      transform: "translateX(8px)",
                      textDecoration: "none",
                    },
                  }}
                >
                  {category}
                </Link>
              ))}
            </Box>
          </Grid>

          {/* Mạng xã hội + Giờ mở cửa */}
          <Grid size={{ xs: 12, md: 2 }}>
            <Typography
              variant="h6"
              fontWeight="700"
              gutterBottom
              sx={{
                color: "white",
                mb: 3,
                fontSize: "1.1rem",
                textTransform: "uppercase",
                letterSpacing: "0.05em",
              }}
            >
              Kết nối
            </Typography>

            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {[
                  { icon: <Facebook />, color: "#1877f2", label: "Facebook" },
                  { icon: <Instagram />, color: "#e4405f", label: "Instagram" },
                  { icon: <Twitter />, color: "#1da1f2", label: "Twitter" },
                  { icon: <Mail />, color: "#ea4335", label: "Email" },
                ].map((social, index) => (
                  <IconButton
                    key={index}
                    sx={{
                      color: "white",
                      backgroundColor: "rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.2)",
                      borderRadius: "12px",
                      padding: "8px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: social.color,
                        transform: "translateY(-2px) scale(1.1)",
                        boxShadow: `0 8px 25px ${social.color}40`,
                      },
                    }}
                    title={social.label}
                  >
                    {social.icon}
                  </IconButton>
                ))}
              </Box>
            </Box>

            <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 1 }}>
              <AccessTime sx={{ fontSize: 16, color: "#3b82f6" }} />
              <Typography
                variant="body2"
                sx={{ color: "rgba(255, 255, 255, 0.7)", fontWeight: 600 }}
              >
                Giờ hỗ trợ
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{ color: "rgba(255, 255, 255, 0.6)", fontSize: "0.85rem" }}
            >
              T2 - T6: 8:00 - 22:00
              <br />
              T7 - CN: 9:00 - 21:00
            </Typography>
          </Grid>
        </Grid>

        {/* Divider */}
        <Divider sx={{ my: 4, backgroundColor: "rgba(255, 255, 255, 0.1)" }} />

        {/* Copyright + Newsletter */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "rgba(255, 255, 255, 0.6)",
              fontSize: "0.9rem",
              textAlign: { xs: "center", md: "left" },
            }}
          >
            © {new Date().getFullYear()} Education-E-commerce. Đã đăng ký bản
            quyền.
          </Typography>

          <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
            <Link
              href="#"
              sx={{
                color: "rgba(255, 255, 255, 0.6)",
                textDecoration: "none",
                fontSize: "0.85rem",
                "&:hover": { color: "#3b82f6" },
              }}
            >
              Chính sách bảo mật
            </Link>
            <Typography sx={{ color: "rgba(255, 255, 255, 0.3)" }}>
              |
            </Typography>
            <Link
              href="#"
              sx={{
                color: "rgba(255, 255, 255, 0.6)",
                textDecoration: "none",
                fontSize: "0.85rem",
                "&:hover": { color: "#3b82f6" },
              }}
            >
              Điều khoản sử dụng
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;
