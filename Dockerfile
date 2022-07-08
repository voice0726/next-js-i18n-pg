# Install dependencies only when needed
FROM node:16-alpine AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /var/www
COPY package.json package-lock.json ./
RUN npm ci

# Rebuild the source code only when needed
FROM node:16-alpine AS builder
WORKDIR /var/www
COPY . .
COPY --from=deps /var/www/node_modules ./node_modules
RUN npm run build
RUN find ./pages \( -type d -exec mkdir -p "/var/www/translateSrc/{}" \; -o -type f -exec touch "/var/www/translateSrc/{}" \; \)

# Production image, copy all the files and run next
FROM node:16-alpine AS runner
WORKDIR /var/www

ENV NODE_ENV production

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001

# You only need to copy next.config.js if you are NOT using the default configuration
# COPY --from=builder /var/www/next.config.js ./
COPY --from=builder /var/www/public ./public
COPY --from=builder --chown=nextjs:nodejs /var/www/.next ./.next
COPY --from=builder /var/www/node_modules ./node_modules
COPY --from=builder /var/www/package.json ./package.json
COPY --from=builder /var/www/next.config.js ./next.config.js
COPY --from=builder /var/www/i18n.json ./i18n.json
COPY --from=builder /var/www/translateSrc .


USER nextjs

EXPOSE 3000

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry.
# ENV NEXT_TELEMETRY_DISABLED 1

CMD ["npm", "start"]
