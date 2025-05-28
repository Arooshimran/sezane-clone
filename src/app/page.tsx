import Image from 'next/image';
import Link from 'next/link'; // Add this import

const categories = [
  { title: 'SHOP', img: '/shop.avif' },
  { title: 'BAGS & BASKETS BAGS', img: '/baskets.avif' },
  { title: 'SHIRTS & BLOUSES', img: '/shirts.avif' },
  { title: 'DRESSES', img: '/dress.avif' },
  { title: 'SHOES', img: '/shoe.avif' },
  { title: 'SHORTS & SKIRTS', img: '/shorts.avif' },
  { title: 'JEWELRY', img: '/jewelry.avif' },
  { title: 'JACKETS', img: '/jackets.avif' }
];

export default function SezaneClone() {
  return (
    <div className="bg-white text-black">
      {/* Hero section */}
      <div className="grid grid-cols-1 md:grid-cols-2 h-[150vh]">
        <div className="relative w-full h-full">
          <Link href="/new-in">
            <Image src="/new-in.avif" alt="New In" layout="fill" objectFit="cover" />
            <h2 className="absolute bottom-8 left-8 text-4xl font-bold text-white">NEW IN</h2>
          </Link>
        </div>
        <div className="relative w-full h-full">
          <Link href="/shop">
            <Image src="/archives.avif" alt="Archives" layout="fill" objectFit="cover" />
            <h2 className="absolute bottom-8 left-8 text-4xl font-bold text-white">ARCHIVES</h2>
          </Link>
        </div>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
        {categories.map(({ title, img }) => (
          <Link href="/new-in" key={title}>
            <div className="relative aspect-[3/4] w-full">
              <Image src={img} alt={title} layout="fill" objectFit="cover" />
              <div className="absolute bottom-4 left-4 text-white text-xl font-bold drop-shadow-md">
                {title}
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
