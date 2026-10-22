import { Product } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'bando-001',
    name: 'Áo Khoác Gió Thể Thao Chống Nước Bando Pro Shield',
    brand: 'Bando Pro',
    price: 580000,
    originalPrice: 750000,
    category: 'running',
    imageUrl: '/src/assets/images/sport_running_jacket_1792669046625.jpg',
    description: 'Áo khoác gió thể thao cao cấp chuyên dụng cho chạy bộ ngoài trời và tập luyện thời tiết se lạnh. Chất liệu vải công nghệ trượt nước kháng gió siêu nhẹ, viền phản quang ban đêm an toàn, khóa kéo chống thấm nước.',
    features: [
      'Chống gió & trượt nước công nghệ WindShield 2.0',
      'Dải phản quang phát sáng 360 độ an toàn khi chạy đêm',
      'Trọng lượng siêu nhẹ chỉ 180g, có thể gấp gọn vào túi áo',
      'Hệ thống thông khí laser sau lưng chống hầm bí'
    ],
    sizes: ['M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Xám Than Đậm', hex: '#1e293b' },
      { name: 'Đen Thể Thao', hex: '#0f172a' }
    ],
    rating: 4.9,
    reviewCount: 142,
    inStock: true,
    stockCount: 45,
    tags: ['Bán Chạy', 'Chống Nước', 'Chạy Bộ']
  },
  {
    id: 'bando-002',
    name: 'Bộ Quần Áo Tập Gym Nam Apex Compression Power',
    brand: 'Apex Sport',
    price: 490000,
    originalPrice: 620000,
    category: 'gym',
    imageUrl: '/src/assets/images/sport_training_set_1792669046828.jpg',
    description: 'Combo áo tập body fit và quần short thể thao 2 lớp tối ưu hóa hiệu suất nâng tạ, cardio và HIIT. Công nghệ dệt nén cơ bắp giảm rung lắc, hạn chế mỏi cơ và thấm hút mồ hôi cấp tốc.',
    features: [
      'Chất vải Poly-Spandex co giãn 4 chiều chịu lực co kéo',
      'Đường may viền phẳng Flatlock không gây cọ xát da',
      'Quần short có lớp lót bó cơ hỗ trợ chuyển động sâu',
      'Kháng khuẩn Polygiene khử mùi hôi suốt buổi tập'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Xanh Navy Đậm', hex: '#1e3a8a' },
      { name: 'Đen Obsidian', hex: '#18181b' }
    ],
    rating: 4.8,
    reviewCount: 98,
    inStock: true,
    stockCount: 60,
    tags: ['Gym & Fitness', 'Bó Cơ']
  },
  {
    id: 'bando-003',
    name: 'Áo Đấu Bóng Đá Chuyên Nghiệp Hyperlink Aero Jersey',
    brand: 'Hyperlink Teamwear',
    price: 360000,
    originalPrice: 450000,
    category: 'football',
    imageUrl: '/src/assets/images/sport_football_jersey_1792669048157.jpg',
    description: 'Mẫu áo thi đấu bóng đá hiện đại với họa tiết hình học khí động học tăng tốc. Cấu trúc mắt lưới dệt kim AeroDry giúp lưu thông luồng khí tối đa ngay cả trong những phút thi đấu căng thẳng nhất.',
    features: [
      'Công nghệ làm mát AeroDry giảm 2°C nhiệt độ cơ thể',
      'Cổ áo may viền mềm chống cọ xát vùng gáy',
      'Màu in chuyển nhiệt sắc nét chuẩn thi đấu, không bong tróc',
      'Thấm hút và khô nhanh gấp 3 lần cotton thông thường'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Xanh Royal Blue', hex: '#2563eb' },
      { name: 'Trắng Phối Xanh', hex: '#e2e8f0' }
    ],
    rating: 5.0,
    reviewCount: 215,
    inStock: true,
    stockCount: 88,
    tags: ['Bóng Đá', 'Thi Đấu']
  },
  {
    id: 'bando-004',
    name: 'Áo Thun Chạy Bộ Dri-FIT Miler Running Tee',
    brand: 'Nike',
    price: 680000,
    originalPrice: 850000,
    category: 'running',
    imageUrl: '/src/assets/images/hero_bando_sportswear_1792669046266.jpg',
    description: 'Sản phẩm được nhập trực tiếp từ link web chính hãng Nike. Áo thun chạy bộ thiết kế cho những cự ly marathon dài với sợi vải dệt kim nhẹ như không và công nghệ Dri-FIT độc quyền.',
    features: [
      'Công nghệ Dri-FIT thấm mồ hôi từ da ra bề mặt bốc hơi',
      'Đường may vai cuộn ra trước giúp cánh tay chuyển động tự do',
      'Chỉ số chống nắng UPF 40+ bảo vệ da khi chạy trời nắng',
      'Chất liệu 100% sợi Polyester tái chế thân thiện môi trường'
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Xanh Neon Volt', hex: '#84cc16' },
      { name: 'Đen Classic', hex: '#000000' }
    ],
    rating: 4.9,
    reviewCount: 86,
    sourceUrl: 'https://www.nike.com/vn/t/dri-fit-miler-running-top',
    sourcePlatform: 'Nike Official',
    isImported: true,
    importedAt: '2026-10-18T09:20:00Z',
    inStock: true,
    stockCount: 32,
    tags: ['Nhập từ Nike', 'Chạy Bộ', 'Chính Hãng']
  },
  {
    id: 'bando-005',
    name: 'Quần Dài Thể Thao Tập Luyện Adidas Tiro 24 Track Pants',
    brand: 'Adidas',
    price: 790000,
    originalPrice: 990000,
    category: 'football',
    imageUrl: '/src/assets/images/sport_training_set_1792669046828.jpg',
    description: 'Quần dài thể thao 3 sọc kinh điển từ Adidas, phù hợp khởi động bóng đá, tập gym hoặc mặc hàng ngày phong cách sporty. Thiết kế ống côn ôm chân gọn gàng có khóa kéo gấu quần.',
    features: [
      'Khóa kéo ở cổ chân giúp tháo cởi dễ dàng ngay cả khi đang mang giày',
      'Túi hai bên có khóa kéo tiện lợi để chìa khóa và điện thoại',
      'Vải dệt AEROREADY kiểm soát độ ẩm vượt trội',
      'Cạp chun co giãn kèm dây rút điều chỉnh vừa vặn'
    ],
    sizes: ['M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Đen 3 Sọc Trắng', hex: '#18181b' },
      { name: 'Xanh Navy 3 Sọc', hex: '#1e3a8a' }
    ],
    rating: 4.8,
    reviewCount: 164,
    sourceUrl: 'https://www.adidas.com.vn/vi/quan-tiro-24',
    sourcePlatform: 'Adidas Store',
    isImported: true,
    importedAt: '2026-10-19T14:40:00Z',
    inStock: true,
    stockCount: 28,
    tags: ['Nhập từ Adidas', 'Bóng Đá', 'Gym']
  },
  {
    id: 'bando-006',
    name: 'Áo Thun Thể Thao Decathlon Kalenji Run Dry',
    brand: 'Decathlon',
    price: 220000,
    originalPrice: 280000,
    category: 'running',
    imageUrl: '/src/assets/images/sport_running_jacket_1792669046625.jpg',
    description: 'Sản phẩm quốc dân cho người yêu thích chạy bộ và vận động ngoài trời. Giá thành cực kỳ hợp lý, độ bền cao, chất liệu vải tổng hợp thấm hút và khô cực nhanh.',
    features: [
      'Vải tổng hợp giảm bớt độ ẩm và khô rất nhanh',
      'Đường may mềm mại giảm thiểu kích ứng và ma sát trên da',
      'Dễ giặt mau khô, không cần ủi'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Xám Ghi', hex: '#64748b' },
      { name: 'Xanh Biển Nhạt', hex: '#38bdf8' }
    ],
    rating: 4.7,
    reviewCount: 310,
    sourceUrl: 'https://www.decathlon.vn/ao-chay-bo-run-dry-kalenji',
    sourcePlatform: 'Decathlon VN',
    isImported: true,
    importedAt: '2026-10-20T11:15:00Z',
    inStock: true,
    stockCount: 95,
    tags: ['Nhập từ Decathlon', 'Giá Tốt', 'Chạy Bộ']
  },
  {
    id: 'bando-007',
    name: 'Áo Polo Thể Thao Bando Pro Tour Tennis & Cầu Lông',
    brand: 'Bando Sport',
    price: 420000,
    originalPrice: 550000,
    category: 'tennis',
    imageUrl: '/src/assets/images/sport_football_jersey_1792669048157.jpg',
    description: 'Thiết kế cổ bẻ thanh lịch dành cho các tay vợt tennis và cầu lông. Chất liệu vải cá sấu dệt tổ ong thông hơi, co giãn linh hoạt cho các cú đập cầu và vung vợt mạnh mẽ.',
    features: [
      'Dệt mắt lưới vi mô Honeycomb thoát khí liên tục',
      'Cổ áo dệt chống quăn mép sau nhiều lần giặt',
      'Form dáng Regular-Fit thể thao năng động, lịch thiệp',
      'Kháng mùi hôi và chống tia cực tím khi chơi ngoài trời'
    ],
    sizes: ['M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Trắng Tinh Khiết', hex: '#f8fafc' },
      { name: 'Xanh Navy Sâu', hex: '#0f172a' }
    ],
    rating: 4.9,
    reviewCount: 77,
    inStock: true,
    stockCount: 40,
    tags: ['Tennis', 'Cầu Lông', 'Cao Cấp']
  },
  {
    id: 'bando-008',
    name: 'Quần Short Tập Gym 2 Lớp Bando Quick-Stash Phone Pocket',
    brand: 'Bando Sport',
    price: 320000,
    originalPrice: 420000,
    category: 'gym',
    imageUrl: '/src/assets/images/sport_training_set_1792669046828.jpg',
    description: 'Chiếc quần short tập luyện đa năng được yêu thích nhất tại Bando: lớp lót trong co giãn ôm đùi có túi ẩn chống rơi điện thoại, lớp ngoài xẻ gấu tản lực chuyển động tối đa.',
    features: [
      'Túi trong ôm sát giữ điện thoại không rung lắc khi chạy hoặc tập',
      'Đai lưng có dải treo khăn tập thể thao tiện lợi',
      'Khóa kéo túi sau an toàn đựng thẻ xe, chìa khóa',
      'Vải mềm mịn, mát lạnh khi tiếp xúc da'
    ],
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Đen Sport', hex: '#18181b' },
      { name: 'Xanh Rêu Chiến Binh', hex: '#3f4f34' }
    ],
    rating: 4.9,
    reviewCount: 189,
    inStock: true,
    stockCount: 72,
    tags: ['Gym', 'Bán Chạy', 'Túi Đựng Điện Thoại']
  }
];
