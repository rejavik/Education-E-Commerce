export interface UserType {
  id?: string;
  createdAt: string; // hoặc Date nếu bạn parse thành Date khi dùng
  name: string;
  avatar: string;
  passWord?: string;
  accountName: string;
  categoriesSuggest: string[];
}
