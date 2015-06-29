//test every function that we defined on every model. 
//test our implementation of phaser, not actual phaser code

describe("Tests for total_points", function() {
  var total_points;

  beforeEach(function(){
    total_points = 0;
  });

  it("total_points should be a number", function(){
    expect(total_points).toEqual(jasmine.any(Number))
  });

  describe("Tests for update_total_points function", function(){
    it("should update total_points", function() {
      total_points = update_total_points(total_points, 10);
      expect(total_points).toBe(10);
    });

    it("should be called with 2 numbers", function(){
      var update_total_points = jasmine.createSpy('update_total_points');
      total_points = update_total_points(total_points, 10);
      expect(update_total_points).toHaveBeenCalledWith(jasmine.any(Number), jasmine.any(Number))
    });
  });
  
});

describe("Game initiation", function() {
  var level_one = new load_level_one();

  it("should have a Phaser game object", function(){
    expect(level_one.game).toEqual(jasmine.any(Phaser.Game))
  });
});