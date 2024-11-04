This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
# 开发注意事项
- Link必须使用项目内指定的组件，便于自动完成国际化
```
import {Link} from "@repo/i18n/navigation"
```
- 当前模板代码默认只有en语言有内容，如果需要翻译成其他语言，先去火山引擎注册账号，获得豆包模型的调用key和模型名称，然后替换apps/web/.env当中的DOUBAO_API_KEY、DOUBAO_MODEL_NAME两个变量
- 然后运行 `bun run  translate` 命令即可自动翻译en.json文件到其他语言

# 新游戏开发需要替换的内容
- 替换apps/web/public下的game_screenshot.webp图片
 - 使用下面（ 网站logo设计提示词）的提示词直接在cursor当中让claude生成svg logo。命名为logo.svg存放到apps/web/public目录下
-  使用[Logo.surf](https://logo.surf/)生成 ico和icon文件
  - 网站上选择需要的配色和字体，ico只需要两个字母即可.
  - 下载的文件里面会包含apple-touch-icon.png\favicon.ico，直接替换apps/web/app/favicon.ico 和apps/web/app/apple-touch-icon.png
- 替换apps/web/app/sitemap.xml 文件当中的域名为实际域名
- 修改apps/web/.env.production 和apps/web/.env.runtime.production 文件当中的UE_WEB_URL为实际域名
- 修改apps/web/lib/config/site.ts 文件当中的name\gameIframe\domain\gaId
 - name 为游戏名词，后续翻译也会用到
 - gameIframe 为游戏链接，如果游戏有更新，需要替换
 - domain 为实际域名，用于配置Plausible用户行为数据抓取，需要先去app.pageview.app注册域名否则不访问监控数据不生效
 - gaId 为Google分析ID
 - 使用下面提供的提示词（更换项目文案提示词）对en.json文件重新生成内容。需要先去网上收集尽可能多的游戏相关知识和文案，包括如何操作的文案。
 -en.json文件完成后，
  - 运行bun run clean-locales 命令清理messages目录下其他语言文件(第一次需要运行，后续无需操作)
  - 运行bun run translate 命令翻译其他语言内容


## 部署事项
- 代码提交到github私有仓库，然后去vercel.com 关联github仓库，并部署
- 第一次导入的时候需要修改 
 - Frameworks 为 Next.js 否则会报错
 - Root Directory 为apps/web
 - 需要修改build命令 `cd ../.. && turbo run build --filter='*'` 否则会报错
![alt text](image.png)
- 绑定域名时，选择将wwww重定向到@
- 在cloudflare配置cname和A记录，A记录指向vercel.app的ip地址
| 记录类型 | 名称 | 值 |
|---------|------|-----|
| CNAME   | www  | cname.vercel-dns.com |
| A       | spacewavesgame.online | 76.76.21.21 |

- cloudflare绑定域名，设置自定义ssl 选择 完全（严格） 否则会出现 重定向次数过多问题
- 如果iframe不让嵌入，就去另外找一个可以嵌入的
- vercel部署完成后，去search.google.com\bing.com 提交收录
## Docker私有部署

- 构建命令需要增加--network=host,否则会提示prisma文件下载失败


## 更换项目文案提示词
```
我正在开发一个新的游戏，名字叫："Escape Road" 。请基于我提供的一些有关这个游戏的文案素材，重新填充这个en.json文件里面的内容。这个en.json文件内容是给desc.tsx和home.tsx这两个组件提供国际化内容使用。请结合这个两个组件的代码结构统筹分析生成合理的文案内容。

注意事项：
1. 需要保证游戏名字"Escape Road"这个词的词密度最高，可以在合适的地方增加这个词的频率。
2.生成的文案内容必须来自我提供的内容里面，不可瞎编乱造。
3.先理解原先文案的内容含义和作用，再从我提供的文案当中找到合适的内容去替换（目的是尽可能的保证原有的网页结构不变，但更换成新的内容）

提供的文案内容：


```



