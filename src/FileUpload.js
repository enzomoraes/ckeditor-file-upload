import { Plugin } from 'ckeditor5/src/core';
import { ButtonView } from 'ckeditor5/src/ui';

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
				// eslint-disable-next-line
				icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><g id="file"><path d="M18.53,9,13,3.47a.75.75,0,0,0-.53-.22H8A2.75,2.75,0,0,0,5.25,6V18A2.75,2.75,0,0,0,8,20.75h8A2.75,2.75,0,0,0,18.75,18V9.5A.75.75,0,0,0,18.53,9ZM13.25,5.81l2.94,2.94H13.25ZM16,19.25H8A1.25,1.25,0,0,1,6.75,18V6A1.25,1.25,0,0,1,8,4.75h3.75V9.5a.76.76,0,0,0,.75.75h4.75V18A1.25,1.25,0,0,1,16,19.25Z"/></g></svg>`,
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

	// writeToEditor( name, url ) {
	// 	this.editor.model.change( writer => {
	// 		const link = writer.createText( name, { linkHref: url } );
	// 		this.editor.model.insertContent( link );
	// 	} );
	// }

	createFileInput() {
		// options.upload is an async function
		const options = this.editor.config.get( 'customFileUpload' );
		// eslint-disable-next-line
		const fileInput = window.document.createElement( 'input' );
		fileInput.type = 'file';
		fileInput.multiple = 'multiple';
		fileInput.click();
		fileInput.addEventListener( 'change', async e => {
			await options.upload( e.target.files );
			// const { name, url } = await options.upload( e.target.files[ 0 ] );
			// this.writeToEditor( name, url );
			// this.writeToEditor({ name: 'teste', linkToFile: 'www.google.com' });
		} );
	}
}
