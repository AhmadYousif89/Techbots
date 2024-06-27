const links = {
  Gaming: 'gaming',
  Mobiles: 'mobiles',
  Tablets: 'tablets',
  Monitors: 'monitors',
  Computers: 'computers',
  Headphones: 'headphones',
  HomeEssentials: 'households',
  Photography: 'photography',
  Accessories: 'accessories',
  Wearables: 'wearbles'
};

export const categories = [
  {
    id: 1001,
    name: 'Monitors',
    image: 'https://i.ibb.co/kM0FR2h/cat-Tv-Audio.webp',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore.',
    link: links.Monitors
  },
  {
    id: 1010,
    name: 'Tablets',
    image: 'https://i.ibb.co/qCzTx4F/cat-Tablet.webp',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore.',
    base: links.Tablets
  },
  {
    id: 1011,
    name: 'Computers & Laptop',
    image: 'https://i.ibb.co/74bZ8PH/cat-Computer.webp',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore.',
    base: links.Computers
  },
  {
    id: 1002,
    name: 'Cameras & Photos',
    image: 'https://i.ibb.co/SVQVWSS/cat-Camera.webp',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore.',
    base: links.Photography
  },
  {
    id: 1003,
    name: 'Accessories',
    image: 'https://i.ibb.co/0V0g6Gz/cat-Powertool.webp',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore.',
    base: links.Accessories
  },
  {
    id: 1004,
    name: 'Headphones',
    image: 'https://i.ibb.co/zST2Xdp/cat-Headphone.webp',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore.',
    base: links.Headphones
  },
  {
    id: 1005,
    name: 'Cell Phones',
    image: 'https://i.ibb.co/jgk59BL/catPhone.webp',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore.',
    base: links.Mobiles
  },
  {
    id: 1006,
    name: 'Smart Watches',
    image: 'https://i.ibb.co/B4NKfBZ/cat-Smart-Watch.webp',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore.',
    base: links.Wearables
  },
  {
    id: 1007,
    name: 'Game & Video',
    image: 'https://i.ibb.co/4gwLwT2/cat-Gaming.webp',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore.',
    base: links.Gaming
  },
  {
    id: 1008,
    name: 'Household Essentials',
    image: 'https://i.ibb.co/xjpdQrr/cat-Robot-Clean.webp',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore.',
    base: links.HomeEssentials
  },
  {
    id: 1009,
    name: 'Sport Watches',
    image: 'https://i.ibb.co/HdNVLzh/cat-Sport-Watch.webp',
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore.',
    base: links.Wearables
  }
];

export const featuredProducts = [
  {
    id: 3001,
    name: 'Sony Wireless Headphones',
    description: 'Discover the latest HQ headphones',
    price: '$150.00',
    buttonTitle: 'Browse Deals',
    image: 'https://i.ibb.co/G951N5B/highlights-One.webp',
    url: '/products',
    color: '#000'
  },
  {
    id: 3002,
    name: 'Colorful Redmi Note 6 Pro',
    description: 'Shop the latest mobiles flagship',
    price: '$330.00',
    buttonTitle: 'Shop Cellphone',
    image: 'https://i.ibb.co/bLRNKGq/highlights-Two.webp',
    url: '/products?category=cellPhones',
    color: '#fff'
  },
  {
    id: 3003,
    name: '10000 mAh Power Bank',
    description: 'High quality power banks',
    price: '$90.00',
    buttonTitle: 'Shop Now',
    image: 'https://i.ibb.co/svWYstT/highlights-Three.webp',
    url: '/products',
    color: '#fff'
  }
];

export const blogsData = [
  {
    id: 1,
    image:
      'https://images.unsplash.com/photo-1624701928517-44c8ac49d93c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Your Guide to Choosing a Graphics Card',
    url: 'https://example.com/choosing-a-graphics-card',
    description:
      'Learn how to select the best graphics card for your gaming or professional needs, with tips on performance, compatibility, and budget considerations.'
  },
  {
    id: 2,
    image:
      'https://images.unsplash.com/photo-1600336757481-6185c4be6ff6?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'Top 5 Motherboards for 2024',
    url: 'https://example.com/top-5-motherboards-2024',
    description:
      'Discover the best motherboards of 2024, featuring top-notch performance, advanced features, and compatibility with the latest processors.'
  },
  {
    id: 3,
    image:
      'https://images.unsplash.com/photo-1610415390571-0462860c54c3?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'SSD vs HDD: Which One Should You Choose?',
    url: 'https://example.com/ssd-vs-hdd',
    description:
      'Compare the benefits and drawbacks of SSDs and HDDs to make an informed decision on which storage solution is right for your needs.'
  },
  {
    id: 4,
    image:
      'https://images.unsplash.com/photo-1706102817449-9a22be1e02c1?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8Y3VzdG9tJTIwcGN8ZW58MHx8MHx8fDA%3D',
    title: 'Building Your Own PC: A Step-by-Step Guide',
    url: 'https://example.com/building-your-own-pc',
    description:
      'Follow this comprehensive guide to building your own PC, from selecting components to assembling and configuring your system.'
  },
  {
    id: 5,
    image:
      'https://images.unsplash.com/photo-1616763355548-1b606f439f86?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    title: 'The Best Monitors for Gaming and Productivity',
    url: 'https://example.com/best-monitors-2024',
    description:
      'Explore the top monitors available in 2024, perfect for both gaming enthusiasts and professionals seeking high productivity.'
  }
];

