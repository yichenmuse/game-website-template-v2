# use the official Bun image
# see all versions at https://hub.docker.com/r/oven/bun/tags
FROM oven/bun:1 AS base
WORKDIR /home/bun


# 使用国内镜像源并安装 Node.js
RUN sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list && \
    sed -i 's|security.debian.org/debian-security|mirrors.ustc.edu.cn/debian-security|g' /etc/apt/sources.list && \
    apt-get update && apt-get install -y curl && \
    curl -fsSL https://deb.nodesource.com/setup_18.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

FROM base AS release
# COPY 文件时，相对目录是在项目根目录下，不是Dockerfile所在目录
COPY --chown=bun:bun ./apps/web/.env.runtime.production ./apps/web/.env.production
COPY --chown=bun:bun ./node_modules ./node_modules
COPY --chown=bun:bun ./apps/web/.next ./apps/web/.next
COPY --chown=bun:bun ./apps/web/public ./apps/web/public
COPY --chown=bun:bun ./apps/web/.env ./apps/web/.env
COPY --chown=bun:bun ./apps/web/messages ./apps/web/messages
COPY --chown=bun:bun ./apps/web/package.json ./apps/web/package.json
COPY --chown=bun:bun ./apps/web/next.config.mjs ./apps/web/next.config.mjs
COPY --chown=bun:bun ./turbo.json ./turbo.json
COPY --chown=bun:bun ./package.json ./package.json


USER bun
EXPOSE 3000/tcp
WORKDIR /home/bun
ENTRYPOINT [ "bun", "run", "start" ]
