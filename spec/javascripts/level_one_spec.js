//test every function that we defined on every model. 
//test our implementation of phaser, not actual phaser code

describe("Tests for Level One", function() {
  it("should set initial time to 8:50:00", function() {
    var levelOne = new load_level_one();   
    expect(levelOne.total).toBe(50);
    expect(levelOne.total_minutes).toBe(8);
    //throw new Error(levelOne.total_minutes);
    expect(levelOne.total_seconds).toBe(0);
  });
});