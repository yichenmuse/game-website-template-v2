'use client';

import { Card, CardContent } from "@/lib/ui/components/card";

const videos = [
  {
    id: '1',
    title: "Liar's Bar – Will You Be the Last One Standing?",
    youtubeId: 'YzRDHxgW1JU'
  },
  {
    id: '2',
    title: 'A NEW simple and hilarious deception game!',
    youtubeId: 'zB-jrBv4zNc'
  },
  {
    id: '3',
    title: 'THE MOST BRUTALLY HILARIOUS GAME',
    youtubeId: 'kF5xqFwq7Wk'
  }
];

export default function RelatedVideo() {
  return (
    <div className="w-full px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">相关视频</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {videos.map((video) => (
          <Card key={video.id} className="overflow-hidden">
            <CardContent className="p-0">
              <div className="aspect-video">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${video.youtubeId}`}
                  title={video.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-t-lg"
                />
              </div>
              <div className="p-4">
                <h3 className="font-semibold line-clamp-2">{video.title}</h3>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}