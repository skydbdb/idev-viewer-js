import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';

export default [
    // UMD 번들 (Vanilla JS)
    {
        input: 'src/idev-viewer.js',
        output: {
            file: 'dist/idev-viewer.js',
            format: 'umd',
            name: 'IdevViewer',
            sourcemap: true
        },
        plugins: [
            resolve(),
            commonjs(),
            terser()
        ]
    },

    // ES 모듈 번들
    {
        input: 'src/idev-viewer.js',
        output: {
            file: 'dist/idev-viewer.esm.js',
            format: 'es',
            sourcemap: true
        },
        plugins: [
            resolve(),
            commonjs()
        ]
    }
];
