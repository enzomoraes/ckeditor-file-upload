@enzomoraes/ckeditor5-upload-plugin
=================================

This package was created by the [ckeditor5-package-generator](https://www.npmjs.com/package/ckeditor5-package-generator) package.

**This plugin was made in order to upload files, other than just images.**

To use it, just add to your build in config.builtinPlugins options after importing it

Add to your options.customFileUpload.upload method. It must be a promise that returns an object with { name, url }.
