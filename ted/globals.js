/*
 * File is required by mocha every time it runs. Use this module to load
 * into the ted namespace in each of the test scripts.
 */

var _ = require('lodash');
var util = require('util');
var driver = require('./testDriver.js');
var Promise = require('bluebird');

// Setup global ted object.
global.ted = {
  // Global state.
  state: {
    ref: 'HEAD',
    vms: []
  },
  // Helper modules.
  Promise: Promise,
  _: _,
  // Driver for using vmware.
  driver: driver,
  // Global describe function.
  describe: function(title, fn) {
    var self = this;
    // Add a suite for each tag in batch.
    _.each(self.state.vms, function(tag) {
      // Use intrinsic global describe function.
      describe(
        util.format('%s#%s - %s', tag, self.state.ref, title), function() {
        return fn({
          tag: tag,
          ref: self.state.ref
        });
      });
    });
  }
};
