FROM public.ecr.aws/lambda/nodejs:18

WORKDIR /build

COPY * ./

RUN npm --no-optional --no-audit --progress=false install

RUN node ./node_modules/webpack/bin/webpack.js

RUN node -e "console.log(require('sharp'))"

RUN mkdir /dist && \
  echo "cp /build/dist/sharp-layer.zip /dist/sharp-layer.zip" > /entrypoint.sh && \
  chmod +x /entrypoint.sh

ENTRYPOINT "/entrypoint.sh"