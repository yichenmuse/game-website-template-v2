'use client';

import { LocaleDropdown } from '@/lib/components/locale-dropdown';
import { siteConfig } from '@/lib/config/site';
import { getPathname, Link } from '@/lib/i18n/navigation';
import { Button } from '@/lib/ui/components/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/lib/ui/components/navigation-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/lib/ui/components/sheet';
import { cn } from '@/lib/utils/commons';
import { Menu } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React from 'react';

interface NavItem {
  title: string;
  href: string;
  icon?: string;
  children?: NavItem[];
}

export default function AppNavbar() {
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const locale = useLocale();

  const isActive = (href: string) => pathname === href;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-[rgb(27,44,65)] shadow-md">
      <div className="container flex h-16 items-center px-4">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-white">
              <Menu className="h-6 w-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-[300px] sm:w-[400px]">
            <SheetHeader>
              <SheetTitle>{t('title')}</SheetTitle>
            </SheetHeader>
            <div className="flex flex-col gap-4 py-4">
              {siteConfig.navbarItems
                .flatMap((item: NavItem) => (item.children ? item.children : [item]))
                .map((item, index) => (
                  <Link
                    key={`${item.title}-${index}`}
                    href={`/${locale}/${getPathname({ href: item.href, locale })}`}
                    className={cn(
                      'flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md hover:bg-accent',
                      isActive(item.href) && 'bg-accent',
                    )}
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t(item.title)}
                  </Link>
                ))}
              <div className="px-4 py-2">
                <LocaleDropdown type="link" />
              </div>
            </div>
          </SheetContent>
        </Sheet>

        <div className="flex items-center gap-6">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="/logo.svg"
              className="h-14 w-auto rounded-xl"
              alt={`${t('title')} logo`}
              width={20}
              height={20}
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                console.error('Image load failed:', e);
              }}
            />
            <span className="inline-flex items-end text-lg text-white font-leckerli">Ï
              {t(siteConfig.slogan as any)}
            </span>
          </Link>
        </div>

        <div className="hidden md:flex flex-1 justify-center">
          <NavigationMenu>
            <NavigationMenuList>
              {siteConfig.navbarItems.map((item: NavItem) => (
                <NavigationMenuItem key={item.title}>
                  {item.children ? (
                    <>
                      <NavigationMenuTrigger className="text-white">{t(item.title)}</NavigationMenuTrigger>
                      <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                          {item.children.map((child) => (
                            <li key={child.title}>
                              <NavigationMenuLink asChild>
                                <Link
                                  href={child.href}
                                  className={cn(
                                    'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
                                    isActive(child.href) && 'bg-accent text-accent-foreground',
                                  )}
                                >
                                  <div className="flex items-center gap-2">
                                    <div className="text-sm font-medium leading-none">{t(child.title)}</div>
                                  </div>
                                </Link>
                              </NavigationMenuLink>
                            </li>
                          ))}
                        </ul>
                      </NavigationMenuContent>
                    </>
                  ) : (
                    <Link href={item.href} className={cn(navigationMenuTriggerStyle(), "bg-transparent")}>
                      <div className="flex items-center gap-2 text-white">{t(item.title)}</div>
                    </Link>
                  )}
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        <div className="hidden md:flex items-center gap-4">
          <LocaleDropdown />
        </div>
      </div>
    </header>
  );
}
