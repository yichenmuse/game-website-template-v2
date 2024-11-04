'use client';
import { Button } from '@nextui-org/button';
import { Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from '@nextui-org/dropdown';
import { Navbar, NavbarBrand, NavbarContent, NavbarMenu, NavbarMenuItem, NavbarMenuToggle } from '@nextui-org/navbar';

import { getPathname, Link, usePathname } from '@/lib/i18n/navigation';
import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from '@/lib/ui/components/navigation-menu';
import { Link as NextUILink } from '@nextui-org/link';
import React from 'react';

import { siteConfig } from '@/lib/config/site';
import { getCurrentLocaleName, localeNames } from '@/lib/i18n/locales';
import { cn } from '@/lib/utils/commons';
import { ChevronDown, ChevronRight, Languages } from 'lucide-react';
import { useLocale, useTranslations } from 'next-intl';
import { BsInfoLg } from 'react-icons/bs';
import { FaCat, FaFemale, FaGlobeAmericas, FaMale } from 'react-icons/fa';
import { MdOutlineExplore, MdOutlineFemale, MdOutlineMale } from 'react-icons/md';
import { RiAiGenerate } from 'react-icons/ri';
export default function AppNavbar() {
  const t = useTranslations();
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const currentLocaleName = getCurrentLocaleName(locale);
  const isActive = (item: any) => {
    if (item.href === pathname) {
      return true;
    }
    return !!(item.children && item.children.some((child: any) => child.href === pathname));
  };
  //   const getActiveItemTitle = (item: any) => {
  //     if (item.children) {
  //       return item.children.find((child: any) => child.href === pathname)?.title ?? item.title;
  //     }
  //     return item.title;
  //   };

  const icons: Record<string, any> = {
    raw: <RiAiGenerate className="text-primary text-2xl" fill="currentColor" />,
    male: <FaMale className="text-sky-500 text-2xl" fill="currentColor" />,
    female: <FaFemale className="text-purple-500 text-2xl" fill="currentColor" />,
    girl: <MdOutlineFemale className="text-pink-500 text-2xl" fill="currentColor" />,
    boy: <MdOutlineMale className="text-blue-500 text-2xl" fill="currentColor" />,
    cat: <FaCat className="text-black text-2xl" fill="currentColor" />,
    explore: <MdOutlineExplore className="text-teal-500 text-2xl" fill="currentColor" />,
    info: <BsInfoLg className="text-gray-500 text-2xl" fill="currentColor" />,
    ['cross-cultural']: <FaGlobeAmericas className="text-blue-500 text-2xl" fill="currentColor" />,
  };

  //   const link_builder = (href: string, name: string) => {
  //     if (href === 'en') {
  //       // 英文时，确保pathname不带locale
  //       return (
  //         <NextLink className="flex items-center gap-2 text-gray-500 hover:text-primary w-full" href={pathname}>
  //           <ChevronRight />
  //           {name}
  //         </NextLink>
  //       );
  //     } else {
  //       return (
  //         <Link className="flex items-center gap-2 text-gray-500 hover:text-primary w-full" href={pathname} locale={href}>
  //           <ChevronRight />
  //           {name}
  //         </Link>
  //       );
  //     }
  //   };

  const localDropdown = (type: 'link' | 'button' = 'button') => (
    <Dropdown>
      <DropdownTrigger>
        {type === 'button' ? (
          <Button className="text-white" variant="bordered" startContent={<Languages size={16} />}>
            {currentLocaleName}
          </Button>
        ) : (
          <NextUILink className={'w-full text-xl text-foreground gap-2'}>
            <Languages className="text-white text-2xl" /> {currentLocaleName} <ChevronDown />
          </NextUILink>
        )}
      </DropdownTrigger>
      <DropdownMenu
        selectionMode={'single'}
        aria-label="change locale"
        className="dropdown-grid p-2"
        style={{ width: 'auto', minWidth: '400px' }} // 增加最小宽度以适应两列
      >
        {Object.entries(localeNames).map(([key, name]) => (
          <DropdownItem key={key} className="col-span-1 hover:text-primary">
            <Link
              className={cn(
                'flex items-center gap-2 w-full',
                locale === key ? 'text-primary' : 'text-gray-500 hover:text-primary',
              )}
              href={pathname}
              locale={key}
            >
              <ChevronRight />
              {name}
            </Link>
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  );
  return (
    <Navbar
      maxWidth="2xl"
      classNames={{
        base: 'h-[4rem] bg-[rgb(27,44,65)] py-2 shadow-md', // Changed background color to rgb(27, 44, 65)
        item: 'text-gray-800 hover:text-primary transition-colors duration-200 data-[active=true]:text-white data-[active=true]:px-5 data-[active=true]:py-1 data-[active=true]:bg-primary data-[active=true]:rounded-2xl',
      }}
      onMenuOpenChange={setIsMenuOpen}
    >
      <NavbarMenuToggle aria-label={isMenuOpen ? 'Close menu' : 'Open menu'} className="sm:hidden" />

      <NavbarBrand>
        <div className="flex md:justify-start items-center">
          <div className="text-xl font-bold flex w-auto py-2">
            <Link href="/">
              <img
                src="/logo.svg"
                className="max-w-40 max-h-14 md:max-h-14 rounded-xl min-w-[100px]"
                alt={`${t('title')} logo`}
                width="100%"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  console.error('图片加载失败:', e);
                }}
              />
            </Link>
          </div>
          <div className="inline-flex items-end text-lg text-white w-60 mt-1 ml-4 font-leckerli">
            {t(siteConfig.slogan as any)}
          </div>
        </div>
      </NavbarBrand>

      <NavbarContent className="hidden md:flex gap-10" justify="center">
        <NavigationMenu>
          <NavigationMenuList className="space-x-2">
            {' '}
            {/* 增加间距 */}
            {siteConfig.navbarItems.map((it) => (
              <NavigationMenuItem key={it.title} className="px-4">
                <div>
                  <Link
                    className={cn('text-foreground text-lg', {
                      'font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#1E3A8A] to-[#9333EA]':
                        isActive(it),
                    })}
                    href={it.href}
                  >
                    {t(it.title)}
                  </Link>
                </div>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
      </NavbarContent>

      <NavbarMenu className="pt-5 ">
        {siteConfig.navbarItems
          .flatMap((it: any) => it?.children ?? [it])
          .map((it, index) => (
            <NavbarMenuItem key={`${it.title}-${index}`}>
              <NextUILink
                className={cn('w-full text-xl text-foreground gap-2', {
                  'font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5]': isActive(it),
                })}
                href={`/${locale}/${getPathname({ href: it.href, locale })}`}
              >
                {it.icon && (icons[it.icon]! as any)}
                {t(it.title)}
              </NextUILink>
            </NavbarMenuItem>
          ))}
        <NavbarMenuItem key="locale">{localDropdown('link')}</NavbarMenuItem>
      </NavbarMenu>

      <NavbarContent as="div" justify="end">
        <div className="hidden sm:block">{localDropdown()}</div>
      </NavbarContent>
    </Navbar>
  );
}
