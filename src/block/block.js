/**
 * BLOCK: advanced-blockqute
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

//  Import CSS.
import './editor.scss';
import './style.scss';

const { __ } = wp.i18n; // Import __() from wp.i18n
const { registerBlockType } = wp.blocks; // Import registerBlockType() from wp.blocks

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
 const {
    PanelColorSettings,
    InspectorControls, 
    AlignmentToolbar, 
    BlockControls,
    RichText,
} = wp.editor;

const { 
    SelectControl,
    RangeControl,
	PanelBody,
	ColorPalette
} = wp.components;

registerBlockType( 'cgb/block-advanced-blockqute', {
	// Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
	title: __( 'advanced-blockqute' ), // Block title.
	icon: 'shield', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
	category: 'common', // Block category — Group blocks together based on common traits E.g. common, formatting, layout widgets, embed.
	keywords: [
		__( 'advanced-blockqute' ),
		__( 'blockqute' )
	],

	attributes: {

        quote: {
            type: 'array',
            source: 'children',
            selector: 'p',
            default: 'Great things in business are never done by one person. They\'re done by a team of people.',
        },
        
        cite: {
            type: 'array',
            source: 'children',
            selector: 'cite',
            default: 'Steve Jobs',
        },
        
        alignment: {
            type: 'string',
        },
        
        borderColor: {
            type: 'string',
            default: '#F9583B',
        },
        
        borderSize: {
            type: 'number',
            default: 4,
        },
        
        borderPosition: {
            type: 'string',
            default: 'left',
        },
        
        backgroundColor: {
            type: 'string',
            default: 'makeMeIgnored()',
        },
        
        textColor: {
            type: 'string',
            default: 'makeMeIgnored()',
        },
        
    },

	/**
	 * The edit function describes the structure of your block in the context of the editor.
	 * This represents what the editor will render when the block is used.
	 *
	 * The "edit" property must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Component.
	 */
	 
	 edit: function edit (props) {
		// Creates a <p class='wp-block-cgb-block-advanced-blockqute'></p>.

		const borderPositionsOp = [
			{ value: 'left', label: __( 'Left' ) },
			{ value: 'right', label: __( 'Right' ) },
			{ value: 'top', label: __( 'Top' ) },
			{ value: 'bottom', label: __( 'Bottom' ) },
		];

		
		const colorSamples = [
			{ color: '#F9583B', name: 'GPB Color' },
			{ color: '#e84393', name : 'Prunus Avium' },
			{ color: '#d63031', name : 'Chi-gong' },
			{ color: '#fd79a8', name: 'Pico-8' },
			{ color: '#00cec9', name : 'Robin\'s Egg Blue' },
			{ color: '#e17055', name : 'Orange Ville' },
			{ color: '#fdcb6e', name : 'Bright Yarrow' },
			{ color: '#55efc4', name : 'Light Greenish Blue' },
			{ color: '#00b894', name : 'Mint Leaf' },
			{ color: '#6c5ce7', name : 'Exodus Fruit' },
			{ color: '#ffeaa7', name : 'Sour Lemon' },
			{ color: '#fab1a0', name : 'First Date' },
			{ color: '#74b9ff', name : 'Green Darnet Tail' },
			{ color: '#a29bfe', name : 'Sky Moment' },
			{ color: '#2d3436', name : 'Dracula Orchid' },
			{ color: '#dfe6e9', name : 'City Lights' },
			{ color: '#636e72', name : 'American River' },	
		];

		const style = {
            'text-align': props.attributes.alignment,
            'background-color': props.attributes.backgroundColor,
            'color': props.attributes.textColor,
            [ 'border-' + props.attributes.borderPosition ]: props.attributes.borderSize + 'px solid ' + props.attributes.borderColor,	
        };

		return ([

			

			<InspectorControls key = {'inspector'}>
					<PanelBody>
						<SelectControl 
								label = { __( 'Border Position' ) }
								value = { props.attributes.borderPosition }
								options = {borderPositionsOp }
								onChange = { ( newBorderPosition ) => props.setAttributes( { borderPosition: newBorderPosition } ) }
						/>
						<RangeControl
                        	label = { __( 'Border Size' ) }
                        	value = { props.attributes.borderSize }
                        	min = { 0 }
                        	max = { 15 }
                        	step = { 1 }
                        	onChange = { ( newBorderSize ) => props.setAttributes( { borderSize: newBorderSize } ) } 
                    	/>

					<PanelColorSettings 
                        title = { __( 'Border Color' ) } 
                        initialOpen = { false } 
                        colorValue = { props.attributes.borderColor }
                        colorSettings={ [ {
                                value: props.attributes.borderColor,
                                colors: colorSamples,
                                label: __( 'Border Color' ),
                                onChange: ( newColor ) => props.setAttributes( { borderColor: newColor } ),
                        } ] } >
                    </PanelColorSettings>

					<PanelColorSettings 
                        title = { __( 'Background Color' ) } 
                        initialOpen = { false } 
                        colorValue = { props.attributes.backgroundColor } 
                        colorSettings={ [ {
                                value: props.attributes.backgroundColor,
                                colors: colorSamples,
                                label: __( 'Background Color' ),
                                onChange: ( newColor ) => props.setAttributes( { backgroundColor: newColor } ),
                        } ] } >
                    </PanelColorSettings>

                    <PanelColorSettings 
                        title = { __( 'Text Color' ) } 
                        initialOpen = { false } 
                        colorValue = { props.attributes.textColor } 
                        colorSettings={ [ {
                                value: props.attributes.textColor,
                                colors: colorSamples,
                                label: __( 'Text Color' ),
                                onChange: ( newColor ) => props.setAttributes( { textColor: newColor } ),
                        } ] } >
                    </PanelColorSettings>

					{/* <ColorPalette
						colors={ colorSamples }
						value={ props.attributes.borderColor }
						onChange={ ( newColor ) => props.setAttributes( { borderColor: newColor } ) }
        			/> */}

					</PanelBody>
					
			</InspectorControls>,
			<blockquote key={ 'quote' } className={ 'advanced-blockquote' } style={ style }>
                
				<RichText 
					tagName = { 'p' }
					placeholder = { props.attributes.quote }
					keepPlaceholderOnFocus = { true }
					value = { props.attributes.quote }
					isSelected = { false }
					onChange = { ( newQuote ) => props.setAttributes( { quote: newQuote } ) }
				/>

				<RichText 
					
					tagName = { 'cite' }
					placeholder = { props.attributes.cite }
					keepPlaceholderOnFocus = { true }
					value = { props.attributes.cite }
					isSelected = { false }
					onChange = { ( newCite ) => props.setAttributes( { cite: newCite } ) }
				/>

		</blockquote>
		]);
	},

	/**
	 * The save function defines the way in which the different attributes should be combined
	 * into the final markup, which is then serialized by Gutenberg into post_content.
	 *
	 * The "save" property must be specified and must be a valid function.
	 *
	 * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
	 *
	 * @param {Object} props Props.
	 * @returns {Mixed} JSX Frontend HTML.
	 */
	save: ( props ) => {
		const style = {
            'text-align': props.attributes.alignment,
            'background-color': props.attributes.backgroundColor,
            'color': props.attributes.textColor,
            [ 'border-' + props.attributes.borderPosition ]: props.attributes.borderSize + 'px solid ' + props.attributes.borderColor,	
        };
		return (
			<blockquote className = { 'advanced-blockquote' } style={style}>
                <p>{props.attributes.quote}</p>
                <cite>{props.attributes.cite}</cite>
            </blockquote>
		);
	},
} );
