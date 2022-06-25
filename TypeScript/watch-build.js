const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const esbuild = require('esbuild')

function copyFileSync( source, target ) {

    let targetFile = target;

    //if target is a directory a new file with the same name will be created
    if ( fs.existsSync( target ) ) {
        if ( fs.lstatSync( target ).isDirectory() ) {
            targetFile = path.join( target, path.basename( source ) + '.txt' );
        }
    }

    fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync( source, targetFolder ) {
    let files = [];

    if ( !fs.existsSync( targetFolder ) ) {
        fs.mkdirSync( targetFolder );
    }

    //copy
    if ( fs.lstatSync( source ).isDirectory() ) {
        files = fs.readdirSync( source );
        files.forEach( function ( file ) {
            let curSource = path.join( source, file );
            if ( fs.lstatSync( curSource ).isDirectory() ) {
                copyFolderRecursiveSync( curSource, path.join( targetFolder, file) );
            } else {
                copyFileSync( curSource, targetFolder );
            }
        } );
    }
}

chokidar.watch('./src').on('all', (event, path) => {
    esbuild.build({
        bundle: true,
        entryPoints: ['./src/core/entrance.ts'],
        external: ['csharp', 'puerts', 'path', 'fs'],
        format: 'cjs',
        outfile: './outPut/entrance.js',
        sourcemap: true,
        treeShaking: true,
    }).then(result => {
        copyFolderRecursiveSync("outPut", "../Assets/StreamingAssets")
    })
});