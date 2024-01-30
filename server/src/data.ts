export interface ProductType {
  id: number;
  name: string;
  description: string;
  mrp?: number;
  price: number;
  stock: number;
  category: string;
  thumbnail?: string;
  photos?: string[];
}

export const products: ProductType[] = [
  {
    id: 1,
    name: "iPhone 15",
    description: "Latest flagship smartphone from Apple with advanced camera features",
    price: 82499,
    stock: 50,
    category: "Phones",
    thumbnail: "iphone_15_photo1.jpg",
    photos: ["iphone_15_photo1.jpg", "iphone_15_photo2.jpg", "iphone_15_photo3.jpg"],
  },
  {
    id: 2,
    name: "MacBook Air M2",
    description: "Ultra-thin and lightweight laptop for everyday use, powered by Apple's M2 chip",
    price: 97499,
    stock: 30,
    category: "Laptops",
    thumbnail: "macbook_air_m2_photo1.jpg",
    photos: ["macbook_air_m2_photo1.jpg", "macbook_air_m2_photo2.jpg", "macbook_air_m2_photo3.jpg"],
  },
  {
    id: 3,
    name: "PlayStation 5",
    description: "Next-gen gaming console with powerful hardware and immersive gaming experience",
    price: 37499,
    stock: 20,
    category: "Gaming Consoles",
    thumbnail: "ps5_photo1.jpg",
    photos: ["ps5_photo1.jpg", "ps5_photo2.jpg", "ps5_photo3.jpg"],
  },
  {
    id: 4,
    name: "Samsung QLED 4K Smart TV",
    description: "65-inch QLED TV with stunning picture quality and smart TV features",
    price: 112499,
    stock: 15,
    category: "Televisions",
    thumbnail: "samsung_qled_tv_photo1.jpg",
    photos: [
      "samsung_qled_tv_photo1.jpg",
      "samsung_qled_tv_photo2.jpg",
      "samsung_qled_tv_photo3.jpg",
      "samsung_qled_tv_photo4.jpg",
    ],
  },
  {
    id: 5,
    name: "DJI Mavic Air 2 Drone",
    description: "Compact and powerful drone with 4K camera and intelligent shooting modes",
    price: 59999,
    stock: 25,
    category: "Gadgets",
    thumbnail: "dji_mavic_air_2_photo1.jpg",
    photos: [
      "dji_mavic_air_2_photo1.jpg",
      "dji_mavic_air_2_photo2.jpg",
      "dji_mavic_air_2_photo3.jpg",
      "dji_mavic_air_2_photo4.jpg",
    ],
  },
  {
    id: 6,
    name: "Bose QuietComfort 35 II Headphones",
    description: "Wireless noise-canceling headphones with premium sound quality",
    price: 22499,
    stock: 40,
    category: "Audio",
    thumbnail: "bose_qc35ii_photo1.jpg",
    photos: [
      "bose_qc35ii_photo1.jpg",
      "bose_qc35ii_photo2.jpg",
      "bose_qc35ii_photo3.jpg",
      "bose_qc35ii_photo4.jpg",
      "bose_qc35ii_photo5.jpg",
    ],
  },
  {
    id: 7,
    name: "Nintendo Switch",
    description: "Versatile gaming console for at-home and on-the-go gaming",
    price: 22499,
    stock: 30,
    category: "Gaming Consoles",
    thumbnail: "nintendo_switch_photo1.jpg",
    photos: [
      "nintendo_switch_photo1.jpg",
      "nintendo_switch_photo2.jpg",
      "nintendo_switch_photo3.jpg",
    ],
  },
  {
    id: 8,
    name: "Sony A7 III Mirrorless Camera",
    description: "High-performance mirrorless camera with full-frame sensor and 4K video",
    price: 149999,
    stock: 10,
    category: "Cameras",
    thumbnail: "sony_a7iii_photo1.jpg",
    photos: [
      "sony_a7iii_photo1.jpg",
      "sony_a7iii_photo2.jpg",
      "sony_a7iii_photo3.jpg",
      "sony_a7iii_photo4.jpg",
    ],
  },
  {
    id: 9,
    name: "LG OLED C1 55-Inch TV",
    description: "Cinematic OLED TV with stunning colors and Dolby Vision support",
    price: 134999,
    stock: 12,
    category: "Televisions",
    thumbnail: "lg_oled_c1_photo1.jpg",
    photos: ["lg_oled_c1_photo1.jpg", "lg_oled_c1_photo2.jpg", "lg_oled_c1_photo3.jpg"],
  },
  {
    id: 10,
    name: "GoPro Hero 10 Black",
    description: "Action camera with 5K video recording and advanced stabilization",
    price: 33749,
    stock: 18,
    category: "Cameras",
    thumbnail: "gopro_hero10_black_photo1.jpg",
    photos: [
      "gopro_hero10_black_photo1.jpg",
      "gopro_hero10_black_photo2.jpg",
      "gopro_hero10_black_photo3.jpg",
      "gopro_hero10_black_photo4.jpg",
    ],
  },
  {
    id: 11,
    name: "Microsoft Surface Laptop 4",
    description: "Sleek and powerful laptop with touchscreen and latest Intel processors",
    price: 97499,
    stock: 22,
    category: "Laptops",
    thumbnail: "surface_laptop_4_photo1.jpg",
    photos: [
      "surface_laptop_4_photo1.jpg",
      "surface_laptop_4_photo2.jpg",
      "surface_laptop_4_photo3.jpg",
      "surface_laptop_4_photo4.jpg",
    ],
  },
  {
    id: 12,
    name: "Fitbit Charge 5",
    description: "Advanced fitness tracker with built-in GPS and health monitoring features",
    price: 13499,
    stock: 35,
    category: "Wearables",
    thumbnail: "fitbit_charge_5_photo1.jpg",
    photos: [
      "fitbit_charge_5_photo1.jpg",
      "fitbit_charge_5_photo2.jpg",
      "fitbit_charge_5_photo3.jpg",
      "fitbit_charge_5_photo4.jpg",
      "fitbit_charge_5_photo5.jpg",
      "fitbit_charge_5_photo6.jpg",
    ],
  },
];

