FROM amazonlinux:latest

RUN touch ~/.bashrc && chmod +x ~/.bashrc

# Install the dependencies
RUN yum -y install gcc44 gcc-c++ libgcc44 cmake wget findutils tar gzip zip

# Node
RUN curl --silent --location https://rpm.nodesource.com/setup_14.x | bash -
RUN yum install nodejs -y

# Confirm node installation
RUN node -v && npm -v

WORKDIR /build
COPY * ./

RUN npm --no-optional --no-audit --progress=false install

# Confirm sharp installation
RUN node -e "console.log(require('sharp'))"

# Entrypoint script will zip the node modules into an archive in dist, which can be exported out of the container
RUN mkdir /dist && \
  echo "zip -FS -q -r /dist/sharp-layer.zip ./node_modules/*" > /entrypoint.sh && \
  chmod +x /entrypoint.sh

ENTRYPOINT "/entrypoint.sh"