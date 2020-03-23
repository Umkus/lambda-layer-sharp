# AWS Sharp layer
This AWS lambda layer contains a pre-built [sharp](https://www.npmjs.com/package/sharp) npm library.

|Sharp version|Layer size|Zipped size|
|---|---|---|
|[0.25.1](https://github.com/lovell/sharp/releases/tag/v0.25.1)|26MB|9.9MB|

# Getting
A built lambda zip file is available at [`dist/sharp-layer.zip`](./dist/sharp-layer.zip).

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
    docker run -v "$PWD":/var/task lambci/lambda:build-nodejs12.x npm ci
    ```
1. Build the layer:
    ```shell script
    docker run -v "$PWD":/var/task lambci/lambda:build-nodejs12.x node ./node_modules/webpack/bin/webpack.js
    ```
1. Import created layer into your AWS account:
    ```shell script
    aws lambda publish-layer-version \
       --layer-name sharp --description "Sharp layer" \
       --license-info "Apache License 2.0" \
       --zip-file fileb://dist/sharp-layer.zip \
       --compatible-runtimes nodejs12.x
    ```
