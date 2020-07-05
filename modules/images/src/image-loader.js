import parseImage from './lib/parsers/parse-image';
import {getBinaryImageMetadata} from './lib/category-api/binary-image-api';

/** @typedef {import('@loaders.gl/loader-utils').LoaderObject} LoaderObject */

// __VERSION__ is injected by babel-plugin-version-inline
// @ts-ignore TS2304: Cannot find name '__VERSION__'.
const VERSION = typeof __VERSION__ !== 'undefined' ? __VERSION__ : 'latest';

const EXTENSIONS = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'ico', 'svg'];
const MIME_TYPES = [
  'image/png',
  'image/jpeg',
  'image/gif',
  'image/webp',
  'image/bmp',
  'image/vnd.microsoft.icon',
  'image/svg+xml'
];

// Loads a platform-specific image type that can be used as input data to WebGL textures
/** @type {LoaderObject} */
const ImageLoader = {
  id: 'image',
  name: 'Image',
  category: 'image',
  version: VERSION,
  mimeTypes: MIME_TYPES,
  extensions: EXTENSIONS,
  parse: parseImage,
  // TODO: support byteOffset, byteLength;
  test: arrayBuffer => Boolean(getBinaryImageMetadata(new DataView(arrayBuffer))),
  options: {
    image: {
      type: 'auto',
      decode: true, // applies only to images of type: 'image' (Image)
      _extractDataOnWorker: true // whether to decode data asynchronously on worker
    }
    // imagebitmap: {} - if supplied, passes platform dependent parameters to `createImageBitmap`
  }
};

export default ImageLoader;
