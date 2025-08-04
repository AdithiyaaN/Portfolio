
export interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;
    imageHint: string;
    category: string;
    rating: {
        rate: number;
        count: number;
    };
}

export const products: Product[] = [
    {
        id: "1",
        name: "Classic Leather Jacket",
        description: "A timeless leather jacket made from 100% genuine leather. Perfect for any occasion, offering a stylish and comfortable fit.",
        price: 199.99,
        image: "https://placehold.co/600x600.png",
        imageHint: "leather jacket",
        category: "Apparel",
        rating: { rate: 4.8, count: 120 },
    },
    {
        id: "2",
        name: "Wireless Noise-Cancelling Headphones",
        description: "Immerse yourself in music with these high-fidelity wireless headphones. Featuring active noise-cancellation and a 30-hour battery life.",
        price: 249.99,
        image: "https://placehold.co/600x600.png",
        imageHint: "headphones on desk",
        category: "Electronics",
        rating: { rate: 4.9, count: 250 },
    },
    {
        id: "3",
        name: "Stainless Steel Chronograph Watch",
        description: "A sophisticated watch with a sleek stainless steel band and a detailed chronograph dial. Water-resistant up to 50 meters.",
        price: 349.50,
        image: "https://placehold.co/600x600.png",
        imageHint: "luxury watch",
        category: "Accessories",
        rating: { rate: 4.7, count: 95 },
    },
    {
        id: "4",
        name: "Organic Green Tea Set",
        description: "A premium collection of organic green teas from around the world. Includes 50 tea bags of various flavors.",
        price: 29.99,
        image: "https://placehold.co/600x600.png",
        imageHint: "tea set",
        category: "Groceries",
        rating: { rate: 4.6, count: 150 },
    },
    {
        id: "5",
        name: "Modern Ergonomic Office Chair",
        description: "Improve your posture and comfort with this ergonomic office chair. Features adjustable lumbar support, armrests, and seat height.",
        price: 299.00,
        image: "https://placehold.co/600x600.png",
        imageHint: "office chair",
        category: "Furniture",
        rating: { rate: 4.8, count: 80 },
    },
    {
        id: "6",
        name: "Professional DSLR Camera",
        description: "Capture stunning photos and videos with this professional-grade DSLR camera. Comes with an 18-55mm lens kit.",
        price: 799.99,
        image: "https://placehold.co/600x600.png",
        imageHint: "camera flatlay",
        category: "Electronics",
        rating: { rate: 4.9, count: 180 },
    },
     {
        id: "7",
        name: "Gourmet Coffee Bean Sampler",
        description: "Explore a world of flavor with this sampler of gourmet coffee beans from top growing regions. Includes four 4oz bags.",
        price: 45.00,
        image: "https://placehold.co/600x600.png",
        imageHint: "coffee beans",
        category: "Groceries",
        rating: { rate: 4.7, count: 210 },
    },
    {
        id: "8",
        name: "Smart Fitness Tracker",
        description: "Track your activity, heart rate, and sleep patterns with this sleek and waterproof fitness tracker. Syncs with your smartphone.",
        price: 89.99,
        image: "https://placehold.co/600x600.png",
        imageHint: "fitness tracker",
        category: "Electronics",
        rating: { rate: 4.5, count: 300 },
    },
];
