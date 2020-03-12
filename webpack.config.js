const path = require('path');
const CopyPlugin = require('copy-webpack-plugin');
const ZipPlugin = require('zip-webpack-plugin');

const distPath = 'nodejs/node_modules/sharp';

module.exports = {
  name: 'layer',
  mode: 'production',
  stats: 'minimal',
  target: 'node',
  watch: false,
  entry: {
    [`${distPath}/index`]: './node_modules/sharp/lib/index',
  },
  plugins: [
    new CopyPlugin([
      {
        from: 'node_modules/sharp/build',
        to: `${distPath}/build`,
      },
      {
        from: 'node_modules/sharp/README.md',
        to: distPath,
      },
      {
        from: 'node_modules/sharp/LICENSE',
        to: distPath,
      },
      {
        from: 'node_modules/sharp/vendor/THIRD-PARTY-NOTICES.md',
        to: `${distPath}/THIRD-PARTY-NOTICES.md`,
      },
      ...[
        'libvips.so.42',
        'libglib-2.0.so.0',
        'libgobject-2.0.so.0',
        'libpng16.so.16',
        'libtiff.so.5',
        'librsvg-2.so.2',
        'libgio-2.0.so.0',
        'libxml2.so.2',
        'libharfbuzz.so.0',
        'libcairo.so.2',
        'libpixman-1.so.0',
        'libfreetype.so.6',
        'libwebp.so.7',
        'libjpeg.so.8',
        'libtiff.so.5',
        'liblcms2.so.2',
        'libpango-1.0.so.0',
        'libfontconfig.so.1',
        'libgsf-1.so.114',
        'libexif.so.12',
        'libexpat.so.1',
        'libvips-cpp.so.42',
        'libgdk_pixbuf-2.0.so.0',
        'libfribidi.so.0',
        'libz.so.1',
        'libpangoft2-1.0.so.0',
        'libpangocairo-1.0.so.0',
        'libwebpmux.so.3',
        'libgif.so.7',
        'libffi.so.7',
        'libcairo-gobject.so.2',
        'libwebpdemux.so.2',
        'libgmodule-2.0.so.0',
        'libgthread-2.0.so.0',
        'liborc-0.4.so.0',
      ].map((i) => ({
        from: `node_modules/sharp/vendor/lib/${i}.*`,
        to: `${distPath}/vendor/lib/${i}`,
      })),
    ]),
    new ZipPlugin({
      filename: 'sharp-layer.zip',
    })
  ],
  optimization: {
    minimize: true,
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'commonjs2',
  },
  externals: {
    '../build/Release/sharp.node': './build/Release/sharp.node',
  },
};
