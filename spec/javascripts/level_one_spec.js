//test every function that we defined on every model. 
//test our implementation of phaser, not actual phaser code

describe("Tests for Level One", function() {
  it("should update global points", function() {
    var level_one = load_level_one();
    //having to redeclare this because it's not a property of any object, which technically is the wrong way to go
    //normally we would instantiate an object and then test the state of that object/ properties of the object. 
    var total_points = 0;   
    level_one.update_total_points(10);
    expect(total_points).toBe(10);
  });
});