module.exports = function(grunt) {
	grunt.initConfig({
		
		cssmin : {
		    options : {
		    	banner: '/* Minified on <%= grunt.template.date() %>*/\n'
		    },
		    app : {
		    	files : {
		    		'public/css/vendor.min.css' : [
		    			'public/css/vendor/*.css'
	    			],
	    			'public/css/app.min.css' : [
	    				'public/css/app/*.css'
	    			]
		    	}
		    }
		},

		uglify : {
			options : {
				compress : true,
				banner : '/* Minified on <%= grunt.template.date() %>*/\n'
			},
			app : {
				files : {
					"public/js/vendor.min.js" : [
						'public/js/vendor/jquery.min.js',
						'public/js/vendor/jquery-ui.min.js',
						'public/js/vendor/modernizr-latest.js',
						'public/js/vendor/foundation.min.js',
						'public/js/vendor/underscore.js',
						'public/js/vendor/backbone.js'
					],
					"public/js/app.min.js" : [
						'public/js/app/init.js',
						'public/js/backbone/models/user.js',
						'public/js/backbone/models/todo.js',
						'public/js/backbone/models/post.js',
						'public/js/backbone/views/user.js',
						'public/js/backbone/views/todo.js',
						'public/js/backbone/views/post.js',
						'public/js/backbone/views/main.js',
						'public/js/backbone/collections/user.js',
						'public/js/backbone/collections/todo.js',
						'public/js/backbone/collections/post.js',
						'public/js/backbone/routers/base.js',
			    		'public/js/app/main.js'
					]
				}
			}
		}
	});

	grunt.loadNpmTasks('grunt-contrib-cssmin');
	grunt.loadNpmTasks('grunt-contrib-uglify');

	grunt.registerTask("default", ['cssmin','uglify']);
};