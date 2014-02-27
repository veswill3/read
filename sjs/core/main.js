//= require ./Renderer
//= require ./Block

var b;
var r;
r = new Renderer ( null, $('.display') );

$(function() {
	$('#txt').on('blur', function () {
		if (this.value) {
			b = new Block ( this.value );
			r.setBlock (b);
			r.play();
		}
	});
});
