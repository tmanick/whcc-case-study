module.exports = function(grunt) {
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		uglify: {
			options: {
				banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
			},
			build: {
				src: 'assets/src/js/*.js',
				dest: 'assets/dist/js/<%= pkg.name %>.min.js'
			}
		},
		sass: {
			dist: {
					options: {
						style: 'compressed'
					},
					files: {
						'assets/dist/css/<%= pkg.name %>.min.css': 'assets/src/scss/main.scss'
					}
			}
		},
		watch: {
			js: {
				files: ['assets/src/js/*.js'],
				tasks: ['uglify']
			},
			css: {
				files: ['assets/src/scss/**/*.scss'],
				tasks: ['sass']
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-uglify-es');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-contrib-sass');

	// Default task(s).
	grunt.registerTask('default', ['watch']);
	
};