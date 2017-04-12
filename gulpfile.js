var gulp = require('gulp');
var sass = require("gulp-sass");
var autoprefixer = require('gulp-autoprefixer');
var uglify = require('gulp-uglify');
var rename = require("gulp-rename");
var runSequence = require("run-sequence");

gulp.task("uglify", function() {
	return gulp.src("three-dots.js")
		.pipe(uglify())
		.pipe(rename({suffix: ".min"}))
		.pipe(gulp.dest(function(file) {
			return file.base;
		}));
});

gulp.task("sass", function() {
	return gulp.src("examples/scss/**/*.scss")
		.pipe(sass())
		.pipe(autoprefixer())
		.pipe(gulp.dest("examples/css"));
});

gulp.task("copy-js", function() {
	return gulp.src("three-dots.min.js")
		.pipe(gulp.dest("examples/js"));
});

gulp.task("watch", function() {
	gulp.watch("three-dots.js", ["build"]);
	gulp.watch("examples/scss/**/*.scss", ["sass"]);
});

gulp.task("build", function(callback) {
	runSequence("uglify",
		"copy-js",
		callback
	);
});

gulp.task("default", function(callback) {
		runSequence(["sass", "build", "watch"],
		callback
	);
});