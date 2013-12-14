function Camera(renderer) {
  this.renderer = renderer;
  this.transformation = new Transformation3();
}

Camera.prototype.getClipTransformation = function() {
  var matrix = Matrix4.perspective(90, this.renderer.getAspectRatio(), 0.1, 10);;
  return matrix;
};
