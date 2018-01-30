export default (html, finalState, radiumProp) => {

  return `
    <!DOCTYPE html>
    <html style = 'width:100%; margin : 0px'>
		<head>
			<link rel="stylesheet" href="/web-fonts-with-css/css/fontawesome-all.min.css">	
			<meta name= 'viewport' content = 'width = device-width, initial-scale=1'>
			<script>window.__PRELOADED_STATE__ = ${JSON.stringify(finalState).replace(/</g, '\\u003c')}</script>
			<script>window.__RADIUM_PROP__ = ${JSON.stringify(radiumProp).replace(/</g, '\\u003c')}</script>

			</head>
		<body style = 'width:100%; margin : 0px'>
		<div id = 'root' style = 'width:100%; margin : 0px'>${html}</div>
			<script src = '/nearbyBundle.js'></script> 
		</body>
	</html>
	`;
}