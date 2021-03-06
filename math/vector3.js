function Vector3() {
  if(arguments.length === 3) {
    this[0] = arguments[0];
    this[1] = arguments[1];
    this[2] = arguments[2];
  } else {
    this[0] = 0;
    this[1] = 0;
    this[2] = 0;
  }
}

Vector3.prototype = {
  negate: function() {
    this.set(Vector3.negate(this));
  },
  set: function(vector) {
    this[0] = vector[0];
    this[1] = vector[1];
    this[2] = vector[2];
  },
  subtract: function(vector) {
    this.set(Vector3.subtract(this, vector));
  },
  normalize: function() {
    this.set(Vector3.normalize(this));
  },
  add: function(vector) {
    this.set(Vector3.add(this, vector));
  },
  getLength: function() {
    return Math.sqrt(Math.pow(this[0], 2) + Math.pow(this[1], 2) + Math.pow(this[2], 2));
  }
};

Vector3.cross = function(vector1, vector2) {
    var result = new Vector3();

    result[0] = vector1[1]*vector2[2] - vector1[2]*vector2[1];
    result[1] = vector1[2]*vector2[0] - vector1[0]*vector2[2];
    result[2] = vector1[0]*vector2[1] - vector1[1]*vector2[0];

    return result;
};

Vector3.negate = function(vector) {
  return new Vector3(-vector[0], -vector[1], -vector[2]);
};

Vector3.multiply = function(vector, scalar) {
  return new Vector3(vector[0]*scalar, vector[1]*scalar, vector[2]*scalar);
};

Vector3.divide = function(vector, scalar) {
  return new Vector3(vector[0]/scalar, vector[1]/scalar, vector[2]/scalar);
};

Vector3.add = function(vector1, vector2) {
  var result = new Vector3();
  result[0] = vector1[0] + vector2[0];
  result[1] = vector1[1] + vector2[1];
  result[2] = vector1[2] + vector2[2];
  return result;
};

Vector3.normalize = function(vector) {
  return Vector3.divide(vector, vector.getLength());
};

Vector3.subtract = function(vector1, vector2) {
  var result = new Vector3();
  result[0] = vector1[0] - vector2[0];
  result[1] = vector1[1] - vector2[1];
  result[2] = vector1[2] - vector2[2];
  return result;
};