export const products = [
  {
    id: 2001,
    name: 'Divoom Tivoo Portable Bluetooth Speaker Smart Clock Alarm Pixel Art DIY By App LED Light Sign In Decoration Unique Gift',
    images: [
      'https://i.ibb.co/m6ZN7LX/soundBox.webp',
      'https://i.ibb.co/wdV3b9q/vaccum.webp',
      'https://i.ibb.co/tcdSfrr/blueGun.jpg',
      'https://i.ibb.co/pw0fGmx/gaming-Controller.webp',
      'https://i.ibb.co/m6ZN7LX/soundBox.webp'
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
    regularPrice: 600,
    salePrice: 500,
    quantity: 6,
    cartQuantity: 0,
    reviews: {
      rating: 4.5,
      data: [
        {
          author: 'Alice Johnson',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 14, 2021'
        },
        {
          author: 'Mikel Jordan',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 20, 2022'
        },
        {
          author: 'Bob Smith',
          rating: 4,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'July 14, 2021'
        },
        {
          author: 'Alice Johnson',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 14, 2021'
        },
        {
          author: 'Mikel Jordan',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 20, 2022'
        },
        {
          author: 'Bob Smith',
          rating: 4,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'July 14, 2021'
        },
        {
          author: 'Alice Johnson',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 14, 2021'
        },
        {
          author: 'Mikel Jordan',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 20, 2022'
        },
        {
          author: 'Bob Smith',
          rating: 4,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'July 14, 2021'
        },
        {
          author: 'Alice Johnson',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 14, 2021'
        },
        {
          author: 'Mikel Jordan',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 20, 2022'
        },
        {
          author: 'Bob Smith',
          rating: 4,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'July 14, 2021'
        }
      ]
    },
    category: 'TV & Audio',
    colors: ['red', 'blue', 'green', 'yellow', 'black', 'white'],
    brand: 'Samsung',
    isStock: true,
    overView: 'Blutooth Speaker',
    isNew: true,
    base: links.Monitors
  },
  {
    id: 2002,
    name: 'Xiaomi Mi Watch Lite GPS Bluetooth 5.1 Smart Watch Sports Fitness Heart Rate Monitor 1.4 Inch TFTLCD Screen 5 ATM Waterproof Mi Band',
    images: [
      'https://i.ibb.co/pw0fGmx/gaming-Controller.webp',
      'https://i.ibb.co/2tCN9cy/watch-Three.jpg',
      'https://i.ibb.co/m6ZN7LX/soundBox.webp',
      'https://i.ibb.co/wdV3b9q/vaccum.webp',
      'https://i.ibb.co/tcdSfrr/blueGun.jpg'
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
    regularPrice: 250,
    salePrice: 180,
    quantity: 2,
    cartQuantity: 0,
    reviews: {
      rating: 4.5,
      data: [
        {
          author: 'Alice Johnson',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 14, 2021'
        },
        {
          author: 'Bob Smith',
          rating: 4,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'July 14, 2021'
        }
      ]
    },
    category: 'Smart Watches',
    colors: ['red', 'blue', 'green', 'yellow', 'black', 'white'],
    brand: 'Samsung',
    isStock: true,
    overView: 'Smart health watch',
    isNew: false,
    base: links.Wearables
  },
  {
    id: 2003,
    name: 'Fitness M3 Color Screen Smart Sport Bracelet Activity Running Tracker Heart Rate For Children Men Women Watch For IOS Android',
    images: [
      'https://i.ibb.co/NrG9wxw/sport-Watch.jpg',
      'https://i.ibb.co/m6ZN7LX/soundBox.webp',
      'https://i.ibb.co/wdV3b9q/vaccum.webp',
      'https://i.ibb.co/tcdSfrr/blueGun.jpg',
      'https://i.ibb.co/pw0fGmx/gaming-Controller.webp'
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
    regularPrice: 650,
    salePrice: 570,
    quantity: 5,
    cartQuantity: 0,
    reviews: {
      rating: 4.5,
      data: [
        {
          author: 'Alice Johnson',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 14, 2021'
        },
        {
          author: 'Bob Smith',
          rating: 4,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'July 14, 2021'
        }
      ]
    },
    category: 'Sport Watches',
    colors: ['red', 'blue', 'green', 'yellow', 'black', 'white'],
    brand: 'MI Exclusive',
    isStock: true,
    overView: 'Smart health watch',
    isNew: true,
    base: links.Wearables
  },
  {
    id: 2004,
    name: 'SJ8 Air 1290P 4K 60fps Action Camera WIFI Remote Control Waterproof Sports DV FPV Camera',
    images: [
      'https://i.ibb.co/bQ59C0n/wifi-Camera.webp',
      'https://i.ibb.co/m6ZN7LX/soundBox.webp',
      'https://i.ibb.co/wdV3b9q/vaccum.webp',
      'https://i.ibb.co/tcdSfrr/blueGun.jpg',
      'https://i.ibb.co/pw0fGmx/gaming-Controller.webp'
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
    regularPrice: 400,
    salePrice: 350,
    quantity: 3,
    cartQuantity: 0,
    reviews: {
      rating: 4.5,
      data: [
        {
          author: 'Alice Johnson',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 14, 2021'
        },
        {
          author: 'Bob Smith',
          rating: 4,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'July 14, 2021'
        }
      ]
    },
    category: 'Camera & Photos',
    colors: ['red', 'blue', 'green', 'yellow', 'black', 'white'],
    brand: 'Lorem ipsum dolor sit',
    isStock: false,
    overView: 'Cameras & Photos',
    isNew: false,
    base: links.Photography
  },
  {
    id: 2005,
    name: 'Redmi Xiaoai Speaker Play 2.4GHz 1.75 Inch Voice Remote Control Music Player Bluetooth 4.2 Mi Speaker For Android Iphone',
    images: [
      'https://i.ibb.co/tqYyH3G/speaker.webp',
      'https://i.ibb.co/m6ZN7LX/soundBox.webp',
      'https://i.ibb.co/wdV3b9q/vaccum.webp',
      'https://i.ibb.co/tcdSfrr/blueGun.jpg',
      'https://i.ibb.co/pw0fGmx/gaming-Controller.webp'
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
    regularPrice: 90,
    salePrice: 80,
    quantity: 8,
    cartQuantity: 0,
    reviews: {
      rating: 4.5,
      data: [
        {
          author: 'Alice Johnson',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 14, 2021'
        },
        {
          author: 'Bob Smith',
          rating: 4,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'July 14, 2021'
        }
      ]
    },
    category: 'TV & Audio',
    colors: ['red', 'blue', 'green', 'yellow', 'black', 'white'],
    brand: 'Lorem ipsum dolor sit',
    isStock: true,
    overView: 'Blutooth Speaker',
    isNew: true,
    base: links.Monitors
  },
  {
    id: 2006,
    name: 'Xiaomi Mi Watch Lite GPS Bluetooth 5.1 Smart Watch Sports Fitness Heart Rate Monitor 1.4 Inch TFTLCD Screen 5 ATM Waterproof Mi Band',
    images: [
      'https://i.ibb.co/1TJp88p/smart-Watch.webp',
      'https://i.ibb.co/m6ZN7LX/soundBox.webp',
      'https://i.ibb.co/wdV3b9q/vaccum.webp',
      'https://i.ibb.co/tcdSfrr/blueGun.jpg',
      'https://i.ibb.co/pw0fGmx/gaming-Controller.webp'
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
    regularPrice: 300,
    salePrice: 280,
    quantity: 10,
    cartQuantity: 0,
    reviews: {
      rating: 4.5,
      data: [
        {
          author: 'Alice Johnson',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 14, 2021'
        },
        {
          author: 'Bob Smith',
          rating: 4,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'July 14, 2021'
        }
      ]
    },
    category: 'Smart Watches',
    colors: ['red', 'blue', 'green', 'yellow', 'black', 'white'],
    brand: 'Lorem ipsum dolor sit',
    isStock: true,
    overView: 'Smart health watch',
    isNew: false,
    base: links.Wearables
  },
  {
    id: 2007,
    name: 'Kinganda BT513 Foldable Bluetooth Headphones With Mic',
    images: [
      'https://i.ibb.co/qs8yhPB/headphone.jpg',
      'https://i.ibb.co/m6ZN7LX/soundBox.webp',
      'https://i.ibb.co/wdV3b9q/vaccum.webp',
      'https://i.ibb.co/tcdSfrr/blueGun.jpg',
      'https://i.ibb.co/pw0fGmx/gaming-Controller.webp'
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
    regularPrice: 600,
    salePrice: 550,
    quantity: 23,
    cartQuantity: 0,
    reviews: {
      rating: 4.5,
      data: [
        {
          author: 'Alice Johnson',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 14, 2021'
        },
        {
          author: 'Bob Smith',
          rating: 4,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'July 14, 2021'
        }
      ]
    },
    category: 'Headphones & Speakers',
    colors: ['red', 'blue', 'green', 'yellow', 'black', 'white'],
    brand: 'Lorem ipsum dolor sit',
    isStock: true,
    overView: 'Microphones',
    isNew: true,
    base: links.Headphones
  },
  {
    id: 2008,
    name: 'New Product Form Lapbook Light Handlift Business Office Game Ben EDP 13.5 In – Black China',
    images: [
      'https://i.ibb.co/RCHWqkS/laptop.webp',
      'https://i.ibb.co/m6ZN7LX/soundBox.webp',
      'https://i.ibb.co/wdV3b9q/vaccum.webp',
      'https://i.ibb.co/tcdSfrr/blueGun.jpg',
      'https://i.ibb.co/pw0fGmx/gaming-Controller.webp'
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
    regularPrice: 1100,
    salePrice: 1080,
    quantity: 18,
    cartQuantity: 0,
    reviews: {
      rating: 4.5,
      data: [
        {
          author: 'Alice Johnson',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 14, 2021'
        },
        {
          author: 'Bob Smith',
          rating: 4,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'July 14, 2021'
        }
      ]
    },
    category: 'Computers & Laptops',
    colors: ['red', 'blue', 'green', 'yellow', 'black', 'white'],
    brand: 'Lorem ipsum dolor sit',
    isStock: true,
    overView: 'Computer Components',
    isNew: false,
    base: links.Computers
  },
  {
    id: 2009,
    name: 'VIOMI V2 Pro LDS Sensor 2 In 1 Sweeping Mopping Robot Wet And Dry Vacuum Cleaner 2100Pa Strong Suction Self-Charging',
    images: [
      'https://i.ibb.co/wdV3b9q/vaccum.webp',
      'https://i.ibb.co/m6ZN7LX/soundBox.webp',
      'https://i.ibb.co/wdV3b9q/vaccum.webp',
      'https://i.ibb.co/tcdSfrr/blueGun.jpg',
      'https://i.ibb.co/pw0fGmx/gaming-Controller.webp'
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
    regularPrice: 450,
    salePrice: 380,
    quantity: 7,
    cartQuantity: 0,
    reviews: {
      rating: 4.5,
      data: [
        {
          author: 'Alice Johnson',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 14, 2021'
        },
        {
          author: 'Bob Smith',
          rating: 4,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'July 14, 2021'
        }
      ]
    },
    category: 'Robot Clean',
    colors: ['red', 'blue', 'green', 'yellow', 'black', 'white'],
    brand: 'Lorem ipsum dolor sit',
    isStock: true,
    overView: 'Robot Clean',
    isNew: true,
    base: links.HomeEssentials
  },
  {
    id: 2010,
    name: 'Global Version Redmi Note 9 Pro 6GB RAM 64GB ROM Smartphone Mobile Phone',
    images: [
      'https://i.ibb.co/sK9yYnY/phone.webp',
      'https://i.ibb.co/m6ZN7LX/soundBox.webp',
      'https://i.ibb.co/wdV3b9q/vaccum.webp',
      'https://i.ibb.co/tcdSfrr/blueGun.jpg',
      'https://i.ibb.co/pw0fGmx/gaming-Controller.webp'
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
    regularPrice: 305,
    salePrice: 285,
    quantity: 9,
    cartQuantity: 0,
    reviews: {
      rating: 4.5,
      data: [
        {
          author: 'Alice Johnson',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 14, 2021'
        },
        {
          author: 'Bob Smith',
          rating: 4,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'July 14, 2021'
        }
      ]
    },
    category: 'Cell Phones',
    colors: ['red', 'blue', 'green', 'yellow', 'black', 'white'],
    brand: 'Lorem ipsum dolor sit',
    isStock: true,
    overView: 'Cual Sim Phones',
    isNew: true,
    base: links.Mobiles
  },
  {
    id: 2011,
    name: 'DIDSeth Pan Tilt Security Light Camera Full HD 1080P Wireless Wi-Fi IP Camera Home Dome Surveillance Cameras',
    images: [
      'https://i.ibb.co/SX8wF1V/camera.webp',
      'https://i.ibb.co/m6ZN7LX/soundBox.webp',
      'https://i.ibb.co/wdV3b9q/vaccum.webp',
      'https://i.ibb.co/tcdSfrr/blueGun.jpg',
      'https://i.ibb.co/pw0fGmx/gaming-Controller.webp'
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
    regularPrice: 350,
    salePrice: 280,
    quantity: 20,
    cartQuantity: 0,
    reviews: {
      rating: 4.5,
      data: [
        {
          author: 'Alice Johnson',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 14, 2021'
        },
        {
          author: 'Bob Smith',
          rating: 4,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'July 14, 2021'
        }
      ]
    },
    category: 'Cameras & Photos',
    colors: ['red', 'blue', 'green', 'yellow', 'black', 'white'],
    brand: 'Lorem ipsum dolor sit',
    isStock: true,
    overView: 'Security & Protection',
    isNew: true,
    base: links.Photography
  },
  {
    id: 2012,
    name: 'Electric Hot Melt Glue Gun Cordless Repair DIY Tool Heating Mini Glue Gun With Glue Sticks',
    images: [
      'https://i.ibb.co/tcdSfrr/blueGun.jpg',
      'https://i.ibb.co/m6ZN7LX/soundBox.webp',
      'https://i.ibb.co/wdV3b9q/vaccum.webp',
      'https://i.ibb.co/tcdSfrr/blueGun.jpg',
      'https://i.ibb.co/pw0fGmx/gaming-Controller.webp'
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
    regularPrice: 150,
    salePrice: 80,
    quantity: 15,
    cartQuantity: 0,
    reviews: {
      rating: 4.5,
      data: [
        {
          author: 'Alice Johnson',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 14, 2021'
        },
        {
          author: 'Bob Smith',
          rating: 4,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'July 14, 2021'
        }
      ]
    },
    category: 'Power Tools',
    colors: ['red', 'blue', 'green', 'yellow', 'black', 'white'],
    brand: 'Lorem ipsum dolor sit',
    isStock: true,
    overView: 'Power Tools',
    isNew: true,
    base: links.Accessories
  },
  {
    id: 2013,
    name: 'MECOOL KH3 Android 10.0 Smart 4K 60fps TV Box – Black 2GB RAM + 16GB ROM',
    images: [
      'https://i.ibb.co/vqmLWww/tvBox.webp',
      'https://i.ibb.co/m6ZN7LX/soundBox.webp',
      'https://i.ibb.co/wdV3b9q/vaccum.webp',
      'https://i.ibb.co/tcdSfrr/blueGun.jpg',
      'https://i.ibb.co/pw0fGmx/gaming-Controller.webp'
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
    regularPrice: 210,
    salePrice: 200,
    quantity: 22,
    cartQuantity: 0,
    reviews: {
      rating: 4.5,
      data: [
        {
          author: 'Alice Johnson',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 14, 2021'
        },
        {
          author: 'Bob Smith',
          rating: 4,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'July 14, 2021'
        }
      ]
    },
    category: 'TV Box',
    colors: ['red', 'blue', 'green', 'yellow', 'black', 'white'],
    brand: 'Lorem ipsum dolor sit',
    isStock: true,
    overView: 'TV Box',
    isNew: true,
    base: links.Monitors
  },
  {
    id: 2014,
    name: 'Sony PS4 Controller Bluetooth Vibration Gamepad For Playstation 4 Detroit Wireless Joystick For PS4 Games Consol',
    images: [
      'https://i.ibb.co/pw0fGmx/gaming-Controller.webp',
      'https://i.ibb.co/m6ZN7LX/soundBox.webp',
      'https://i.ibb.co/wdV3b9q/vaccum.webp',
      'https://i.ibb.co/tcdSfrr/blueGun.jpg',
      'https://i.ibb.co/pw0fGmx/gaming-Controller.webp'
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
    regularPrice: 80,
    salePrice: 75,
    quantity: 30,
    cartQuantity: 0,
    reviews: {
      rating: 4.5,
      data: [
        {
          author: 'Alice Johnson',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 14, 2021'
        },
        {
          author: 'Bob Smith',
          rating: 4,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'July 14, 2021'
        }
      ]
    },
    category: 'Game and Video',
    colors: ['red', 'blue', 'green', 'yellow', 'black', 'white'],
    brand: 'Lorem ipsum dolor sit',
    isStock: true,
    overView: 'Game & Video',
    isNew: true,
    base: links.Gaming
  },
  {
    id: 2015,
    name: 'GSR 120-Li Hand Drill 12V Lithium Drill Household Power Tool Screwdriver With One Battery – GSR120-LI 1Battery',
    images: [
      'https://i.ibb.co/NxM3M4g/hand-Drill.jpg',
      'https://i.ibb.co/m6ZN7LX/soundBox.webp',
      'https://i.ibb.co/wdV3b9q/vaccum.webp',
      'https://i.ibb.co/tcdSfrr/blueGun.jpg',
      'https://i.ibb.co/pw0fGmx/gaming-Controller.webp'
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
    regularPrice: 560,
    salePrice: 400,
    quantity: 11,
    cartQuantity: 0,
    reviews: {
      rating: 4.5,
      data: [
        {
          author: 'Alice Johnson',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 14, 2021'
        },
        {
          author: 'Bob Smith',
          rating: 4,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'July 14, 2021'
        }
      ]
    },
    category: 'Power Tools',
    colors: ['red', 'blue', 'green', 'yellow', 'black', 'white'],
    brand: 'Lorem ipsum dolor sit',
    isStock: true,
    overView: 'Power Tools',
    isNew: true,
    base: links.Accessories
  },
  {
    id: 2016,
    name: 'Xiaomi Mi Outdoor Speaker Bluetooth 5.0 IP55 Waterproof Dustproof Portable Wireless Speaker',
    images: [
      'https://i.ibb.co/PMDZZPY/bluetooth-Speaker.webp',
      'https://i.ibb.co/m6ZN7LX/soundBox.webp',
      'https://i.ibb.co/wdV3b9q/vaccum.webp',
      'https://i.ibb.co/tcdSfrr/blueGun.jpg',
      'https://i.ibb.co/pw0fGmx/gaming-Controller.webp'
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
    regularPrice: 250,
    salePrice: 240,
    quantity: 6,
    cartQuantity: 0,
    reviews: {
      rating: 4.5,
      data: [
        {
          author: 'Alice Johnson',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 14, 2021'
        },
        {
          author: 'Bob Smith',
          rating: 4,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'July 14, 2021'
        }
      ]
    },
    category: 'TV and Audio',
    colors: ['red', 'blue', 'green', 'yellow', 'black', 'white'],
    brand: 'Lorem ipsum dolor sit',
    isStock: true,
    overView: 'Blutooth Speakers',
    isNew: true,
    base: links.Monitors
  },
  {
    id: 2017,
    name: 'Global Version Mi TV Stick Android TV 9.0 Smart 2K HDR 1GB RAM 8GB ROM Bluetooth 4.2 Mini TV Dongle',
    images: [
      'https://i.ibb.co/GvBj7SV/usb.jpg',
      'https://i.ibb.co/m6ZN7LX/soundBox.webp',
      'https://i.ibb.co/wdV3b9q/vaccum.webp',
      'https://i.ibb.co/tcdSfrr/blueGun.jpg',
      'https://i.ibb.co/pw0fGmx/gaming-Controller.webp'
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
    regularPrice: 60,
    salePrice: 55,
    quantity: 6,
    cartQuantity: 0,
    reviews: {
      rating: 4.5,
      data: [
        {
          author: 'Alice Johnson',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 14, 2021'
        },
        {
          author: 'Bob Smith',
          rating: 4,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'July 14, 2021'
        }
      ]
    },
    category: 'TV Box',
    colors: ['red', 'blue', 'green', 'yellow', 'black', 'white'],
    brand: 'Lorem ipsum dolor sit',
    isStock: true,
    overView: 'TV Box',
    isNew: true,
    base: links.Monitors
  },
  {
    id: 2018,
    name: 'Xiaomi Mijia LCD Writing Tablet With Pen 10 13.5inch Digital Drawing Message Graphics Electronic Handwriting Pad With Pen',
    images: [
      'https://i.ibb.co/fxJkDbC/writing-Tablet.webp',
      'https://i.ibb.co/m6ZN7LX/soundBox.webp',
      'https://i.ibb.co/wdV3b9q/vaccum.webp',
      'https://i.ibb.co/tcdSfrr/blueGun.jpg',
      'https://i.ibb.co/pw0fGmx/gaming-Controller.webp'
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
    regularPrice: 350,
    salePrice: 330,
    quantity: 6,
    cartQuantity: 0,
    reviews: {
      rating: 4.5,
      data: [
        {
          author: 'Alice Johnson',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 14, 2021'
        },
        {
          author: 'Bob Smith',
          rating: 4,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'July 14, 2021'
        }
      ]
    },
    category: 'Tablets',
    colors: ['red', 'blue', 'green', 'yellow', 'black', 'white'],
    brand: 'Lorem ipsum dolor sit',
    isStock: true,
    overView: 'Tablets',
    isNew: true,
    base: links.Tablets
  },
  {
    id: 2019,
    name: 'New Creative Cloth Art Home Outdoors Bluetooth Sound Box',
    images: [
      'https://i.ibb.co/m6ZN7LX/soundBox.webp',
      'https://i.ibb.co/m6ZN7LX/soundBox.webp',
      'https://i.ibb.co/wdV3b9q/vaccum.webp',
      'https://i.ibb.co/tcdSfrr/blueGun.jpg',
      'https://i.ibb.co/pw0fGmx/gaming-Controller.webp'
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
    regularPrice: 120,
    salePrice: 100,
    quantity: 6,
    cartQuantity: 0,
    reviews: {
      rating: 4.5,
      data: [
        {
          author: 'Alice Johnson',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 14, 2021'
        },
        {
          author: 'Bob Smith',
          rating: 4,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'July 14, 2021'
        }
      ]
    },
    category: 'Bluetooth Speakers',
    colors: ['red', 'blue', 'green', 'yellow', 'black', 'white'],
    brand: 'Lorem ipsum dolor sit',
    isStock: true,
    overView: 'Bluetooth Speakers',
    isNew: true,
    base: links.Monitors
  },
  {
    id: 2020,
    name: 'Global Version Redmi Note 9 Pro 6GB RAM 64GB ROM Smartphone Mobile Phone',
    images: [
      'https://i.ibb.co/WyvSw8N/phoneTwo.jpg',
      'https://i.ibb.co/m6ZN7LX/soundBox.webp',
      'https://i.ibb.co/wdV3b9q/vaccum.webp',
      'https://i.ibb.co/tcdSfrr/blueGun.jpg',
      'https://i.ibb.co/pw0fGmx/gaming-Controller.webp'
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
    regularPrice: 450,
    salePrice: 410,
    quantity: 6,
    cartQuantity: 0,
    reviews: {
      rating: 4.5,
      data: [
        {
          author: 'Alice Johnson',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 14, 2021'
        },
        {
          author: 'Bob Smith',
          rating: 4,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'July 14, 2021'
        }
      ]
    },
    category: 'Cell Phones',
    colors: ['red', 'blue', 'green', 'yellow', 'black', 'white'],
    brand: 'Lorem ipsum dolor sit',
    isStock: true,
    overView: 'Dual Sim Phones',
    isNew: true,
    base: links.Mobiles
  },
  {
    id: 2021,
    name: 'L21 Bluetooth Earphone Wireless Earbuds 5.0 TWS Headsets Dual Earbuds Bass Sound For Huawei Xiaomi IPhone Samsung Mobile Phones',
    images: [
      'https://i.ibb.co/vjrLRfV/earbuds.webp',
      'https://i.ibb.co/m6ZN7LX/soundBox.webp',
      'https://i.ibb.co/wdV3b9q/vaccum.webp',
      'https://i.ibb.co/tcdSfrr/blueGun.jpg',
      'https://i.ibb.co/pw0fGmx/gaming-Controller.webp'
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
    regularPrice: 350,
    salePrice: 320,
    quantity: 6,
    cartQuantity: 0,
    reviews: {
      rating: 4.5,
      data: [
        {
          author: 'Alice Johnson',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 14, 2021'
        },
        {
          author: 'Bob Smith',
          rating: 4,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'July 14, 2021'
        }
      ]
    },
    category: 'Headphones',
    colors: ['red', 'blue', 'green', 'yellow', 'black', 'white'],
    brand: 'Lorem ipsum dolor sit',
    isStock: true,
    overView: 'Fitness Headphones',
    isNew: true,
    base: links.Headphones
  },
  {
    id: 2022,
    name: 'Roborock S7 Robot Vacuum Cleaner For Home Sonic Mopping Ultrasonic Carpet Clean Alexa Mop Lifting Upgrade For S5 Max',
    images: [
      'https://i.ibb.co/09ySKVm/vaccum-Cleaner.webp',
      'https://i.ibb.co/m6ZN7LX/soundBox.webp',
      'https://i.ibb.co/wdV3b9q/vaccum.webp',
      'https://i.ibb.co/tcdSfrr/blueGun.jpg',
      'https://i.ibb.co/pw0fGmx/gaming-Controller.webp'
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
    regularPrice: 250,
    salePrice: 240,
    quantity: 6,
    cartQuantity: 0,
    reviews: {
      rating: 4.5,
      data: [
        {
          author: 'Alice Johnson',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 14, 2021'
        },
        {
          author: 'Bob Smith',
          rating: 4,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'July 14, 2021'
        }
      ]
    },
    category: 'Robot Clean',
    colors: ['red', 'blue', 'green', 'yellow', 'black', 'white'],
    brand: 'Lorem ipsum dolor sit',
    isStock: true,
    overView: 'Robot Clean',
    isNew: true,
    base: links.HomeEssentials
  },
  {
    id: 2023,
    name: 'Klipsch R-120SW Powerful Detailed Home Speaker – Unit',
    images: [
      'https://i.ibb.co/bR9LcZY/home-Speaker.webp',
      'https://i.ibb.co/m6ZN7LX/soundBox.webp',
      'https://i.ibb.co/wdV3b9q/vaccum.webp',
      'https://i.ibb.co/tcdSfrr/blueGun.jpg',
      'https://i.ibb.co/pw0fGmx/gaming-Controller.webp'
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
    regularPrice: 600,
    salePrice: 580,
    quantity: 6,
    cartQuantity: 0,
    reviews: {
      rating: 4.5,
      data: [
        {
          author: 'Alice Johnson',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 14, 2021'
        },
        {
          author: 'Bob Smith',
          rating: 4,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'July 14, 2021'
        }
      ]
    },
    category: 'TV & Audio',
    colors: ['red', 'blue', 'green', 'yellow', 'black', 'white'],
    brand: 'Lorem ipsum dolor sit',
    isStock: true,
    overView: 'Bluetooth Speaker',
    isNew: true,
    base: links.Monitors
  },
  {
    id: 2024,
    name: 'ZY418 Ultra-Thin Sport MP3 MP4 Music Player',
    images: [
      'https://i.ibb.co/f9GKwRd/mp3-Player.webp',
      'https://i.ibb.co/m6ZN7LX/soundBox.webp',
      'https://i.ibb.co/wdV3b9q/vaccum.webp',
      'https://i.ibb.co/tcdSfrr/blueGun.jpg',
      'https://i.ibb.co/pw0fGmx/gaming-Controller.webp'
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
    regularPrice: 80,
    salePrice: 70,
    quantity: 6,
    cartQuantity: 0,
    reviews: {
      rating: 4.5,
      data: [
        {
          author: 'Alice Johnson',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 14, 2021'
        },
        {
          author: 'Bob Smith',
          rating: 4,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'July 14, 2021'
        }
      ]
    },
    category: 'TV & Audio',
    colors: ['red', 'blue', 'green', 'yellow', 'black', 'white'],
    brand: 'Lorem ipsum dolor sit',
    isStock: true,
    overView: 'MP3 Player',
    isNew: true,
    base: links.Monitors
  },
  {
    id: 2025,
    name: 'Xiaomi Mi Watch Lite GPS Bluetooth 5.1 Smart Watch Sports Fitness Heart Rate Monitor 1.4 Inch TFTLCD Screen 5 ATM Waterproof Mi Band',
    images: [
      'https://i.ibb.co/9hHGFnT/watchTwo.jpg',
      'https://i.ibb.co/m6ZN7LX/soundBox.webp',
      'https://i.ibb.co/wdV3b9q/vaccum.webp',
      'https://i.ibb.co/tcdSfrr/blueGun.jpg',
      'https://i.ibb.co/pw0fGmx/gaming-Controller.webp'
    ],
    description:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
    regularPrice: 220,
    salePrice: 210,
    quantity: 6,
    cartQuantity: 0,
    reviews: {
      rating: 4.5,
      data: [
        {
          author: 'Alice Johnson',
          rating: 5,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'August 14, 2021'
        },
        {
          author: 'Bob Smith',
          rating: 4,
          comment:
            'lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis repellendus dolore, facilis iste obcaecati ab nesciunt ducimus quidem molestias aut? Aut vitae error delectus itaque facilis obcaecati nemo dolore cumque. Blanditiis minus corrupti dignissimos, voluptas iusto, eligendi maiores doloremque aliquid mollitia in hic dolores pariatur doloribus dolorum totam. Facilis, dignissimos.',
          createdAt: 'July 14, 2021'
        }
      ]
    },
    category: 'Smart Watches',
    colors: ['red', 'blue', 'green', 'yellow', 'black', 'white'],
    brand: 'Lorem ipsum dolor sit',
    isStock: true,
    overView: 'Smart Health Watch',
    isNew: true,
    base: links.Wearables
  }
];

export type ProductType = (typeof products)[0];
