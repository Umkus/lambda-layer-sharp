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
    git clone git@github.com:buildigo/lambda-layer-sharp.git
    cd lambda-layer-sharp/
    ```
1. Create build image:
   ```
   docker build . --tag amazonlinux:nodejs-14
   ```
1. Install dependencies:
    ```shell script
    docker run -v "$PWD":/var/task amazonlinux:nodejs-14 npm --no-optional --no-audit --progress=false --prod install
    ```
1. Run and copy zip locally:
    ```shell script
    docker run -v $PWD/dist:/dist amazonlinux:nodejs-14
    ```
   You should now have a `sharp-layer.zip` file in your local `dist` directory
1. Import created layer into your AWS account:
    ```shell script
    aws lambda publish-layer-version --layer-name sharp --description "Sharp layer" --license-info "Apache License 2.0" --zip-file fileb://dist/sharp-layer.zip --compatible-runtimes nodejs14.x
    ```
   You now have a lambda layer published to your account that can be used with any lambda that requires sharp