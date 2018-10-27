/*!
 * jQuery Table Navigator v@2.0.1
 * https://naveenda.github.io/tableNavigator
 *
 * Copyright Naveen
 * Released under the MIT license.
 * Date: 2018
 */
(function(factory) {
  if (typeof define === "function" && define.amd) {
    // AMD. Register as an anonymous module depending on jQuery.
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    // Node/CommonJS
    module.exports = factory(require("jquery"));
  } else {
    // No AMD. Register plugin with global jQuery object.
    factory(jQuery);
  }
})(function($) {
  $.fn.tableNavigator = function(options) {
    // Default options
    var settings = $.extend(
      {
        input: false,
        click: true,
        background: "#e7fac6",
        cclick: false,
        zindex: 12,
        class: "grid-table-clicked",
        select: true,
        row: false
      },
      options
    );
    var jq = jQuery("body");
    var selector = this.selector;
    jq.find(this.selector + " tr").each(function(row, el) {
      jq.find(this).attr("data-row", "row_" + row);
      jq.find(this)
        .children()
        .each(function(col, el) {
          jq.find(this)
            .attr("data-col", "col_" + col)
            .attr("data-element", "row_" + row + "_col_" + col);
        });
    });
    jq.find("body").append(
      "<style>." +
        settings.class +
        "{background: " +
        settings.background +
        " !important;z-index:" +
        settings.zindex +
        "}</style>"
    );
    jq.find(selector).on("keydown", function(event) {
      var code = event.which;
      var current_el = jq.find(selector + " ." + settings.class);
      if (current_el.length == 0) {
        current_el = jq.find(selector + "[data-element=row_0_col_1]");
      }
      if (code == "40") {
        gridTable(current_el, "bottom");
      } else if (code == "38") {
        gridTable(current_el, "top");
      } else if (code == "37") {
        gridTable(current_el, "left");
      } else if (code == "39") {
        gridTable(current_el, "right");
      }
    });

    function gridTable(element, movement) {
      var current = "";
      var column = element.data("col");
      var row = element.parent().data("row");
      var row_count = row.replace(/^\D+/g, "");
      var col_count = column.replace(/^\D+/g, "");
      if (movement == "top") {
        row_count -= 1;
        current = "[data-element=row_" + row_count + "_" + column + "]";
      } else if (movement == "bottom") {
        row_count = parseInt(row_count) + 1;
        current = "[data-element=row_" + row_count + "_" + column + "]";
      } else if (movement == "left") {
        col_count -= 1;
        current = "[data-element=" + row + "_col_" + col_count + "]";
      } else if (movement == "right") {
        col_count = parseInt(col_count) + 1;
        current = "[data-element=" + row + "_col_" + col_count + "]";
      }
      if (settings.click) {
        jq.find(current).click();
      } else {
        jq.find(selector + " th")
          .removeClass(settings.class)
          .end()
          .find(selector + " td")
          .removeClass(settings.class)
          .end()
          .find(current)
          .addClass(settings.class);
      }
      if (settings.input) {
        if (settings.select) {
          jq.find(current)
            .find("input")
            .focus();
        }
      }
      if (settings.cclick) {
        jq.find(current)
          .children()
          .click();
      }
    }
    if (settings.click) {
      jq.find("[data-element]").click(function(event) {
        jq.find("[data-element]")
          .removeClass(settings.class)
          .end()
          .find(this)
          .addClass(settings.class);
      });
    }
  };
});
