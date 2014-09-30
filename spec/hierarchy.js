define(['src/hierarchy'], function(hierarchy) {

  describe('hierarchy', function() {

    it('should return something', function() {
      expect(hierarchy).not.to.be(undefined);
    });

    it('should create top level based on first condition', function () {
      expect(hierarchy([1,2,3], function(value) {
        return value < 3;
      })).to.eql([{
        item: 1,
      }, {
        item: 2
      }]);
    });

  });
});
