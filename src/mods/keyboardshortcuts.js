import Fimod from '../Fimod';

Fimod.define({
  name: "keyboardshortcuts",
  label: "Keyboard Shortcuts",
  description: "Keyboard shortcuts that provide easy access to modules",
},
['ui/factory/mapLayers/MouseLayer'],
(MouseLayer) => {

  Fimod.wrap(MouseLayer, 'display', function(supr, ...args) {
    supr(...args);

    this.setupKeyboardListener();
  });

  MouseLayer.prototype.setupKeyboardListener = function() {
    const toggles = {
      57: [".playButton", ".stopButton"],           // 9
      48: [".playFastButton", ".playNormalButton"], // 0
    };
    const keys = {
      49: "",                                       // 1
      50: "transportLine",                          // 2
      51: "garbageCollector",                       // 3
      52: "sorterVertical",                         // 4
      53: "sorterHorizontal",                       // 5
      54: "",                                       // 6
      55: "",                                       // 7
      56: "",                                       // 8

      81: "ironBuyer",                              // q
      87: "ironFoundry",                            // w
      69: "ironSeller",                             // e
      82: "",                                       // r
      84: "coalBuyer",                              // t
      89: "steelFoundry",                           // y
      85: "steelSeller",                            // u
      73: "",                                       // i
      79: "",                                       // o
      80: "",                                       // p

      65: "oilBuyer",                               // a
      83: "gasBuyer",                               // s
      68: "plasticMaker",                           // d
      70: "plasticSeller",                          // f
      71: "siliconBuyer",                           // g
      72: "electronicsMaker",                       // h
      74: "electronicsSeller",                      // j
      75: "",                                       // k
      76: "",                                       // l

      90: "researchCenter",                         // z
      88: "researchCenter2",                        // x
      67: "",                                       // c
      86: "metalsLab",                              // v
      66: "gasAndOilLab",                           // b
      78: "",                                       // n
      77: "",                                       // m
    };

    function Click(element){
      $('[data-id="' + element + '"]').click();
    };

    function Toggle(firstElement, secondElement){
      if ($(firstElement + ":visible").length !== 0) {
        $(firstElement).click();
      } else {
        $(secondElement).click();
      };
    };

    this._handleKeyboard = (event) => {
      const charCode = event.keyCode;
      if (charCode in toggles) {
        const elements = toggles[charCode];
        Toggle(elements[0], elements[1]);
        return;
      } else if (charCode in keys) {
        const item = keys[charCode];
        Click(item);
        return;
      };
    };

    document.body.addEventListener("keydown", this._handleKeyboard);
  };

  Fimod.wrap(MouseLayer, 'destroy', function(supr) {
    supr();
    document.body.removeEventListener("keydown", this._handleKeyboard);
  });
});
