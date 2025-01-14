import React from 'react';
import {GameCategory, RecommendationItem} from '@/lib/types/site';
import {Card, CardBody, CardFooter} from "@nextui-org/card";
import {Image} from "@nextui-org/image";
import {Button} from "@nextui-org/button";
import {ScrollShadow} from "@nextui-org/scroll-shadow";
import Link from "next/link";

interface GameCategoryProps {
    category: GameCategory;
}

export const GameCategorySection: React.FC<GameCategoryProps> = ({category}) => {
    const games = category.games?.slice(0, category.pageSize) || [];
    const isHorizontal = category.displayStyle === 'horizontal';

    return (
        <div className="w-full">
            <div className="flex justify-between items-center mb-4">
                <div className="flex items-center gap-2">
                    {category.icon && (
                        <Image
                            src={category.icon}
                            alt={category.name}
                            className="w-6 h-6"
                        />
                    )}
                    <h2 className="text-xl font-bold">{category.name}</h2>
                </div>
                {(category.games?.length || 0) > category.pageSize && (
                    <Button
                        as={Link}
                        href={category.path}
                        variant="light"
                        color="primary"
                    >
                        View more
                    </Button>
                )}
            </div>

            <ScrollShadow 
                orientation={isHorizontal ? "horizontal" : "vertical"}
                className={`gap-4 ${
                    isHorizontal 
                        ? 'flex overflow-x-auto pb-4' 
                        : 'grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'
                }`}
            >
                {games.map((game: RecommendationItem) => (
                    <Card
                        key={game.url}
                        as={Link}
                        href={game.url}
                        className={`${
                            isHorizontal 
                                ? 'min-w-[200px] w-[200px]' 
                                : 'w-full'
                        } cursor-pointer`}
                        isPressable
                    >
                        <CardBody className="p-0">
                            <Image
                                src={game.cover || '/placeholder-game.png'}
                                alt={game.title}
                                className={`object-cover ${
                                    isHorizontal 
                                        ? 'aspect-[4/3]' 
                                        : 'aspect-square'
                                }`}
                            />
                        </CardBody>
                        <CardFooter className="justify-between">
                            <b className="text-sm truncate">{game.title}</b>
                        </CardFooter>
                    </Card>
                ))}
            </ScrollShadow>
        </div>
    );
};
