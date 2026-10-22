import { ImportPreviewData, SportCategory } from '../types';

export interface SampleUrlPreset {
  platform: string;
  label: string;
  url: string;
  preview: ImportPreviewData;
}

export const SAMPLE_URL_PRESETS: SampleUrlPreset[] = [
  {
    platform: 'Nike Official',
    label: 'Nike Dri-FIT Pro Trail Tee',
    url: 'https://www.nike.com/vn/t/dri-fit-pro-trail-running-top-mens',
    preview: {
      sourceUrl: 'https://www.nike.com/vn/t/dri-fit-pro-trail-running-top-mens',
      sourcePlatform: 'Nike Official',
      name: 'Áo Thun Chạy Bộ Địa Hình Nike Dri-FIT Pro Trail',
      brand: 'Nike',
      price: 720000,
      originalPrice: 890000,
      category: 'running',
      imageUrl: '/src/assets/images/hero_bando_sportswear_1792669046266.jpg',
      description: 'Dòng áo chuyên chạy bộ đường mòn và cự ly dài từ Nike Trail. Tích hợp sợi phản quang nhận diện từ xa, cấu trúc thông gió tối tân và chất liệu tái chế thân thiện thiên nhiên.',
      features: [
        'Công nghệ thấm hút mồ hôi Nike Dri-FIT nhanh khô',
        'Vải dệt nhẹ thoáng khí có độ co giãn theo chuyển động sải tay',
        'Họa tiết phản quang Nike Trail nổi bật trong điều kiện thiếu sáng',
        'Cổ áo may phẳng không gây ngứa hay cọ xát'
      ],
      sizes: ['S', 'M', 'L', 'XL', '2XL'],
      colors: [
        { name: 'Xanh Neon Volt', hex: '#84cc16' },
        { name: 'Đen Obsidian', hex: '#18181b' }
      ]
    }
  },
  {
    platform: 'Adidas Store',
    label: 'Bộ Đồ Bóng Đá Adidas Squadra 21 Kit',
    url: 'https://www.adidas.com.vn/vi/bo-dau-bong-da-squadra-21',
    preview: {
      sourceUrl: 'https://www.adidas.com.vn/vi/bo-dau-bong-da-squadra-21',
      sourcePlatform: 'Adidas Store',
      name: 'Bộ Quần Áo Đấu Bóng Đá Adidas Squadra 21 AEROREADY',
      brand: 'Adidas',
      price: 650000,
      originalPrice: 820000,
      category: 'football',
      imageUrl: '/src/assets/images/sport_football_jersey_1792669048157.jpg',
      description: 'Set trang phục thi đấu bóng đá chuyên nghiệp từ Adidas. Thiết kế tối giản với 3 sọc đặc trưng chạy dọc cánh tay, vải thấm hút mồ hôi giúp giữ cơ thể luôn khô thoáng và sẵn sàng bứt tốc.',
      features: [
        'Công nghệ kiểm soát mồ hôi AEROREADY độc quyền',
        'Dệt từ Primegreen sợi tái chế hiệu năng cao',
        'Độ bền màu cao, chịu cọ xát và co kéo trong các pha tranh bóng',
        'Form dáng Athletic ôm nhẹ gọn gàng'
      ],
      sizes: ['M', 'L', 'XL', '2XL'],
      colors: [
        { name: 'Xanh Royal Sọc Trắng', hex: '#2563eb' },
        { name: 'Trắng Sọc Đen', hex: '#f8fafc' }
      ]
    }
  },
  {
    platform: 'Decathlon VN',
    label: 'Áo Khoác Chống Gió Kiprun Wind Light',
    url: 'https://www.decathlon.vn/ao-khoac-chay-bo-nam-kiprun-wind-light',
    preview: {
      sourceUrl: 'https://www.decathlon.vn/ao-khoac-chay-bo-nam-kiprun-wind-light',
      sourcePlatform: 'Decathlon VN',
      name: 'Áo Khoác Chạy Bộ Siêu Nhẹ Decathlon Kiprun Wind Light',
      brand: 'Decathlon',
      price: 390000,
      originalPrice: 480000,
      category: 'running',
      imageUrl: '/src/assets/images/sport_running_jacket_1792669046625.jpg',
      description: 'Chiếc áo khoác gió lý tưởng cho thời tiết mưa phùn hoặc nhiều gió. Khối lượng chỉ 130g, có túi ngực đóng vai trò là bao đựng gấp gọn cực kỳ thông minh.',
      features: [
        'Vải cản gió cấp độ 4 giữ ấm lồng ngực khi sải bước',
        'Lớp phủ xử lý trượt nước Water-Repellent',
        'Túi ngực có khóa kéo đựng thẻ ngân hàng, tiền mặt, chìa khóa',
        'Gấp lại thành một gói nhỏ bằng lòng bàn tay'
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [
        { name: 'Xám Đậm Charcoal', hex: '#334155' },
        { name: 'Xanh Dương Active', hex: '#0284c7' }
      ]
    }
  },
  {
    platform: 'Gymshark Official',
    label: 'Bộ Đồ Gym Liền Mạch Seamless Power',
    url: 'https://www.gymshark.com/products/vital-seamless-set-navy',
    preview: {
      sourceUrl: 'https://www.gymshark.com/products/vital-seamless-set-navy',
      sourcePlatform: 'Gymshark',
      name: 'Bộ Quần Áo Tập Thể Hình Liền Mạch Gymshark Vital Seamless',
      brand: 'Gymshark',
      price: 680000,
      originalPrice: 850000,
      category: 'gym',
      imageUrl: '/src/assets/images/sport_training_set_1792669046828.jpg',
      description: 'Bộ trang phục gym huyền thoại công nghệ dệt liền mạch Seamless không viền may. Tôn dáng cơ bắp, hỗ trợ squat sâu và bài tập tạ nặng tối đa.',
      features: [
        'Dệt liền mạch công nghệ Seamless hạn chế tối đa ma sát da',
        'Vải co giãn 4 hướng đàn hồi tự nhiên',
        'Dập gân tinh tế định hình cơ ngực và đùi',
        'Xử lý sợi mồ hôi nhanh khô kháng mùi'
      ],
      sizes: ['S', 'M', 'L', 'XL'],
      colors: [
        { name: 'Xanh Navy Melange', hex: '#1e3a8a' },
        { name: 'Xám Khói Titan', hex: '#475569' }
      ]
    }
  },
  {
    platform: 'Shopee Mall',
    label: 'Áo Thun Thể Thao Co Giãn Cool-Dry',
    url: 'https://shopee.vn/ao-thun-the-thao-nam-tap-gym-chay-bo-cool-dry-i.459203.19482',
    preview: {
      sourceUrl: 'https://shopee.vn/ao-thun-the-thao-nam-tap-gym-chay-bo-cool-dry-i.459203.19482',
      sourcePlatform: 'Shopee Mall',
      name: 'Áo Thun Thể Thao Nam Co Giãn 4 Chiều Cool-Dry Vận Động',
      brand: 'Sport Pro',
      price: 185000,
      originalPrice: 250000,
      category: 'gym',
      imageUrl: '/src/assets/images/sport_football_jersey_1792669048157.jpg',
      description: 'Mẫu áo thun thể thao bán chạy hàng đầu Shopee Mall. Chất vải mè hạt mưa thông thoáng khí, không nhăn, không bai nhão sau khi giặt máy.',
      features: [
        'Vải thun mè kim thoáng khí, thoát ẩm nhanh',
        'Co giãn 4 chiều hỗ trợ mọi bài tập gym, cầu lông, chạy bộ',
        'Giá thành tiết kiệm, độ bền vượt trội'
      ],
      sizes: ['M', 'L', 'XL', '2XL'],
      colors: [
        { name: 'Đen', hex: '#18181b' },
        { name: 'Xanh Than', hex: '#1e293b' }
      ]
    }
  }
];

export function detectPlatformFromUrl(rawUrl: string): { platform: string; brand: string } {
  const urlLower = rawUrl.toLowerCase();
  if (urlLower.includes('nike.')) return { platform: 'Nike Official', brand: 'Nike' };
  if (urlLower.includes('adidas.')) return { platform: 'Adidas Store', brand: 'Adidas' };
  if (urlLower.includes('shopee.')) return { platform: 'Shopee Mall', brand: 'Shopee Sport' };
  if (urlLower.includes('decathlon.')) return { platform: 'Decathlon VN', brand: 'Decathlon' };
  if (urlLower.includes('gymshark.')) return { platform: 'Gymshark Official', brand: 'Gymshark' };
  if (urlLower.includes('puma.')) return { platform: 'Puma Official', brand: 'Puma' };
  if (urlLower.includes('underarmour.')) return { platform: 'Under Armour', brand: 'Under Armour' };
  if (urlLower.includes('taobao.') || urlLower.includes('tmall.')) return { platform: 'Taobao Sports', brand: 'OEM Sport' };
  if (urlLower.includes('tiki.')) return { platform: 'Tiki Sport', brand: 'Tiki Mall' };
  if (urlLower.includes('lazada.')) return { platform: 'Lazada Sport', brand: 'Lazada Mall' };
  
  try {
    const host = new URL(rawUrl.startsWith('http') ? rawUrl : `https://${rawUrl}`).hostname;
    return { platform: host.replace(/^www\./, ''), brand: 'Sportswear' };
  } catch {
    return { platform: 'Website Ngoài', brand: 'Thể Thao Đa Năng' };
  }
}

export function extractProductFromUrl(rawUrl: string): ImportPreviewData {
  // Check exact preset first
  const cleanUrl = rawUrl.trim();
  const matchedPreset = SAMPLE_URL_PRESETS.find(p => p.url.toLowerCase() === cleanUrl.toLowerCase());
  if (matchedPreset) {
    return { ...matchedPreset.preview, sourceUrl: cleanUrl };
  }

  const { platform, brand } = detectPlatformFromUrl(cleanUrl);
  const urlLower = cleanUrl.toLowerCase();

  // Deduce category from keywords
  let category: SportCategory = 'running';
  let name = `Sản Phẩm Thể Thao Nhập Từ ${platform}`;
  let price = 450000;
  let originalPrice = 580000;
  let imageUrl = '/src/assets/images/sport_running_jacket_1792669046625.jpg';
  let features = [
    'Chất liệu vải công nghệ thể thao co giãn và thông thoáng khí',
    'Thấm hút mồ hôi tối ưu, khô nhanh khi vận động cường độ cao',
    'Đường may gia cố chuyên dụng cho các hoạt động thể chất',
    'Sản phẩm nhập khẩu / trích xuất theo liên kết nguồn'
  ];

  if (urlLower.includes('bong-da') || urlLower.includes('football') || urlLower.includes('soccer') || urlLower.includes('tiro') || urlLower.includes('jersey')) {
    category = 'football';
    name = `Áo Đấu Thể Thao Bóng Đá Cao Cấp ${brand}`;
    price = 390000;
    originalPrice = 520000;
    imageUrl = '/src/assets/images/sport_football_jersey_1792669048157.jpg';
    features = [
      'Công nghệ dệt AeroCool thoát mồ hôi cấp tốc khi thi đấu',
      'Cấu trúc vải dệt kim nhẹ như lông vũ, chuyển động tự do',
      'Chống nhăn và kháng khuẩn hiệu quả',
      'Phù hợp cho cả bóng đá sân cỏ nhân tạo và sân 11 người'
    ];
  } else if (urlLower.includes('gym') || urlLower.includes('fitness') || urlLower.includes('tap-ta') || urlLower.includes('compression') || urlLower.includes('seamless')) {
    category = 'gym';
    name = `Bộ Đồ Tập Gym & Thể Hình Chuyên Sâu ${brand}`;
    price = 520000;
    originalPrice = 690000;
    imageUrl = '/src/assets/images/sport_training_set_1792669046828.jpg';
    features = [
      'Vải dệt nén cơ hạn chế rung lắc mỏi cơ bắp',
      'Đường chỉ Flatlock may phẳng không gây ngứa da',
      'Co giãn 4 chiều chịu lực kéo mạnh trong bài tập tạ',
      'Form dáng ôm sát tôn cơ bắp săn chắc'
    ];
  } else if (urlLower.includes('tennis') || urlLower.includes('badminton') || urlLower.includes('cau-long') || urlLower.includes('polo')) {
    category = 'tennis';
    name = `Áo Thể Thao Cổ Bẻ Polo Chuyên Dụng Tennis & Cầu Lông ${brand}`;
    price = 480000;
    originalPrice = 600000;
    imageUrl = '/src/assets/images/sport_football_jersey_1792669048157.jpg';
    features = [
      'Cổ bẻ thanh lịch thể thao chuẩn quy chuẩn sân quần vợt',
      'Chất vải thun cá sấu dệt tổ ong thoáng khí tuyệt đối',
      'Kháng mùi hôi kháng khuẩn ion bạc',
      'Độ bền màu cao, giặt máy thoải mái không phai'
    ];
  } else if (urlLower.includes('jacket') || urlLower.includes('khoac') || urlLower.includes('wind') || urlLower.includes('gio') || urlLower.includes('chong-nuoc')) {
    category = 'outdoor';
    name = `Áo Khoác Gió Thể Thao Chống Nước Đa Năng ${brand}`;
    price = 590000;
    originalPrice = 780000;
    imageUrl = '/src/assets/images/sport_running_jacket_1792669046625.jpg';
    features = [
      'Lớp phủ chống nước và cản gió chuyên dụng',
      'Dải phản quang hỗ trợ tập luyện ngoài trời chiều tối',
      'Khóa kéo chống thấm nước cao cấp',
      'Túi rộng có khóa an toàn giữ ví và điện thoại'
    ];
  } else {
    // Default running
    category = 'running';
    name = `Áo Thun Chạy Bộ Chuyên Nghiệp Quick-Dry ${brand}`;
    price = 420000;
    originalPrice = 550000;
    imageUrl = '/src/assets/images/hero_bando_sportswear_1792669046266.jpg';
  }

  return {
    sourceUrl: cleanUrl,
    sourcePlatform: platform,
    name,
    brand,
    price,
    originalPrice,
    category,
    imageUrl,
    description: `Sản phẩm quần áo thể thao chất lượng cao được đồng bộ và nhập trực tiếp từ liên kết ${platform}. Thiết kế chuyên dụng mang lại cảm giác thoải mái tối đa cho mọi vận động viên và người yêu thích rèn luyện sức khỏe.`,
    features,
    sizes: ['S', 'M', 'L', 'XL', '2XL'],
    colors: [
      { name: 'Đen Thể Thao', hex: '#18181b' },
      { name: 'Xanh Navy', hex: '#1e3a8a' },
      { name: 'Xám Titan', hex: '#475569' }
    ]
  };
}
