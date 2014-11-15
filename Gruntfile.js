module.exports = function (grunt){

  grunt.initConfig({
    clean: {
      build: ["public/build"]
    },
    copy: {
      build: {
        files: [{expand: true, cwd: "public/static", src: ["**"], dest: "public/build"}]
      }
    },
    browserify: {
      dev: {
        files: {
          "public/build/app.js": ["public/js/main.jsx"]
        },
        options: {
          transform: ["reactify"]
        }
      }
    },
    less: {
      dev: {
        files: {
          "public/build/styles.css": "public/less/main.less"
        }
      }
    },
    watch: {
      client: {
        files: ["public/js/**/*.js", "public/js/**/*.jsx", "public/less/**/*.less", "public/static/**/*.html"],
        tasks: ["build"],
        options: {
          livereload: {
            port: 9000
          }
        }
      }
    },
    serve: {
      port: 8000,
      livereload: 9000
    },
    concurrent: {
      dev: {
        tasks: ["serve", "watch:client"],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  require("load-grunt-tasks")(grunt);
  grunt.loadTasks("tasks");

  grunt.registerTask("build", ["clean:build", "copy:build", "less:dev", "browserify:dev"]);
  grunt.registerTask("default", ["build", "concurrent:dev"]);
}