function StaticMeshRenderer(context, shaderProgram) {
  this.context = context;
  this.indices = [];
  this.vertices = [];

  this.positionAttributeHandle = shaderProgram.getAttributeHandle("position");
  this.colorAttributeHandle = shaderProgram.getAttributeHandle("color");
  this.normalAttributeHandle = shaderProgram.getAttributeHandle("normal");
}

StaticMeshRenderer.prototype = {
  add: function(meshRendering) {
    var transformation = meshRendering.entity.transformation;
    var mesh = meshRendering.mesh;
    var rendererVertex, meshVertex, i;
    for(i=0; mesh.vertices.length>i; i++) {
      meshVertex = mesh.vertices[i];
      rendererVertex = new Vertex(Point3.transform(meshVertex.position, transformation.getWorldMatrix()), meshVertex.color, meshVertex.normal);
      this.vertices.push(rendererVertex);
    }

    var indexOffset = this.indices.length;
    for(i=0; mesh.indices.length>i; i++) {
      this.indices.push(indexOffset + mesh.indices[i]);
    }
  },
  bake: function() {
    var i;

    this.vertexBufferHandle = this.context.createBuffer();
    this.context.bindBuffer(this.context.ARRAY_BUFFER, this.vertexBufferHandle);

    var vertexFloats = [], vertex;
    for(i=0; this.vertices.length>i; i++) {
      vertex = this.vertices[i];
      vertexFloats.push(vertex.position[0]);
      vertexFloats.push(vertex.position[1]);
      vertexFloats.push(vertex.position[2]);
      vertexFloats.push(vertex.color[0]);
      vertexFloats.push(vertex.color[1]);
      vertexFloats.push(vertex.color[2]);
      vertexFloats.push(vertex.normal[0]);
      vertexFloats.push(vertex.normal[1]);
      vertexFloats.push(vertex.normal[2]);
    }

    this.context.bufferData(this.context.ARRAY_BUFFER, new Float32Array(vertexFloats), this.context.STATIC_DRAW);

    this.indexBufferHandle = this.context.createBuffer();
    this.context.bindBuffer(this.context.ELEMENT_ARRAY_BUFFER, this.indexBufferHandle);
    this.context.bufferData(this.context.ELEMENT_ARRAY_BUFFER, new Uint16Array(this.indices), this.context.STATIC_DRAW);
  },
  draw: function() {
    this.context.bindBuffer(this.context.ARRAY_BUFFER, this.vertexBufferHandle);

    var stride = 9*4;
    this.context.vertexAttribPointer(this.positionAttributeHandle, 3, this.context.FLOAT, false, stride, 0);
    this.context.vertexAttribPointer(this.colorAttributeHandle, 3, this.context.FLOAT, false, stride, 3*4);
    this.context.vertexAttribPointer(this.normalAttributeHandle, 3, this.context.FLOAT, false, stride, 6*4);

    this.context.bindBuffer(this.context.ELEMENT_ARRAY_BUFFER, this.indexBufferHandle);

    this.context.drawElements(this.context.TRIANGLES, this.indices.length, this.context.UNSIGNED_SHORT, 0);
  }
};
