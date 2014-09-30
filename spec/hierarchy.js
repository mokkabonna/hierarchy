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

      expect(JSON.stringify(result)).to.eql(JSON.stringify([{
        item: 1,
        level: 1,
        children: [{
          item: 3,
          level: 2,
          children: [],
        }]
      }, {
        item: 2,
        level: 1,
        children: [{
          item: 3,
          level: 2,
          children: [],
        }]
      }]));
    });


    describe('getParent', function() {

      it('should return null for the top level', function() {
        var result = hierarchy([1, 2, 3], function(value) {
          return value !== 3;
        }, function(parent, child) {
          return child === 3 && parent !== 3;
        });

        expect(result[0].getParent()).to.be(null);
      });

      it('should return the right parent for a child', function() {
        var result = hierarchy([1, 2, 3], function(value) {
          return value !== 3;
        }, function(parent, child) {
          return child === 3 && parent !== 3;
        });

        expect(result[0].children[0].getParent()).to.be(result[0]);
      });

    });

    describe('getParents', function() {

      it('should get all the parents', function() {
        var result = hierarchy([1, 10, 100], function(value) {
          return value === 1;
        }, function(parent, child) {
          return parent * 10 === child;
        });

        //results in 1,10,100

        expect(result[0].children[0].children[0].getParents().map(function(level) {
          return level.item;
        })).to.eql([1, 10]);
      });

    });

  });
});
