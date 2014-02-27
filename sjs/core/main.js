//= require ./Renderer
//= require ./Block

var b;
var r;


$(function() {
	b = new Block ( $('#txt').val() );
	r = new Renderer ( b, $('.display') );
	r.play();

	$('#txt').on('blur', function () {
		if (this.value) {
			b = new Block ( this.value );
			r.setBlock (b);
			r.play();
		}
	});
});
