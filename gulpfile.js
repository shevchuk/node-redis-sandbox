var gulp = require('gulp');
var babel = require('gulp-babel');
var exec = require('child_process').exec;

gulp.task('babel', function() {
	return gulp.src('src/**/*.es6')
		.pipe(babel({
			presets: ['es2015', 'stage-0'],
            plugins: [
                "syntax-async-functions",
                "transform-regenerator"
            ]
		}))
		.pipe(gulp.dest('dist'));
});

gulp.task('default', function(){
    gulp.watch('src/**/*.es6', function(event){
        gulp.run('babel');
        console.log('File ' + event.path + ' was ' + event.type + ', running tasks...');
    });
    
});

gulp.task('run', function(cb){
    gulp.start('babel');
    exec('node dist/index.js', function (err, stdout, stderr) {
        if (stdout)
            console.log(stdout);

        if(stderr)
            console.log(stderr);
        
        cb(err);
    });
    
});

