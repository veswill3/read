//= require ./Read

var r;

$(function() {
	r = new Read ( $('#txt').val() );
	r.play();

	$('#txt').on('blur', function () {
		if (this.value) {
			r.setText ( this.value );
			r.play();
		}
	});
});
