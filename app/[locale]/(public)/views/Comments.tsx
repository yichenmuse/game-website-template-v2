import { Avatar, AvatarFallback, AvatarImage } from "@/lib/ui/components/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/lib/ui/components/card";

interface Comment {
  id: number;
  author: string;
  avatar: string;
  role: string;
  content: string;
}

const comments: Comment[] = [
  {
    id: 1,
    author: "Sarah Chen",
    avatar: "/avatars/sarah.jpg",
    role: "Product Designer",
    content: "这个产品非常好用，界面设计直观，功能齐全。推荐给所有需要的人！"
  },
  {
    id: 2,
    author: "Mike Johnson",
    avatar: "/avatars/mike.jpg",
    role: "Software Engineer",
    content: "作为一个开发者，我很欣赏这个产品的技术实现。性能优异，代码质量高。"
  },
  {
    id: 3,
    author: "Lisa Wang",
    avatar: "/avatars/lisa.jpg",
    role: "Marketing Manager",
    content: "客户支持团队反应迅速，产品持续更新，体验非常好。"
  },
];



export default function Comments() {
  return (
    <section className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-center mb-12">用户评价</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {comments.map((comment) => (
          <Card key={comment.id} className="h-full">
            <CardHeader>
              <div className="flex items-center gap-4">
                <Avatar>
                  <AvatarImage src={comment.avatar} alt={comment.author} />
                  <AvatarFallback>{comment.author[0]}</AvatarFallback>
                </Avatar>
                <div>
                  <CardTitle className="text-lg">{comment.author}</CardTitle>
                  <CardDescription>{comment.role}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">{comment.content}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}