# AWS Sharp layer
This AWS lambda layer contains a latest pre-built vanilla [sharp](https://www.npmjs.com/package/sharp) npm library, so that you could "just use" it in your lambda code:

```javascript
import sharp from 'sharp'
// ...
```

It contains only necessary files to minimize its weight (16Mb).
It also supports all current AWS lambda node runtimes (>=`nodejs14.x`) and architectures (`x86_64` and `arm64`).

# Getting
A pre-built layer zip file is available on the [Releases page](../../releases).

You can import it into your AWS account throught the Lambda console or with the following command:
```shell
aws lambda publish-layer-version \
    --layer-name sharp \
    --description "Sharp layer" \
    --license-info "Apache License 2.0" \
    --zip-file fileb://dist/sharp-layer.zip \
    --compatible-runtimes nodejs14.x nodejs16.x nodejs18.x \
    --compatible-architectures x86_64 arm64
```

# Building
Simply run (this will wipe your existing `node_modules/` directory):
```shell
npm ci --arch=x64 --platform=linux
```

Build will be performed automatically upon deps installation.
The resulted lambda layer zip file will be saved to `dist/` directory.