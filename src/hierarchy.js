define(function() {
  'use strict';

  function getChildren(parent, items, parentLevel, childrenTest) {
    parentLevel++;
    return items.reduce(function(children, item) {
      var newItem;
      if (childrenTest(parent.item, item)) {
        newItem = {
          item: item,
          level: parentLevel,
          getParent: function() {
            return parent;
          },
          getParents: function() {
            return parent.getParents().concat(parent);
          }
        };

        newItem.children = getChildren(newItem, items, parentLevel, childrenTest);

        children.push(newItem);
      }

      return children;
    }, []);
  }

  return function(items, topLevelCondition, childrenTest) {
    return items.reduce(function(parents, item) {
      var parentLevel = 1;
      var newItem;
      if (topLevelCondition(item)) {

        newItem = {
          item: item,
          level: parentLevel,
          getParent: function() {
            return null;
          },
          getParents: function() {
            return [];
          }
        };

        newItem.children = getChildren(newItem, items, parentLevel, childrenTest);
        parents.push(newItem);
      }

      return parents;

    }, []);
  };
});
