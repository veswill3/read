//= require ./ReadWord
//= require ./ReadBlock
//= require ./Read

var r;

$(function() {
	r = new Read ( $('#txt').val() );
	r.play();

	$('#txt').on('blur', function () {
		if (this.value) {
			r.destroy();
			r = new Read ( this.value );
			r.play();
		}
	});
});
