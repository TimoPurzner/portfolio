/* jshint node:true */
/* global -$ */
'use strict';
var gulp = require('gulp');
var plugins = require('gulp-load-plugins')({
	rename: {

	}
});

gulp.task('css', function() {
	gulp.src('src/styles/*.css')
		.pipe(gulp.dest('dist/public/styles'));
});

gulp.task('js', function() {
	gulp.src('src/scripts/*.js')
		.pipe(gulp.dest('dist/public/scripts'));
});

gulp.task('fonts', function() {
	gulp.src(['src/fonts/**/*.wotf'])
		.pipe(gulp.dest('dist/public/fonts'));
});

gulp.task('images', function() {
	gulp.src(['src/images/**/*.png', 'src/images/**/*.jpeg'])
		.pipe(gulp.dest('dist/public/images'));
});

gulp.task('video', function() {
	gulp.src(['src/video/**/*.webm', 'src/video/**/*.mp4'])
		.pipe(gulp.dest('dist/public/video'));
});

gulp.task('html', function() {
	gulp.src(['src/*.html', 'src/**/*.html'])
		.pipe(gulp.dest('dist/'));
});

gulp.task('jquery', function() {
	gulp.src('bower_components/jquery/dist/jquery.min.js')
		.pipe(gulp.dest('dist/public/scripts'));
});

gulp.task('angular', ['jquery'], function() {
	gulp.src(['bower_components/angular/angular.min.js', 'bower_components/angular/angular.min.js.map'])
		.pipe(gulp.dest('dist/public/scripts'));
});

gulp.task('semantic', function () {
	gulp.src('bower_components/semantic/dist/semantic.min.js')
		.pipe(gulp.dest('dist/public/scripts'));
	gulp.src('bower_components/semantic/dist/semantic.min.css')
	.pipe(gulp.dest('dist/public/styles'));
	gulp.src('bower_components/semantic/dist/themes/**/**/**')
		.pipe(gulp.dest('dist/public/styles/themes'));
});
gulp.task('distribute', ['angular', 'semantic', 'html', 'css', 'js', 'images','video', 'fonts'], function() {
});

gulp.task('watch', ['distribute'], function() {
	gulp.watch('src/scripts/**/*.js', ['js']);
	gulp.watch('src/styles/**/*.css', ['css']);
	gulp.watch('src/**/*.html', ['html']);
	gulp.watch(['src/images/**/*.png', 'src/images/**/*.jpeg', 'src/images/**/*.jpg'], ['images']);
	gulp.watch(['src/video/**/*.webm', 'src/video/**/*.mp4'],['video']);
});

gulp.task('dist', ['distribute']);

gulp.task('clean', require('del').bind(null, ['dist', 'dist/public/styles', 'dist/public/scripts', 'dist/public/images', 'dist/public/fonts']));

gulp.task('default', ['clean'], function () {
  gulp.start('distribute');
});