export const cartItems: ProductType[] = [
  {
    id: 2,
    name: "MacBook Air M2",
    description: "Ultra-thin and lightweight laptop for everyday use, powered by Apple's M2 chip",
    price: 97499,
    stock: 30,
    category: "Laptops",
    thumbnail: "macbook_air_m2_photo1.jpg",
    photos: ["macbook_air_m2_photo1.jpg", "macbook_air_m2_photo2.jpg", "macbook_air_m2_photo3.jpg"],
  },
  {
    id: 3,
    name: "PlayStation 5",
    description: "Next-gen gaming console with powerful hardware and immersive gaming experience",
    price: 37499,
    stock: 20,
    category: "Gaming Consoles",
    thumbnail: "ps5_photo1.jpg",
    photos: ["ps5_photo1.jpg", "ps5_photo2.jpg", "ps5_photo3.jpg"],
  },
  {
    id: 6,
    name: "Bose QuietComfort 35 II Headphones",
    description: "Wireless noise-canceling headphones with premium sound quality",
    price: 22499,
    stock: 40,
    category: "Audio",
    thumbnail: "bose_qc35ii_photo1.jpg",
    photos: [
      "bose_qc35ii_photo1.jpg",
      "bose_qc35ii_photo2.jpg",
      "bose_qc35ii_photo3.jpg",
      "bose_qc35ii_photo4.jpg",
      "bose_qc35ii_photo5.jpg",
    ],
  },
];

export const categories: string[] = [
  "Phones",
  "Laptops",
  "Gaming Consoles",
  "Televisions",
  "Gadgets",
  "Audio",
  "Wearables",
  "Smart Home",
  "Cameras",
];

import { IProduct, Product } from "./models/product.js";
export async function insertData() {
  return Promise.all(
    products.map((product) => {
      const newProduct: IProduct = {
        name: product.name,
        description: product.description,
        price: product.price,
        stock: product.stock,
        category: product.category.toLowerCase(),
        thumbnail: product.thumbnail,
        photos: product.photos,
      };
      return Product.create(newProduct);
    }),
  )
    .then(() => true)
    .catch((e) => console.log(e));
}
