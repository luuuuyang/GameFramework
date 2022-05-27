/**
 * Thanks https://github.com/luuuuyang
 * https://github.com/SadCatUnion/Ring-of-the-Blood-Cat-Soul/blob/main/Typescript/esbuild.config.js
 */

const fs = require('fs');
const path = require('path');

let cfgStr = fs.readFileSync("./config.json",{
    encoding:"utf-8"
})

let cfg = JSON.parse(cfgStr)

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

require('esbuild').build({
    entryPoints: cfg.Entrance,
    bundle: cfg.bundle,
    format: cfg.format,
    outfile: cfg.outfile,
    external: cfg.external,
}).then(result => {
    copyFolderRecursiveSync(cfg.outputPath, cfg.streamPath)
})