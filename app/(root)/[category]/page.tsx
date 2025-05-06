// app/page.tsx
import Link from "next/link";
import Image from "next/image";

type Category = {
  name: string;
  slug: string;
  imageUrl: string;
};

const categories: Category[] = [
  { name: "Men", slug: "men", imageUrl: "/men.jpg" },
  { name: "Women", slug: "women", imageUrl: "/women.jpg" },
  { name: "Kids", slug: "kids", imageUrl: "/kids.jpg" },
];

export default function Home() {
  return (
    <main className="grid grid-cols-1 md:grid-cols-3 gap-4 p-6">
      {categories.map(({ name, slug, imageUrl }) => (
        <Link key={slug} href={`/${slug}`} className="relative group h-64 block rounded-xl overflow-hidden shadow-lg">
          <Image
            src={imageUrl}
            alt={name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <h2 className="text-white text-2xl font-bold">{name}</h2>
          </div>
        </Link>
      ))}
    </main>
  );
}