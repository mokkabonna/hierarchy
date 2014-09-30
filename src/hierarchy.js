define(function() {
  'use strict';

  function getChildren(parent, items, parentLevel, childrenTest) {
    parentLevel++;
    return items.reduce(function(children, item) {
      if (childrenTest(parent, item)) {
        children.push({
          item: item,
          level: parentLevel,
          children: getChildren(item, items, parentLevel, childrenTest)
        });
      }

      return children;
    }, []);
  }

  return function(items, topLevelCondition, childrenTest) {
    return items.reduce(function(parents, item) {
      var parentLevel = 1;

      if (topLevelCondition(item)) {
        parents.push({
          item: item,
          level: parentLevel,
          children: getChildren(item, items, parentLevel, childrenTest)
        });
      }

      return parents;

    }, []);
  };
});
