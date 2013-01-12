module.exports = function( grunt ) {

  grunt.initConfig({
    concat: {
      dist: {
        src: ['lib/*.js'],
        dest: './presenter.js'
      }
    },
    min: {
      dist: {
        src: ['./presenter.js'],
        dest: './presenter.min.js'
      }
    },
    watch: {
      files: ['lib/*.js'],
      tasks: 'concat'
    }
  })

  grunt.registerTask('default', 'concat min');

}
