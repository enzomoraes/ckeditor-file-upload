import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';

import FileIcon from 'primeicons/raw-svg/file.svg';

export default class FileUpload extends Plugin {
	static get pluginName() {
		return 'FileUpload';
	}

	init() {
		// Add the "myPlugin" button to feature components.
		this.editor.ui.componentFactory.add( 'fileUpload', locale => {
			const view = new ButtonView( locale );

			view.set( {
				label: this.editor.t( 'File Upload' ),
				icon: FileIcon,
				tooltip: true
			} );

			// Insert a text into the editor after clicking the button.
			this.listenTo( view, 'execute', () => {
				this.createFileInput();
				this.editor.editing.view.focus();
			} );

			return view;
		} );
	}

	writeToEditor( name, url ) {
		this.editor.model.change( writer => {
			const link = writer.createText( name, { linkHref: url } );
			this.editor.model.insertContent( link );
		} );
	}

	createFileInput() {
		// options.upload is a function. It must return an object with properties linkToFile and name to the file that is being uploaded.
		const options = this.editor.config.get( 'customFileUpload' );
		const fileInput = document.createElement( 'input' );
		fileInput.type = 'file';
		fileInput.click();
		fileInput.addEventListener( 'change', e => {
			const { name, url } = options.upload( e.target.files[ 0 ] );
			this.writeToEditor( name, url );
			// this.writeToEditor({ name: 'teste', linkToFile: 'www.google.com' });
		} );
	}
}
