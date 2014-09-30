define(['src/hierarchy'], function(hierarchy) {

  describe('hierarchy', function() {

    it('should return something', function() {
      expect(hierarchy).not.to.be(undefined);
    });

    it('should create the right hierarchy', function() {
      var result = hierarchy([1, 2, 3], function(value) {
        return value !== 3;
      }, function(parent, child) {
        return child === 3 && parent !== 3;
      });

      expect(result).to.eql([{
        item: 1,
        level: 1,
        children: [{
          item: 3,
          level: 2,
          children: []
        }]
      }, {
        item: 2,
        level: 1,
        children: [{
          item: 3,
          level: 2,
          children: []
        }]
      }]);
    });

  });
});
