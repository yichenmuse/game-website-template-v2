import { Avatar, AvatarFallback, AvatarImage } from "@/lib/ui/components/avatar";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/lib/ui/components/card";
import Image from "next/image";
import Link from "next/link";

// 游戏数据类型定义
interface Game {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  websiteUrl: string;
  author: {
    name: string;
    avatar: string;
  };
}

// 示例游戏数据
const games: Game[] = [
  {
    id: "1",
    title: "Super Mario Odyssey",
    description: "一个充满冒险的3D平台游戏",
    imageUrl: "/games/mario.jpg",
    websiteUrl: "https://mario.nintendo.com",
    author: {
      name: "Nintendo",
      avatar: "/authors/nintendo.png"
    }
  },
  // 添加更多游戏...
];

// 游戏推荐组件
export default async function Recommendation() {
  return (
    <div className="container mx-auto py-8">
      <h2 className="text-3xl font-bold mb-6">推荐游戏</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {games.map((game) => (
          <Link href={game.websiteUrl} key={game.id} target="_blank" rel="noopener noreferrer">
            <Card className="h-full hover:shadow-lg transition-shadow duration-200">
              <CardHeader>
                <div className="relative w-full h-48">
                  <Image
                    src={game.imageUrl}
                    alt={game.title}
                    fill
                    className="object-cover rounded-t-lg"
                  />
                </div>
                <CardTitle className="mt-4">{game.title}</CardTitle>
                <CardDescription>{game.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
