// 禁止提示框
process.env.DISABLE_NOTIFIER = true;
// 载入插件
var gulp = require('gulp');
var typescript = require('gulp-typescript');
var tsProject = typescript.createProject('tsconfig-gulp.json');
gulp.task('default', function(){
  return gulp.watch('server/*.ts', function() {
    console.log('watch file changed...');
    return tsProject.src().pipe(tsProject()).pipe(gulp.dest('server-dist'));
  })
});

