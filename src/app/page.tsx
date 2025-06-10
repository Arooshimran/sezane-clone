import Image from 'next/image';
import Link from 'next/link';
import SezaneNavbar from './components/navbar';
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
      <SezaneNavbar/>
      {/* Hero section */}
      {/* Hero section */}
      <div className="grid grid-cols-1 md:grid-cols-2 h-[150vh]">
        <Link href="/new-in" className="relative w-full h-full block">
          <Image src="/new-in.avif" alt="New In" layout="fill" objectFit="cover" />
          <div className="absolute inset-0 flex justify-center items-center">
            <h2 className="text-4xl font-bold text-white drop-shadow-lg ml-8">NEW IN</h2>
          </div>

        </Link>

        <Link href="/shop" className="relative w-full h-full block">
          <Image src="/archives.avif" alt="Archives" layout="fill" objectFit="cover" />
          <div className="absolute inset-0 flex justify-center items-center">
            <h2 className="text-4xl font-bold text-white drop-shadow-lg ml-8">ARCHIVES</h2>
          </div>

        </Link>
      </div>


      {/* Product grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0">
        {categories.map(({ title, img }, idx) => (
          <Link
            href={idx % 2 === 0 ? "/shop" : "/new-in"}
            key={title}
          >
            <div className="relative aspect-[3/4] w-full">
              <Image src={img} alt={title} layout="fill" objectFit="cover" />
              <div className="absolute inset-0 flex justify-center items-center ml-8 text-white text-xl font-bold drop-shadow-md">
                {title}
              </div>

            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
