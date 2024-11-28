import postcssImport from 'postcss-import';
import postcssMixins from 'postcss-mixins';
import postcssNested from 'postcss-nested';
import postcssPresetEnv from 'postcss-preset-env';
// import { purgeCSSPlugin } from '@fullhuman/postcss-purgecss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';

export default (ctx) => ({
  plugins: [
    postcssImport,
    postcssMixins,
    postcssNested,
    postcssPresetEnv,
    ...(ctx.env === 'production'
      ? [
          autoprefixer,
          // purgeCSSPlugin({
          //   content: ['**/*.html', '**/*.astro', '**/*.ts'],
          // }),
          cssnano({ preset: 'advanced' }),
        ]
      : []),
  ],
});
