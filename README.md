# AWS Sharp layer
This AWS lambda layer contains a pre-built [sharp](https://www.npmjs.com/package/sharp) npm library.
It is optimized for the most frugal space usage possible.

# Getting
A pre-built layer zip file is available on the [Releases page](../../releases), alongside the size of the layer.

# Building

## Dependencies
* Docker

## Steps
1. Clone the repo: 
    ```shell script
    git clone git@github.com:Umkus/lambda-layer-sharp.git
    cd lambda-layer-sharp/
    ```
1. Install dependencies:
    ```shell script
    docker run -v "$PWD":/var/task --entrypoint npm public.ecr.aws/lambda/nodejs:18 --no-audit --progress=false --arch=x64 --platform=linux ci
    ```
1. Build the layer:
    ```shell script
    docker run -v "$PWD":/var/task --entrypoint node public.ecr.aws/lambda/nodejs:18 ./node_modules/webpack/bin/webpack.js
    ```
1. Perform a smoke-test:
    ```shell script
    docker run -w /var/task/dist/nodejs -v "$PWD":/var/task --entrypoint node public.ecr.aws/lambda/nodejs:18 -e "console.log(require('sharp'))"
    ```
1. Import created layer into your AWS account:
    ```shell script
    aws lambda publish-layer-version --layer-name sharp --description "Sharp layer" --license-info "Apache License 2.0" --zip-file fileb://dist/sharp-layer.zip --compatible-runtimes nodejs14.x nodejs16.x nodejs18.x
    ```
