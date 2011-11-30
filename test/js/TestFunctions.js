module("Functions");
test("Existance of toRad", function() {
		ok(typeof Number.prototype.toRad=="function",'Function toRad() should exist');
});
test("toRad - PI", function() {
		var deg = 180;
		equal(deg.toRad(),Math.PI,'180 degrees should equal pi rad');
});
test("toRad - One", function() {
		var deg = 1;
		equal(deg.toRad() * 180,Math.PI,'1 degree should equal pi rad / 180');
});