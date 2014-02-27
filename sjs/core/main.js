//= require ./Renderer
//= require ./Block

var r;

$(function() {
	r = new Renderer ( new Block ( $('#txt').val() ) );
	r.play();

	$('#txt').on('blur', function () {
		if (this.value) {
			r.setBlock ( new Block ( this.value ) );
			r.play();
		}
	});
});
