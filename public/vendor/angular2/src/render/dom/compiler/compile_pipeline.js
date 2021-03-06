System.register(["rtts_assert/rtts_assert", "angular2/src/facade/lang", "angular2/src/facade/collection", "angular2/src/dom/dom_adapter", "./compile_element", "./compile_control", "./compile_step", "../view/proto_view_builder"], function($__export) {
  "use strict";
  var assert,
      isPresent,
      List,
      ListWrapper,
      DOM,
      CompileElement,
      CompileControl,
      CompileStep,
      ProtoViewBuilder,
      CompilePipeline;
  return {
    setters: [function($__m) {
      assert = $__m.assert;
    }, function($__m) {
      isPresent = $__m.isPresent;
    }, function($__m) {
      List = $__m.List;
      ListWrapper = $__m.ListWrapper;
    }, function($__m) {
      DOM = $__m.DOM;
    }, function($__m) {
      CompileElement = $__m.CompileElement;
    }, function($__m) {
      CompileControl = $__m.CompileControl;
    }, function($__m) {
      CompileStep = $__m.CompileStep;
    }, function($__m) {
      ProtoViewBuilder = $__m.ProtoViewBuilder;
    }],
    execute: function() {
      CompilePipeline = $__export("CompilePipeline", (function() {
        var CompilePipeline = function CompilePipeline(steps) {
          assert.argumentTypes(steps, assert.genericType(List, CompileStep));
          this._control = new CompileControl(steps);
        };
        return ($traceurRuntime.createClass)(CompilePipeline, {
          process: function(rootElement) {
            var compilationCtxtDescription = arguments[1] !== (void 0) ? arguments[1] : '';
            assert.argumentTypes(rootElement, assert.type.any, compilationCtxtDescription, assert.type.string);
            var results = ListWrapper.create();
            var rootCompileElement = new CompileElement(rootElement, compilationCtxtDescription);
            rootCompileElement.inheritedProtoView = new ProtoViewBuilder(rootElement);
            rootCompileElement.isViewRoot = true;
            this._process(results, null, rootCompileElement, compilationCtxtDescription);
            return assert.returnType((results), List);
          },
          _process: function(results, parent, current) {
            var compilationCtxtDescription = arguments[3] !== (void 0) ? arguments[3] : '';
            assert.argumentTypes(results, assert.type.any, parent, CompileElement, current, CompileElement, compilationCtxtDescription, assert.type.string);
            var additionalChildren = this._control.internalProcess(results, 0, parent, current);
            if (current.compileChildren) {
              var node = DOM.firstChild(DOM.templateAwareRoot(current.element));
              while (isPresent(node)) {
                var nextNode = DOM.nextSibling(node);
                if (DOM.isElementNode(node)) {
                  var childCompileElement = new CompileElement(node, compilationCtxtDescription);
                  childCompileElement.inheritedProtoView = current.inheritedProtoView;
                  childCompileElement.inheritedElementBinder = current.inheritedElementBinder;
                  childCompileElement.distanceToInheritedBinder = current.distanceToInheritedBinder + 1;
                  this._process(results, current, childCompileElement);
                }
                node = nextNode;
              }
            }
            if (isPresent(additionalChildren)) {
              for (var i = 0; i < additionalChildren.length; i++) {
                this._process(results, current, additionalChildren[i]);
              }
            }
          }
        }, {});
      }()));
      Object.defineProperty(CompilePipeline, "parameters", {get: function() {
          return [[assert.genericType(List, CompileStep)]];
        }});
      Object.defineProperty(CompilePipeline.prototype.process, "parameters", {get: function() {
          return [[], [assert.type.string]];
        }});
      Object.defineProperty(CompilePipeline.prototype._process, "parameters", {get: function() {
          return [[], [CompileElement], [CompileElement], [assert.type.string]];
        }});
    }
  };
});
//# sourceMappingURL=compile_pipeline.es6.map

//# sourceMappingURL=./compile_pipeline.js.map